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
test('missing content keeps the project notice and explicit empty extras stay unavailable', () => {
  const location = {
    content: {
      reviews: { average: null, total: null, good_place: null },
      info_announcement: null,
      extras: [],
    },
  };
  const site = { ...apiSite, arenas: [location] };
  assert.equal(locationReviews(site, location).good_place, null);
  assert.equal(infoAnnouncement(site, location).url, '/games/');
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
  assert.equal(infoAnnouncement(site, site.arenas[0]).url, '/games/');
});

test('sparse promotions inherit matching project content and empty lists keep the project list', () => {
  const previous = [
    {
      id: 'bonus',
      title: 'Бонусная система WARPOINT',
      type: 'Кэшбэк',
      value: 'до 20%',
      summary: 'Описание проекта',
      terms: 'Условия проекта',
      buttonText: 'Подробнее',
      buttonUrl: 'https://example.test/previous',
      location: 'Старый парк',
    },
  ];
  const location = {
    title: 'Выбранный парк',
    content: {
      promotions: [
        {
          id: 'erp-bonus',
          title: 'Бонусная система WARPOINT',
          benefit_size: 'до 25%',
          type: 'cashback',
          short_description: null,
          detailed_terms: '',
          button_url: 'javascript:alert(1)',
          button_text: '  ',
        },
      ],
    },
  };
  const [promotion] = locationPromotions(location, previous);
  assert.equal(promotion.id, 'erp-bonus');
  assert.equal(promotion.value, 'до 25%');
  assert.equal(promotion.summary, 'Описание проекта');
  assert.equal(promotion.terms, 'Условия проекта');
  assert.equal(promotion.buttonText, 'Подробнее');
  assert.equal(promotion.buttonUrl, 'https://example.test/previous');
  assert.equal(promotion.location, 'Выбранный парк');
  assert.equal(locationPromotions({ content: { promotions: [] } }, previous), previous);
  assert.equal(locationPromotions({ content: {} }, previous), previous);
});

test('announcement records merge by identity and preserve a false request button flag', () => {
  const previous = [
    {
      id: 'launch',
      title: 'Турнир',
      category: 'Игра',
      description: 'Анонс проекта',
      detailedDescription: 'Подробности проекта',
      image: '/img/gallery/1.jpg',
      showRequestButton: true,
    },
  ];
  const [event] = locationAnnouncements(
    {
      title: 'Парк',
      content: {
        announcements: [
          {
            id: 'launch',
            title: 'Название ERP',
            starts_at: '2026-12-01T12:00:00Z',
            label: null,
            short_description: null,
            detailed_description: 'Подробности ERP',
            image: null,
            city: 'Екатеринбург',
            phone: '+7 343 123-45-67',
            show_request_button: false,
          },
        ],
      },
    },
    'Asia/Yekaterinburg',
    previous,
  );
  assert.equal(event.title, 'Название ERP');
  assert.equal(event.description, 'Анонс проекта');
  assert.equal(event.category, 'Игра');
  assert.equal(event.detailedDescription, 'Подробности ERP');
  assert.equal(event.image, '/img/gallery/1.jpg');
  assert.equal(event.time, '17:00');
  assert.equal(event.showRequestButton, false);
  assert.equal(event.city, 'Екатеринбург');
  assert.equal(event.phone, '+7 343 123-45-67');
  assert.equal(
    locationAnnouncements({ content: { announcements: [] } }, 'UTC', previous),
    previous,
  );
});

test('review fields fall back independently and meaningful zero values stay intact', () => {
  const fallback = {
    average: 5,
    total: 20,
    good_place: { rating: 5, reviews_count: 2048 },
    platforms: [
      {
        code: 'yandex',
        title: 'Яндекс',
        url: 'https://example.test/reviews',
        icon: '/img/ymaps.svg',
        count: 99,
      },
    ],
  };
  const location = {
    content: {
      reviews: {
        average: 0,
        total: null,
        good_place: { rating: null, reviews_count: 0 },
        platforms: [{ code: 'yandex', title: null, url: null, icon: null, count: 0 }],
      },
    },
  };
  const reviews = locationReviews(apiSite, location, fallback);
  assert.equal(reviews.average, 0);
  assert.equal(reviews.total, 20);
  assert.equal(reviews.good_place.rating, 5);
  assert.equal(reviews.good_place.reviews_count, 0);
  assert.equal(reviews.platforms[0].count, 0);
  assert.equal(reviews.platforms[0].url, 'https://example.test/reviews');
  assert.equal(reviews.platforms[0].icon, '/img/ymaps.svg');
  assert.equal(locationReviews(apiSite, { content: {} }, fallback).average, 5);
});

test('a sparse notice uses ERP image with existing project copy and link', () => {
  const location = {
    content: {
      info_announcement: { image: 'https://example.test/notice.jpg', description: null, url: null },
    },
  };
  const item = infoAnnouncement({ ...apiSite, arenas: [location] }, location);
  assert.equal(item.image, 'https://example.test/notice.jpg');
  assert.equal(item.url, '/games/');
  assert.match(item.description, /WARPOINT/);
});

test('ERP game titles take priority and absent availability keeps the project catalog', () => {
  const catalog = [
    {
      id: 'snow-battle',
      title: 'Снежная битва',
      zone: 'Арена',
      tags: ['Арена'],
      catalogCover: 'snow.jpg',
    },
  ];
  const selected = {
    content: {
      game_categories: [
        { code: 'arena', games: [{ code: 'snow-battle', title: 'Новое название' }] },
      ],
    },
  };
  assert.equal(availableGames(apiSite, selected, catalog)[0].title, 'Новое название');
  assert.equal(availableGames(apiSite, { content: {} }, catalog), catalog);
  assert.deepEqual(availableGames(apiSite, { content: { game_categories: [] } }, catalog), []);
  assert.equal(locationExtras(apiSite, { content: {} }), null);
  assert.deepEqual(locationExtras(apiSite, { content: { extras: [] } }), []);
});
