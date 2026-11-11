import ArticleMeta from './ArticleMeta';

export default function ArticleHero({ article, heading }) {
  return (
    <header
      className="article-detail__hero"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(15,14,20,.9), rgba(15,14,20,.28)), url(${article.image})`,
      }}
    >
      <div className="container article-detail__hero-content">
        <nav className="article-detail__breadcrumbs" aria-label="Навигационная цепочка">
          <a className="article-detail__breadcrumb-link" href="/indexpage/">
            Главная
          </a>
          <span>/</span>
          <a className="article-detail__breadcrumb-link" href="/articles/">
            Статьи
          </a>
          <span>/</span>
          <span>Мероприятия</span>
        </nav>
        <ArticleMeta article={article} />
        <h1 className="article-detail__title">
          {heading.title} <span className="article-detail__accent">{heading.accent}</span>
        </h1>
        <p className="article-detail__intro">{article.excerpt}</p>
      </div>
    </header>
  );
}
