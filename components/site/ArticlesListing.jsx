'use client';

import { useState } from 'react';
import { articles } from '../../lib/articles';

const categories = [
  { id: 'all', label: 'Все статьи' },
  { id: 'events', label: 'Мероприятия' },
  { id: 'games', label: 'Игры' },
  { id: 'tips', label: 'Советы' },
];

function ArticleMeta({ article }) {
  return <div className="articles-card__meta">
    <span className="articles-card__category">{article.categoryLabel}</span>
    <span aria-label={`Дата публикации: ${article.date}`}>▦ {article.date}</span>
    <span aria-label={`Время чтения: ${article.minutes} мин.`}>⌛ {article.minutes} мин</span>
  </div>;
}

function ArticleCard({ article, featured = false }) {
  return <article className={`articles-card${featured ? ' articles-card--featured' : ''}`}>
    <div className="articles-card__image">
      <img src={article.image} alt={article.imageAlt} loading={featured ? 'eager' : 'lazy'} />
    </div>
    <div className="articles-card__body">
      <ArticleMeta article={article} />
      <h2>{article.title}</h2>
      <p>{article.excerpt}</p>
      {article.id === 'birthday-ekaterinburg'
        ? <a className="articles-card__pending" href={`/articles/${article.id}/`}>Читать статью</a>
        : <span className="articles-card__pending" title="Полный текст статьи ещё не добавлен">Материал готовится</span>}
    </div>
  </article>;
}

export default function ArticlesListing() {
  const [category, setCategory] = useState('all');
  const filtered = category === 'all' ? articles : articles.filter((article) => article.category === category);
  const [featured, ...rest] = filtered;

  return <section className="articles-list container" aria-label="Статьи WARPOINT">
    <div className="articles-list__filters" role="group" aria-label="Категории статей">
      {categories.map((item) => <button
        type="button"
        key={item.id}
        className={category === item.id ? 'is-active' : ''}
        aria-pressed={category === item.id}
        onClick={() => setCategory(item.id)}
      >{item.label}</button>)}
    </div>
    {featured ? <>
      {category === 'all' && <ArticleCard article={featured} featured />}
      <div className="articles-list__grid">
        {(category === 'all' ? rest : filtered).map((article) => <ArticleCard article={article} key={article.id} />)}
      </div>
    </> : <p className="articles-list__empty">В этой категории статьи пока не опубликованы.</p>}
  </section>;
}
