'use client';
import { useEffect, useMemo, useState } from 'react';
import { availableGames } from '../../lib/site-content';
import { catalogGames } from '../../lib/catalog-data';
import { emptyGameSelection, matchesGameFilters } from '../../lib/catalog-filters';
import GamesFilters from './GamesFilters';
import { paginate } from '../../lib/pagination';
import GameCard from './GameCard';
import ListingLead from './ListingLead';
import LocationSelection from './LocationSelection';
import { useSiteLocation } from './SiteLocationProvider';

export default function GamesListing({ site }) {
  const { location, locationId } = useSiteLocation();
  const pool = useMemo(() => availableGames(site, location, catalogGames), [site, location]);
  const [page, setPage] = useState(1);
  const [selection, setSelection] = useState(() =>
    site.source === 'wp-sites' ? emptyGameSelection : { ...emptyGameSelection, zone: ['Арена'] },
  );
  useEffect(() => {
    setPage(1);
    setSelection(
      site.source === 'wp-sites' ? emptyGameSelection : { ...emptyGameSelection, zone: ['Арена'] },
    );
  }, [site.source, locationId]);
  const visible = useMemo(
    () => pool.filter((game) => matchesGameFilters(game, selection)),
    [pool, selection],
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
  if (!location) {
    return (
      <section className="games-listing container" aria-label="Каталог игр">
        <LocationSelection description="Покажем игры выбранного парка." />
      </section>
    );
  }
  return (
    <>
      <section className="games-listing container" aria-label="Каталог игр">
        <GamesFilters
          games={pool}
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
              <svg
                className="games-listing__page-icon"
                width="9"
                height="9"
                viewBox="0 0 9 9"
                fill="none"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M8.61066 0.207402C8.3813 0.0745956 8.07039 8.12689e-08 7.74623 1.09608e-07C7.42206 1.37948e-07 7.11115 0.0745958 6.88179 0.207402L0.357746 3.98969C0.12867 4.12266 -5.77502e-07 4.30291 -5.61072e-07 4.49084C-5.44643e-07 4.67878 0.12867 4.85903 0.357747 4.992L6.88179 8.77429C6.99378 8.84396 7.12883 8.89985 7.27888 8.93861C7.42893 8.97737 7.59092 8.99821 7.75516 8.99989C7.91941 9.00157 8.08256 8.98405 8.23488 8.94839C8.38719 8.91272 8.52556 8.85963 8.64172 8.79229C8.75787 8.72494 8.84945 8.64473 8.91097 8.55642C8.97249 8.46812 9.00271 8.37353 8.99981 8.27831C8.99691 8.18309 8.96096 8.08918 8.8941 8.00219C8.82724 7.9152 8.73085 7.8369 8.61066 7.77198L2.95105 4.49084L8.61066 1.20971C8.83974 1.07674 8.96841 0.896488 8.96841 0.708555C8.96841 0.520622 8.83974 0.340373 8.61066 0.207402Z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  fill="currentColor"
                />
              </svg>
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
              <svg
                className="games-listing__page-icon"
                width="9"
                height="9"
                viewBox="0 0 9 9"
                fill="none"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M0.389337 0.207402C0.618698 0.0745956 0.929608 8.12689e-08 1.25377 1.09608e-07C1.57794 1.37948e-07 1.88885 0.0745958 2.11821 0.207402L8.64225 3.98969C8.87133 4.12266 9 4.30291 9 4.49084C9 4.67878 8.87133 4.85903 8.64225 4.992L2.11821 8.77429C2.00622 8.84396 1.87117 8.89985 1.72112 8.93861C1.57107 8.97737 1.40908 8.99821 1.24484 8.99989C1.08059 9.00157 0.917442 8.98405 0.765124 8.94839C0.612807 8.91272 0.474443 8.85963 0.358285 8.79229C0.242126 8.72494 0.150553 8.64473 0.0890294 8.55642C0.027506 8.46812 -0.00270832 8.37353 0.000189648 8.27831C0.00308761 8.18309 0.0390384 8.08918 0.105897 8.00219C0.172755 7.9152 0.269152 7.8369 0.389336 7.77198L6.04895 4.49084L0.389337 1.20971C0.16026 1.07674 0.0315902 0.896488 0.0315903 0.708555C0.0315903 0.520622 0.160261 0.340373 0.389337 0.207402Z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  fill="currentColor"
                />
              </svg>
            </button>
          </nav>
        )}
      </section>
      <ListingLead site={site} title="Не знаете," accent="что выбрать?" />
    </>
  );
}
