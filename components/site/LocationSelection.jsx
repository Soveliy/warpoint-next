'use client';
import { useSiteLocation } from './SiteLocationProvider';

export default function LocationSelection({ children }) {
  const { location, openLocation } = useSiteLocation();
  if (!location)
    return (
      <div className="location-selection__prompt">
        <h2 className="location-selection__title">Выберите локацию</h2>
        <p className="location-selection__text">Покажем тарифы выбранного парка.</p>
        <button
          className="listing-button listing-button--solid"
          type="button"
          onClick={(event) => openLocation(event.currentTarget)}
          aria-haspopup="dialog"
        >
          Выбрать локацию
        </button>
      </div>
    );
  return (
    <>
      <button
        className="location-selection__summary button-reset"
        type="button"
        onClick={(event) => openLocation(event.currentTarget)}
        aria-haspopup="dialog"
      >
        {location.title} · {location.address} · Изменить
      </button>
      {children}
    </>
  );
}
