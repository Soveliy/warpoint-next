'use client';

import { eventContent, eventParameters } from '../../lib/event-site-content';
import { useSiteLocation } from './SiteLocationProvider';

export default function EventParameters({
  category,
  fallback,
  as: Element = 'li',
  className = 'hero-event__param',
}) {
  const { site, location } = useSiteLocation();
  const parameters = eventParameters(eventContent(site, location, category), fallback);
  return parameters.map((parameter) => (
    <Element className={className} key={parameter.id}>
      {parameter.value}
    </Element>
  ));
}
