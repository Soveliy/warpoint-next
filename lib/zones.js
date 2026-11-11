export const zones = [
  {
    id: 'arena',
    label: 'Арена',
    icon: 'arena',
    accent: 'Арена',
    title: 'для командных сражений',
    description:
      'Совместные игры на большой площадке, по которой участники могут свободно перемещаться. В виртуальном мире все участники видят персонажей друг друга и могут взаимодействовать между собой',
    image: '/img/zones/арена.jpg',
    alt: 'Игроки на арене WARPOINT',
    params: ['12+', 'площадь 350 м²', '2–10 человек'],
    price: '1000 ₽',
  },
  {
    id: 'vr',
    label: 'ВР станция',
    icon: 'vr',
    accent: 'VR станция',
    title: 'игры на прохождение',
    description:
      'Большой выбор игр разных жанров: победите плохих парней, спасите мир от зомби или пройдите увлекательный квест',
    image: '/img/zones/2.jpg',
    alt: 'Игры на VR-станции WARPOINT',
    params: ['6+', '1–4 человека', 'Oculus Quest', 'Valve Index'],
    price: '700 ₽',
  },
  {
    id: 'extreme',
    label: 'Экстрим',
    icon: 'lightning',
    accent: 'Экстрим-зона',
    title: 'для любителей острых ощущений',
    description:
      'Зона с аттракционами, от которых захватывает дух! Прокатитесь на безумных американских горках, полетайте на дельтаплане, погрузитесь на дно океана или покорите космос',
    image: '/img/zones/3.jpg',
    alt: 'Аттракционы в экстрим-зоне WARPOINT',
    params: ['6+', '1–4 человека'],
    price: '700 ₽',
  },
  {
    id: 'simulators',
    label: 'Симуляторы',
    icon: 'wheel',
    accent: 'Симуляторы',
    title: 'для фанатов скорости',
    description:
      'Игровая зона с профессиональными автосимуляторами, где можно устроить соревновательные заезды с друзьями и показать, кто настоящий король скорости',
    image: '/img/zones/4.jpg',
    alt: 'Автосимуляторы в WARPOINT',
    params: ['6+', '1–4 человека'],
    price: '700 ₽',
  },
  {
    id: 'lounge',
    label: 'Лаунж',
    icon: 'confeti',
    accent: 'Лаунж-зона',
    title: 'для проведения мероприятий',
    description:
      'Комфортное пространство, где можно весело провести время с друзьями и отметить любой праздник: день рождения, школьный выпускной или корпоратив с коллегами',
    image: '/img/zones/лаунж.jpg',
    alt: 'Праздник в лаунж-зоне WARPOINT',
    params: ['площадь 40 м²', 'ТВ с приставкой', 'до 30 человек'],
  },
];

// Frontend fixtures for the supplied availability mockups, not ERP inventory.
// Replace this mapping with zone IDs from ERP when its contract is supplied.
export function zoneAvailableAt(arena, zoneId) {
  if (!arena) return true;
  if (Array.isArray(arena.zoneIds)) return arena.zoneIds.includes(zoneId);
  return !(/радуга/i.test(arena.title) && ['extreme', 'simulators'].includes(zoneId));
}

export function zoneLocations(site, zoneId) {
  return site.arenas
    .map((arena, index) => ({ ...arena, index }))
    .filter((arena) => zoneAvailableAt(arena, zoneId));
}

export function locationCountLabel(count) {
  const ending = count % 100;
  const last = count % 10;
  const noun = ending >= 11 && ending <= 14 ? 'локациях' : last === 1 ? 'локации' : 'локациях';
  return 'Доступно в ' + count + ' ' + noun;
}
