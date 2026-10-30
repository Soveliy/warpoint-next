import { cache } from 'react';
import { headers } from 'next/headers';

const endpoint =
  process.env.ERP_COUNTRIES_URL || 'https://gserver.warpoint.ru/api/site/v2/countries';
const revalidateSeconds = Math.max(
  60,
  Number.parseInt(process.env.ERP_REVALIDATE_SECONDS || '300', 10) || 300,
);

function hostnameOf(url) {
  try {
    const parsed = new URL(url);
    return ['https:', 'http:'].includes(parsed.protocol) ? parsed.hostname.toLowerCase() : null;
  } catch {
    return null;
  }
}

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

function coordinatesFor(arena, city) {
  const latitude = Number(arena.coordinates?.latitude);
  const longitude = Number(arena.coordinates?.longitude);
  if (
    arena.coordinates?.latitude != null &&
    arena.coordinates?.longitude != null &&
    Number.isFinite(latitude) &&
    Number.isFinite(longitude)
  ) {
    return { latitude, longitude };
  }

  // ERP currently leaves these coordinates empty, while the existing site has
  // verified map points for its three Ekaterinburg clubs.
  if (city !== 'Екатеринбург') return null;
  const known = [
    ['Алатырь', 56.832969, 60.582374],
    ['Веер', 56.916713, 60.613258],
    ['Радуга', 56.817183, 60.538536],
  ].find(([name]) => arena.title?.includes(name));
  return known ? { latitude: known[1], longitude: known[2] } : null;
}

export const getSite = cache(async () => {
  const requestHeaders = await headers();
  const requestedHost = requestHostname(
    requestHeaders.get('x-forwarded-host') || requestHeaders.get('host'),
  );
  const isLocal = requestedHost === 'localhost' || requestedHost === '127.0.0.1';
  const hostname = isLocal
    ? requestHostname(process.env.PREVIEW_SITE_HOST || 'warpoint.ru')
    : requestedHost;

  const response = await fetch(endpoint, {
    next: { revalidate: revalidateSeconds },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) {
    throw new Error(`ERP returned ${response.status}`);
  }

  const data = await response.json();
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
        ? [{ country: country.name, countryId: country.prefix?.toLowerCase() || '', city: city.name, url, arenas }]
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
    canonicalUrl,
    country: match.country.name,
    countryId: match.country.prefix?.toLowerCase() || 'ru',
    city: match.city.name,
    cityKey: match.city.site_mnemonic,
    directory,
    arenas: match.arenas.map((arena) => ({
      title: arena.title,
      address: arena.address,
      addressRef: arena.address_ref || '',
      hours: arena.work_time,
      coordinates: coordinatesFor(arena, match.city.name),
      bookingUrl: arena.links?.booking_url || null,
    })),
  };
});

export function metadataFor(site, title, description, path = '/') {
  const canonical = new URL(
    path === '/' ? path : path.replace(/\/$/, ''),
    site.canonicalUrl,
  ).toString();
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, siteName: 'WARPOINT' },
  };
}
