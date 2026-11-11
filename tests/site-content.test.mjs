import test from 'node:test';
import assert from 'node:assert/strict';
import {
  availableGames,
  cityTimeZone,
  infoAnnouncement,
  locationAnnouncements,
  locationExtras,
  locationPromotions,
  locationReviews,
  publicUrl,
} from '../lib/site-content.js';

const apiSite = { source: 'wp-sites', arenas: [] };
test('announcements use the city timezone across midnight and preserve the source instant', () => {
  const location = {
    title: 'Парк',
    content: {
      announcements: [
        {
          id: 'event',
          title: 'Турнир',
          starts_at: '2026-12-01T22:30:00Z',
          show_request_button: false,
          image: null,
        },
      ],
    },
  };
  const [event] = locationAnnouncements(location, 'Asia/Yekaterinburg');
  assert.equal(event.date, '2026-12-02');
  assert.equal(event.time, '03:30');
  assert.equal(event.day, '2');
  assert.equal(event.month, 'декабря');
  assert.equal(event.startsAt, '2026-12-01T22:30:00.000Z');
  assert.equal(event.showRequestButton, false);
  assert.equal(event.image, null);
  assert.equal(cityTimeZone('not-a-zone'), 'UTC');
  assert.equal(cityTimeZone(null), 'UTC');
  assert.deepEqual(
    locationAnnouncements({ content: { announcements: [{ starts_at: 'bad' }] } }),
    [],
  );
});
test('promotion nulls and unsafe links do not create invented content or executable URLs', () => {
  const items = locationPromotions({
    title: 'Парк',
    content: {
      promotions: [
        {
          id: 'promo',
          type: 'cashback',
          sort: 1,
          benefit_size: null,
          short_description: null,
          detailed_terms: 'Полные условия',
          button_url: 'javascript:alert(1)',
        },
      ],
    },
  });
  assert.equal(items[0].value, '');
  assert.equal(items[0].summary, '');
  assert.equal(items[0].terms, 'Полные условия');
  assert.equal(items[0].buttonUrl, null);
  assert.equal(publicUrl('https://user:password@example.test/'), null);
  assert.equal(publicUrl('https://example.test/promo'), 'https://example.test/promo');
});
test('empty games are authoritative and only selected games with confirmed covers are shown', () => {
  const catalog = [
    {
      id: 'warpoint-arena',
      title: 'WARPOINT Arena',
      zone: 'Арена',
      tags: ['Арена', '12+'],
      catalogCover: 'arena.jpg',
    },
    {
      id: 'snow-battle',
      title: 'Снежная битва',
      zone: 'Арена',
      tags: ['Арена'],
      catalogCover: 'snow.jpg',
    },
    { id: 'moss', title: 'Moss', zone: 'ВР-станция', tags: [], catalogCover: null },
  ];
  const first = {
    content: {
      game_categories: [
        {
          code: 'arena',
          games: [
            { code: 'The_Snow_Battle', title: 'Снежная битва', sort: 2 },
            { code: 'WARPOINT_arena', title: 'Арена', sort: 1 },
            { code: 'moss', title: 'Moss', sort: 3 },
            { code: 'unknown', title: 'Unknown game', sort: 4 },
          ],
        },
      ],
    },
  };
  const empty = { content: { game_categories: [] } };
  const site = { ...apiSite, arenas: [first, empty] };
  assert.deepEqual(
    availableGames(site, first, catalog).map((game) => game.id),
    ['warpoint-arena', 'snow-battle'],
  );
  assert.deepEqual(availableGames(site, empty, catalog), []);
  assert.equal(availableGames(site, null, catalog).length, 2);
  assert.equal(availableGames({ arenas: [] }, null, catalog), catalog);
});
test('missing API reviews and announcements stay empty while legacy has its existing notice', () => {
  const location = {
    content: {
      reviews: { average: null, total: null, good_place: null },
      info_announcement: null,
      extras: [],
    },
  };
  const site = { ...apiSite, arenas: [location] };
  assert.equal(locationReviews(site, location).good_place, null);
  assert.equal(infoAnnouncement(site, location), null);
  assert.deepEqual(locationExtras(site, location), []);
  assert.equal(locationReviews({ arenas: [] }, null), undefined);
  assert.equal(infoAnnouncement({ arenas: [] }, null).url, '/games/');
});

test('an empty nullable notice does not hide another published city notice', () => {
  const site = {
    source: 'wp-sites',
    arenas: [
      { content: { info_announcement: { description: null } } },
      { content: { info_announcement: { description: 'Второй парк', image: null, url: null } } },
    ],
  };
  assert.equal(infoAnnouncement(site, null).description, 'Второй парк');
  assert.equal(infoAnnouncement(site, site.arenas[0]), null);
});
