'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { gameFilters, gameZoneOrder, matchesGameFilters } from '../../lib/catalog-filters';

export default function GamesFilters({
  games,
  selection,
  visibleCount,
  onToggle,
  onClear,
  onReset,
}) {
  const [openFilter, setOpenFilter] = useState(null);
  const filtersRef = useRef(null);
  const options = useMemo(
    () =>
      Object.fromEntries(
        gameFilters.map(({ key }) => [
          key,
          key === 'zone'
            ? [...new Set([...gameZoneOrder, ...games.map((game) => game.zone)])]
            : [...new Set(games.map((game) => game[key]))],
        ]),
      ),
    [games],
  );

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
  return (
    <div className="games-listing__toolbar">
      <div className="games-listing__filters" ref={filtersRef}>
        {gameFilters.map(({ key, label }) => (
          <div className="games-listing__filter" key={key}>
            <button
              className={`games-listing__filter-trigger${selection[key].length || openFilter === key ? ' games-listing__filter-trigger--active' : ''}`}
              type="button"
              data-filter-trigger={key}
              aria-expanded={openFilter === key}
              aria-controls={`games-filter-${key}`}
              onClick={() => setOpenFilter((current) => (current === key ? null : key))}
            >
              {label}
              <span className="games-listing__filter-chevron" aria-hidden="true" />
            </button>
            {openFilter === key && (
              <div
                className="games-listing__filter-panel"
                id={`games-filter-${key}`}
                role="group"
                aria-label={label}
              >
                {options[key].map((value) => {
                  const count = games.filter(
                    (game) => game[key] === value && matchesGameFilters(game, selection, key),
                  ).length;
                  const checked = selection[key].includes(value);
                  return (
                    <label
                      className={`games-listing__filter-option${count === 0 && !checked ? ' games-listing__filter-option--disabled' : ''}`}
                      key={value}
                    >
                      <input
                        className="games-listing__filter-checkbox"
                        type="checkbox"
                        checked={checked}
                        disabled={count === 0 && !checked}
                        onChange={() => onToggle(key, value)}
                      />
                      <span className="games-listing__filter-option-label">{value}</span>
                      <span className="games-listing__filter-count">{count}</span>
                    </label>
                  );
                })}
                <button
                  className="games-listing__filter-clear"
                  type="button"
                  onClick={() => onClear(key)}
                  disabled={!selection[key].length}
                >
                  Очистить
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="games-listing__result">
        <button
          className="games-listing__reset"
          type="button"
          onClick={() => {
            onReset();
            setOpenFilter(null);
          }}
          disabled={gameFilters.every(({ key }) => !selection[key].length)}
        >
          <svg
            className="games-listing__reset-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M21.375 4.50001V9.00001C21.375 9.29838 21.2565 9.58452 21.0455 9.7955C20.8345 10.0065 20.5484 10.125 20.25 10.125H15.75C15.4516 10.125 15.1655 10.0065 14.9545 9.7955C14.7435 9.58452 14.625 9.29838 14.625 9.00001C14.625 8.70164 14.7435 8.41549 14.9545 8.20451C15.1655 7.99353 15.4516 7.87501 15.75 7.87501H17.5312L16.8 7.14376C15.4761 5.81327 13.6782 5.06269 11.8012 5.05688H11.7609C9.90075 5.05281 8.11375 5.78128 6.78656 7.08469C6.57323 7.2933 6.28576 7.40862 5.9874 7.40528C5.68905 7.40194 5.40423 7.28021 5.19562 7.06688C4.98702 6.85355 4.8717 6.56608 4.87504 6.26772C4.87838 5.96937 5.0001 5.68455 5.21344 5.47594C6.96114 3.75981 9.31435 2.80094 11.7638 2.80688H11.8125C14.2835 2.81362 16.6507 3.80131 18.3937 5.55282L19.125 6.28126V4.50001C19.125 4.20164 19.2435 3.91549 19.4545 3.70451C19.6655 3.49353 19.9516 3.37501 20.25 3.37501C20.5484 3.37501 20.8345 3.49353 21.0455 3.70451C21.2565 3.91549 21.375 4.20164 21.375 4.50001ZM17.2134 16.9153C15.8856 18.2194 14.0974 18.9479 12.2362 18.9431H12.1959C10.319 18.9373 8.52111 18.1867 7.19719 16.8563L6.46875 16.125H8.25C8.54837 16.125 8.83452 16.0065 9.0455 15.7955C9.25647 15.5845 9.375 15.2984 9.375 15C9.375 14.7016 9.25647 14.4155 9.0455 14.2045C8.83452 13.9935 8.54837 13.875 8.25 13.875H3.75C3.45163 13.875 3.16548 13.9935 2.9545 14.2045C2.74353 14.4155 2.625 14.7016 2.625 15V19.5C2.625 19.7984 2.74353 20.0845 2.9545 20.2955C3.16548 20.5065 3.45163 20.625 3.75 20.625C4.04837 20.625 4.33452 20.5065 4.5455 20.2955C4.75647 20.0845 4.875 19.7984 4.875 19.5V17.7188L5.60625 18.45C7.34974 20.2005 9.71689 21.1871 12.1875 21.1931H12.24C14.6894 21.1991 17.0426 20.2402 18.7903 18.5241C18.8959 18.4208 18.9802 18.2977 19.0383 18.1618C19.0963 18.026 19.1271 17.88 19.1287 17.7323C19.1304 17.5846 19.1029 17.4379 19.0479 17.3008C18.9929 17.1637 18.9114 17.0388 18.8081 16.9331C18.7048 16.8275 18.5817 16.7432 18.4459 16.6852C18.31 16.6271 18.1641 16.5964 18.0163 16.5947C17.8686 16.5931 17.722 16.6205 17.5849 16.6755C17.4478 16.7305 17.3228 16.812 17.2172 16.9153H17.2134Z"
              fill="currentColor"
            />
          </svg>
          Сбросить
        </button>
        <span>
          Найдено {visibleCount} {visibleCount === 1 ? 'игра' : visibleCount < 5 ? 'игры' : 'игр'}
        </span>
      </div>
    </div>
  );
}
