import { pageLinkGroups } from '../../lib/page-links';

export default function HomePageLinks({ site }) {
  const localGroups = pageLinkGroups.map((group) => ({
    ...group,
    links:
      group.title === 'Материалы' && site.city === 'Екатеринбург'
        ? [
            group.links[0],
            ['Статья о детском дне рождения', '/articles/birthday-ekaterinburg/'],
            group.links[1],
          ]
        : group.links,
  }));

  return (
    <section
      className="home-page-links"
      data-header-theme="dark"
      aria-labelledby="home-page-links-title"
    >
      <div className="container">
        <p className="home-page-links__eyebrow">Временная навигация</p>
        <h1 className="home-page-links__title" id="home-page-links-title">
          Страницы <span className="home-page-links__accent">сайта</span>
        </h1>
        <div className="home-page-links__grid">
          {localGroups.map((group) => (
            <div className="home-page-links__group" key={group.title}>
              <h3 className="home-page-links__group-title">{group.title}</h3>
              <ul className="home-page-links__list">
                {group.links.map(([label, path]) => (
                  <li className="home-page-links__item" key={path}>
                    <a className="home-page-links__link" href={path}>
                      <span className="home-page-links__label">{label}</span>
                      <span className="home-page-links__arrow" aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
