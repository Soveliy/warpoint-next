export const locationCookieName = 'warpoint-location';

export function selectionFromCookie(site, cookie = '') {
  try {
    const value = cookie
      .split(';')
      .map((part) => part.trim())
      .find((part) => part.startsWith(locationCookieName + '='));
    if (!value) return null;
    const saved = JSON.parse(decodeURIComponent(value.slice(locationCookieName.length + 1)));
    if (saved.hostname !== site.hostname || saved.city !== site.city) return null;
    const index = site.arenas.findIndex(
      (arena) => arena.title === saved.title && arena.address === saved.address,
    );
    return index >= 0 ? index : null;
  } catch {
    return null;
  }
}

export function selectionCookie(site, index, secure = false) {
  const arena = site.arenas[index];
  if (!arena) return null;
  const value = encodeURIComponent(
    JSON.stringify({
      hostname: site.hostname,
      city: site.city,
      title: arena.title,
      address: arena.address,
    }),
  );
  return (
    locationCookieName +
    '=' +
    value +
    '; Path=/; Max-Age=15552000; SameSite=Lax' +
    (secure ? '; Secure' : '')
  );
}
