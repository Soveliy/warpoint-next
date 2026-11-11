export const gameFilters = [
  { key: 'zone', label: 'Игровая зона' },
  { key: 'genre', label: 'Жанр' },
  { key: 'age', label: 'Возраст' },
  { key: 'players', label: 'Количество игроков' },
];

export const emptyGameSelection = { zone: [], genre: [], age: [], players: [] };

export const gameZoneOrder = ['Арена', 'ВР-станция', 'Симуляторы'];

export function matchesGameFilters(game, selection, excludedKey = null) {
  return gameFilters.every(
    ({ key }) =>
      key === excludedKey || selection[key].length === 0 || selection[key].includes(game[key]),
  );
}
