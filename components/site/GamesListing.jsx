'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { catalogGames } from '../../lib/catalog-data';
import ListingLead from './ListingLead';

const filters = [
  { key: 'zone', label: 'Игровая зона' },
  { key: 'genre', label: 'Жанр' },
  { key: 'age', label: 'Возраст' },
  { key: 'players', label: 'Количество игроков' },
];
const empty = { zone: [], genre: [], age: [], players: [] };
const zoneOrder = ['Арена', 'ВР-станция', 'Симуляторы'];

export default function GamesListing({ site }) {
  const [selection, setSelection] = useState({ ...empty, zone: ['Арена'] });
  const [openFilter, setOpenFilter] = useState(null);
  const filtersRef = useRef(null);
  const options = useMemo(() => Object.fromEntries(filters.map(({ key }) => [
    key,
    key === 'zone'
      ? [...new Set([...zoneOrder, ...catalogGames.map((game) => game.zone)])]
      : [...new Set(catalogGames.map((game) => game[key]))],
  ])), []);
  const matches = (game, values, excludedKey = null) => filters.every(({ key }) =>
    key === excludedKey || values[key].length === 0 || values[key].includes(game[key]));
  const visible = useMemo(() => catalogGames.filter((game) => matches(game, selection)), [selection]);
  const toggle = (key, value) => setSelection((current) => ({
    ...current,
    [key]: current[key].includes(value)
      ? current[key].filter((item) => item !== value)
      : [...current[key], value],
  }));
  const clear = (key) => setSelection((current) => ({ ...current, [key]: [] }));

  useEffect(() => {
    if (!openFilter) return;
    const onPointerDown = (event) => {
      if (!filtersRef.current?.contains(event.target)) setOpenFilter(null);
    };
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      setOpenFilter(null);
      filtersRef.current?.querySelector(`[data-filter-trigger="${openFilter}"]`)?.focus();
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [openFilter]);

  return <>
    <section className="games-listing container" aria-label="Каталог игр">
      <div className="games-listing__toolbar">
        <div className="games-listing__filters" ref={filtersRef}>
          {filters.map(({ key, label }) => <div className="games-listing__filter" key={key}>
            <button
              className={`games-listing__filter-trigger${selection[key].length || openFilter === key ? ' is-active' : ''}`}
              type="button"
              data-filter-trigger={key}
              aria-expanded={openFilter === key}
              aria-controls={`games-filter-${key}`}
              onClick={() => setOpenFilter((current) => current === key ? null : key)}
            >{label}<span className="games-listing__filter-chevron" aria-hidden="true" /></button>
            {openFilter === key && <div className="games-listing__filter-panel" id={`games-filter-${key}`} role="group" aria-label={label}>
              {options[key].map((value) => {
                const count = catalogGames.filter((game) => game[key] === value && matches(game, selection, key)).length;
                const checked = selection[key].includes(value);
                return <label className={`games-listing__filter-option${count === 0 && !checked ? ' is-disabled' : ''}`} key={value}>
                  <input type="checkbox" checked={checked} disabled={count === 0 && !checked} onChange={() => toggle(key, value)} />
                  <span className="games-listing__filter-option-label">{value}</span>
                  <span className="games-listing__filter-count">{count}</span>
                </label>;
              })}
              <button className="games-listing__filter-clear" type="button" onClick={() => clear(key)} disabled={!selection[key].length}>Очистить</button>
            </div>}
          </div>)}
        </div>
        <div className="games-listing__result">
          <button type="button" onClick={() => { setSelection(empty); setOpenFilter(null); }} disabled={filters.every(({ key }) => !selection[key].length)}>↻ Сбросить</button>
          <span>Найдено {visible.length} {visible.length === 1 ? 'игра' : visible.length < 5 ? 'игры' : 'игр'}</span>
        </div>
      </div>
      {visible.length ? <div className="games-listing__grid">
        {visible.map((game) => <article className="games-listing__card" key={game.id}>
          <img src={`/${game.cover}`} alt="" loading="lazy" />
          <div className="games-listing__tags" aria-label="Параметры игры">
            <span>{game.zone}</span><span>{game.genre}</span><span>{game.players}</span><span>{game.age}</span>
          </div>
          <div className="games-listing__card-copy"><h2>{game.title}</h2><p>{game.summary}</p></div>
          <button className="games-listing__open" type="button" data-game-open={game.id} aria-label={`Подробнее об игре «${game.title}»`} aria-haspopup="dialog" aria-controls="game-modal" />
        </article>)}
      </div> : <p className="games-listing__empty">По выбранным параметрам игр не найдено. Попробуйте изменить фильтры.</p>}
    </section>
    <ListingLead site={site} title="Не знаете," accent="что выбрать?" />
  </>;
}
