'use client';

import { useMemo, useState } from 'react';

export default function SiteDirectory({ currentCity, sites }) {
  const [query, setQuery] = useState('');
  const visible = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase('ru-RU').replaceAll('ё', 'е');
    return sites.filter((site) =>
      `${site.city} ${site.country}`
        .toLocaleLowerCase('ru-RU')
        .replaceAll('ё', 'е')
        .includes(needle),
    );
  }, [query, sites]);

  return (
    <main className="site-directory container">
      <a className="site-directory__back" href="/indexpage/">
        ← На главную
      </a>
      <h1 className="site-directory__title">
        Выберите <span className="site-directory__accent">город</span>
      </h1>
      <p>Сейчас выбран: {currentCity}. Ссылка откроет сайт WARPOINT для нужного города.</p>
      <label className="site-directory__search">
        <span>Поиск города или страны</span>
        <input
          className="site-directory__input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Начните вводить название"
        />
      </label>
      <ul className="site-directory__grid">
        {visible.map((site) => (
          <li key={`${site.country}-${site.city}-${site.url}`}>
            <a
              className="site-directory__city-link"
              href={site.url}
              aria-current={site.city === currentCity ? 'location' : undefined}
            >
              <strong>{site.city}</strong>
              <small className="site-directory__country">{site.country}</small>
            </a>
          </li>
        ))}
      </ul>
      {visible.length === 0 && <p>Город не найден.</p>}
    </main>
  );
}
