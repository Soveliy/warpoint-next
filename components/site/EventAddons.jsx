'use client';

import { useEffect, useMemo, useState } from 'react';
import { eventSlides } from '../../lib/event-site-content';
import { useSiteLocation } from './SiteLocationProvider';

const iconByEvent = {
  birthday: '/img/svg/cake.svg',
  'adult-birthday': '/img/svg/cake.svg',
  corporate: '/img/svg/martini.svg',
  graduation: '/img/svg/graduationcap.svg',
};

export default function EventAddons({ eventType = 'birthday' }) {
  const { site, location, locationId } = useSiteLocation();
  const slides = useMemo(() => eventSlides(site, location, eventType), [site, location, eventType]);
  const [requestedIndex, setActiveIndex] = useState(0);
  useEffect(() => setActiveIndex(0), [locationId, eventType]);
  const activeIndex = Math.min(requestedIndex, slides.length - 1);
  const show = (index) => setActiveIndex(Math.max(0, Math.min(index, slides.length - 1)));
  const onKeyDown = (event) => {
    if (
      !event.target.closest(
        '[data-event-addons-step], [data-event-addons-prev], [data-event-addons-next]',
      )
    )
      return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(activeIndex + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  };

  if (!slides.length) return null;

  return (
    <section
      className="event-addons"
      aria-labelledby="event-addons-title"
      data-header-theme="brand"
      data-event-addons=""
      style={{ '--event-addons-count': slides.length }}
      onKeyDown={onKeyDown}
    >
      <div className="event-addons__layout container">
        <div className="event-addons__intro">
          <div className="event-addons__head section-head" data-reveal="">
            <h2 className="section-head__title" id="event-addons-title">
              Чем можно
              <br />
              дополнить
              <br />
              <span>праздник?</span>
            </h2>
          </div>
          <p className="event-addons__lead" data-reveal="">
            Добавьте шоу, угощения и памятные кадры — поможем организовать мероприятие с учётом всех
            пожеланий и количества гостей
          </p>
          <button
            className="event-addons__request btn btn--red"
            data-reveal=""
            type="button"
            aria-haspopup="dialog"
            aria-controls="event-request-modal"
            data-event-request-open=""
          >
            <img
              className="event-addons__request-icon"
              src={iconByEvent[eventType]}
              width="30"
              height="30"
              alt=""
              aria-hidden="true"
            />
            Оставить заявку
          </button>
        </div>

        <div className="event-addons__showcase" data-reveal-image="">
          <div className="event-addons__slides" aria-live="polite">
            {slides.map((slide, index) => (
              <article
                className={`event-addons__slide${index === activeIndex ? ' is-active' : ''}`}
                data-event-addons-slide=""
                aria-hidden={index === activeIndex ? undefined : 'true'}
                inert={index === activeIndex ? undefined : true}
                key={slide.id}
              >
                <div className="event-addons__visual">
                  <img
                    className="event-addons__image"
                    src={slide.image}
                    alt={slide.alt}
                    width="472"
                    height="682"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="event-addons__controls event-addons__controls--media">
                    <button
                      className="event-addons__arrow button-reset"
                      type="button"
                      aria-label="Предыдущее дополнение"
                      data-event-addons-prev=""
                      disabled={activeIndex === 0}
                      onClick={() => show(activeIndex - 1)}
                    >
                      <span aria-hidden="true" />
                    </button>
                    <button
                      className="event-addons__arrow button-reset"
                      type="button"
                      aria-label="Следующее дополнение"
                      data-event-addons-next=""
                      disabled={activeIndex === slides.length - 1}
                      onClick={() => show(activeIndex + 1)}
                    >
                      <span aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="event-addons__details">
                  <span className="event-addons__count">
                    {String(index + 1).padStart(2, '0')}
                    <span>/{String(slides.length).padStart(2, '0')}</span>
                  </span>
                  <h3 className="event-addons__slide-title">{slide.title}</h3>
                  <p className="event-addons__description">{slide.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div
            className="event-addons__progress"
            role="group"
            aria-label="Выбор дополнения к празднику"
          >
            {slides.map((slide, index) => (
              <button
                className={`event-addons__progress-step button-reset${index === activeIndex ? ' is-active' : ''}`}
                type="button"
                aria-label={`${slide.title}, ${index + 1} из ${slides.length}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                data-event-addons-step={index}
                onClick={() => show(index)}
                key={slide.id}
              />
            ))}
          </div>

          <div className="event-addons__controls event-addons__controls--desktop">
            <button
              className="event-addons__arrow button-reset"
              type="button"
              aria-label="Предыдущее дополнение"
              data-event-addons-prev=""
              disabled={activeIndex === 0}
              onClick={() => show(activeIndex - 1)}
            >
              <span aria-hidden="true" />
            </button>
            <button
              className="event-addons__arrow button-reset"
              type="button"
              aria-label="Следующее дополнение"
              data-event-addons-next=""
              disabled={activeIndex === slides.length - 1}
              onClick={() => show(activeIndex + 1)}
            >
              <span aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
