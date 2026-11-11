import test from 'node:test';
import assert from 'node:assert/strict';
import { locationCountLabel, zoneAvailableAt, zoneLocations } from '../lib/zones.js';

const site = { arenas: [{ title: 'Алатырь' }, { title: 'Веер Молл' }, { title: 'Радуга Парк' }] };
test('city-only view permits browsing every zone without selecting a location', () => {
  assert.equal(zoneAvailableAt(null, 'extreme'), true);
  assert.equal(zoneLocations(site, 'arena').length, 3);
});
test('demo unavailable zones can be resolved by choosing a listed location', () => {
  assert.equal(zoneAvailableAt(site.arenas[2], 'simulators'), false);
  const alternatives = zoneLocations(site, 'simulators');
  assert.deepEqual(
    alternatives.map((item) => item.index),
    [0, 1],
  );
  assert.ok(alternatives.every((item) => zoneAvailableAt(item, 'simulators')));
});
test('explicit inventory overrides the visual fixture and supports an empty inventory', () => {
  assert.equal(zoneAvailableAt({ title: 'Алатырь', zoneIds: [] }, 'arena'), false);
  assert.equal(zoneAvailableAt({ title: 'Радуга', zoneIds: ['extreme'] }, 'extreme'), true);
});
test('location label uses Russian singular and plural endings', () => {
  assert.equal(locationCountLabel(1), 'Доступно в 1 локации');
  assert.equal(locationCountLabel(11), 'Доступно в 11 локациях');
  assert.equal(locationCountLabel(21), 'Доступно в 21 локации');
});
