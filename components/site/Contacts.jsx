'use client';

import { useMemo } from 'react';
import { contactsForSite } from '../../lib/contacts-data';
import { useSiteLocation } from './SiteLocationProvider';
import LocationMap from './LocationMap';
import ContactIcon from './ContactIcon';

export default function Contacts({ site, showAllLocations = false }) {
  const { selectedIndex, location, selectLocation, openLocation } = useSiteLocation();
  const contacts = useMemo(() => contactsForSite(site), [site]);
  const visible =
    showAllLocations || selectedIndex === null
      ? contacts.locations
      : contacts.locations.filter((item) => item.index === selectedIndex);
  const mapped = visible.filter((item) => item.map);
  const first = mapped[0] || visible[0];
  const points = mapped.map((item) => ({
    coordinates: item.map.coordinates.split(',').map(Number),
    title: item.title,
  }));
  const mapLocation = first && {
    ...first,
    title: visible.length > 1 ? 'Все парки WARPOINT: ' + site.city : first.title,
    route:
      points.length > 1
        ? 'https://yandex.ru/maps/?' +
          new URLSearchParams({
            pt: points.map((point) => point.coordinates[1] + ',' + point.coordinates[0]).join('~'),
          })
        : first.route,
  };

  return (
    <section
      className="contacts"
      id="contacts"
      data-header-theme="brand"
      aria-labelledby="contacts-title"
    >
      <div className="contacts__container container">
        <h2 className="contacts__title" id="contacts-title">
          Как нас <span>найти</span>
        </h2>
        <div className="contacts__card">
          <div className="contacts__content">
            <h3 className="contacts__city">{site.city}</h3>
            <button
              className="contacts__location button-reset"
              type="button"
              onClick={(event) => openLocation(event.currentTarget)}
              aria-haspopup="dialog"
            >
              {location ? location.title : 'Все локации города'}
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="m3 6 5 4 5-4" />
              </svg>
            </button>
            <div className="contacts__locations" aria-label={'Локации: ' + site.city}>
              {visible.map((item) => (
                <article
                  className="contacts__location-card"
                  key={item.id}
                  id={'contact-location-' + item.index}
                >
                  <button
                    className="contacts__location-name button-reset"
                    type="button"
                    aria-pressed={selectedIndex === item.index}
                    onClick={() => selectLocation(item.index)}
                  >
                    {item.title}
                  </button>
                  <address className="contacts__location-address">{item.address}</address>
                  {item.subwayStation && (
                    <p className="contacts__location-meta">Метро: {item.subwayStation}</p>
                  )}
                  {item.hours && <p className="contacts__location-meta">Ежедневно {item.hours}</p>}
                  <a
                    className="contacts__location-route"
                    href={item.route}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Построить маршрут ↗
                  </a>
                  {showAllLocations && (
                    <button
                      className="contacts__location-book button-reset"
                      type="button"
                      data-booking-open=""
                      onClick={() => selectLocation(item.index)}
                    >
                      Забронировать
                    </button>
                  )}
                </article>
              ))}
            </div>
            {location && contacts.city && (
              <div className="contacts__details">
                <a className="contacts__location-phone" href={contacts.city.phoneHref}>
                  {contacts.city.phone}
                </a>
                <a className="contacts__location-email" href={'mailto:' + contacts.city.email}>
                  {contacts.city.email}
                </a>
              </div>
            )}
            {!showAllLocations && (
              <button className="contacts__booking button-reset" type="button" data-booking-open="">
                <ContactIcon name="game" className="contacts__booking-icon" />
                Забронировать
              </button>
            )}
          </div>
          {mapLocation ? (
            <LocationMap className="contacts__map" location={mapLocation} points={points} />
          ) : (
            <div className="contacts__map contacts__map-unavailable">
              Адреса парков появятся здесь после публикации.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
