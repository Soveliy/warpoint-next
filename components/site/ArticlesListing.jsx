import { articles } from '../../lib/articles';
import ArticleCard from './ArticleCard';

export default function ArticlesListing() {
  const [featured, ...rest] = articles;
  return (
    <section className="articles-list container" aria-label="Полезные статьи WARPOINT">
      {featured && <ArticleCard article={featured} featured />}
      <div className="articles-list__grid">
        {rest.map((article) => (
          <ArticleCard article={article} key={article.id} />
        ))}
      </div>
    </section>
  );
}
