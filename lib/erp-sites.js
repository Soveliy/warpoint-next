const zoneCodes = {
  arena: 'arena',
  vr_station: 'vr',
  vr: 'vr',
  extreme: 'extreme',
  simulators: 'simulators',
  lounge: 'lounge',
};

const contentFields = [
  'id',
  'slug',
  'pages',
  'domain',
  'events',
  'extras',
  'reviews',
  'tariffs',
  'game_zones',
  'promotions',
  'description',
  'announcements',
  'game_categories',
  'info_announcement',
];

const countryCodes = {
  россия: 'ru',
  russia: 'ru',
  беларусь: 'by',
  belarus: 'by',
  казахстан: 'kz',
  kazakhstan: 'kz',
};

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function list(value) {
  return Array.isArray(value) ? value : [];
}

function text(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizedName(value) {
  return text(value)
    .toLocaleLowerCase('ru-RU')
    .replace(/[«»„“”]/g, '"')
    .replace(/\s+/g, ' ');
}

function uuid(value) {
  const id = text(value).toLowerCase();
  return /^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/.test(id) ? id : '';
}

export function siteHostname(value) {
  const source = text(value);
  if (!source) return null;
  try {
    const parsed = new URL(source.includes('://') ? source : 'https://' + source);
    return ['https:', 'http:'].includes(parsed.protocol) && !parsed.username && !parsed.password
      ? parsed.hostname.toLowerCase()
      : null;
  } catch {
    return null;
  }
}

function samePlace(current, previous) {
  const currentId = uuid(current.id);
  const previousId = uuid(previous.id);
  if (currentId && previousId) return currentId === previousId;
  return normalizedName(current.name) === normalizedName(previous.name);
}

function validTimezone(value) {
  const timezone = text(value);
  try {
    return timezone
      ? new Intl.DateTimeFormat('en', { timeZone: timezone }).resolvedOptions().timeZone
      : 'UTC';
  } catch {
    return 'UTC';
  }
}

function coordinatesFor(arena, city) {
  const latitude = Number(arena.coordinates?.latitude);
  const longitude = Number(arena.coordinates?.longitude);
  if (
    arena.coordinates?.latitude != null &&
    arena.coordinates?.longitude != null &&
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    Math.abs(latitude) <= 90 &&
    Math.abs(longitude) <= 180
  )
    return { latitude, longitude };

  // Verified map points already used by the existing Ekaterinburg site.
  if (city !== 'Екатеринбург') return null;
  const known = [
    ['Алатырь', 56.832969, 60.582374],
    ['Веер', 56.916713, 60.613258],
    ['Радуга', 56.817183, 60.538536],
  ].find(([name]) => arena.title?.includes(name));
  return known ? { latitude: known[1], longitude: known[2] } : null;
}

export function normalizeLegacyArena(arena, city) {
  return {
    ...(uuid(arena.id) && { id: uuid(arena.id) }),
    title: text(arena.title),
    address: text(arena.address),
    addressRef: text(arena.address_ref),
    subwayStation: text(arena.subway_station) || null,
    type: text(arena.location_type?.title) || null,
    hours: arena.work_time ?? null,
    coordinates: coordinatesFor(arena, city),
    bookingUrl: text(arena.links?.booking_url) || null,
    phone: text(arena.phone) || null,
    email: text(arena.email) || null,
  };
}

function legacyEntries(data) {
  return list(data?.countries)
    .filter(isRecord)
    .flatMap((country) =>
      list(country.city)
        .filter(isRecord)
        .map((city) => ({ country, city })),
    );
}

function sitesEntries(data) {
  return list(data?.countries)
    .filter(isRecord)
    .flatMap((country) =>
      list(country.cities)
        .filter(isRecord)
        .flatMap((city) => {
          const arenas = list(city.arenas).filter(
            (arena) =>
              isRecord(arena) && uuid(arena.id) && text(arena.title) && isRecord(arena.site),
          );
          return text(country.name) && text(city.name) && arenas.length
            ? [{ country, city, arenas }]
            : [];
        }),
    );
}

function publicContent(site) {
  return Object.fromEntries(
    contentFields.filter((name) => Object.hasOwn(site, name)).map((name) => [name, site[name]]),
  );
}

function legacyCityFor(entry, previousEntries) {
  const matches = previousEntries.filter(
    (previous) =>
      samePlace(entry.country, previous.country) && samePlace(entry.city, previous.city),
  );
  return matches.length === 1 ? matches[0] : null;
}

function legacyArenaFor(arena, city) {
  const candidates = list(city?.arenas).filter(isRecord);
  const idMatches = candidates.filter((candidate) => uuid(candidate.id) === uuid(arena.id));
  if (idMatches.length) return idMatches.length === 1 ? idMatches[0] : null;
  const titleMatches = candidates.filter(
    (candidate) => normalizedName(candidate.title) === normalizedName(arena.title),
  );
  return titleMatches.length === 1 ? titleMatches[0] : null;
}

function countryCode(country, previous) {
  return (
    text(country.prefix || country.code || previous?.country.prefix).toLowerCase() ||
    (Object.hasOwn(countryCodes, normalizedName(country.name))
      ? countryCodes[normalizedName(country.name)]
      : '')
  );
}

function normalizeCity(entry, previousEntries) {
  const previous = legacyCityFor(entry, previousEntries);
  const arenas = entry.arenas.map((arena) => {
    const legacy = legacyArenaFor(arena, previous?.city);
    const content = publicContent(arena.site);
    return {
      ...normalizeLegacyArena({ ...(legacy || {}), title: arena.title }, entry.city.name),
      id: uuid(arena.id),
      siteId: uuid(content.id) || null,
      slug: text(content.slug),
      content,
      zoneIds: [
        ...new Set(
          list(content.game_zones).flatMap((zone) =>
            Object.hasOwn(zoneCodes, zone?.code) ? [zoneCodes[zone.code]] : [],
          ),
        ),
      ],
    };
  });
  return {
    ...entry,
    previous,
    arenas,
    countryId: countryCode(entry.country, previous),
    timezone: validTimezone(entry.city.timezone),
  };
}

export function normalizeSitesSite(data, legacyData, { hostname, isVercelHost = false }) {
  const requestedHost = siteHostname(hostname);
  if (!requestedHost) return null;
  const previousEntries = legacyEntries(legacyData);
  const entries = sitesEntries(data).map((entry) => normalizeCity(entry, previousEntries));
  const exact = entries.find((entry) =>
    entry.arenas.some((arena) => siteHostname(arena.content.domain) === requestedHost),
  );
  const legacyAlias =
    requestedHost === 'warpoint.ru'
      ? entries.find((entry) => entry.city.name === 'Екатеринбург' && entry.countryId === 'ru')
      : null;
  const match = legacyAlias || exact;
  if (!match) return null;
  const currentArena =
    match.arenas.find((arena) => siteHostname(arena.content.domain) === requestedHost) ||
    match.arenas[0];
  const directory = entries.flatMap((entry) => {
    const arenas = entry.arenas.flatMap((arena) => {
      const host = siteHostname(arena.content.domain);
      return host
        ? [
            {
              id: arena.id,
              title: arena.title,
              address: arena.address,
              url: 'https://' + host + '/',
            },
          ]
        : [];
    });
    return arenas.length
      ? [
          {
            country: entry.country.name,
            countryId: entry.countryId,
            city: entry.city.name,
            url: arenas[0].url,
            arenas,
          },
        ]
      : [];
  });
  return {
    source: 'wp-sites',
    hostname: requestedHost,
    canonicalUrl: 'https://' + requestedHost + '/',
    isVercelHost,
    country: match.country.name,
    countryId: match.countryId,
    countryUuid: uuid(match.country.id) || null,
    city: match.city.name,
    cityId: uuid(match.city.id) || null,
    cityKey: match.previous?.city.site_mnemonic || null,
    timezone: match.timezone,
    slug: currentArena.slug,
    directory,
    arenas: match.arenas,
  };
}
