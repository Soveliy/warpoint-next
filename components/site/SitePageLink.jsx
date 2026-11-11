'use client';

import { useSiteLocation } from './SiteLocationProvider';
import { sitePageLink } from '../../lib/site-pages';

export default function SitePageLink({ page, href, children, ...props }) {
  const { site, location } = useSiteLocation();
  const link = sitePageLink(site, location, page, href);
  return (
    <a {...props} href={link.href}>
      {link.title || children}
    </a>
  );
}
