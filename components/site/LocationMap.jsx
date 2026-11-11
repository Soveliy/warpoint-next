'use client';

import { useEffect, useRef } from 'react';
import {
  destroyYandexMap,
  initYandexMaps,
  updateYandexMap,
} from '../../interactions/components/yandex-map';
import ContactIcon from './ContactIcon';

export default function LocationMap({ location, points, className = '' }) {
  const mapRef = useRef(null);
  // The renderer owns these data attributes after mounting. Keeping the initial
  // values stable lets it detect location changes and move the existing map.
  const initialMap = useRef(location.map).current;
  const hasMap = Boolean(location.map);
  const pointsKey = JSON.stringify(points || []);
  const initialPoints = useRef(pointsKey).current;

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
    if (!mapRef.current || !location.map) return;
    updateYandexMap(mapRef.current, {
      coordinates: location.map.coordinates.split(',').map(Number),
      title: location.title || location.map.title,
      points,
    });
  }, [location.map?.coordinates, location.map?.title, location.title, pointsKey]);

  if (!hasMap) {
    return (
      <div className="location-map location-map--empty">
        <ContactIcon name="mappin" className="location-map__empty-icon" />
        <p className="location-map__empty-title">Как добраться</p>
        <p className="location-map__empty-text">
          Посмотрите расположение парка и маршрут на Яндекс Картах.
        </p>
        <a
          className="listing-button location-map__empty-link"
          href={location.route}
          target="_blank"
          rel="noopener noreferrer"
        >
          Открыть карту
        </a>
      </div>
    );
  }

  return (
    <div
      className={`location-map ${className}`}
      ref={mapRef}
      data-yandex-map=""
      data-map-points={initialPoints}
      data-map-block="location-map"
      data-map-coordinates={initialMap.coordinates}
      data-map-title={initialMap.title}
      data-map-src={initialMap.src}
      aria-busy="true"
    >
      <div className="location-map__placeholder" aria-hidden="true" />
      <span className="location-map__pin" aria-hidden="true" />
      <a
        className="location-map__open"
        href={location.route}
        data-map-open=""
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Открыть карту: ${location.title}`}
      />
      <span className="visually-hidden" data-map-status="" role="status">
        Карта загружается
      </span>
    </div>
  );
}
