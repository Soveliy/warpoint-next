'use client';

import { eventContent } from '../../lib/event-site-content';
import { useSiteLocation } from './SiteLocationProvider';

export default function EventContentValue({ category, field, children }) {
  const { site, location } = useSiteLocation();
  return eventContent(site, location, category)?.[field] || children;
}
