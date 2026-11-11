import test from 'node:test';
import assert from 'node:assert/strict';
import { mapView } from '../lib/map-view.js';

const points = [
  { coordinates: [56.832969, 60.582374] },
  { coordinates: [56.916713, 60.613258] },
  { coordinates: [56.817183, 60.538536] },
];
test('the city view contains every location on desktop and mobile', () => {
  for (const [width, height] of [
    [320, 360],
    [900, 760],
  ]) {
    const view = mapView(points, width, height);
    assert.equal(view.pins.length, 3);
    for (const pin of view.pins) {
      assert.ok(pin.left >= 40 && pin.left <= width - 40);
      assert.ok(pin.top >= 90 && pin.top <= height - 40);
    }
  }
});
test('an individual map keeps its geographic anchor in the center', () => {
  const view = mapView(points.slice(0, 1), 600, 400);
  assert.equal(view.zoom, 16);
  assert.deepEqual(view.pins, [{ left: 300, top: 200 }]);
  assert.ok(Math.abs(view.center[0] - points[0].coordinates[0]) < 0.000001);
  assert.equal(mapView([]), null);
});
