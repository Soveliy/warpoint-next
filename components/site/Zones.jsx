'use client';

import { useRef, useState } from 'react';
import { useSiteLocation } from './SiteLocationProvider';
import { siteZones, siteZoneAvailable, usesSiteTariffs } from '../../lib/site-tariffs';
import ZoneLocations from './ZoneLocations';

function ZoneIcon({ zone }) {
  return (
    <svg className="zones__tab-icon" aria-hidden="true">
      <use href={'/img/sprite.svg#icon-' + zone.icon} />
    </svg>
  );
}

export default function Zones({ site, variant }) {
  const { location, openLocation } = useSiteLocation();
  const zones = siteZones(site, location);
  const isEvent = variant !== 'home';
  const [activeId, setActiveId] = useState('arena');
  const [mobileOpen, setMobileOpen] = useState(false);
  const tabs = useRef([]);
  const mobileTrigger = useRef(null);
  const activeZone = zones.find((zone) => zone.id === activeId);
  const activate = (id) => {
    setActiveId(id);
    setMobileOpen(false);
  };
  const tabKeyDown = (event, index) => {
    const keys = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: zones.length - 1 };
    if (keys[event.key] === undefined) return;
    event.preventDefault();
    const next = (keys[event.key] + zones.length) % zones.length;
    activate(zones[next].id);
    tabs.current[next]?.focus({ preventScroll: true });
  };

  return (
    <section
      className={isEvent ? 'zones zones--event' : 'zones'}
      data-header-theme="brand"
      aria-labelledby="zones-title"
    >
      <div className="zones__inner container">
        <div className="zones__heading section-head">
          <h2 className="section-head__title" id="zones-title">
            <span>Игровые зоны</span>
            <br />в нашем парке
          </h2>
          <p className="section-head__lead section-head__lead--big-width">
            Выберите свою зону и погрузитесь в мир технологий, адреналина и незабываемых эмоций
          </p>
        </div>
        <div className="zones__navigation">
          <div className="zones__tabs" role="tablist" aria-label="Игровые зоны">
            {zones.map((zone, index) => {
              const unavailable = !siteZoneAvailable(site, location, zone.id);
              return (
                <button
                  className={
                    'zones__tab button-reset' +
                    (zone.id === activeId ? ' is-active' : '') +
                    (unavailable ? ' zones__tab--unavailable' : '')
                  }
                  type="button"
                  role="tab"
                  key={zone.id}
                  id={'zone-tab-' + zone.id}
                  aria-selected={zone.id === activeId}
                  aria-controls={'zone-panel-' + zone.id}
                  aria-label={
                    unavailable ? zone.label + ' — недоступно в выбранной локации' : undefined
                  }
                  tabIndex={zone.id === activeId ? 0 : -1}
                  ref={(element) => {
                    tabs.current[index] = element;
                  }}
                  onKeyDown={(event) => tabKeyDown(event, index)}
                  onClick={() => activate(zone.id)}
                >
                  <ZoneIcon zone={zone} />
                  <span>{zone.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div
          className="zones__mobile-select"
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setMobileOpen(false);
          }}
        >
          <span className="zones__mobile-label" id="zones-mobile-label">
            Выберите свою игровую зону
          </span>
          <button
            className="zones__mobile-trigger button-reset"
            type="button"
            ref={mobileTrigger}
            aria-haspopup="listbox"
            aria-expanded={mobileOpen}
            aria-controls="zones-mobile-options"
            aria-labelledby="zones-mobile-label zones-mobile-value"
            onClick={() => setMobileOpen(!mobileOpen)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') setMobileOpen(false);
              if (event.key === 'ArrowDown') {
                event.preventDefault();
                setMobileOpen(true);
                requestAnimationFrame(() =>
                  document.getElementById('zone-mobile-' + activeId)?.focus(),
                );
              }
            }}
          >
            <span className="zones__mobile-value" id="zones-mobile-value">
              <ZoneIcon zone={activeZone} />
              <span>{activeZone.label}</span>
            </span>
            <span className="zones__mobile-chevron" aria-hidden="true" />
          </button>
          <div
            className="zones__mobile-dropdown"
            id="zones-mobile-options"
            role="listbox"
            aria-label="Игровые зоны"
            hidden={!mobileOpen}
          >
            {zones.map((zone, index) => (
              <button
                type="button"
                role="option"
                id={'zone-mobile-' + zone.id}
                key={zone.id}
                className={
                  'zones__mobile-option button-reset' +
                  (zone.id === activeId ? ' is-active' : '') +
                  (!siteZoneAvailable(site, location, zone.id)
                    ? ' zones__mobile-option--unavailable'
                    : '')
                }
                aria-selected={zone.id === activeId}
                onClick={() => {
                  activate(zone.id);
                  mobileTrigger.current?.focus();
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') {
                    setMobileOpen(false);
                    mobileTrigger.current?.focus();
                  } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                    event.preventDefault();
                    const next =
                      (index + (event.key === 'ArrowDown' ? 1 : -1) + zones.length) % zones.length;
                    document.getElementById('zone-mobile-' + zones[next].id)?.focus();
                  }
                }}
              >
                <ZoneIcon zone={zone} />
                <span className="zones__mobile-option-label">{zone.label}</span>
                <span className="zones__mobile-option-mark" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
        <div className="zones__panels">
          {zones.map((zone, index) => {
            const locked = !siteZoneAvailable(site, location, zone.id);
            const price = variant === 'home' ? '1000 ₽' : zone.price;
            return (
              <section
                className={'zone zone--red' + (locked ? ' zone--unavailable' : '')}
                key={zone.id}
                id={'zone-panel-' + zone.id}
                role="tabpanel"
                aria-labelledby={'zone-tab-' + zone.id}
                hidden={activeId !== zone.id}
                inert={activeId !== zone.id}
              >
                <div className="zone__row" inert={locked} aria-hidden={locked || undefined}>
                  <div className="zone__image-container">
                    <img
                      className="zone__image"
                      src={zone.image}
                      width="3000"
                      height="1996"
                      alt={zone.alt}
                      loading="lazy"
                      decoding="async"
                    />
                    <button
                      className="play-button play-button--centered"
                      type="button"
                      data-zone-video={zone.id}
                      aria-label={'Смотреть видео зоны «' + zone.label + '»'}
                    >
                      <svg className="play-button__icon" aria-hidden="true">
                        <use href="/img/sprite.svg#icon-play" />
                      </svg>
                    </button>
                  </div>
                  <div className="zone__content">
                    <div className="zone__wrap">
                      <div className="zone__header">
                        <ul className="zone__params">
                          {zone.params.map((param) => (
                            <li className="zone__params-item" key={param}>
                              {param}
                            </li>
                          ))}
                        </ul>
                        <ZoneLocations zoneId={zone.id} />
                      </div>
                      <div className="zone__body">
                        <h3 className="zone__title">
                          <span>{zone.accent}</span>
                          {zone.title}
                        </h3>
                        <p className="zone__desc">{zone.description}</p>
                      </div>
                      {(!isEvent || zone.id === 'lounge') && (
                        <div className="zone__bottom">
                          {zone.id === 'lounge' ? (
                            <button
                              className="zone__button btn btn--red"
                              type="button"
                              data-event-modal-open=""
                              aria-haspopup="dialog"
                              aria-controls="event-modal"
                            >
                              <svg width="24" height="28" aria-hidden="true">
                                <use href="/img/sprite.svg#icon-calc" />
                              </svg>
                              Рассчитать стоимость
                            </button>
                          ) : (
                            <>
                              <button
                                className="zone__button btn btn--red"
                                type="button"
                                data-booking-open={location ? '' : undefined}
                                data-booking-event={zone.label}
                                onClick={(event) => {
                                  if (!location) openLocation(event.currentTarget);
                                }}
                                aria-haspopup="dialog"
                                aria-controls={location ? 'booking-panel' : undefined}
                              >
                                <img src="/img/svg/game.svg" width="30" height="30" alt="" />
                                Забронировать игру
                              </button>
                              <div className="zone__price">
                                {usesSiteTariffs(site) ? (
                                  zone.apiPrice ? (
                                    <>
                                      {zone.apiPrice.amount !== null && <small>от </small>}
                                      {zone.apiPrice.value}
                                      {zone.apiPrice.unitLabel && (
                                        <small> {zone.apiPrice.unitLabel}</small>
                                      )}
                                    </>
                                  ) : (
                                    'Цена по запросу'
                                  )
                                ) : site.city === 'Екатеринбург' ? (
                                  <>
                                    <small>от</small> {price}
                                  </>
                                ) : (
                                  'Цена по запросу'
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                    <span className="zone__watermark" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
                {locked && (
                  <div className="zone__unavailable" role="status">
                    <img
                      className="zone__lock"
                      src="/img/svg/zone-lock.svg"
                      width="49"
                      height="49"
                      alt=""
                    />
                    <h3 className="zone__unavailable-title">
                      Эта зона недоступна
                      <br />
                      {location ? 'в выбранной локации' : 'в парках города'}
                    </h3>
                    <ZoneLocations zoneId={zone.id} locked />
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
