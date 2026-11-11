export const gameFilters = [
  { key: 'zone', label: 'Игровая зона' },
  { key: 'genre', label: 'Жанр' },
  { key: 'age', label: 'Возраст' },
  { key: 'players', label: 'Количество игроков' },
];

export const emptyGameSelection = { zone: [], genre: [], age: [], players: [] };

export const gameZoneOrder = ['Арена', 'ВР-станция', 'Симуляторы'];

export function gameFilterValues(game, key) {
  if (key === 'genre')
    return (
      game.genres ||
      String(game.genre || '')
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean)
    );
  return game[key] ? [game[key]] : [];
}

export function matchesGameFilters(game, selection, excludedKey = null) {
  return gameFilters.every(
    ({ key }) =>
      key === excludedKey ||
      selection[key].length === 0 ||
      gameFilterValues(game, key).some((value) => selection[key].includes(value)),
  );
}
