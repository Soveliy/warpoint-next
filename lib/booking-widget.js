function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function hasText(value, maxLength = 500) {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= maxLength;
}

export function bookingWidgetUrl(baseUrl, context) {
  try {
    const url = new URL(baseUrl);
    const parent = new URL(context.parentOrigin);
    if (
      !['https:', 'http:'].includes(url.protocol) ||
      url.username ||
      url.password ||
      !['https:', 'http:'].includes(parent.protocol) ||
      context.parentOrigin !== parent.origin ||
      (parent.protocol === 'https:' && url.protocol !== 'https:') ||
      !hasText(context.hostname, 253) ||
      !hasText(context.instanceId, 128)
    )
      return null;

    url.search = '';
    url.hash = '';
    url.searchParams.set('site', context.hostname);
    url.searchParams.set('locationId', context.locationId || '');
    if (context.location?.id) url.searchParams.set('arenaId', context.location.id);
    if (context.location?.siteId) url.searchParams.set('siteId', context.location.siteId);
    url.searchParams.set('locationTitle', context.location?.title || '');
    url.searchParams.set('locationAddress', context.location?.address || '');
    url.searchParams.set('parentOrigin', parent.origin);
    url.searchParams.set('instanceId', context.instanceId);
    return url;
  } catch {
    return null;
  }
}

function validAddress(address, arenaId) {
  if (typeof address === 'string' && address.trim() && address.length <= 1000) return true;
  return hasText(arenaId, 128) && (address === null || address === '');
}

function validResult(payload) {
  if (!isRecord(payload) || !isRecord(payload.arena) || !isRecord(payload.contacts)) return false;
  return (
    payload.preview === true &&
    hasText(payload.city, 120) &&
    hasText(payload.countryId, 16) &&
    Number.isInteger(payload.arena.index) &&
    payload.arena.index >= 0 &&
    hasText(payload.arena.title) &&
    validAddress(payload.arena.address, payload.arena.id) &&
    hasText(payload.format, 80) &&
    hasText(payload.tariff, 80) &&
    typeof payload.date === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(payload.date) &&
    typeof payload.time === 'string' &&
    /^([01]\d|2[0-3]):[0-5]\d$/.test(payload.time) &&
    Number.isInteger(payload.participants) &&
    payload.participants > 0 &&
    Number.isFinite(payload.total) &&
    payload.total >= 0 &&
    Number.isFinite(payload.deposit) &&
    payload.deposit >= 0 &&
    payload.deposit <= payload.total &&
    hasText(payload.contacts.name, 100) &&
    hasText(payload.contacts.phone, 50) &&
    typeof payload.contacts.email === 'string' &&
    payload.contacts.email.length <= 254 &&
    payload.contacts.consent === true &&
    payload.contacts.agreement === true &&
    typeof payload.contacts.newsletter === 'boolean' &&
    ['card', 'certificate'].includes(payload.payment)
  );
}

export function bookingWidgetMessage(event, { origin, source, instanceId }) {
  const data = event.data;
  if (
    !source ||
    event.origin !== origin ||
    event.source !== source ||
    !isRecord(data) ||
    data.source !== 'warpoint-booking' ||
    data.version !== 1 ||
    data.instanceId !== instanceId
  )
    return null;

  if (data.type === 'ready' || data.type === 'close') return data;
  if (data.type === 'result') return validResult(data.payload) ? data : null;
  if (data.type === 'location-change') {
    const payload = data.payload;
    return isRecord(payload) &&
      hasText(payload.hostname, 253) &&
      hasText(payload.title) &&
      validAddress(payload.address, payload.arenaId || payload.locationId)
      ? data
      : null;
  }
  if (data.type === 'resize') {
    const height = data.payload?.height;
    return Number.isFinite(height) && height > 0 && height <= 10000 ? data : null;
  }
  return null;
}

export function bookingWidgetLocationIndex(site, payload) {
  if (payload.hostname !== site.hostname) return -1;
  const arenaId = payload.arenaId || payload.locationId;
  const stableIndex = site.arenas.findIndex((arena) => arena.id && arena.id === arenaId);
  if (stableIndex >= 0) return stableIndex;
  return site.arenas.findIndex(
    (arena) => arena.title === payload.title && arena.address === payload.address,
  );
}
