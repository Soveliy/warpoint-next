const groups = [
  {
    title: 'Основные страницы',
    links: [
      ['Главная', '/indexpage/'],
      ['Каталог игр', '/games/'],
      ['Тарифы', '/tariffs/'],
      ['Акции', '/promotions/'],
      ['Локации', '/locations/'],
      ['Вопросы и ответы', '/faq/'],
    ],
  },
  {
    title: 'Мероприятия',
    links: [
      ['Детский день рождения', '/events/birthday/'],
      ['Взрослый день рождения', '/events/adult-birthday/'],
      ['Корпоратив', '/events/corporate/'],
      ['Школьный выпускной', '/events/graduation/'],
      ['Анонс мероприятий', '/events/'],
    ],
  },
  {
    title: 'Материалы',
    links: [
      ['Статьи', '/articles/'],
      ['Политика конфиденциальности', '/legal/privacy/'],
    ],
  },
];

export default function HomePageLinks({ site }) {
  const localGroups = groups.map((group) => ({
    ...group,
    links: group.title === 'Материалы' && site.city === 'Екатеринбург'
      ? [group.links[0], ['Статья о детском дне рождения', '/articles/birthday-ekaterinburg/'], group.links[1]]
      : group.links,
  }));

  return <section className="home-page-links" data-header-theme="dark" aria-labelledby="home-page-links-title">
    <div className="container">
      <p className="home-page-links__eyebrow">Временная навигация</p>
      <h1 id="home-page-links-title">Страницы <span>сайта</span></h1>
      <div className="home-page-links__grid">
        {localGroups.map((group) => <div className="home-page-links__group" key={group.title}>
          <h3>{group.title}</h3>
          <ul>{group.links.map(([label, path]) => <li key={path}><a href={path}><span>{label}</span><span aria-hidden="true">↗</span></a></li>)}</ul>
        </div>)}
      </div>
    </div>
  </section>;
}
