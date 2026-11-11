import test from 'node:test';
import assert from 'node:assert/strict';
import { paginate } from '../lib/pagination.js';

test('eight items per page without losing or repeating entries', () => {
  const entries = Array.from({ length: 19 }, (_, index) => index);
  const pages = [1, 2, 3].map((page) => paginate(entries, page));
  assert.deepEqual(
    pages.map((page) => page.items.length),
    [8, 8, 3],
  );
  assert.deepEqual(
    pages.flatMap((page) => page.items),
    entries,
  );
});
test('filter results clamp the current page; empty results remain valid', () => {
  assert.deepEqual(paginate([1, 2], 3), { page: 1, pageCount: 1, items: [1, 2] });
  assert.deepEqual(paginate([], 2), { page: 1, pageCount: 1, items: [] });
});
