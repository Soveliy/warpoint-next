'use client';

import { locationTariffs } from '../../lib/site-tariffs';
import { useSiteLocation } from './SiteLocationProvider';

export default function EventApiTariffs({ category }) {
  const { site, location } = useSiteLocation();
  const tariffs = locationTariffs(site, location, category);
  if (!tariffs.length) {
    return (
      <p className="event-tariffs__empty">Тарифы для этого мероприятия пока не опубликованы.</p>
    );
  }

  return (
    <div className="event-tariffs__track">
      <div className="event-tariffs__slider swiper" data-slider="" data-event-tariffs-slider="">
        <div className="swiper-wrapper">
          {tariffs.map((tariff) => (
            <article
              className={`event-tariffs__card swiper-slide${tariff.hit ? ' event-tariffs__card--popular' : ''}`}
              key={tariff.id}
            >
              {tariff.hit && (
                <span className="event-tariffs__card-popular-icon-container" aria-label="Хит">
                  <svg className="event-tariffs__card-popular-icon" aria-hidden="true">
                    <use href="/img/sprite.svg#icon-fire" />
                  </svg>
                </span>
              )}
              <div className="event-tariffs__card-tags">
                {[tariff.duration, tariff.players, tariff.age].filter(Boolean).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <h3 className="event-tariffs__card-title">{tariff.title}</h3>
              <p className="event-tariffs__card-description">{tariff.description}</p>
              <dl
                className={`event-tariffs__card-prices${tariff.priceItems.length <= 1 ? ' event-tariffs__card-prices--single' : ''}`}
              >
                {tariff.priceItems.map((price) => (
                  <div key={price.label}>
                    <dt>{price.label}</dt>
                    <dd>
                      {price.oldAmount > price.amount && (
                        <del className="event-tariffs__old-price">{price.oldValue}</del>
                      )}
                      {price.value}
                      {tariff.priceUnitLabel && (
                        <small className="event-tariffs__price-unit">{tariff.priceUnitLabel}</small>
                      )}
                    </dd>
                  </div>
                ))}
                {!tariff.priceItems.length && (
                  <div>
                    <dt>Стоимость</dt>
                    <dd>По запросу</dd>
                  </div>
                )}
              </dl>
              <div className="event-tariffs__card-actions">
                <button
                  className="event-tariffs__card-more"
                  type="button"
                  data-tariff-open={tariff.id}
                  aria-haspopup="dialog"
                  aria-controls="tariff-modal"
                >
                  Подробнее
                </button>
                <button
                  className="event-tariffs__card-request btn btn--red"
                  type="button"
                  data-event-request-open=""
                  data-tariff-title={tariff.title}
                  aria-haspopup="dialog"
                  aria-controls="event-request-modal"
                >
                  Оставить заявку
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="event-tariffs__controls">
        <button
          className="event-tariffs__arrow button-reset"
          type="button"
          aria-label="Предыдущий тариф"
          data-slider-prev=""
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m15 4-8 8 8 8" />
          </svg>
        </button>
        <button
          className="event-tariffs__arrow button-reset"
          type="button"
          aria-label="Следующий тариф"
          data-slider-next=""
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 4 8 8-8 8" />
          </svg>
        </button>
      </div>
    </div>
  );
}
