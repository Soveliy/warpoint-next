'use client';

import { useRef } from 'react';
import ContactLocationCard from './ContactLocationCard';
import ContactIcon from './ContactIcon';
import LocationMap from './LocationMap';
import useContactLocation from './useContactLocation';

export default function ContactLocations({ site, locations }) {
  const { selectedIndex, selectLocation } = useContactLocation(site, locations);
  const mapPanel = useRef(null);
  const selected = locations[selectedIndex] || locations[0];

  const chooseLocation = (index, showMap = false) => {
    selectLocation(index);
    if (showMap && window.matchMedia('(max-width: 1023px)').matches) {
      mapPanel.current?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section
      className="contact-locations container"
      id="contacts"
      aria-labelledby="contact-locations-title"
    >
      <div className="contact-locations__head">
        <div className="contact-locations__heading">
          <h2 className="contact-locations__title" id="contact-locations-title">
            Наши парки
          </h2>
          <span className="contact-locations__city">
            <ContactIcon name="mappin" className="contact-locations__city-icon" />
            {site.city}
          </span>
        </div>
        <a className="contact-locations__change-city" href="/locations/">
          Выбрать другой город <span aria-hidden="true">↗</span>
        </a>
      </div>
      {selected ? (
        <div className="contact-locations__layout">
          <div className="contact-locations__list" aria-label={`Парки WARPOINT: ${site.city}`}>
            {locations.map((location) => (
              <ContactLocationCard
                key={location.id}
                location={location}
                selected={location.index === selectedIndex}
                onSelect={chooseLocation}
              />
            ))}
          </div>
          <div className="contact-locations__map-panel" id="contact-location-map" ref={mapPanel}>
            <div className="contact-locations__map-head" aria-live="polite" aria-atomic="true">
              <span className="contact-locations__map-label">На карте</span>
              <h3 className="contact-locations__map-title">{selected.title}</h3>
              <p className="contact-locations__map-address">
                {site.city}, {selected.address}
              </p>
            </div>
            <LocationMap key={selected.map ? 'map' : 'address'} location={selected} />
            <a
              className="contact-locations__map-route"
              href={selected.route}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ContactIcon name="route" className="contact-locations__route-icon" />
              Проложить маршрут
            </a>
          </div>
        </div>
      ) : (
        <p className="contact-locations__empty">
          Адреса парков в этом городе появятся здесь после публикации.
        </p>
      )}
    </section>
  );
}
