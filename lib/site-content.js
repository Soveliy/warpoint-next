export function publicUrl(value) {
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password
      ? url.href
      : null;
  } catch {
    return null;
  }
}

const sorted = (items) =>
  [...(Array.isArray(items) ? items : [])]
    .filter((item) => item && typeof item === 'object')
    .sort((left, right) => (left.sort || 0) - (right.sort || 0));
const text = (value) => (typeof value === 'string' ? value.trim() : '');
const contentKey = (value) =>
  text(value)
    .toLowerCase()
    .replace(/[^a-zа-яё0-9]/g, '');

function matchingItem(items, entry) {
  return items.find(
    (item) =>
      (entry.id && item.id === entry.id) ||
      (contentKey(entry.title) && contentKey(item.title) === contentKey(entry.title)),
  );
}

export function locationPromotions(location, fallback = []) {
  const entries = sorted(location?.content?.promotions);
  if (!entries.length) return fallback;
  const labels = { discount: 'Скидка', cashback: 'Кэшбэк' };
  return entries.map((promotion) => {
    const previous = matchingItem(fallback, promotion) || {};
    return {
      ...previous,
      id: promotion.id || previous.id || promotion.title,
      type: labels[promotion.type] || text(promotion.type) || previous.type || '',
      value: text(promotion.benefit_size) || previous.value || '',
      title: text(promotion.title) || previous.title || '',
      summary: text(promotion.short_description) || previous.summary || '',
      terms: text(promotion.detailed_terms) || previous.terms || '',
      location: text(location.title) || previous.location || '',
      buttonText: text(promotion.button_text) || previous.buttonText || '',
      buttonUrl: publicUrl(promotion.button_url) || publicUrl(previous.buttonUrl),
    };
  });
}

export function cityTimeZone(value) {
  try {
    return new Intl.DateTimeFormat('ru-RU', { timeZone: value || 'UTC' }).resolvedOptions()
      .timeZone;
  } catch {
    return 'UTC';
  }
}

export function locationAnnouncements(location, timezone, fallback = []) {
  const entries = sorted(location?.content?.announcements);
  if (!entries.length) return fallback;
  const timeZone = cityTimeZone(timezone);
  return entries
    .flatMap((event) => {
      const previous = matchingItem(fallback, event) || {};
      const date = new Date(event.starts_at);
      if (!event.starts_at || Number.isNaN(date.getTime())) return previous.id ? [previous] : [];
      const parts = new Intl.DateTimeFormat('ru-RU', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
      }).formatToParts(date);
      const part = (name) => parts.find((item) => item.type === name)?.value || '';
      const dayAndMonth = new Intl.DateTimeFormat('ru-RU', {
        timeZone,
        day: 'numeric',
        month: 'long',
      }).format(date);
      const title = text(event.title) || previous.title || '';
      return [
        {
          ...previous,
          id: event.id || previous.id || event.title,
          startsAt: date.toISOString(),
          date: part('year') + '-' + part('month') + '-' + part('day'),
          day: String(Number(part('day'))),
          month: dayAndMonth.replace(/^\d+\s+/, ''),
          weekday: new Intl.DateTimeFormat('ru-RU', { timeZone, weekday: 'long' }).format(date),
          time: part('hour') + ':' + part('minute'),
          category: text(event.label) || previous.category || '',
          title,
          titleLines: text(event.title) ? [title] : previous.titleLines || [title],
          description: text(event.short_description) || previous.description || '',
          detailedDescription:
            text(event.detailed_description) || previous.detailedDescription || '',
          location: text(event.place) || text(location.title) || previous.location || '',
          city: text(event.city) || previous.city || '',
          phone: text(event.phone) || previous.phone || '',
          image: publicUrl(event.image) || previous.image || null,
          showRequestButton:
            typeof event.show_request_button === 'boolean'
              ? event.show_request_button
              : previous.showRequestButton,
        },
      ];
    })
    .sort((left, right) =>
      (left.startsAt || left.date).localeCompare(right.startsAt || right.date),
    );
}

function contents(site, location) {
  return location ? [location.content] : site.arenas.map((arena) => arena.content);
}

export function infoAnnouncement(site, location) {
  const fallback = {
    image: '/img/zones/арена.jpg',
    description: 'На VR-аренах WARPOINT появились новые игры и детские режимы',
    url: '/games/',
  };
  if (site.source !== 'wp-sites') return fallback;
  const announcement = contents(site, location).find((content) =>
    text(content?.info_announcement?.description),
  )?.info_announcement;
  return {
    image: publicUrl(announcement?.image) || fallback.image,
    description: text(announcement?.description) || fallback.description,
    url: publicUrl(announcement?.url) || fallback.url,
  };
}

export function locationReviews(site, location, fallback) {
  if (site.source !== 'wp-sites') return undefined;
  const arena = location || (site.arenas.length === 1 ? site.arenas[0] : null);
  const reviews = arena?.content?.reviews;
  if (!fallback) return reviews || null;
  const platforms = sorted(reviews?.platforms);
  return {
    average: Number.isFinite(reviews?.average) ? reviews.average : fallback.average,
    total: Number.isFinite(reviews?.total) ? reviews.total : fallback.total,
    good_place: {
      rating: Number.isFinite(reviews?.good_place?.rating)
        ? reviews.good_place.rating
        : fallback.good_place?.rating,
      reviews_count: Number.isFinite(reviews?.good_place?.reviews_count)
        ? reviews.good_place.reviews_count
        : fallback.good_place?.reviews_count,
    },
    platforms: platforms.length
      ? platforms.map((platform) => {
          const previous = fallback.platforms?.find((item) => item.code === platform.code) || {};
          return {
            code: platform.code,
            title: text(platform.title) || previous.title || '',
            icon: publicUrl(platform.icon) || previous.icon || null,
            url: publicUrl(platform.url) || publicUrl(previous.url),
            count: Number.isFinite(platform.count) ? platform.count : previous.count,
          };
        })
      : fallback.platforms || [],
  };
}

const gameZones = { arena: 'Арена', vr_station: 'ВР-станция', simulators: 'Симуляторы' };

export function availableGames(site, location, catalog) {
  if (site.source !== 'wp-sites') return catalog;
  const contentItems = contents(site, location);
  if (!contentItems.some((content) => Array.isArray(content?.game_categories))) return catalog;
  const result = new Map();
  for (const content of contentItems) {
    for (const category of sorted(content?.game_categories)) {
      for (const entry of sorted(category.games)) {
        const code = contentKey(entry.code);
        const title = contentKey(entry.title);
        const game = catalog.find(
          (candidate) =>
            contentKey(candidate.id) === code || (title && contentKey(candidate.title) === title),
        );
        if (!game?.catalogCover || result.has(game.id)) continue;
        const zone = gameZones[category.code] || game.zone;
        result.set(game.id, {
          ...game,
          title: text(entry.title) || game.title,
          zone,
          tags: [zone, ...(game.tags || []).slice(1)],
        });
      }
    }
  }
  return [...result.values()];
}

export function locationExtras(site, location) {
  if (site.source !== 'wp-sites') return null;
  const contentItems = contents(site, location);
  if (!contentItems.some((content) => Array.isArray(content?.extras))) return null;
  const result = new Map();
  for (const content of contentItems) {
    for (const extra of sorted(content?.extras)) {
      if (extra.code && !result.has(extra.code)) result.set(extra.code, extra);
    }
  }
  return [...result.values()];
}

export function reviewCount(value) {
  const lastTwo = value % 100;
  const last = value % 10;
  const noun =
    lastTwo >= 11 && lastTwo <= 14
      ? 'отзывов'
      : last === 1
        ? 'отзыв'
        : last >= 2 && last <= 4
          ? 'отзыва'
          : 'отзывов';
  return new Intl.NumberFormat('ru-RU').format(value) + ' ' + noun;
}
