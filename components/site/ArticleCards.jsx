'use client';

import { useState } from 'react';
import SiteContentDialog from './SiteContentDialog';

export function ArticleMeta({ article }) {
  return <div className="articles-card__meta">
    <span className="articles-card__category">{article.categoryLabel}</span>
    <span><svg aria-hidden="true"><use href="/img/sprite.svg#icon-calendar" /></svg><time dateTime={article.dateTime}>{article.date}</time></span>
    <span><span className="articles-card__hourglass" aria-hidden="true">⌛︎</span>{article.minutes} мин</span>
  </div>;
}

export function ArticleCard({ article, featured = false, onOpen, headingLevel = 'h2' }) {
  const Heading = headingLevel;
  return <article className={`articles-card${featured ? ' articles-card--featured' : ''}`}>
    <button className="articles-card__image" type="button" onClick={() => onOpen(article)} aria-haspopup="dialog" aria-label={`Открыть статью: ${article.title}`}>
      <img src={article.image} alt={article.imageAlt} loading={featured ? 'eager' : 'lazy'} />
    </button>
    <div className="articles-card__body">
      <ArticleMeta article={article} />
      <Heading>{featured && article.title.includes(':') ? <>{article.title.split(':')[0]}:<br />{article.title.split(':').slice(1).join(':').trim()}</> : article.title}</Heading>
      <p>{article.excerpt}</p>
      <button className="articles-card__read" type="button" onClick={() => onOpen(article)} aria-haspopup="dialog">Читать статью</button>
    </div>
  </article>;
}

export function ArticlePreview({ article, onClose }) {
  const fullArticle = article.id === 'birthday-ekaterinburg';
  return <SiteContentDialog className="article-preview" labelledBy="article-preview-title" onClose={onClose}>
    <div className="article-preview__image"><img src={article.image} alt={article.imageAlt} />
      <button className="site-content-dialog__close" type="button" aria-label="Закрыть статью" onClick={onClose}>×</button>
    </div>
    <div className="article-preview__body">
      <ArticleMeta article={article} />
      <h2 id="article-preview-title">{article.title}</h2>
      <p>{article.excerpt}</p>
      {fullArticle && <>
        <p>Детский день рождения можно провести дома, в кафе, на квесте или в парке виртуальной реальности. Дома — уютно, в кафе — не нужно готовить, а активные площадки не дают детям заскучать.</p>
        <h3>Что выбрать по возрасту</h3>
        <ul><li><strong>6–7 лет</strong> — зона «Экстрим», спокойные игры и аниматор.</li><li><strong>8–11 лет</strong> — командные игры на арене, пиньята, мастер-класс.</li><li><strong>12–14 лет</strong> — турнир на арене, ведущий и DJ.</li></ul>
        <p>Готовые тарифы на день рождения в WARPOINT начинаются <strong>от 22 900 ₽</strong> за компанию: игры, инструктаж и лаунж-зона для праздничного стола.</p>
      </>}
    </div>
    <div className="article-preview__actions">
      {fullArticle && <a className="listing-button listing-button--solid" href={`/articles/${article.id}/`}>Открыть статью целиком</a>}
      <button className="listing-button" type="button" onClick={onClose}>Закрыть</button>
    </div>
  </SiteContentDialog>;
}

export function RelatedArticles({ articles }) {
  const [selected, setSelected] = useState(null);
  return <>
    <div className="articles-list__grid">{articles.map((article) => <ArticleCard key={article.id} article={article} onOpen={setSelected} headingLevel="h3" />)}</div>
    {selected && <ArticlePreview article={selected} onClose={() => setSelected(null)} />}
  </>;
}
