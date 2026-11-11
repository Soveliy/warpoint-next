import { cache } from 'react';
import { headers } from 'next/headers';
import { normalizeLegacyArena, normalizeSitesSite, siteHostname } from './erp-sites';
import { fetchErpSites } from './erp-site-transport';
import { siteDescription } from './site-pages';

const endpoint =
  process.env.ERP_COUNTRIES_URL || 'https://gserver.warpoint.ru/api/site/v2/countries';
const revalidateSeconds = Math.max(
  60,
  Number.parseInt(process.env.ERP_REVALIDATE_SECONDS || '300', 10) || 300,
);

const hostnameOf = siteHostname;

function requestHostname(value) {
  const first = String(value || '')
    .split(',')[0]
    .trim()
    .toLowerCase();
  return first.replace(/:\d+$/, '');
}

function siteUrlFor(hostname) {
  return `https://${hostname}/`;
}

export const getSite = cache(async () => {
  const requestHeaders = await headers();
  const requestedHost = requestHostname(
    requestHeaders.get('x-forwarded-host') || requestHeaders.get('host'),
  );
  const isLocal = requestedHost === 'localhost' || requestedHost === '127.0.0.1';
  const isVercelHost = requestedHost.endsWith('.vercel.app');
  const hostname =
    isLocal || isVercelHost
      ? requestHostname(process.env.PREVIEW_SITE_HOST || 'warpoint.ru')
      : requestedHost;

  let data = null;
  const siteToken = process.env.ERP_SITE_TOKEN?.trim();
  if (siteToken) {
    const sitesData = await fetchErpSites({
      endpoint:
        process.env.ERP_SITES_URL || 'https://dserver.warpoint.ru/api/wp_site/public/sites/',
      token: siteToken,
    });
    let legacyData = null;
    try {
      const legacyResponse = await fetch(endpoint, {
        next: { revalidate: revalidateSeconds },
        signal: AbortSignal.timeout(8000),
      });
      if (legacyResponse.ok) legacyData = await legacyResponse.json();
    } catch {
      // Public content remains available when the supplemental legacy ERP is down.
    }
    const site = normalizeSitesSite(sitesData, legacyData, { hostname, isVercelHost });
    if (site) return site;
    data = legacyData;
  }

  if (!data) {
    const response = await fetch(endpoint, {
      next: { revalidate: revalidateSeconds },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`ERP returned ${response.status}`);
    data = await response.json();
  }
  const directory = (data.countries || []).flatMap((country) =>
    (country.city || []).flatMap((city) => {
      const arenas = (city.arenas || [])
        .filter((arena) => hostnameOf(arena.links?.site_url))
        .map((arena) => ({
          title: arena.title,
          address: arena.address,
          url: arena.links.site_url,
        }));
      const url = arenas[0]?.url;
      return url && !(hostnameOf(url) === 'warpoint.ru' && city.name !== 'Екатеринбург')
        ? [
            {
              country: country.name,
              countryId: country.prefix?.toLowerCase() || '',
              city: city.name,
              url,
              arenas,
            },
          ]
        : [];
    }),
  );
  const matches = (data.countries || []).flatMap((country) =>
    (country.city || []).flatMap((city) => {
      const arenas = (city.arenas || []).filter(
        (arena) => hostnameOf(arena.links?.site_url) === hostname,
      );
      return arenas.length ? [{ country, city, arenas }] : [];
    }),
  );

  // The current ERP response maps both Minsk and Ekaterinburg to warpoint.ru.
  // Keep the existing main site on Ekaterinburg until ERP gives it a unique host.
  const match =
    (hostname === 'warpoint.ru'
      ? matches.find(({ city }) => city.name === 'Екатеринбург')
      : null) || matches[0];

  if (!match) return null;

  const canonicalUrl = siteUrlFor(hostname);
  return {
    hostname,
    isVercelHost,
    canonicalUrl,
    country: match.country.name,
    countryId: match.country.prefix?.toLowerCase() || 'ru',
    city: match.city.name,
    cityKey: match.city.site_mnemonic,
    directory,
    arenas: match.arenas.map((arena) => normalizeLegacyArena(arena, match.city.name)),
  };
});

export function metadataFor(site, title, description, path = '/') {
  if (['/', '/indexpage', '/indexpage/'].includes(path)) {
    description = siteDescription(site) || description;
  }
  const canonical = new URL(
    path === '/' ? path : path.replace(/\/$/, ''),
    site.canonicalUrl,
  ).toString();
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, siteName: 'WARPOINT' },
    ...(site.isVercelHost ? { robots: { index: false, follow: false } } : {}),
  };
}
