'use client';

import { minimumEventPrice, usesSiteTariffs } from '../../lib/site-tariffs';
import { useSiteLocation } from './SiteLocationProvider';

export default function EventPriceValue({ category, fallback, prefixClassName }) {
  const { site, location } = useSiteLocation();
  if (!location) return null;
  if (usesSiteTariffs(site)) {
    const price = minimumEventPrice(site, location, category);
    if (price)
      return (
        <>
          {price.amount !== null && <small className={prefixClassName}>от</small>}{' '}
          <strong>{price.value}</strong>
          {price.unitLabel && <small> {price.unitLabel}</small>}
        </>
      );
  }
  if (site.city !== 'Екатеринбург') return 'Цена по запросу';
  return (
    <>
      <small className={prefixClassName}>от</small> <strong>{fallback}</strong>
    </>
  );
}
