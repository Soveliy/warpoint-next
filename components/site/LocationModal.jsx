'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSiteLocation } from './SiteLocationProvider';
import { toggleScrollLock } from '../../interactions/_functions';

const labels = {
  country: { title: 'страну', search: 'Поиск страны', empty: 'Страна не найдена' },
  city: { title: 'город', search: 'Поиск города', empty: 'Город не найден' },
  location: { title: 'локацию', search: 'Поиск локации', empty: 'Локация не найдена' },
};
const flags = {
  ru: '/img/country/ru_flag.svg',
  kz: '/img/country/kz_flag.svg',
  uz: '/img/country/uz_flag.svg',
  by: '/img/country/bel.png',
};
const normalize = (value) =>
  String(value || '')
    .trim()
    .toLocaleLowerCase('ru-RU')
    .replaceAll('ё', 'е');

export default function LocationModal({ site }) {
  const { selectedIndex, selectLocation } = useSiteLocation();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState('city');
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState(site.country);
  const [city, setCity] = useState(site.city);
  const [arenaIndex, setArenaIndex] = useState(null);
  const dialog = useRef(null);
  const heading = useRef(null);
  const trigger = useRef(null);

  const countries = useMemo(
    () =>
      [...new Map(site.directory.map((entry) => [entry.country, entry.countryId])).entries()].map(
        ([name, id]) => ({
          name,
          id,
          count: site.directory.filter((entry) => entry.country === name).length,
        }),
      ),
    [site.directory],
  );
  const cities = useMemo(
    () =>
      site.directory
        .filter((entry) => entry.country === country)
        .sort((a, b) => a.city.localeCompare(b.city, 'ru')),
    [site.directory, country],
  );
  const selectedCity = cities.find((entry) => entry.city === city);
  const arenas =
    city === site.city && country === site.country
      ? site.arenas.map((arena, index) => ({ ...arena, index, url: site.canonicalUrl }))
      : (selectedCity?.arenas || []).map((arena, index) => ({ ...arena, index }));
  const selectedArena = arenas.find((arena) => arena.index === arenaIndex);
  const filteredCountries = countries.filter((entry) =>
    normalize(entry.name).includes(normalize(query)),
  );
  const filteredCities = cities.filter((entry) => normalize(entry.city).includes(normalize(query)));
  const filteredArenas = arenas.filter((arena) =>
    normalize(`${arena.title} ${arena.address}`).includes(normalize(query)),
  );

  useEffect(() => {
    const onOpen = (event) => {
      trigger.current = event.detail?.trigger || document.activeElement;
      setArenaIndex(selectedIndex);
      setCountry(site.country);
      setCity(site.city);
      setQuery('');
      setStep(labels[event.detail?.step] ? event.detail.step : 'city');
      setOpen(true);
    };
    document.addEventListener('warpoint:location-open', onOpen);
    return () => document.removeEventListener('warpoint:location-open', onOpen);
  }, [site, selectedIndex]);

  useEffect(() => {
    if (!open) return;
    toggleScrollLock(true);
    const frame = requestAnimationFrame(() => heading.current?.focus({ preventScroll: true }));
    return () => {
      cancelAnimationFrame(frame);
      toggleScrollLock(
        Boolean(
          document.querySelector(
            '.booking-panel.is-open, .event-modal.is-open, .event-request-modal.is-open, dialog[open]',
          ),
        ),
      );
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    requestAnimationFrame(() => trigger.current?.focus?.({ preventScroll: true }));
  };
  const goToStep = (next) => {
    setStep(next);
    setQuery('');
    requestAnimationFrame(() => heading.current?.focus({ preventScroll: true }));
  };
  const confirm = () => {
    if (!selectedArena) return;
    if (city !== site.city || country !== site.country) {
      const target = new URL(selectedArena.url || selectedCity.url);
      if (['https:', 'http:'].includes(target.protocol)) window.location.assign(target.href);
      return;
    }
    selectLocation(selectedArena.index);
    close();
  };
  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== 'Tab') return;
    const items = [
      ...dialog.current.querySelectorAll('button:not(:disabled), input:not(:disabled), a[href]'),
    ].filter((item) => item.getClientRects().length && !item.closest('[hidden]'));
    const first = items[0];
    const last = items.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  return (
    <div
      className={`location-modal${open ? ' is-open' : ''}`}
      id="location-modal"
      aria-hidden={!open}
      inert={!open}
    >
      <div
        className="location-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="location-modal-title"
        ref={dialog}
        onKeyDown={onKeyDown}
      >
        <button
          className="location-modal__close button-reset"
          type="button"
          aria-label="Закрыть окно выбора локации"
          onClick={close}
        >
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="m6 6 20 20M26 6 6 26" />
          </svg>
        </button>
        <aside className="location-modal__sidebar">
          <img
            className="location-modal__logo"
            src="/img/logo.svg"
            width="282"
            height="47"
            alt="Warpoint"
          />
          <nav className="location-modal__steps" aria-label="Этапы выбора локации">
            {[
              ['country', 'Страна', country || 'Выберите страну'],
              ['city', 'Город', city || 'Выберите город'],
              ['location', 'Локация', selectedArena?.title || 'Выберите локацию'],
            ].map(([key, caption, value]) => (
              <button
                className={`location-modal__step button-reset${step === key ? ' is-active' : ''}`}
                key={key}
                type="button"
                aria-current={step === key ? 'step' : undefined}
                disabled={(key === 'city' && !country) || (key === 'location' && !city)}
                onClick={() => goToStep(key)}
              >
                <span className="location-modal__step-caption">{caption}</span>
                <span className="location-modal__step-value" title={value}>
                  {value}
                </span>
                <svg className="location-modal__step-icon" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="m7 3 7 7-7 7" />
                </svg>
              </button>
            ))}
          </nav>
          <div className="location-modal__actions">
            <button
              className="location-modal__action location-modal__action--cancel button-reset"
              type="button"
              onClick={close}
            >
              Отмена
            </button>
            <button
              className="location-modal__action location-modal__action--confirm button-reset"
              type="button"
              onClick={confirm}
              disabled={!selectedArena}
            >
              {city === site.city && country === site.country ? 'Готово' : 'Перейти'}
            </button>
          </div>
        </aside>
        <div className="location-modal__main">
          <header className="location-modal__header">
            <h2
              className="location-modal__heading"
              id="location-modal-title"
              tabIndex={-1}
              ref={heading}
            >
              Выберите <span>{labels[step].title}</span>
            </h2>
          </header>
          <div className="location-modal__search-field">
            <svg className="location-modal__search-icon" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="7.5" />
              <path d="m16 16 5 5" />
            </svg>
            <label className="visually-hidden" htmlFor="location-search">
              {labels[step].search}
            </label>
            <input
              className="location-modal__search"
              id="location-search"
              type="search"
              placeholder={labels[step].search}
              autoComplete="off"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="location-modal__content">
            {step === 'country' && (
              <section className="location-modal__view" aria-label="Выберите страну">
                <div className="location-modal__countries">
                  {filteredCountries.map((entry) => (
                    <button
                      className={`location-modal__country-button button-reset${entry.name === country ? ' is-selected' : ''}`}
                      type="button"
                      key={entry.name}
                      aria-pressed={entry.name === country}
                      onClick={() => {
                        setCountry(entry.name);
                        setCity('');
                        setArenaIndex(null);
                        goToStep('city');
                      }}
                    >
                      {flags[entry.id] && (
                        <img
                          className="location-modal__country-flag"
                          src={flags[entry.id]}
                          width="51"
                          height="38"
                          alt=""
                        />
                      )}
                      <span className="location-modal__country-copy">
                        <span className="location-modal__country-name">{entry.name}</span>
                        <span className="location-modal__country-count">{entry.count} городов</span>
                      </span>
                    </button>
                  ))}
                </div>
                {!filteredCountries.length && (
                  <p className="location-modal__empty">{labels.country.empty}</p>
                )}
              </section>
            )}
            {step === 'city' && (
              <section className="location-modal__view" aria-label="Выберите город">
                <div className="location-modal__cities">
                  {[
                    ...new Set(
                      filteredCities.map((entry) => entry.city[0]?.toLocaleUpperCase('ru-RU')),
                    ),
                  ].map((letter) => (
                    <section className="location-modal__city-group" key={letter}>
                      <h3 className="location-modal__city-letter">{letter}</h3>
                      <div className="location-modal__city-list">
                        {filteredCities
                          .filter((entry) => entry.city[0]?.toLocaleUpperCase('ru-RU') === letter)
                          .map((entry) => (
                            <button
                              className={`location-modal__city-button button-reset${entry.city === city ? ' is-selected' : ''}`}
                              type="button"
                              key={entry.url + entry.city}
                              aria-pressed={entry.city === city}
                              onClick={() => {
                                setCity(entry.city);
                                setArenaIndex(null);
                                goToStep('location');
                              }}
                            >
                              {entry.city}
                            </button>
                          ))}
                      </div>
                    </section>
                  ))}
                </div>
                {!filteredCities.length && (
                  <p className="location-modal__empty">{labels.city.empty}</p>
                )}
              </section>
            )}
            {step === 'location' && (
              <section className="location-modal__view" aria-label="Выберите локацию">
                <div className="location-modal__locations">
                  {filteredArenas.map((arena) => (
                    <button
                      className={`location-modal__location-card button-reset${arena.index === arenaIndex ? ' is-selected' : ''}`}
                      type="button"
                      key={`${arena.title}-${arena.index}`}
                      aria-pressed={arena.index === arenaIndex}
                      onClick={() => setArenaIndex(arena.index)}
                    >
                      <span className="location-modal__location-meta">
                        <span className="location-modal__location-type">Арена</span>
                      </span>
                      <span className="location-modal__location-title">{arena.title}</span>
                      <span className="location-modal__location-address">{arena.address}</span>
                    </button>
                  ))}
                </div>
                {!filteredArenas.length && (
                  <p className="location-modal__empty">{labels.location.empty}</p>
                )}
                <button className="location-modal__skip button-reset" type="button" onClick={close}>
                  Выбрать позже
                </button>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
