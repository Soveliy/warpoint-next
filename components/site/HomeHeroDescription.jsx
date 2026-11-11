'use client';

import { useSiteLocation } from './SiteLocationProvider';
import { siteDescription } from '../../lib/site-pages';

export default function HomeHeroDescription({ children }) {
  const { site, location } = useSiteLocation();
  return siteDescription(site, location) || children;
}
