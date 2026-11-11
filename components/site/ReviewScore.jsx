'use client';

import { useSiteLocation } from './SiteLocationProvider';
import { locationReviews, publicUrl, reviewCount } from '../../lib/site-content';

export default function ReviewScore({ children }) {
  const { site, location } = useSiteLocation();
  const reviews = locationReviews(site, location, {
    average: 5,
    platforms: [
      {
        code: '2gis',
        title: '2ГИС',
        icon: '/img/2gis.png',
        url: 'https://go.2gis.com/upU86',
        count: 1798,
      },
      {
        code: 'yandex',
        title: 'Карты',
        icon: '/img/ymaps.svg',
        url: 'https://yandex.ru/maps/-/CXaiu2k2',
        count: 2495,
      },
    ],
  });
  if (reviews === undefined) return children;
  if (!reviews) return null;
  const platforms = reviews.platforms || [];
  const hasAverage = Number.isFinite(reviews.average);
  if (!hasAverage && !platforms.length) return null;
  return (
    <aside
      className="reviews__score"
      aria-label={
        hasAverage ? 'Средняя оценка гостей ' + reviews.average + ' из 5' : 'Отзывы гостей'
      }
      data-review-score=""
    >
      <div className="reviews__services">
        {platforms.map((platform) => (
          <a
            href={publicUrl(platform.url) || undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="reviews__service"
            key={platform.code}
          >
            {platform.icon && (
              <img
                className="reviews__service-icon"
                src={platform.icon}
                width="39"
                height="39"
                alt=""
                loading="lazy"
              />
            )}
            <span className="reviews__service-name">{platform.title}</span>
            {typeof platform.count === 'number' && (
              <span className="reviews__service-count">{reviewCount(platform.count)}</span>
            )}
          </a>
        ))}
      </div>
      {hasAverage && (
        <div className="reviews__rating">
          <p className="reviews__rating-label">
            Средняя оценка наших гостей
            {typeof reviews.total === 'number' && <span> · {reviewCount(reviews.total)}</span>}
          </p>
          <strong className="reviews__rating-number">{reviews.average.toFixed(1)}</strong>
        </div>
      )}
    </aside>
  );
}
