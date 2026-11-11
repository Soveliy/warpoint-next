const childrenEventAddons = [
  {
    id: 'show',
    title: 'Шоу-программа',
    description: 'Зрелищные шоу, которые удивляют и создают вау-эффект',
    image: '/img/photo-library/addons/show.webp',
    alt: 'Шоу с розовым дымом на празднике в WARPOINT',
  },
  {
    id: 'animator',
    title: 'Аниматор',
    description: 'Яркий персонаж в костюме — танцы, игры и фото на память с каждым гостем',
    image: '/img/photo-library/addons/children-animator.webp',
    alt: 'Дети фотографируются с аниматором в зеркальном костюме',
  },
  {
    id: 'host',
    title: 'Ведущий мероприятия',
    description: 'Держит ритм праздника, проводит игры и ставит любимую музыку гостей',
    image: '/img/photo-library/addons/children-host.webp',
    alt: 'Ведущий проводит игры на детском празднике',
  },
  {
    id: 'balloons',
    title: 'Декор и шары',
    description: 'Оформим зону в цветах праздника',
    image: '/img/photo-library/addons/balloons.webp',
    alt: 'Праздничное оформление воздушными шарами в WARPOINT',
  },
  {
    id: 'catering',
    title: 'Кейтеринг',
    description: 'Накроем праздничный стол в лаунж-зоне — пицца, закуски, фрукты и напитки',
    image: '/img/photo-library/addons/children-catering.webp',
    alt: 'Дети за праздничным столом в лаунж-зоне WARPOINT',
  },
  {
    id: 'cake',
    title: 'Торт и угощения',
    description: 'Праздничный торт и сладости — закажем у нас или поставим ваш',
    image: '/img/photo-library/addons/children-cake.webp',
    alt: 'Именинница задувает свечи на праздничном торте',
  },
  {
    id: 'photo-video',
    title: 'Фото и видео',
    description: 'Памятные кадры, которые останутся с именинником',
    image: '/img/photo-library/addons/adult-camera-operator.webp',
    alt: 'Оператор снимает праздник в парке WARPOINT',
  },
  {
    id: 'master-class',
    title: 'Мастер-классы',
    description: 'Творческие занятия, где каждый гость сделает что-то своими руками',
    image: '/img/photo-library/addons/children-master-class.webp',
    alt: 'Девочка участвует в творческом мастер-классе',
  },
  {
    id: 'pinata',
    title: 'Пиньята',
    description: 'Весёлая игра с сюрпризами внутри — дети ждут её весь праздник',
    image: '/img/photo-library/addons/children-pinata.webp',
    alt: 'Праздничная пиньята в форме единорога',
  },
  {
    id: 'tournament',
    title: 'Киберспортивный турнир',
    description: 'Командное соревнование с награждением победителей',
    image: '/img/photo-library/addons/adult-tournament.webp',
    alt: 'Участники турнира WARPOINT на награждении',
  },
];

const adultEventAddons = [
  {
    id: 'show',
    title: 'Шоу-программа',
    description: 'Зрелищные шоу, которые удивляют и создают вау-эффект',
    image: '/img/photo-library/addons/show.webp',
    alt: 'Шоу с розовым дымом на празднике в WARPOINT',
  },
  {
    id: 'host',
    title: 'Ведущий мероприятия',
    description:
      'Держит ритм мероприятия, проводит конкурсы и ставит музыку под настроение команды',
    image: '/img/photo-library/addons/adult-host.webp',
    alt: 'Ведущий с микрофоном проводит мероприятие',
  },
  {
    id: 'catering',
    title: 'Кейтеринг',
    description: 'Накроем фуршет или банкет в лаунж-зоне — пицца, закуски и напитки',
    image: '/img/photo-library/addons/adult-catering.webp',
    alt: 'Гости празднуют за столом в лаунж-зоне WARPOINT',
  },
  {
    id: 'photo-video',
    title: 'Фото и видео',
    description: 'Памятные кадры для соцсетей и внутренних каналов компании',
    image: '/img/photo-library/addons/adult-camera-operator.webp',
    alt: 'Оператор снимает мероприятие в парке WARPOINT',
  },
  {
    id: 'tournament',
    title: 'Киберспортивный турнир',
    description: 'Турнирная сетка между командами или отделами, награждение и призы победителям',
    image: '/img/photo-library/addons/adult-tournament.webp',
    alt: 'Команда получает призы на турнире WARPOINT',
  },
  {
    id: 'balloons',
    title: 'Декор и шары',
    description: 'Оформим зону в цветах праздника',
    image: '/img/photo-library/addons/balloons.webp',
    alt: 'Воздушные шары в праздничной зоне WARPOINT',
  },
];

export const eventAddons = {
  birthday: childrenEventAddons,
  graduation: childrenEventAddons,
  corporate: adultEventAddons,
  'adult-birthday': adultEventAddons,
};

export const eventQuizExtras = childrenEventAddons.map(({ id, title }) => ({ value: id, title }));
