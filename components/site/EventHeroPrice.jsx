'use client';

import EventPriceValue from './EventPriceValue';
import { useSiteLocation } from './SiteLocationProvider';

export default function EventHeroPrice({ amount = '15 900 ₽', category = 'birthday' }) {
  const { location } = useSiteLocation();
  if (!location) return null;

  return (
    <li className="hero-event__param" data-location-price="">
      <EventPriceValue
        category={category}
        fallback={amount}
        prefixClassName="hero-event__price-prefix"
      />
    </li>
  );
}
