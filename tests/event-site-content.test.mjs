import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { eventAddons, eventQuizExtras } from '../lib/event-addons.js';
import {
  additionalEventChoices,
  eventContent,
  eventParameters,
  eventSlides,
  programExtras,
} from '../lib/event-site-content.js';

const location = (extras) => ({ content: { extras } });
const apiSite = (...arenas) => ({ source: 'wp-sites', arenas });

test('legacy keeps the approved event images and quiz services', () => {
  const site = { arenas: [] };
  assert.equal(eventSlides(site, null, 'corporate'), eventAddons.corporate);
  assert.equal(programExtras(site, null), eventQuizExtras);
});

test('explicit empty services remain empty and missing content keeps project fallbacks', () => {
  const empty = location([]);
  assert.deepEqual(eventSlides(apiSite(empty), empty, 'birthday'), []);
  assert.deepEqual(programExtras(apiSite(empty), empty), []);
  const missing = { content: {} };
  assert.equal(eventSlides(apiSite(missing), missing, 'birthday'), eventAddons.birthday);
  assert.equal(programExtras(apiSite(missing), missing), eventQuizExtras);
});

test('API services use approved images in source order and unknown images are omitted', () => {
  const arena = location([
    { code: 'mirror_man_show', title: 'Шоу «Зеркальный человек»', sort: 80 },
    { code: 'master_class', title: 'Мастер-класс', sort: 10 },
    { code: 'unknown_service', title: 'Неизвестная услуга', sort: 20 },
    { code: 'storymaker', title: 'Сторисмейкер', sort: 30 },
    { code: 'pinata', title: 'Пиньята', sort: 60 },
    { code: 'dj_and_host', title: 'DJ и ведущий', sort: 70 },
  ]);
  const site = apiSite(arena);
  const slides = eventSlides(site, arena, 'birthday');
  assert.deepEqual(
    slides.map((slide) => slide.id),
    ['master_class', 'storymaker', 'pinata', 'dj_and_host', 'mirror_man_show'],
  );
  assert.equal(slides[0].title, 'Мастер-класс');
  for (const slide of slides) {
    assert.ok(existsSync(fileURLToPath(new URL('../public' + slide.image, import.meta.url))));
  }
  assert.equal(programExtras(site, arena).length, 6);
});

test('adult event slides never borrow children pictures', () => {
  const arena = location([
    { code: 'master_class', title: 'Мастер-класс' },
    { code: 'pinata', title: 'Пиньята' },
    { code: 'mirror_man_show', title: 'Шоу «Зеркальный человек»' },
    { code: 'dj_and_host', title: 'DJ и ведущий' },
    { code: 'storymaker', title: 'Сторисмейкер' },
  ]);
  const site = apiSite(arena);
  for (const eventType of ['corporate', 'adult-birthday']) {
    const slides = eventSlides(site, arena, eventType);
    assert.deepEqual(
      slides.map((slide) => slide.id),
      ['dj_and_host', 'storymaker'],
    );
    assert.ok(slides.every((slide) => !slide.image.includes('/children-')));
  }
});

test('city union is deduplicated and choosing a park removes services unavailable there', () => {
  const first = location([{ code: 'pinata', title: 'Пиньята' }]);
  const second = location([
    { code: 'photographer', title: 'Фотограф' },
    { code: 'holiday_cake', title: 'Праздничный торт' },
  ]);
  const site = apiSite(first, second);
  assert.equal(programExtras(site, null).length, 3);
  assert.deepEqual(programExtras(site, first), [{ value: 'pinata', title: 'Пиньята' }]);
  assert.deepEqual(
    eventSlides(site, second, 'birthday').map((slide) => slide.id),
    ['photographer', 'holiday_cake'],
  );
});

test('event content follows selected park and otherwise the site domain branch', () => {
  const first = {
    slug: 'first',
    content: {
      events: [
        {
          code: 'kids_bday',
          title: 'Первый праздник',
          fields: [
            { code: 'age_restrictions', value: '8' },
            { code: 'capacity', value: 20 },
          ],
        },
      ],
    },
  };
  const second = {
    slug: 'second',
    content: { events: [{ code: 'kids_bday', title: 'Второй праздник', fields: [] }] },
  };
  const site = { ...apiSite(first, second), slug: 'second' };
  assert.equal(eventContent(site, null, 'birthday').title, 'Второй праздник');
  const content = eventContent(site, first, 'birthday');
  assert.equal(content.title, 'Первый праздник');
  assert.deepEqual(eventParameters(content), [
    { id: 'age', value: '8+' },
    { id: 'capacity', value: 'до 20 гостей' },
  ]);
  assert.equal(eventContent(site, second, 'corporate'), null);
  assert.equal(eventContent({ arenas: [] }, null, 'birthday'), null);
});

test('missing event fields preserve local values while zero remains meaningful', () => {
  assert.deepEqual(eventParameters(null, { age: '6+', capacity: 'до 30 гостей' }), [
    { id: 'age', value: '6+' },
    { id: 'capacity', value: 'до 30 гостей' },
  ]);
  assert.deepEqual(eventParameters({ age: '0', capacity: '0' }), [
    { id: 'age', value: '0+' },
    { id: 'capacity', value: 'до 0 гостей' },
  ]);
});

test('ERP extra images and descriptions override individual project fields safely', () => {
  const arena = location([
    {
      code: 'master_class',
      title: 'Новый мастер-класс',
      image: 'https://example.com/photo.jpg',
      description: 'Описание ERP',
    },
  ]);
  const slide = eventSlides(apiSite(arena), arena, 'birthday')[0];
  assert.equal(slide.image, 'https://example.com/photo.jpg');
  assert.equal(slide.description, 'Описание ERP');
  assert.equal(slide.title, 'Новый мастер-класс');
  const unsafe = location([
    {
      code: 'master_class',
      title: 'Мастер-класс',
      image: 'javascript:alert(1)',
      description: '   ',
    },
  ]);
  const fallback = eventSlides(apiSite(unsafe), unsafe, 'birthday')[0];
  assert.ok(fallback.image.startsWith('/img/'));
  assert.ok(fallback.description.length);
});

test('ERP-only events become calculator choices without fabricated pages or photos', () => {
  const arena = {
    content: {
      events: [
        { code: 'kids_bday', title: 'Детский ДР' },
        { code: 'new_year', title: 'Новый год', sort: 50 },
      ],
    },
  };
  assert.deepEqual(additionalEventChoices(apiSite(arena), arena), [
    { value: 'new_year', title: 'Новый год' },
  ]);
});
