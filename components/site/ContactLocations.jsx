'use client';

import { useState } from 'react';
import ContactLocationCard from './ContactLocationCard';
import ContactLocationDetail from './ContactLocationDetail';
import ContactParking from './ContactParking';
import ContactsLocationDialog from './ContactsLocationDialog';
import LocationMap from './LocationMap';
import { useSiteLocation } from './SiteLocationProvider';

export default function ContactLocations({ site, locations }) {
  const { selectedIndex, selectLocation } = useSiteLocation();
  const [detailsIndex, setDetailsIndex] = useState(null);
  const selected = locations.find((location) => location.index === selectedIndex);
  const mapLocation = selected || locations.find((location) => location.map) || locations[0];
  const details = locations.find((location) => location.index === detailsIndex);
  const points = selected
    ? []
    : locations.flatMap((location) =>
        location.map
          ? [
              {
                coordinates: location.map.coordinates.split(',').map(Number),
                title: location.title,
              },
            ]
          : [],
      );

  const chooseLocation = (index) => {
    selectLocation(index);
    setDetailsIndex(null);
  };

  return (
    <>
      <section
        className="contact-locations container"
        id="contacts"
        aria-label={`Парки WARPOINT в городе ${site.city}`}
      >
        {selected ? (
          <ContactLocationDetail
            site={site}
            location={selected}
            onSelect={chooseLocation}
            embedded
          />
        ) : mapLocation ? (
          <div className="contact-locations__layout">
            <div
              className="contact-locations__list"
              role="region"
              aria-label={`Список локаций WARPOINT в городе ${site.city}`}
              tabIndex={0}
            >
              {locations.map((location) => (
                <ContactLocationCard
                  key={location.id}
                  location={location}
                  selected={location.index === selectedIndex}
                  onSelect={chooseLocation}
                  onDetails={setDetailsIndex}
                />
              ))}
            </div>
            <div
              className="contact-locations__map-panel"
              role="region"
              aria-label={
                selected
                  ? `Расположение локации ${selected.title}`
                  : `Все локации WARPOINT на карте города ${site.city}`
              }
            >
              <LocationMap
                key={mapLocation.map ? 'map' : 'address'}
                location={mapLocation}
                points={points}
              />
              {site.city === 'Екатеринбург' && (
                <ContactParking className="contact-locations__parking" />
              )}
            </div>
          </div>
        ) : (
          <p className="contact-locations__empty">
            Адреса парков в этом городе появятся здесь после публикации.
          </p>
        )}
      </section>
      {details && (
        <ContactsLocationDialog
          site={site}
          city={site.city}
          location={details}
          onSelect={(index = details.index) => chooseLocation(index)}
          onClose={() => setDetailsIndex(null)}
        />
      )}
    </>
  );
}
