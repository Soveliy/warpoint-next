'use client';

import { useEffect, useRef } from 'react';
import { locationTariffs } from '../../lib/site-tariffs';
import EventApiTariffs from './EventApiTariffs';
import LocationSelection from './LocationSelection';
import { useSiteLocation } from './SiteLocationProvider';

export default function EventTariffLocation({ children, context }) {
  const { site, location } = useSiteLocation();
  const locationKey = location?.id || location?.title || '';
  const content = useRef(null);
  const available = Boolean(location);

  useEffect(() => {
    if (!available) return;
    const element = content.current;
    let active = true;
    let slider;
    const frame = requestAnimationFrame(async () => {
      const [{ initSliders }, { ScrollTrigger }] = await Promise.all([
        import('../../interactions/components/sliders'),
        import('gsap/ScrollTrigger'),
      ]);
      if (!active || !element?.isConnected) return;
      initSliders();
      slider = element.querySelector('[data-event-tariffs-slider]')?.swiper;
      ScrollTrigger.refresh();
    });
    return () => {
      active = false;
      cancelAnimationFrame(frame);
      slider?.destroy(true, true);
    };
  }, [available, location, context]);

  return (
    <LocationSelection>
      <div className="event-tariffs__content" ref={content} key={locationKey}>
        {locationTariffs(site, location, context)?.length ? (
          <EventApiTariffs category={context} />
        ) : (
          children
        )}
      </div>
    </LocationSelection>
  );
}
