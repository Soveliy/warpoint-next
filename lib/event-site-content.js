import { eventAddons, eventQuizExtras } from './event-addons.js';
import { locationExtras, publicUrl } from './site-content.js';

const extraTemplateIds = {
  master_class: 'master-class',
  storymaker: 'photo-video',
  photographer: 'photo-video',
  pinata: 'pinata',
  dj_and_host: 'host',
  mirror_man_show: 'animator',
  holiday_cake: 'cake',
};
const extraKey = (value) =>
  typeof value === 'string' ? value.toLowerCase().replace(/[^a-zа-яё0-9]/g, '') : '';

const eventCodes = {
  birthday: ['kids_bday', 'kids_birthday', 'birthday'],
  'kids-birthday': ['kids_bday', 'kids_birthday', 'birthday'],
  corporate: ['corporate', 'corporate_teambuilding'],
  graduation: ['graduation', 'school_graduation'],
  'adult-birthday': ['adult_bday', 'adult_birthday'],
  'mobile-event': ['mobile_event', 'mobile_arena'],
};

const text = (value) => {
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return typeof value === 'string' ? value.trim() : '';
};

function eventEntries(site, location) {
  if (site?.source !== 'wp-sites') return [];
  const arenas = site.arenas || [];
  const arena = location || arenas.find((item) => item.slug === site.slug) || arenas[0];
  return Array.isArray(arena?.content?.events) ? arena.content.events : [];
}

export function eventContent(site, location, eventType) {
  const codes = eventCodes[eventType] || [eventType];
  const event = eventEntries(site, location).find((item) => codes.includes(item?.code));
  if (!event) return null;
  const field = (code) =>
    text(Array.isArray(event.fields) ? event.fields.find((item) => item.code === code)?.value : '');
  return {
    title: text(event.title),
    description: text(event.description) || field('description'),
    image: publicUrl(event.image),
    age: field('age_restrictions'),
    capacity: field('capacity'),
  };
}

export function eventParameters(content, fallback = {}) {
  const age = content?.age || fallback.age;
  const capacity = content?.capacity || fallback.capacity;
  return [
    ...(age ? [{ id: 'age', value: /^\d+$/.test(age) ? age + '+' : age }] : []),
    ...(capacity
      ? [
          {
            id: 'capacity',
            value: /^\d+$/.test(capacity) ? 'до ' + capacity + ' гостей' : capacity,
          },
        ]
      : []),
    ...(fallback.classes ? [{ id: 'classes', value: fallback.classes }] : []),
  ];
}

export function additionalEventChoices(site, location) {
  const knownCodes = new Set(Object.values(eventCodes).flat());
  return eventEntries(site, location)
    .filter((event) => text(event.code) && text(event.title) && !knownCodes.has(event.code))
    .slice()
    .sort((first, second) => (first.sort || 0) - (second.sort || 0))
    .map((event) => ({ value: event.code, title: text(event.title) }));
}

export function eventSlides(site, location, eventType) {
  const templates = eventAddons[eventType] || eventAddons.birthday;
  const extras = locationExtras(site, location);
  if (extras === null) return templates;
  return extras.flatMap((extra) => {
    const templateId = extraTemplateIds[extra.code] || extra.code;
    const template = templates.find(
      (item) => item.id === templateId || extraKey(item.title) === extraKey(extra.title),
    );
    const image = publicUrl(extra.image) || template?.image;
    if (!image) return [];
    return [
      {
        ...template,
        id: extra.code,
        image,
        title: text(extra.title) || template?.title || extra.code,
        description:
          text(extra.description) || text(extra.short_description) || template?.description || '',
        alt: text(extra.image_alt) || template?.alt || text(extra.title),
      },
    ];
  });
}

export function programExtras(site, location) {
  const extras = locationExtras(site, location);
  return extras === null
    ? eventQuizExtras
    : extras.map((extra) => ({ value: extra.code, title: extra.title || extra.code }));
}
