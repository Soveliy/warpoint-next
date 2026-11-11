'use client';

import { useEffect, useMemo, useRef } from 'react';
import { GameCarouselCards } from './GameCarouselCard';
import { games } from '../../lib/games';
import { availableGames } from '../../lib/site-content';
import { useSiteLocation } from './SiteLocationProvider';

export default function GamesGroup({ site }) {
  const { location, locationId } = useSiteLocation();
  const root = useRef(null);
  const items = useMemo(
    () => (site.source === 'wp-sites' ? availableGames(site, location, games) : undefined),
    [site, location],
  );
  const sliderKey = site.source + ':' + locationId;

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let active = true;
    import('../../interactions/components/sliders').then(({ initSliders }) => {
      if (active) initSliders();
    });
    return () => {
      active = false;
      element.querySelector('[data-slider]')?.swiper?.destroy(true, true);
    };
  }, [sliderKey, items]);

  if (items?.length === 0) return null;
  return (
    <>
      <div className="games-group" data-games-group="" data-pixel-section="">
        {'\n      '}
        <div className="games-group__background" aria-hidden="true">
          {'\n        '}
          <span className="games-group__background-pattern"></span>
          {'\n        '}
          <span className="games-group__background-gradient"></span>
          {'\n      '}
        </div>
        {'\n      '}
        <section
          key={sliderKey}
          ref={root}
          className="games-catalog"
          data-header-theme="dark"
          aria-labelledby="games-catalog-title"
          data-slider-root=""
        >
          {'\n        '}
          <h2 className="games-catalog__title" id="games-catalog-title">
            {'\n          '}
            <span>{'Выберите своё'}</span>
            {'\n          '}
            <span>{'виртуальное приключение'}</span>
            {'\n        '}
          </h2>
          {'\n        '}
          <div className="games-catalog__track">
            {'\n          '}
            <div className="games-catalog__slider swiper" data-slider="" data-games-slider="">
              {'\n            '}
              <div className="swiper-wrapper">
                {'\n              '}
                <GameCarouselCards items={items} />
                {'\n            '}
              </div>
              {'\n          '}
            </div>
            {'\n          '}
            <div className="games-catalog__controls slider-controls">
              {'\n            '}
              <button
                className="slider-arrow slider-arrow--prev button-reset"
                type="button"
                aria-label="Предыдущая игра"
                data-slider-prev=""
              >
                {'\n              '}
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  {'\n                '}
                  <path d="m9 5 7 7-7 7"></path>
                  {'\n              '}
                </svg>
                {'\n            '}
              </button>
              {'\n            '}
              <button
                className="slider-arrow slider-arrow--next button-reset"
                type="button"
                aria-label="Следующая игра"
                data-slider-next=""
              >
                {'\n              '}
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  {'\n                '}
                  <path d="m9 5 7 7-7 7"></path>
                  {'\n              '}
                </svg>
                {'\n            '}
              </button>
              {'\n          '}
            </div>
            {'\n        '}
          </div>
          {'\n      '}
        </section>
        {'\n    '}
      </div>
    </>
  );
}
