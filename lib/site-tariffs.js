import { zones, zoneAvailableAt } from './zones.js';
import { eventTariffs, tariffs } from './catalog-data.js';

const categoryCodes = {
  arena: ['arena'],
  station: ['vr_station'],
  simulators: ['simulators'],
  extreme: ['extreme'],
  combo: ['combo_tariffs'],
  birthday: ['kids_birthday'],
  corporate: ['corporate_teambuilding'],
  graduation: ['school_graduation', 'graduation'],
  'adult-birthday': ['adult_birthday'],
};

const eventCodes = {
  birthday: ['kids_bday'],
  corporate: ['corporate'],
  graduation: ['graduation', 'school_graduation'],
  'adult-birthday': ['adult_bday', 'adult_birthday'],
};

const zoneCategories = {
  arena: 'arena',
  vr: 'station',
  extreme: 'extreme',
  simulators: 'simulators',
};
const zoneCodes = {
  arena: 'arena',
  vr: 'vr_station',
  extreme: 'extreme',
  simulators: 'simulators',
  lounge: 'lounge',
};

export const usesSiteTariffs = (site) => site?.source === 'wp-sites';

function minorAmount(value) {
  if (
    value === null ||
    value === undefined ||
    value === '' ||
    (typeof value === 'string' && !value.trim()) ||
    typeof value === 'boolean'
  )
    return null;
  const amount = Number(value);
  return Number.isFinite(amount) && amount >= 0 ? amount : null;
}

export function formatMinorMoney(amount, currency = 'RUB') {
  const value = minorAmount(amount);
  if (value === null) return '';
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
    maximumFractionDigits: value % 100 === 0 ? 0 : 2,
    minimumFractionDigits: value % 100 === 0 ? 0 : 2,
  })
    .format(value / 100)
    .replace(/[\u00a0\u202f]/g, ' ');
}

function text(value, fallback = '') {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function textItems(items, fallback = []) {
  const values = Array.isArray(items)
    ? items.map((item) => text(typeof item === 'string' ? item : item?.title)).filter(Boolean)
    : [];
  return values.length ? values : fallback;
}

function fixturePriceItems(fallback) {
  const entries = fallback.prices || (fallback.price ? [['Стоимость', fallback.price]] : []);
  return entries.flatMap(([label, value]) => {
    const amount = Number(
      String(value)
        .replace(/[^0-9.,]/g, '')
        .replace(',', '.'),
    );
    return Number.isFinite(amount)
      ? [{ label, amount: Math.round(amount * 100), oldAmount: null, value, oldValue: '' }]
      : [];
  });
}

export function normalizeSiteTariff(raw, fallback = {}) {
  const price = raw.price || {};
  const fallbackPrices = fixturePriceItems(fallback);
  const segments =
    price.type === 'split'
      ? [
          ['Пн–Чт', price.mon_thu],
          ['Пт–Вс и праздники', price.fri_sun],
        ]
      : price.type === 'single'
        ? [['Стоимость', price]]
        : fallbackPrices.map((entry) => [entry.label, null]);
  const priceItems = segments.flatMap(([label, segment]) => {
    const previous = fallbackPrices.find((entry) => entry.label === label);
    const amount = minorAmount(segment?.amount) ?? previous?.amount;
    if (amount === null || amount === undefined) return [];
    const oldAmount = minorAmount(segment?.old_amount);
    return [
      {
        label,
        amount,
        oldAmount,
        value: formatMinorMoney(amount),
        oldValue: formatMinorMoney(oldAmount),
      },
    ];
  });
  const priceUnit = text(raw.price_unit, fallback.priceUnit);
  return {
    id: raw.id || fallback.id,
    fallbackId: fallback.id || null,
    title: text(raw.title, fallback.title),
    description: text(raw.short_description, fallback.description),
    duration: text(raw.duration, fallback.duration),
    players: text(raw.people_count, fallback.players),
    age: text(raw.age_restrictions, fallback.age),
    category: text(raw.category?.code),
    categoryTitle: text(raw.category?.title),
    categoryGroup: text(raw.category_group?.code),
    categoryGroupTitle: text(raw.category_group?.title),
    priceUnit,
    priceUnitLabel:
      priceUnit === 'per_company' ? 'за компанию' : priceUnit === 'per_person' ? 'с человека' : '',
    priceItems,
    included: textItems(raw.included_items, fallback.included),
    benefits: textItems(raw.advantages, fallback.benefits),
    hit: typeof raw.is_hit === 'boolean' ? raw.is_hit : Boolean(fallback.hit),
    discount: typeof raw.is_discount === 'boolean' ? raw.is_discount : Boolean(fallback.discount),
    isApiTariff: true,
  };
}

function matchingTariff(raw, category) {
  const local = tariffs[category] || (eventCodes[category] ? eventTariffs : []);
  const key = (value) =>
    text(value)
      .toLowerCase()
      .replace(/[^a-zа-яё0-9]/g, '');
  return local.find(
    (item) => item.id === raw.id || (key(raw.title) && key(item.title) === key(raw.title)),
  );
}

export function locationTariffs(site, location, category) {
  if (!usesSiteTariffs(site)) return null;
  if (!location) return [];
  const codes = categoryCodes[category] || [category];
  const items = Array.isArray(location.content?.tariffs) ? location.content.tariffs : [];
  const available = items
    .filter((tariff) => tariff && codes.includes(tariff.category?.code))
    .slice()
    .sort((first, second) => (first.sort || 0) - (second.sort || 0));
  if (!available.length) return null;
  return available.map((tariff) =>
    normalizeSiteTariff(
      tariff,
      site.city === 'Екатеринбург' ? matchingTariff(tariff, category) : undefined,
    ),
  );
}

function minimumPrice(tariffs) {
  let minimum = null;
  for (const tariff of tariffs || []) {
    for (const price of tariff.priceItems) {
      if (minimum && price.amount >= minimum.amount) continue;
      minimum = {
        amount: price.amount,
        value: price.value,
        unit: tariff.priceUnit,
        unitLabel: tariff.priceUnitLabel,
      };
    }
  }
  return minimum;
}

function rawField(fields, code) {
  const field = Array.isArray(fields) ? fields.find((item) => item.code === code) : null;
  return field?.value === null || field?.value === undefined ? '' : String(field.value).trim();
}

export function minimumEventPrice(site, location, category) {
  if (!usesSiteTariffs(site)) return null;
  const minimum = minimumPrice(locationTariffs(site, location, category));
  if (minimum) return minimum;
  const events = Array.isArray(location?.content?.events) ? location.content.events : [];
  const event = events.find((item) => (eventCodes[category] || [category]).includes(item.code));
  const value = rawField(event?.fields, 'price');
  return value ? { amount: null, value, unit: null, unitLabel: '' } : null;
}

export function minimumZonePrice(site, location, zoneId) {
  if (!usesSiteTariffs(site)) return null;
  const minimum = minimumPrice(locationTariffs(site, location, zoneCategories[zoneId]));
  if (minimum) return minimum;
  const raw = location?.content?.game_zones?.find((zone) => zone.code === zoneCodes[zoneId]);
  const value = rawField(raw?.fields, 'price');
  return value ? { amount: null, value, unit: null, unitLabel: '' } : null;
}

export function siteZoneAvailable(site, location, zoneId) {
  if (!usesSiteTariffs(site)) return zoneAvailableAt(location, zoneId);
  if (location) return Array.isArray(location.zoneIds) && location.zoneIds.includes(zoneId);
  return site.arenas.some(
    (arena) => Array.isArray(arena.zoneIds) && arena.zoneIds.includes(zoneId),
  );
}

export function siteZones(site, location) {
  if (!usesSiteTariffs(site)) return zones;
  const available = Array.isArray(location?.content?.game_zones) ? location.content.game_zones : [];
  return zones.map((zone) => {
    const raw = available.find((item) => item.code === zoneCodes[zone.id]);
    const suppliedFields = (raw?.fields || [])
      .filter((field) => field.code !== 'price' && rawField([field], field.code))
      .slice()
      .sort((first, second) => (first.sort || 0) - (second.sort || 0));
    const suppliedCodes = new Set(suppliedFields.map((field) => field.code));
    const params = suppliedFields.map((field) => {
      const value = rawField([field], field.code);
      if (field.code === 'area')
        return `Площадь ${value}${/^\d+(?:[.,]\d+)?$/.test(value) ? ' м²' : ''}`;
      if (field.code === 'attractions_count') return `${field.title || 'Аттракционов'}: ${value}`;
      return value;
    });
    const fallbackParams = zone.params.filter((param) => {
      if (/\d+\+/.test(param)) return !suppliedCodes.has('age_restrictions');
      if (/площадь/i.test(param)) return !suppliedCodes.has('area');
      if (/человек|игрок|гост/i.test(param))
        return !suppliedCodes.has('players') && !suppliedCodes.has('capacity');
      return true;
    });
    return {
      ...zone,
      label: text(raw?.title, zone.label),
      accent: text(raw?.title, zone.accent),
      description: text(raw?.description, zone.description),
      params: [...params, ...fallbackParams],
      apiPrice: minimumZonePrice(site, location, zone.id),
    };
  });
}
