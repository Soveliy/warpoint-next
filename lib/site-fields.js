export function validExternalUrl(value) {
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) ? url.toString() : null;
  } catch {
    return null;
  }
}

export function siteFields(site) {
  const first = site.arenas[0] || {};
  const booking =
    site.arenas.length === 1 ? validExternalUrl(first.bookingUrl) || '#contacts' : '#contacts';
  const latitude = Number(first.coordinates?.latitude);
  const longitude = Number(first.coordinates?.longitude);
  const hasMap = Number.isFinite(latitude) && Number.isFinite(longitude);
  const point = `${longitude},${latitude}`;
  const mapSrc = hasMap
    ? `https://yandex.ru/map-widget/v1/?${new URLSearchParams({ ll: point, z: '16' })}`
    : null;

  return {
    first,
    booking,
    contactsBooking: validExternalUrl(first.bookingUrl) || '#contacts',
    local: site.city === 'Екатеринбург',
    map: hasMap
      ? {
          coordinates: `${latitude},${longitude}`,
          title: `${first.title}, ${site.city} — Warpoint на Яндекс Картах`,
          src: mapSrc,
          route: `https://yandex.ru/maps/?rtext=~${latitude},${longitude}&rtt=auto`,
        }
      : null,
  };
}
