'use client';
import { useMemo, useState } from 'react';
import { catalogGames } from '../../lib/catalog-data';
import { emptyGameSelection, matchesGameFilters } from '../../lib/catalog-filters';
import GamesFilters from './GamesFilters';
import { paginate } from '../../lib/pagination';
import GameCard from './GameCard';
import ListingLead from './ListingLead';

export default function GamesListing({ site }) {
  const [page, setPage] = useState(1);
  const [selection, setSelection] = useState({ ...emptyGameSelection, zone: ['Арена'] });
  const visible = useMemo(
    () => catalogGames.filter((game) => matchesGameFilters(game, selection)),
    [selection],
  );
  const toggle = (key, value) => {
    setPage(1);
    setSelection((current) => ({
      ...current,
      [key]: current[key].includes(value)
        ? current[key].filter((item) => item !== value)
        : [...current[key], value],
    }));
  };
  const clear = (key) => {
    setPage(1);
    setSelection((current) => ({ ...current, [key]: [] }));
  };
  const pagination = paginate(visible, page, 8);
  return (
    <>
      <section className="games-listing container" aria-label="Каталог игр">
        <GamesFilters
          games={catalogGames}
          selection={selection}
          visibleCount={visible.length}
          onToggle={toggle}
          onClear={clear}
          onReset={() => {
            setPage(1);
            setSelection(emptyGameSelection);
          }}
        />
        {visible.length ? (
          <div className="games-listing__grid">
            {pagination.items.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <p className="games-listing__empty">
            По выбранным параметрам игр не найдено. Попробуйте изменить фильтры.
          </p>
        )}
        {visible.length > 0 && (
          <nav className="games-listing__pagination" aria-label="Страницы каталога">
            <button
              className="games-listing__page"
              type="button"
              aria-label="Предыдущая страница"
              disabled={pagination.page === 1}
              onClick={() => setPage(pagination.page - 1)}
            >
              ‹
            </button>
            {Array.from({ length: pagination.pageCount }, (_, index) => index + 1).map((number) => (
              <button
                key={number}
                className="games-listing__page"
                type="button"
                aria-current={number === pagination.page ? 'page' : undefined}
                onClick={() => setPage(number)}
              >
                {number}
              </button>
            ))}
            <button
              className="games-listing__page"
              type="button"
              aria-label="Следующая страница"
              disabled={pagination.page === pagination.pageCount}
              onClick={() => setPage(pagination.page + 1)}
            >
              ›
            </button>
          </nav>
        )}
      </section>
      <ListingLead site={site} title="Не знаете," accent="что выбрать?" />
    </>
  );
}
