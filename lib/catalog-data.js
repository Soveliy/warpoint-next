import { games } from '../interactions/data/games';

const summaries = {
  'warpoint-arena': 'Для фанатов реалистичных шутеров, мощного оружия, стратегии и тактики',
  'snow-battle': 'Постройте снежную крепость и разбейте снеговика противника',
  'paint-battle': 'Захватите арену своим цветом — не дайте закрасить её обратно',
  farm: 'Вырастите урожай всей командой и сдайте его раньше противника',
  'flying-saucers': 'Похищайте добычу гравитационным лучом с борта НЛО',
  diamonds: 'Прорубайте туннели в скале и добывайте алмазы быстрее соперника',
  'kids-arena': 'Мультяшные герои, разнообразные пушки и командный бой на всю площадку',
};

const catalogOrder = ['warpoint-arena', 'snow-battle', 'paint-battle', 'farm', 'flying-saucers', 'diamonds', 'kids-arena'];

export const catalogGames = [...games].sort((a, b) => catalogOrder.indexOf(a.id) - catalogOrder.indexOf(b.id)).map((game) => ({
  ...game,
  summary: summaries[game.id],
  cover: game.id === 'warpoint-arena' ? 'img/games/1.jpg' : game.images[0] || game.cover,
  zone: game.tags[0],
  genre: game.tags[1],
  players: game.tags[2],
  age: game.tags[3],
}));

export const tariffCategories = [
  ['arena', 'Арена'], ['station', 'ВР-станция'], ['simulators', 'Симуляторы'],
  ['extreme', 'Зона экстрим'], ['combo', 'Комбо'], ['birthday', 'Дни рождения'],
  ['corporate', 'Корпоративы'], ['graduation', 'Школьные выпускные'],
];

export const tariffs = {
  arena: [
    { id: 'open-game', title: 'Открытая игра', duration: '45 мин', players: '1–10 чел', description: 'Оплата за игрока. К вам могут присоединиться другие участники.', prices: [['Пн–Чт', '1 000 ₽'], ['Пт–Вс и праздники', '1 500 ₽']] },
    { id: 'private-game', title: 'Игра компанией', duration: '45 мин', players: 'до 10 чел', description: 'Аренда площадки для игры своей компанией. Оплата фиксированная, вне зависимости от количества участников.', prices: [['Пн–Чт', '1 000 ₽'], ['Пт–Вс и праздники', '1 500 ₽']] },
  ],
  station: [
    { id: 'oculus', title: 'Oculus', duration: 'от 15 до 60 мин', players: '1–4 игрока', description: 'Игра на ВР-станции в шлеме Oculus.', rows: [['15 минут', '800 ₽', '1 100 ₽'], ['30 минут', '1 300 ₽', '1 600 ₽'], ['60 минут', '1 700 ₽', '2 000 ₽']] },
    { id: 'valve-index', title: 'Valve Index', duration: 'от 15 до 60 мин', players: '1–4 игрока', description: 'Игра на ВР-станции в шлеме Valve Index.', rows: [['15 минут', '900 ₽', '1 100 ₽'], ['30 минут', '1 500 ₽', '1 800 ₽'], ['60 минут', '2 600 ₽', '3 100 ₽']] },
    { id: 'htc-vive', title: 'HTC Vive', duration: 'от 15 до 60 мин', players: '1–4 игрока', description: 'Игра на ВР-станции в шлеме HTC Vive.', rows: [['15 минут', '800 ₽', '1 000 ₽'], ['30 минут', '1 400 ₽', '1 700 ₽'], ['60 минут', '2 400 ₽', '2 900 ₽']] },
  ],
  extreme: [
    { id: 'twister', title: 'Твистер', duration: '2–5 мин', players: 'от 1 до 3 игроков', description: 'Интерактивный ВР-аттракцион для полного погружения в виртуальный мир. Эффект ветра создаёт ощущение присутствия в самом центре событий.', price: '800 ₽' },
    { id: 'capsule', title: 'Капсула', duration: '2–5 мин', players: 'от 1 до 2 игроков', description: 'Надевайте ВР-шлем и погружайтесь в другую реальность: опуститесь на дно океана или прокатитесь на американских горках, встречая ветер на своём пути.', price: '500 ₽' },
    { id: 'helicopter', title: 'Вертолёт', duration: '3–5 мин', players: '1 игрок', description: 'Вертолёт виртуальной реальности VR-Helicopter с интерактивными играми для детей и взрослых.', price: '500 ₽' },
    { id: 'air-hockey', title: 'Аэрохоккей', duration: '1 игра', players: '2 игрока', description: 'Первый в мире аэрохоккей с дополненной реальностью: вместо белого поля — космическое пространство, а шайба выглядит как астероид.', price: '250 ₽' },
    { id: 'secret-agent', title: 'Секретный агент', duration: 'от 5 мин', players: '1 игрок', description: 'Быстрая экшн-игра: вы путешествуете по разным локациям в роли агента-снайпера и уничтожаете врагов из пистолета, дробовика и пулемёта.', price: '400 ₽' },
    { id: 'extreme-platform', title: 'Экстрим платформа', duration: '3–5 мин', players: '1 игрок', description: 'ВР-аттракцион для полного погружения в виртуальный мир. Благодаря эффекту ветра вы почувствуете себя в самом центре событий.', price: '500 ₽' },
  ],
};

export const eventCategoryLinks = {
  birthday: '/events/birthday/',
  corporate: '/events/corporate/',
  graduation: '/events/graduation/',
};
