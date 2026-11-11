'use client';

import { useSiteLocation } from './SiteLocationProvider';

export default function SelectedLocationFields({ summary = false }) {
  const { locationId, location, openLocation } = useSiteLocation();
  return (
    <>
      <input type="hidden" name="locationId" value={locationId} />
      {summary && (
        <button
          className="location-selection__summary button-reset"
          type="button"
          onClick={(event) => openLocation(event.currentTarget)}
          aria-haspopup="dialog"
        >
          {location ? location.title + ' · ' + location.address : 'Выберите локацию'}
        </button>
      )}
    </>
  );
}
