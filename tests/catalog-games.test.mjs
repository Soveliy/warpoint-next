import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { games } from '../lib/games.js';
import { catalogGames } from '../lib/catalog-data.js';
import {
  emptyGameSelection,
  gameFilterValues,
  matchesGameFilters,
} from '../lib/catalog-filters.js';
import { paginate } from '../lib/pagination.js';

const selection = (overrides = {}) => ({ ...emptyGameSelection, ...overrides });

test('only documented games with supplied images are published', () => {
  assert.equal(games.length, 24);
  assert.equal(new Set(games.map((game) => game.id)).size, 24);
  assert.equal(games.filter((game) => game.zone === 'Арена').length, 7);
  assert.equal(games.filter((game) => game.zone === 'ВР-станция').length, 17);
  for (const id of ['fruit-ninja-vr', 'richies-plank-experience', 'moss']) {
    assert.equal(
      games.some((game) => game.id === id),
      false,
    );
  }
  for (const game of games) {
    assert.ok(game.summary && game.description.length);
    assert.ok(Array.isArray(game.images));
    for (const image of [game.catalogCover, game.cover, ...game.images]) {
      assert.ok(existsSync(fileURLToPath(new URL('../public/' + image, import.meta.url))), image);
    }
    assert.notEqual(game.trailer?.includes('dQw4w9WgXc'), true);
  }
});

test('each genre of a game matches independently, alongside other filters', () => {
  const alyx = games.find((game) => game.id === 'half-life-alyx');
  assert.deepEqual(gameFilterValues(alyx, 'genre'), ['Экшен', 'Стрелялка']);
  assert.equal(matchesGameFilters(alyx, selection({ genre: ['Экшен'] })), true);
  assert.equal(matchesGameFilters(alyx, selection({ genre: ['Стрелялка'] })), true);
  assert.equal(matchesGameFilters(alyx, selection({ genre: ['Квест', 'Экшен'] })), true);
  assert.equal(matchesGameFilters(alyx, selection({ genre: ['Квест'] })), false);
  assert.equal(matchesGameFilters(alyx, selection({ genre: ['Экшен'], zone: ['Арена'] })), false);
});

test('facet counts can exclude their own selection without dropping other filters', () => {
  const alyx = games.find((game) => game.id === 'half-life-alyx');
  const filters = selection({ genre: ['Квест'], zone: ['ВР-станция'], age: ['16+'] });
  assert.equal(matchesGameFilters(alyx, filters, 'genre'), true);
  assert.equal(matchesGameFilters(alyx, { ...filters, age: ['8+'] }, 'genre'), false);
});

test('portrait catalog covers stay separate from modal artwork and paginate eight per page', () => {
  const beatSaber = catalogGames.find((game) => game.id === 'beat-saber');
  assert.equal(beatSaber.zone, 'ВР-станция');
  assert.equal(beatSaber.genre, 'Казуал');
  assert.equal(beatSaber.players, '1 чел');
  assert.match(beatSaber.cover, /\/cover\.webp$/);
  const pages = [1, 2, 3].map((page) => paginate(catalogGames, page));
  assert.deepEqual(
    pages.map((page) => page.items.length),
    [8, 8, 8],
  );
  assert.deepEqual(
    pages.flatMap((page) => page.items.map((game) => game.id)),
    games.map((game) => game.id),
  );
});
