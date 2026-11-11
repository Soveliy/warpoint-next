import ArticleHero from './ArticleHero';
import ArticleContents from './ArticleContents';
import RelatedArticles from './RelatedArticles';

export default function ArticleDetail({ article, heading, contents, shareUrl, related, children }) {
  return (
    <article className="article-detail">
      <ArticleHero article={article} heading={heading} />
      <div className="article-detail__layout container">
        <aside className="article-detail__aside">
          <ArticleContents items={contents} title={article.title} url={shareUrl} />
        </aside>
        <div className="article-detail__content">{children}</div>
      </div>
      <section className="article-detail__related container">
        <h2 className="article-detail__related-title">Читайте также</h2>
        <RelatedArticles articles={related} />
      </section>
    </article>
  );
}
