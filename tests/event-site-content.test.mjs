import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { eventAddons, eventQuizExtras } from '../lib/event-addons.js';
import { eventSlides, programExtras } from '../lib/event-site-content.js';

const location = (extras) => ({ content: { extras } });
const apiSite = (...arenas) => ({ source: 'wp-sites', arenas });

test('legacy keeps the approved event images and quiz services', () => {
  const site = { arenas: [] };
  assert.equal(eventSlides(site, null, 'corporate'), eventAddons.corporate);
  assert.equal(programExtras(site, null), eventQuizExtras);
});

test('API empty services remain empty, including parks without extras', () => {
  const empty = location([]);
  const missing = { content: {} };
  for (const arena of [empty, missing]) {
    const site = apiSite(arena);
    assert.deepEqual(eventSlides(site, arena, 'birthday'), []);
    assert.deepEqual(programExtras(site, arena), []);
  }
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
