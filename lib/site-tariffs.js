import { zones, zoneAvailableAt } from './zones.js';

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

function textItems(items) {
  return Array.isArray(items)
    ? items.map((item) => (typeof item === 'string' ? item : item?.title || '')).filter(Boolean)
    : [];
}

export function normalizeSiteTariff(raw) {
  const price = raw.price || {};
  const segments =
    price.type === 'split'
      ? [
          ['Пн–Чт', price.mon_thu],
          ['Пт–Вс и праздники', price.fri_sun],
        ]
      : price.type === 'single'
        ? [['Стоимость', price]]
        : [];
  const priceItems = segments.flatMap(([label, segment]) => {
    const amount = minorAmount(segment?.amount);
    if (amount === null) return [];
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
  return {
    id: raw.id,
    title: raw.title || '',
    description: raw.short_description || '',
    duration: raw.duration || '',
    players: raw.people_count || '',
    age: raw.age_restrictions || '',
    category: raw.category?.code || '',
    priceUnit: raw.price_unit,
    priceUnitLabel:
      raw.price_unit === 'per_company'
        ? 'за компанию'
        : raw.price_unit === 'per_person'
          ? 'с человека'
          : '',
    priceItems,
    included: textItems(raw.included_items),
    benefits: textItems(raw.advantages),
    hit: Boolean(raw.is_hit),
    discount: Boolean(raw.is_discount),
    isApiTariff: true,
  };
}

export function locationTariffs(site, location, category) {
  if (!usesSiteTariffs(site)) return null;
  const codes = categoryCodes[category] || [];
  const tariffs = Array.isArray(location?.content?.tariffs) ? location.content.tariffs : [];
  return tariffs
    .filter((tariff) => codes.includes(tariff.category?.code))
    .slice()
    .sort((first, second) => (first.sort || 0) - (second.sort || 0))
    .map(normalizeSiteTariff);
}

function minimumPrice(tariffs) {
  let minimum = null;
  for (const tariff of tariffs) {
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
  const event = events.find((item) => eventCodes[category]?.includes(item.code));
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
    const params = (raw?.fields || [])
      .filter((field) => field.code !== 'price' && rawField([field], field.code))
      .slice()
      .sort((first, second) => (first.sort || 0) - (second.sort || 0))
      .map((field) => {
        const value = rawField([field], field.code);
        if (field.code === 'area')
          return `Площадь ${value}${/^\d+(?:[.,]\d+)?$/.test(value) ? ' м²' : ''}`;
        if (field.code === 'attractions_count') return `${field.title || 'Аттракционов'}: ${value}`;
        return value;
      });
    return {
      ...zone,
      label: raw?.title || zone.label,
      accent: raw?.title || zone.accent,
      description: raw?.description || zone.description,
      params: params.length ? params : zone.params,
      apiPrice: minimumZonePrice(site, location, zone.id),
    };
  });
}
