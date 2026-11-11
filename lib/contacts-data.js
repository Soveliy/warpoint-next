import { siteFields } from './site-fields';

// The current ERP response has no phone/email fields. These contacts already
// appear in the site's Ekaterinburg contacts section.
const cityContacts = {
  Екатеринбург: {
    phone: '+7 (343) 289-57-00',
    phoneHref: 'tel:+73432895700',
    email: 'ekb@warpoint.ru',
  },
};

export const businessContacts = [
  {
    id: 'feedback',
    title: 'Обратная связь',
    description: 'Расскажите, как прошла игра, или задайте вопрос о посещении.',
    email: 'feedback@warpoint.ru',
  },
  {
    id: 'partnership',
    title: 'Реклама и сотрудничество',
    description: 'Для совместных проектов, рекламы и предложений о партнёрстве.',
    email: 'pr@warpoint.ru',
  },
  {
    id: 'franchise',
    title: 'Франшиза',
    description: 'Узнайте, как открыть парк WARPOINT в своём городе.',
    email: 'sale@warpoint.ru',
  },
];

export function contactsForSite(site) {
  return {
    city: cityContacts[site.city] || null,
    locations: site.arenas.map((arena, index) => {
      const fields = siteFields({ ...site, arenas: [arena] });
      const search = new URL('https://yandex.ru/maps/');
      search.searchParams.set('text', `${site.city}, ${arena.address || arena.title}`);

      return {
        id: `${arena.title}-${arena.address || index}`,
        index,
        title: arena.title,
        address: arena.address || site.city,
        addressRef: arena.addressRef,
        subwayStation: arena.subwayStation,
        type: arena.type,
        hours:
          arena.hours?.open_time && arena.hours?.close_time
            ? `${arena.hours.open_time.slice(0, 5)}–${arena.hours.close_time.slice(0, 5)}`
            : null,
        map: fields.map,
        route: fields.map?.route || search.toString(),
      };
    }),
  };
}

export function contactPageSchema(site, contacts) {
  const url = new URL('/contacts', site.canonicalUrl).toString();

  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': url,
    url,
    name: `Контакты WARPOINT — ${site.city}`,
    inLanguage: 'ru',
    mainEntity: contacts.locations.map((location) => ({
      '@type': 'LocalBusiness',
      name: `WARPOINT — ${location.title}`,
      url: `${url}#contact-location-${location.index}`,
      address: `${site.city}, ${location.address}`,
      hasMap: location.route,
      ...(contacts.city && {
        telephone: contacts.city.phone,
        email: contacts.city.email,
      }),
      ...(location.map && {
        geo: {
          '@type': 'GeoCoordinates',
          latitude: Number(location.map.coordinates.split(',')[0]),
          longitude: Number(location.map.coordinates.split(',')[1]),
        },
      }),
    })),
  };
}
