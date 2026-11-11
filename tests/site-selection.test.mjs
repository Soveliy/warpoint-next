import test from 'node:test';
import assert from 'node:assert/strict';
import { selectionCookie, selectionFromCookie } from '../lib/location-selection.js';

const site = {
  hostname: 'example.test',
  city: 'Город',
  arenas: [
    { title: 'Первый парк', address: 'Адрес 1' },
    { title: 'Второй парк', address: 'Адрес 2' },
  ],
};
test('no automatic location, including malformed cookies', () => {
  for (const cookie of ['', 'warpoint-location=broken', 'warpoint-location=%zz'])
    assert.equal(selectionFromCookie(site, cookie), null);
});
test('selection survives navigation and unrelated cookies', () => {
  const cookie = selectionCookie(site, 1, true);
  assert.equal(selectionFromCookie(site, 'other=value; ' + cookie), 1);
  assert.ok(cookie.endsWith('; Path=/; Max-Age=15552000; SameSite=Lax; Secure'));
});
test('selection belongs to its city and hostname', () => {
  const cookie = selectionCookie(site, 1);
  assert.equal(selectionFromCookie({ ...site, hostname: 'another.test' }, cookie), null);
  assert.equal(selectionFromCookie({ ...site, city: 'Другой город' }, cookie), null);
});
test('ERP reordering retains the chosen arena, removal invalidates it', () => {
  const cookie = selectionCookie(site, 1);
  assert.equal(selectionFromCookie({ ...site, arenas: [...site.arenas].reverse() }, cookie), 0);
  assert.equal(selectionFromCookie({ ...site, arenas: [site.arenas[0]] }, cookie), null);
});
test('invalid indices are not persisted', () => {
  assert.equal(selectionCookie(site, -1), null);
  assert.equal(selectionCookie(site, 99), null);
});

test('stable arena UUID survives renaming and reordering, without matching a replacement park', () => {
  const identified = {
    ...site,
    arenas: site.arenas.map((arena, index) => ({ ...arena, id: 'stable-' + index })),
  };
  const cookie = selectionCookie(identified, 0);
  const renamed = {
    ...identified,
    arenas: [
      { ...identified.arenas[1] },
      { ...identified.arenas[0], title: 'Новое имя', address: 'Новый адрес' },
    ],
  };
  assert.equal(selectionFromCookie(renamed, cookie), 1);
  assert.equal(
    selectionFromCookie(
      { ...identified, arenas: [{ ...identified.arenas[0], id: 'replacement' }] },
      cookie,
    ),
    null,
  );
  assert.equal(selectionFromCookie(site, cookie), 0);
});

test('old title and address cookies remain valid when UUIDs are introduced', () => {
  const cookie = selectionCookie(site, 1);
  const identified = {
    ...site,
    arenas: site.arenas.map((arena, index) => ({ ...arena, id: 'stable-' + index })),
  };
  assert.equal(selectionFromCookie(identified, cookie), 1);
});
