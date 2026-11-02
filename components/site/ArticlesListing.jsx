'use client';

import { useState } from 'react';
import { articles } from '../../lib/articles';
import { ArticleCard, ArticlePreview } from './ArticleCards';

const categories = [
  { id: 'all', label: 'Все статьи' },
  { id: 'events', label: 'Мероприятия' },
  { id: 'games', label: 'Игры' },
  { id: 'tips', label: 'Советы' },
];

export default function ArticlesListing() {
  const [category, setCategory] = useState('all');
  const [selected, setSelected] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const filtered = category === 'all' ? articles : articles.filter((article) => article.category === category);
  const [featured, ...rest] = filtered;

  return <section className="articles-list container" aria-label="Статьи WARPOINT">
    <div className="articles-list__filters" role="group" aria-label="Категории статей">
      {categories.map((item) => <button
        type="button"
        key={item.id}
        className={category === item.id ? 'is-active' : ''}
        aria-pressed={category === item.id}
        onClick={() => { setCategory(item.id); setShowAll(false); }}
      >{item.label}</button>)}
    </div>
    {featured ? <>
      {category === 'all' && <ArticleCard article={featured} featured onOpen={setSelected} />}
      <div className="articles-list__grid">
        {(category === 'all' ? rest : filtered).map((article) => <ArticleCard article={article} key={article.id} onOpen={setSelected} />)}
      </div>
      {category === 'all' && <div className="articles-list__more"><button className="listing-button" type="button" onClick={() => setShowAll(true)} disabled={showAll}>{showAll ? 'Все статьи показаны' : 'Показать ещё'}</button>{showAll && <p role="status">Других опубликованных материалов пока нет.</p>}</div>}
    </> : <p className="articles-list__empty">В этой категории статьи пока не опубликованы.</p>}
    {selected && <ArticlePreview article={selected} onClose={() => setSelected(null)} />}
  </section>;
}
