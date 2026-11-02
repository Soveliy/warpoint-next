// Visual fixtures from the booking mockups. Availability, prices and payment
// must be replaced with ERP responses before enabling real reservations.
export const bookingFormats = [
  { id: 'arena', title: 'Арена', icon: 'arena', group: 'Игровые зоны', price: 800, oldPrice: 1000, description: 'Игровая зона для командных сражений на большой площадке, по которой все участники могут свободно перемещаться', tags: ['45 мин', 'до 10 игроков', '6+'] },
  { id: 'station', title: 'ВР-станция', icon: 'vr', group: 'Игровые зоны', price: 1000, description: 'Погрузитесь в виртуальные миры в VR-шлеме. Выберите игру для себя или небольшой компании', tags: ['от 15 мин', 'до 4 игроков', '6+'] },
  { id: 'simulators', title: 'Симуляторы', icon: 'wheel', group: 'Игровые зоны', price: 1000, description: 'Виртуальные приключения на игровых симуляторах', tags: ['от 15 мин', '1 игрок', '6+'] },
  { id: 'birthday', title: 'Детский день рождения', icon: 'cake', group: 'Мероприятия', price: 22900, description: 'Командные VR-игры, лаунж-зона и поздравление для именинника', tags: ['от 1 ч 45 мин'] },
  { id: 'adult-birthday', title: 'Взрослый день рождения', icon: 'martini', group: 'Мероприятия', price: 22900, description: 'Отпразднуйте день рождения с друзьями в парке виртуальной реальности', tags: ['от 1 ч 45 мин'] },
  { id: 'corporate', title: 'Корпоратив и тимбилдинг', icon: 'users', group: 'Мероприятия', price: 22900, description: 'Командные сражения и праздник для вашей компании', tags: ['от 1 ч 45 мин'] },
  { id: 'graduation', title: 'Школьный выпускной', icon: 'graduationcap', group: 'Мероприятия', price: 22900, description: 'Незабываемый праздник в честь окончания учебного года', tags: ['от 1 ч 45 мин'] },
];

const eventTariffs = [
  { id: 'start', title: 'Тариф «Старт»', price: 22900, weekendPrice: 26900, description: 'Для небольших компаний: 45 минут на арене, лаунж-зона, поздравление для именинника' },
  { id: 'basic', title: 'Тариф «Базовый»', price: 27900, weekendPrice: 31900, description: 'Откройте для себя мир виртуальной реальности вместе с нашим стартовым пакетом, который отлично подходит для небольших компаний.' },
  { id: 'standard', title: 'Тариф «Стандарт»', price: 40900, weekendPrice: 45900, hit: true, description: 'Популярный формат праздника: VR-игры на арене и отдых в лаунж-зоне' },
  { id: 'maximum', title: 'Тариф «Максимум»', price: 22900, weekendPrice: 26900, description: 'Праздник в парке виртуальной реальности для вашей компании' },
].map((tariff) => ({ ...tariff, minutes: 105, maxPlayers: 10, perPerson: false, event: true }));

export function bookingTariffs(format) {
  if (['birthday', 'adult-birthday', 'corporate', 'graduation'].includes(format)) return eventTariffs;
  if (format === 'station') {
    return [
      ['oculus', 'Oculus', [800, 1300, 1700], [1100, 1600, 2000]],
      ['valve-index', 'Valve Index', [900, 1500, 2600], [1100, 1800, 3100]],
      ['htc-vive', 'HTC Vive', [800, 1400, 2400], [1000, 1700, 2900]],
    ].flatMap(([id, title, prices, weekendPrices]) => [15, 30, 60].map((minutes, index) => ({
      id: `${id}-${minutes}`, title: `${title} · ${minutes} мин`, description: `Игра на ВР-станции в шлеме ${title}. Цена за игрока.`,
      minutes, maxPlayers: 4, perPerson: true, price: prices[index], weekendPrice: weekendPrices[index],
    })));
  }
  if (format === 'simulators') return [{ id: 'session', title: 'Сеанс на симуляторе', description: 'Индивидуальный сеанс на игровом симуляторе', minutes: 15, maxPlayers: 1, perPerson: true, price: 1000, weekendPrice: 1000 }];
  return [
    { id: 'open-game', title: 'Открытая игра', description: 'Оплата за игрока. К вам могут присоединиться другие участники', minutes: 45, maxPlayers: 10, perPerson: true, price: 1000, weekendPrice: 1500 },
    { id: 'private-game', title: 'Игра компанией', description: 'Аренда всей арены. Цена не зависит от количества гостей', minutes: 45, maxPlayers: 10, perPerson: false, price: 12000, weekendPrice: 15000 },
  ];
}

export const basicIncluded = [
  '60 минут на арене — погружение в виртуальную реальность, где каждый почувствует себя настоящим героем',
  'Координатор на всё время мероприятия',
  'Лаунж-зона: уютное пространство для отдыха и общения на всё время праздника',
  'Игровая приставка и настольные игры',
  'Поздравление для именинника от команды нашего VR-парка',
  'Памятный подарок имениннику', 'Пригласительные для гостей',
];
export const basicBenefits = ['7 игр на выбор', '15 катаний на VR-аттракционах', 'Украшение шарами (фонтан из 3 гелиевых шаров)', 'Бесплатные чай и кофе для ваших гостей'];
export const money = (value) => `${new Intl.NumberFormat('ru-RU').format(value)} ₽`;
export const dateKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
export const parseDate = (key) => new Date(`${key}T00:00:00`);
export const isWeekend = (date) => [0, 5, 6].includes(date.getDay());
export const duration = (minutes) => minutes >= 60 ? `${Math.floor(minutes / 60)} ч${minutes % 60 ? ` ${minutes % 60} мин` : ''}` : `${minutes} мин`;
export function endTime(time, minutes) {
  const [hours, mins] = time.split(':').map(Number);
  const total = hours * 60 + mins + minutes;
  return `${String(Math.floor(total / 60) % 24).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

export function bookingSlots(date, tariff, now = new Date()) {
  const day = parseDate(date);
  const weekend = isWeekend(day);
  const basePrice = weekend ? tariff.weekendPrice : tariff.price;
  return Array.from({ length: 12 }, (_, index) => {
    const hour = index + 10;
    const time = `${hour}:00`;
    const past = date < dateKey(now) || (date === dateKey(now) && hour * 60 <= now.getHours() * 60 + now.getMinutes());
    const busy = day.getDate() % 15 === 0 || (tariff.event && [11, 14].includes(hour));
    const promo = tariff.id === 'open-game' && !weekend && [16, 17].includes(hour);
    const discount = tariff.id === 'open-game' && !weekend && hour === 12;
    return { time, past, busy, places: tariff.perPerson && hour === 11 ? Math.max(1, tariff.maxPlayers - 1) : tariff.maxPlayers,
      price: promo ? 500 : discount ? 800 : basePrice, oldPrice: discount ? basePrice : null,
      tone: promo ? 'promo' : weekend || tariff.event ? 'weekend' : 'weekday' };
  });
}
