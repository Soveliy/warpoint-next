import ArticleCard from './ArticleCard';

export default function RelatedArticles({ articles }) {
  return (
    <div className="articles-list__grid">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} headingLevel="h3" />
      ))}
    </div>
  );
}
