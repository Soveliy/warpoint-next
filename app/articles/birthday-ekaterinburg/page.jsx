import { notFound } from 'next/navigation';
import { getSite, metadataFor } from '../../../lib/site';
import { articles } from '../../../lib/articles';
import ListingPageShell from '../../../components/site/ListingPageShell';

const article = articles[0];

export async function generateMetadata() {
  const site = await getSite();
  return site ? metadataFor(site, article.title, article.excerpt, `/articles/${article.id}/`) : {};
}

export default async function BirthdayArticlePage() {
  const site = await getSite();
  if (!site || site.city !== 'Екатеринбург') notFound();
  return <ListingPageShell site={site}>
    <article className="article-detail">
      <header className="article-detail__hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(15,14,20,.9), rgba(15,14,20,.28)), url(${article.image})` }}>
        <div className="container">
          <nav className="article-detail__breadcrumbs" aria-label="Навигационная цепочка"><a href="/indexpage/">Главная</a><span>/</span><a href="/articles/">Статьи</a><span>/</span><span>Мероприятия</span></nav>
          <div className="articles-card__meta"><span className="articles-card__category">{article.categoryLabel}</span><span>▦ {article.date}</span><span>⌛ {article.minutes} мин</span></div>
          <h1>Где отметить день рождения ребёнка в Екатеринбурге: <span>7 идей для праздника</span></h1>
          <p>{article.excerpt}</p>
        </div>
      </header>
      <div className="article-detail__layout container">
        <aside className="article-detail__aside"><div className="article-detail__aside-art" aria-hidden="true" /></aside>
        <div className="article-detail__content">
          <section><h2>Какие форматы бывают</h2><p>Детский день рождения в Екатеринбурге можно провести дома, в кафе, в батутном центре, на квесте или в парке виртуальной реальности. У каждого формата свои плюсы: дома — уютно и бюджетно, в кафе — не нужно готовить, а активные площадки не дают детям заскучать.</p>
            <ul><li><strong>Аниматоры на дому</strong> — подходят малышам до 6 лет.</li><li><strong>Квесты</strong> — для небольших компаний до 6–8 человек.</li><li><strong>VR-арена</strong> — командные игры для 2–10 детей в одном виртуальном мире.</li></ul>
          </section>
          <section><h2>Что выбрать по возрасту</h2><div className="article-detail__table"><table><thead><tr><th>Возраст</th><th>Что подойдёт</th></tr></thead><tbody><tr><td>6–7 лет</td><td>Зона «Экстрим», спокойные игры, аниматор</td></tr><tr><td>8–11 лет</td><td>Командные игры на арене, пиньята, мастер-класс</td></tr><tr><td>12–14 лет</td><td>Турнир на арене, шутеры, ведущий и DJ</td></tr></tbody></table></div></section>
          <section><h2>Почему VR-праздник</h2><p>На арене свободного перемещения дети не сидят у экрана, а бегают по площадке и видят друг друга в игре. Праздник получается активным, а родители могут присоединиться к игре.</p><figure><img src="/img/birthday-gallery/1.jpg" alt="Дети празднуют день рождения в WARPOINT" loading="lazy" /><figcaption>Команда отмечает праздник на VR-арене</figcaption></figure>
            <blockquote>«Дети до сих пор вспоминают, как бегали по арене — это главный показатель того, что праздник удался!»<small>— мама именинника</small></blockquote>
          </section>
          <section><h2>Сколько стоит</h2><p>Стоимость зависит от программы, количества гостей и выбранного дня. Актуальные цены смотрите на странице <a href="/tariffs/">тарифов</a>.</p><div className="article-detail__cta"><div><h3>Устроим праздник<br />под ключ</h3><p>Игры, ведущий, торт и декор — всё в одном месте</p></div><a className="listing-button listing-button--solid" href="/events/birthday/">Оставить заявку</a></div></section>
          <section><h2>Как подготовиться</h2><ol><li>Забронируйте дату за 2–3 недели — выходные разбирают быстро.</li><li>Предупредите гостей об удобной одежде и обуви.</li><li>Приходите за 15 минут до начала, чтобы пройти инструктаж.</li></ol></section>
        </div>
      </div>
      <section className="article-detail__related container"><h2>Читайте также</h2><div className="articles-list__grid">{articles.slice(1).map((item) => <article className="articles-card" key={item.id}><div className="articles-card__image"><img src={item.image} alt={item.imageAlt} loading="lazy" /></div><div className="articles-card__body"><span className="articles-card__category">{item.categoryLabel}</span><h3>{item.title}</h3><p>{item.excerpt}</p><span className="articles-card__pending">Материал готовится</span></div></article>)}</div></section>
    </article>
  </ListingPageShell>;
}
