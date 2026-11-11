'use client';

import { useSiteLocation } from './SiteLocationProvider';
import { locationReviews, reviewCount } from '../../lib/site-content';

export default function GoodPlaceBadge() {
  const { site, location } = useSiteLocation();
  const reviews = locationReviews(site, location, {
    good_place: { rating: 5, reviews_count: 2048 },
  });
  const goodPlace =
    reviews === undefined ? { rating: 5, reviews_count: 2048 } : reviews?.good_place;
  if (!Number.isFinite(goodPlace?.rating)) return null;
  return (
    <div className="allert">
      <div className="allert__row">
        <div className="allert__pic">
          <img src="/img/ypoint.png" alt="Оценка гостей на Яндекс Картах" />
        </div>
        <div className="allert__content">
          <div className="allert__title">{goodPlace.rating.toFixed(1)}</div>
          <div className="allert__desc">
            Средняя оценка наших гостей
            {typeof goodPlace.reviews_count === 'number' &&
              ' на основании ' + reviewCount(goodPlace.reviews_count)}
          </div>
        </div>
      </div>
    </div>
  );
}
