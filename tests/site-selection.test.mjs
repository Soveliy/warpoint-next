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
