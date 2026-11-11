'use client';

import { useEffect, useRef, useState } from 'react';
import { siteFields } from '../../lib/site-fields';
import {
  destroyYandexMap,
  initYandexMaps,
  updateYandexMap,
} from '../../interactions/components/yandex-map';
import { useSiteLocation } from './SiteLocationProvider';

export default function HomeContacts({ site }) {
  const { selectedIndex, selectLocation } = useSiteLocation();
  const [listOpen, setListOpen] = useState(false);
  const selectRef = useRef(null);
  const toggleRef = useRef(null);
  const mapRef = useRef(null);
  const arena = site.arenas[selectedIndex ?? 0] || site.arenas[0];
  const fields = siteFields({ ...site, arenas: arena ? [arena] : [] });
  const initialMap = useRef(fields.map).current;
  const hasMap = Boolean(fields.map);

  useEffect(() => {
    const element = mapRef.current;
    if (!element || !hasMap) return;
    const stopObserving = initYandexMaps([element]);
    return () => {
      stopObserving?.();
      destroyYandexMap(element);
    };
  }, [hasMap]);

  useEffect(() => {
    if (!fields.map || !mapRef.current) return;
    updateYandexMap(mapRef.current, {
      coordinates: fields.map.coordinates.split(',').map(Number),
      title: fields.map.title,
    });
  }, [fields.map?.coordinates, fields.map?.title]);

  useEffect(() => {
    setListOpen(false);
  }, [selectedIndex]);

  useEffect(() => {
    if (!listOpen) return;
    const closeOutside = (event) => {
      if (!selectRef.current?.contains(event.target)) setListOpen(false);
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [listOpen]);

  const chooseArena = (index) => {
    selectLocation(index);
    setListOpen(false);
    toggleRef.current?.focus({ preventScroll: true });
  };

  const onSelectKeyDown = (event) => {
    if (event.key === 'Escape' && listOpen) {
      event.preventDefault();
      setListOpen(false);
      toggleRef.current?.focus({ preventScroll: true });
    }
    if (event.key === 'Tab') setListOpen(false);
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    if (!listOpen) {
      setListOpen(true);
      requestAnimationFrame(() => selectRef.current?.querySelector('[role="option"]')?.focus());
      return;
    }
    const options = [...selectRef.current.querySelectorAll('[role="option"]')];
    const active = options.indexOf(document.activeElement);
    const next =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? options.length - 1
          : Math.max(0, Math.min(active + (event.key === 'ArrowUp' ? -1 : 1), options.length - 1));
    options[next]?.focus();
  };
  return (
    <>
      <section
        className="contacts"
        id="contacts"
        data-header-theme="brand"
        aria-labelledby="contacts-title"
      >
        <div className="contacts__container container">
          <h2 className="contacts__title" id="contacts-title">
            {'Как нас '}
            <span>{'найти'}</span>
          </h2>
          <div className="contacts__card">
            <div className="contacts__content">
              <h3 className="contacts__city" data-contacts-city="">
                {site.city}
              </h3>
              <div
                className="contacts__select"
                data-contacts-select=""
                data-country-id={site.countryId}
                data-city-name={site.city}
                data-selected-location-id={selectedIndex === null ? '' : 'erp-' + selectedIndex}
                ref={selectRef}
                onKeyDown={onSelectKeyDown}
              >
                <button
                  className="contacts__location button-reset"
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={listOpen}
                  aria-controls="contacts-location-list"
                  aria-label={`Выбрать локацию: ${fields.first.title}`}
                  data-contacts-select-toggle=""
                  ref={toggleRef}
                  onClick={() => setListOpen(!listOpen)}
                >
                  <span data-contacts-location="">{fields.first.title}</span>
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="m3 6 5 4 5-4"></path>
                  </svg>
                </button>
                <div
                  className="contacts__location-list"
                  id="contacts-location-list"
                  role="listbox"
                  aria-label={`Локации: ${site.city}`}
                  data-contacts-location-list=""
                  hidden={!listOpen}
                >
                  {site.arenas.map((option, index) => (
                    <button
                      className="contacts__location-option button-reset"
                      type="button"
                      role="option"
                      key={`${option.title}-${index}`}
                      aria-selected={index === selectedIndex}
                      tabIndex={-1}
                      onClick={() => chooseArena(index)}
                    >
                      <span className="contacts__location-option-name">{option.title}</span>
                      <span className="contacts__location-option-details">{option.address}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="contacts__details">
                <h4 className="contacts__label">
                  {fields.local && selectedIndex !== null ? 'Адрес и телефон:' : 'Адрес:'}
                </h4>
                <address className="contacts__address">
                  <div className="contacts__row">
                    <svg className="contacts__icon" viewBox="0 0 32 32" aria-hidden="true">
                      <path
                        fill="currentColor"
                        stroke="none"
                        d="M16 2a8 8 0 0 0-8 8c0 6 8 13 8 13s8-7 8-13a8 8 0 0 0-8-8Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"
                      ></path>
                      <path d="M9 20c-4 1-6 2.5-6 4.5C3 27 9 29 16 29s13-2 13-4.5c0-2-2-3.5-6-4.5"></path>
                    </svg>
                    <div>
                      <span data-contacts-address="">{fields.first.address || site.city}</span>
                      <br />
                      <span data-contacts-address-location="">{fields.first.title}</span>
                    </div>
                  </div>
                  <div
                    className="contacts__row"
                    data-contacts-metro-row=""
                    hidden={!fields.first.subwayStation}
                  >
                    <svg
                      className="contacts__icon contacts__icon--metro"
                      viewBox="0 0 32 36"
                      aria-hidden="true"
                    >
                      <path d="M6 25A14 14 0 1 1 26 25L16 35"></path>
                      <path
                        d="m7 20 5-13 4 8 4-8 5 13h-6l-2-6-1 3-1-3-2 6Z"
                        fill="currentColor"
                        stroke="none"
                      ></path>
                    </svg>
                    <span data-contacts-metro="">{fields.first.subwayStation}</span>
                  </div>
                  {fields.local && selectedIndex !== null && (
                    <div className="contacts__row" data-contacts-ekaterinburg="">
                      <svg className="contacts__icon" viewBox="0 0 32 32" aria-hidden="true">
                        <rect x="8" y="2" width="16" height="28" rx="2"></rect>
                        <path d="M8 5h16M8 26h16"></path>
                      </svg>
                      <a href="tel:+73432895700">{'+7 (343) 289-57-00'}</a>
                    </div>
                  )}
                  {fields.local && selectedIndex !== null && (
                    <div className="contacts__row" data-contacts-ekaterinburg="">
                      <svg className="contacts__icon" viewBox="0 0 32 32" aria-hidden="true">
                        <path d="M3 7h26v19H3Zm0 0 13 12L29 7M3 26l9-10m17 10-9-10"></path>
                      </svg>
                      <a href="mailto:ekb@warpoint.ru">{'ekb@warpoint.ru'}</a>
                    </div>
                  )}
                </address>
              </div>
              {(fields.local ||
                (fields.first.hours?.open_time && fields.first.hours?.close_time)) && (
                <div className="contacts__hours" data-contacts-ekaterinburg="">
                  <h4 className="contacts__label">{'Время работы:'}</h4>
                  <dl className="contacts__schedule">
                    {fields.first.hours?.open_time && fields.first.hours?.close_time ? (
                      <div>
                        <dt>Пн–Вс</dt>
                        <dd>
                          {fields.first.hours.open_time.slice(0, 5)}–
                          {fields.first.hours.close_time.slice(0, 5)}
                        </dd>
                      </div>
                    ) : (
                      <>
                        <div>
                          <dt>{'Пн-Чт'}</dt>
                          <dd>{'12:00 - 22:00'}</dd>
                        </div>
                        <div>
                          <dt>{'Пт'}</dt>
                          <dd>{'12:00 - 22:00'}</dd>
                        </div>
                        <div>
                          <dt>{'Сб'}</dt>
                          <dd>{'10:00 - 00:00'}</dd>
                        </div>
                        <div>
                          <dt>{'Вс'}</dt>
                          <dd>{'10:00 - 23:00'}</dd>
                        </div>
                      </>
                    )}
                  </dl>
                </div>
              )}
              {fields.local && selectedIndex !== null && (
                <div
                  className="contacts__socials"
                  aria-label="Социальные сети"
                  data-contacts-ekaterinburg=""
                >
                  <a className="contacts__social" href="#" aria-label="ВКонтакте">
                    <svg className="contacts__social-icon" aria-hidden="true">
                      <use href="/img/sprite.svg#icon-vk"></use>
                    </svg>
                  </a>
                  <a className="contacts__social" href="#" aria-label="Instagram">
                    <svg className="contacts__social-icon" aria-hidden="true">
                      <use href="/img/sprite.svg#icon-inst"></use>
                    </svg>
                  </a>
                  <a className="contacts__social" href="#" aria-label="Telegram">
                    <svg className="contacts__social-icon" aria-hidden="true">
                      <use href="/img/sprite.svg#icon-tg"></use>
                    </svg>
                  </a>
                  <a className="contacts__social" href="#" aria-label="Max">
                    <svg className="contacts__social-icon" aria-hidden="true">
                      <use href="/img/sprite.svg#icon-max"></use>
                    </svg>
                  </a>
                  <a className="contacts__social" href="#" aria-label="WhatsApp">
                    <svg className="contacts__social-icon" aria-hidden="true">
                      <use href="/img/sprite.svg#icon-whatsapp"></use>
                    </svg>
                  </a>
                </div>
              )}
              <button className="contacts__booking button-reset" type="button" data-booking-open="">
                <svg className="contacts__booking-icon" aria-hidden="true">
                  <use href="/img/sprite.svg#icon-game"></use>
                </svg>
                <span>{'Забронировать'}</span>
              </button>
              <a
                className="contacts__booking contacts__route"
                data-contacts-route=""
                href={fields.map?.route || '#contacts'}
                target="_blank"
                rel="noopener noreferrer"
                hidden={!fields.map}
              >
                <svg className="contacts__booking-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="m21 3-7 18-3-8-8-3 18-7Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <span>{'Проложить маршрут'}</span>
              </a>
            </div>
            {fields.map ? (
              <div
                className="contacts__map"
                data-yandex-map=""
                data-map-coordinates={initialMap?.coordinates || fields.map.coordinates}
                data-map-title={initialMap?.title || fields.map.title}
                data-map-src={initialMap?.src || fields.map.src}
                aria-busy="true"
                ref={mapRef}
              >
                <div className="contacts__map-placeholder" aria-hidden="true"></div>
                <span className="contacts__map-pin" aria-hidden="true"></span>
                <a
                  className="contacts__map-open"
                  data-map-open=""
                  href={fields.map.route}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Открыть карту: ${fields.map.title}`}
                ></a>
                <span className="visually-hidden" data-map-status="" role="status">
                  {'Карта загружается'}
                </span>
                {fields.local && (
                  <div className="contacts__parking" data-contacts-ekaterinburg="">
                    <svg
                      width="50"
                      height="50"
                      viewBox="0 0 50 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M46.875 20.3125H44.7656L39.3398 8.10547C39.0943 7.55318 38.6939 7.08394 38.187 6.75462C37.6802 6.42529 37.0888 6.25001 36.4844 6.25H13.5156C12.9112 6.25001 12.3198 6.42529 11.813 6.75462C11.3061 7.08394 10.9057 7.55318 10.6602 8.10547L5.23437 20.3125H3.125C2.7106 20.3125 2.31317 20.4771 2.02015 20.7701C1.72712 21.0632 1.5625 21.4606 1.5625 21.875C1.5625 22.2894 1.72712 22.6868 2.02015 22.9799C2.31317 23.2729 2.7106 23.4375 3.125 23.4375H4.6875V39.0625C4.6875 39.8913 5.01674 40.6862 5.60279 41.2722C6.18884 41.8583 6.9837 42.1875 7.8125 42.1875H12.5C13.3288 42.1875 14.1237 41.8583 14.7097 41.2722C15.2958 40.6862 15.625 39.8913 15.625 39.0625V37.5H34.375V39.0625C34.375 39.8913 34.7042 40.6862 35.2903 41.2722C35.8763 41.8583 36.6712 42.1875 37.5 42.1875H42.1875C43.0163 42.1875 43.8112 41.8583 44.3972 41.2722C44.9833 40.6862 45.3125 39.8913 45.3125 39.0625V23.4375H46.875C47.2894 23.4375 47.6868 23.2729 47.9799 22.9799C48.2729 22.6868 48.4375 22.2894 48.4375 21.875C48.4375 21.4606 48.2729 21.0632 47.9799 20.7701C47.6868 20.4771 47.2894 20.3125 46.875 20.3125ZM15.625 29.6875H10.9375C10.5231 29.6875 10.1257 29.5229 9.83265 29.2299C9.53962 28.9368 9.375 28.5394 9.375 28.125C9.375 27.7106 9.53962 27.3132 9.83265 27.0201C10.1257 26.7271 10.5231 26.5625 10.9375 26.5625H15.625C16.0394 26.5625 16.4368 26.7271 16.7299 27.0201C17.0229 27.3132 17.1875 27.7106 17.1875 28.125C17.1875 28.5394 17.0229 28.9368 16.7299 29.2299C16.4368 29.5229 16.0394 29.6875 15.625 29.6875ZM39.0625 29.6875H34.375C33.9606 29.6875 33.5632 29.5229 33.2701 29.2299C32.9771 28.9368 32.8125 28.5394 32.8125 28.125C32.8125 27.7106 32.9771 27.3132 33.2701 27.0201C33.5632 26.7271 33.9606 26.5625 34.375 26.5625H39.0625C39.4769 26.5625 39.8743 26.7271 40.1674 27.0201C40.4604 27.3132 40.625 27.7106 40.625 28.125C40.625 28.5394 40.4604 28.9368 40.1674 29.2299C39.8743 29.5229 39.4769 29.6875 39.0625 29.6875ZM8.6543 20.3125L13.5156 9.375H36.4844L41.3457 20.3125H8.6543Z"
                        fill="#F63D68"
                      ></path>
                    </svg>
                    <p>
                      {'Удобный подъезд'}
                      <br />
                      {'и бесплатная парковка на 3 часа'}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="contacts__map">
                <div className="contacts__map-unavailable">{fields.first.address || site.city}</div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
