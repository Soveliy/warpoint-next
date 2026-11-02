import { notFound } from 'next/navigation';
import { getSite, metadataFor } from '../../../lib/site';
import { articles } from '../../../lib/articles';
import ListingPageShell from '../../../components/site/ListingPageShell';
import { ArticleMeta, RelatedArticles } from '../../../components/site/ArticleCards';

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
          <ArticleMeta article={article} />
          <h1>Где отметить день рождения ребёнка в Екатеринбурге: <span>7 идей для праздника</span></h1>
          <p>{article.excerpt}</p>
        </div>
      </header>
      <div className="article-detail__layout container">
        <aside className="article-detail__aside"><div className="article-detail__aside-art" aria-hidden="true"><span>✦</span></div></aside>
        <div className="article-detail__content">
          <section><h2>Какие форматы бывают</h2><p>Детский день рождения в Екатеринбурге можно провести дома, в кафе, в батутном центре, на квесте или в парке виртуальной реальности. У каждого формата свои плюсы: дома — уютно и бюджетно, в кафе — не нужно готовить, а активные площадки не дают детям заскучать.</p>
            <ul><li><strong>Аниматоры на дому</strong> — подходят малышам до 6 лет.</li><li><strong>Квесты</strong> — для небольших компаний до 6–8 человек.</li><li><strong>VR-арена</strong> — командные игры для 2–10 детей в одном виртуальном мире.</li></ul>
          </section>
          <section><h2>Что выбрать по возрасту</h2><div className="article-detail__table"><table><thead><tr><th>Возраст</th><th>Что подойдёт</th></tr></thead><tbody><tr><td>6–7 лет</td><td>Зона «Экстрим», спокойные игры, аниматор</td></tr><tr><td>8–11 лет</td><td>Командные игры на арене, пиньята, мастер-класс</td></tr><tr><td>12–14 лет</td><td>Турнир на арене, шутеры, ведущий и DJ</td></tr></tbody></table></div></section>
          <section><h2>Почему VR-праздник</h2><p>На арене свободного перемещения дети не сидят у экрана, а бегают по площадке и видят друг друга в игре. Праздник получается активным, а родители могут присоединиться к игре.</p><figure><img src="/img/zones/лаунж.jpg" alt="Гости отмечают праздник за столом в лаунж-зоне WARPOINT" loading="lazy" /><figcaption>После игры гости отдыхают в лаунж-зоне за праздничным столом</figcaption></figure>
            <blockquote>«Дети до сих пор вспоминают, как бегали по арене — это главный показатель того, что праздник удался!»<small>— мама именинника</small></blockquote>
          </section>
          <section><h2>Сколько стоит</h2><p>Готовые тарифы на день рождения в WARPOINT начинаются от 22 900 ₽ за компанию.<br />В стоимость входят игры, инструктаж и лаунж-зона. Актуальные цены — на странице <a href="/tariffs/">тарифов</a>.</p><div className="article-detail__cta"><div><h3>Устроим праздник<br />под ключ</h3><p>Игры, ведущий, торт и декор — всё в одном месте</p></div><button className="listing-button listing-button--solid" type="button" data-booking-open="">Оставить заявку</button></div></section>
          <section><h2>Как подготовиться</h2><ol><li>Забронируйте дату за 2–3 недели — выходные разбирают быстро.</li><li>Предупредите гостей об удобной одежде и обуви.</li><li>Приходите за 15 минут до начала, чтобы пройти инструктаж.</li></ol></section>
        </div>
      </div>
      <section className="article-detail__related container"><h2>Читайте также</h2><RelatedArticles articles={articles.slice(1)} /></section>
    </article>
  </ListingPageShell>;
}
