import ArticleMeta from './ArticleMeta';

export default function ArticleCard({ article, featured = false, headingLevel = 'h2' }) {
  const Heading = headingLevel;
  const Cover = article.href ? 'a' : 'div';
  return (
    <article className={`articles-card${featured ? ' articles-card--featured' : ''}`}>
      <Cover
        className="articles-card__image"
        href={article.href}
        aria-label={article.href ? `Открыть статью: ${article.title}` : undefined}
      >
        <img
          className="articles-card__cover"
          src={article.image}
          alt={article.imageAlt}
          loading={featured ? 'eager' : 'lazy'}
        />
      </Cover>
      <div className="articles-card__body">
        <ArticleMeta article={article} />
        <Heading className="articles-card__title">
          {featured && article.title.includes(':') ? (
            <>
              {article.title.split(':')[0]}:<br />
              {article.title.split(':').slice(1).join(':').trim()}
            </>
          ) : (
            article.title
          )}
        </Heading>
        <p className="articles-card__excerpt">{article.excerpt}</p>
        {article.href ? (
          <a className="articles-card__read" href={article.href}>
            Читать статью
          </a>
        ) : (
          <a className="articles-card__read" href='#'>
            Читать статью
          </a>
        )}
      </div>
    </article>
  );
}
