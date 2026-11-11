'use client';

import { useSiteLocation } from './SiteLocationProvider';

export default function SelectedLocationFields({ summary = false, includeLocation = true }) {
  const { site, locationId, location, openLocation } = useSiteLocation();
  return (
    <>
      <input type="hidden" name="city" value={site.city} />
      <input type="hidden" name="countryId" value={site.countryId} />
      {site.cityId && <input type="hidden" name="cityId" value={site.cityId} />}
      {includeLocation && location?.id && (
        <input type="hidden" name="arenaId" value={location.id} />
      )}
      {includeLocation && location?.siteId && (
        <input type="hidden" name="siteId" value={location.siteId} />
      )}
      {includeLocation && <input type="hidden" name="locationId" value={locationId} />}
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
