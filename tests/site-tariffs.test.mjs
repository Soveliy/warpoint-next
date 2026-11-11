import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatMinorMoney,
  locationTariffs,
  minimumEventPrice,
  minimumZonePrice,
  normalizeSiteTariff,
  siteZoneAvailable,
  siteZones,
} from '../lib/site-tariffs.js';

const tariff = (id, category, amount, unit = 'per_person') => ({
  id,
  title: id,
  category: { code: category },
  price_unit: unit,
  price: { type: 'single', amount, old_amount: null },
});
const site = { source: 'wp-sites', arenas: [] };

test('API money is in minor units, including zero and kopecks', () => {
  assert.equal(formatMinorMoney(150000), '1 500 ₽');
  assert.equal(formatMinorMoney(150050), '1 500,50 ₽');
  assert.equal(formatMinorMoney(0), '0 ₽');
  for (const invalid of [null, undefined, '', ' ', NaN, Infinity, -100]) {
    assert.equal(formatMinorMoney(invalid), '');
  }
});

test('split and single prices keep their units, old prices and included content', () => {
  const normalized = normalizeSiteTariff({
    ...tariff('team', 'arena', 1200000, 'per_company'),
    price: {
      type: 'split',
      mon_thu: { amount: 1200000, old_amount: 1500000 },
      fri_sun: { amount: 1500000, old_amount: 0 },
    },
    included_items: ['90 минут на арене'],
    advantages: ['Координатор'],
  });
  assert.equal(normalized.priceUnitLabel, 'за компанию');
  assert.equal(normalized.priceItems[0].value, '12 000 ₽');
  assert.equal(normalized.priceItems[0].oldValue, '15 000 ₽');
  assert.equal(normalized.priceItems[1].oldAmount, 0);
  assert.equal(normalized.priceItems[1].oldValue, '0 ₽');
  assert.deepEqual(normalized.included, ['90 минут на арене']);
  assert.deepEqual(normalized.benefits, ['Координатор']);
  assert.equal(normalizeSiteTariff(tariff('free', 'arena', 0)).priceItems[0].amount, 0);
  assert.equal(normalizeSiteTariff(tariff('unknown', 'arena', null)).priceItems.length, 0);
});

test('empty API tariffs are authoritative and legacy callers retain fixture selection', () => {
  assert.deepEqual(locationTariffs(site, { content: { tariffs: [] } }, 'birthday'), []);
  assert.deepEqual(locationTariffs(site, null, 'arena'), []);
  assert.equal(locationTariffs({}, { content: { tariffs: [] } }, 'arena'), null);
});

test('event categories are separate and API ordering is preserved', () => {
  const location = {
    content: {
      tariffs: [
        { ...tariff('child-second', 'kids_birthday', 2000000), sort: 2 },
        tariff('adult', 'adult_birthday', 3000000),
        tariff('corporate', 'corporate_teambuilding', 4000000),
        { ...tariff('child-first', 'kids_birthday', 1000000), sort: 1 },
        tariff('station', 'vr_station', 80000),
        tariff('combo', 'combo_tariffs', 160000),
      ],
    },
  };
  assert.deepEqual(
    locationTariffs(site, location, 'birthday').map((item) => item.id),
    ['child-first', 'child-second'],
  );
  assert.deepEqual(
    locationTariffs(site, location, 'adult-birthday').map((item) => item.id),
    ['adult'],
  );
  assert.deepEqual(
    locationTariffs(site, location, 'corporate').map((item) => item.id),
    ['corporate'],
  );
  assert.deepEqual(locationTariffs(site, location, 'graduation'), []);
  assert.equal(locationTariffs(site, location, 'station')[0].id, 'station');
  assert.equal(locationTariffs(site, location, 'combo')[0].id, 'combo');
});

test('changing parks changes the minimum and does not divide company prices by capacity', () => {
  const first = { content: { tariffs: [tariff('private', 'arena', 1200000, 'per_company')] } };
  const second = { content: { tariffs: [tariff('public', 'arena', 100000)] } };
  assert.deepEqual(minimumZonePrice(site, first, 'arena'), {
    amount: 1200000,
    value: '12 000 ₽',
    unit: 'per_company',
    unitLabel: 'за компанию',
  });
  assert.equal(minimumZonePrice(site, second, 'arena').value, '1 000 ₽');
  assert.equal(minimumZonePrice(site, { content: { tariffs: [] } }, 'arena'), null);
});

test('free text prices are not interpreted as minor units and numeric tariffs take priority', () => {
  const location = {
    content: {
      tariffs: [],
      game_zones: [{ code: 'arena', fields: [{ code: 'price', value: '1500' }] }],
      events: [
        { code: 'kids_bday', fields: [{ code: 'price', value: 'от 20 000 ₽ за праздник' }] },
      ],
    },
  };
  assert.equal(minimumZonePrice(site, location, 'arena').value, '1500');
  assert.equal(minimumEventPrice(site, location, 'birthday').value, 'от 20 000 ₽ за праздник');
  location.content.tariffs = [tariff('child', 'kids_birthday', 1590000, 'per_company')];
  assert.equal(minimumEventPrice(site, location, 'birthday').value, '15 900 ₽');
  assert.equal(minimumEventPrice(site, location, 'adult-birthday'), null);
});

test('empty zoneIds means unavailable even if the park has tariffs', () => {
  const empty = {
    title: 'Парк',
    zoneIds: [],
    content: { tariffs: [tariff('open', 'arena', 100000)] },
  };
  const populated = { title: 'Другой парк', zoneIds: ['arena'] };
  const apiSite = { ...site, arenas: [empty, populated] };
  assert.equal(siteZoneAvailable(apiSite, empty, 'arena'), false);
  assert.equal(siteZoneAvailable(apiSite, null, 'arena'), true);
  assert.equal(siteZoneAvailable(apiSite, null, 'lounge'), false);
  assert.equal(siteZoneAvailable({ ...site, arenas: [empty] }, null, 'arena'), false);
  assert.equal(siteZoneAvailable({}, { title: 'Радуга Парк' }, 'extreme'), false);
});

test('API zone fields replace supplied params and preserve existing media and descriptive copy', () => {
  const location = {
    content: {
      game_zones: [
        {
          code: 'arena',
          fields: [
            { code: 'area', value: '45', sort: 10 },
            { code: 'players', value: '1–2', sort: 20 },
            { code: 'price', value: 'Стоимость уточняется', sort: 30 },
          ],
        },
      ],
    },
  };
  const arena = siteZones(site, location).find((zone) => zone.id === 'arena');
  assert.deepEqual(arena.params, ['Площадь 45 м²', '1–2']);
  assert.equal(arena.apiPrice.value, 'Стоимость уточняется');
  assert.ok(arena.image.endsWith('арена.jpg'));
  assert.ok(arena.description.includes('свободно перемещаться'));
});
