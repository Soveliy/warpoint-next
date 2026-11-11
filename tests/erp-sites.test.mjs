import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeSitesSite, siteHostname } from '../lib/erp-sites.js';
import { fetchErpSites } from '../lib/erp-site-transport.js';

const countryId = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
const cityId = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
const arenaId = 'cccccccc-cccc-4ccc-8ccc-cccccccccccc';
const secondId = 'dddddddd-dddd-4ddd-8ddd-dddddddddddd';
const contentId = 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee';
const publicTree = () => ({
  countries: [
    {
      id: countryId,
      name: 'Россия',
      cities: [
        {
          id: cityId,
          name: 'Екатеринбург',
          timezone: 'Asia/Yekaterinburg',
          arenas: [
            {
              id: arenaId,
              title: 'Первый парк',
              site: {
                id: contentId,
                slug: 'first',
                domain: 'https://dserver.warpoint.ru/',
                game_zones: [{ code: 'vr_station' }],
                events: [],
                internal_token: 'must-not-serialize',
              },
            },
            {
              id: secondId,
              title: 'Второй парк',
              site: { slug: 'second', domain: 'ekb.warpoint.ru', game_zones: [] },
            },
          ],
        },
      ],
    },
  ],
});
const legacy = {
  countries: [
    {
      name: 'Россия',
      prefix: 'RU',
      city: [
        {
          name: 'Екатеринбург',
          arenas: [
            {
              id: arenaId,
              title: 'Старое имя',
              address: 'Адрес по UUID',
              phone: '+70000000000',
              work_time: { open_time: '10:00:00', close_time: '22:00:00' },
            },
            { title: 'Второй парк', address: 'Адрес по названию' },
          ],
        },
        {
          name: 'Другой город',
          arenas: [{ id: secondId, title: 'Второй парк', address: 'Чужой адрес' }],
        },
      ],
    },
  ],
};
const normalize = (data = publicTree(), host = 'warpoint.ru', previous = legacy) =>
  normalizeSitesSite(data, previous, { hostname: host });

test('domain normalization accepts bare hosts and HTTP URLs without credentials', () => {
  assert.equal(siteHostname('HTTPS://EKB.WARPOINT.RU/'), 'ekb.warpoint.ru');
  assert.equal(siteHostname('ekb.warpoint.ru'), 'ekb.warpoint.ru');
  for (const value of [
    null,
    {},
    '',
    'bad host',
    'javascript:alert(1)',
    'https://user:pass@example.com',
  ])
    assert.equal(siteHostname(value), null);
});

test('each city domain and the legacy logical alias expose the entire city', () => {
  for (const host of ['warpoint.ru', 'dserver.warpoint.ru', 'https://ekb.warpoint.ru/']) {
    const site = normalize(publicTree(), host);
    assert.equal(site.source, 'wp-sites');
    assert.equal(site.arenas.length, 2);
    assert.equal(site.hostname, siteHostname(host));
    assert.equal(site.canonicalUrl, 'https://' + siteHostname(host) + '/');
    assert.equal(site.cityId, cityId);
    assert.equal(site.countryUuid, countryId);
    assert.equal(site.countryId, 'ru');
    assert.equal(site.timezone, 'Asia/Yekaterinburg');
  }
  assert.equal(normalize(publicTree(), 'unknown.example'), null);
  assert.equal(normalize().slug, 'first');
  assert.equal(normalize(publicTree(), 'ekb.warpoint.ru').slug, 'second');
});

test('UUID enrichment wins over title and title fallback is restricted to the same city', () => {
  const site = normalize();
  assert.equal(site.arenas[0].address, 'Адрес по UUID');
  assert.equal(site.arenas[0].title, 'Первый парк');
  assert.equal(site.arenas[0].phone, '+70000000000');
  assert.equal(site.arenas[0].hours.open_time, '10:00:00');
  assert.equal(site.arenas[1].address, 'Адрес по названию');
  assert.equal(site.arenas[0].id, arenaId);
  assert.equal(site.arenas[0].siteId, contentId);
});

test('unmatched or ambiguous legacy parks never borrow another city or duplicate title address', () => {
  const other = {
    countries: [
      {
        name: 'Россия',
        prefix: 'RU',
        city: [{ name: 'Другой город', arenas: legacy.countries[0].city[0].arenas }],
      },
    ],
  };
  assert.equal(normalize(publicTree(), 'warpoint.ru', other).arenas[0].address, '');
  const ambiguous = structuredClone(legacy);
  ambiguous.countries[0].city[0].arenas.push({ title: 'Второй парк', address: 'Дубликат' });
  assert.equal(normalize(publicTree(), 'warpoint.ru', ambiguous).arenas[1].address, '');
});

test('content retains only public fields and empty or missing zones are authoritative', () => {
  const data = publicTree();
  data.countries[0].cities[0].arenas[0].site.game_zones.push(
    { code: 'vr_station' },
    { code: 'unknown' },
    { code: 'constructor' },
    { code: '__proto__' },
  );
  const site = normalize(data);
  assert.deepEqual(site.arenas[0].zoneIds, ['vr']);
  assert.deepEqual(site.arenas[1].zoneIds, []);
  assert.equal(site.arenas[0].content.slug, 'first');
  assert.equal(Object.hasOwn(site.arenas[0].content, 'internal_token'), false);
  delete data.countries[0].cities[0].arenas[0].site.game_zones;
  assert.deepEqual(normalize(data).arenas[0].zoneIds, []);
});

test('empty, nullable and malformed trees return null without legacy fallback', () => {
  for (const data of [
    null,
    {},
    [],
    { countries: [] },
    { countries: null },
    { countries: [null, { cities: null }] },
    {
      countries: [
        {
          name: 'Россия',
          cities: [
            {
              name: 'Екатеринбург',
              arenas: [null, {}, { id: arenaId, title: 'Нет сайта', site: null }],
            },
          ],
        },
      ],
    },
  ])
    assert.equal(normalize(data), null);
});

test('an invalid timezone falls back to UTC and no supplemental contacts are invented', () => {
  const data = publicTree();
  data.countries[0].cities[0].timezone = 'not/timezone';
  const site = normalize(data, 'warpoint.ru', null);
  assert.equal(site.timezone, 'UTC');
  assert.equal(site.countryId, 'ru');
  assert.equal(site.arenas[0].address, '');
  assert.equal(site.arenas[0].hours, null);
  assert.equal(site.arenas[0].phone, null);
});

test('sites transport sends Bearer only on the server request and does not cache test content', async () => {
  let request;
  const data = await fetchErpSites({
    endpoint: 'https://erp.example/sites/',
    token: 'test-server-value',
    fetcher: async (url, options) => {
      request = { url, options };
      return { ok: true, status: 200, json: async () => ({ countries: [] }) };
    },
  });
  assert.deepEqual(data, { countries: [] });
  assert.equal(request.url, 'https://erp.example/sites/');
  assert.equal(request.options.headers.Authorization, 'Bearer test-server-value');
  assert.equal(request.options.cache, 'no-store');
  assert.ok(request.options.signal instanceof AbortSignal);
});

test('authorization and network errors are meaningful and never include token or response bodies', async () => {
  for (const status of [401, 403, 502]) {
    await assert.rejects(
      fetchErpSites({
        endpoint: 'https://erp.example/',
        token: 'test-server-value',
        fetcher: async () => ({
          ok: false,
          status,
          json: async () => {
            throw new Error('private-body');
          },
        }),
      }),
      (error) =>
        error.message.includes(String(status)) &&
        !error.message.includes('test-server-value') &&
        !error.message.includes('private-body'),
    );
  }
  await assert.rejects(
    fetchErpSites({
      token: 'test-server-value',
      fetcher: async () => {
        throw new Error('test-server-value');
      },
    }),
    (error) => !error.message.includes('test-server-value'),
  );
  await assert.rejects(
    fetchErpSites({
      token: '',
      fetcher: async () => {
        throw new Error('must-not-run');
      },
    }),
    /ERP_SITE_TOKEN/,
  );
  await assert.rejects(
    fetchErpSites({
      token: 'test-server-value',
      fetcher: async () => ({
        ok: true,
        json: async () => {
          throw new Error('private-body');
        },
      }),
    }),
    /некорректный JSON/,
  );
});
