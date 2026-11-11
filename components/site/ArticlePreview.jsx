'use client';

import SiteContentDialog from './SiteContentDialog';
import ArticleMeta from './ArticleMeta';
import { birthdayArticlePreview } from '../../lib/article-previews';

export default function ArticlePreview({ article, onClose }) {
  const fullArticle = article.id === 'birthday-ekaterinburg';
  const content = birthdayArticlePreview;
  return (
    <SiteContentDialog
      className="article-preview"
      labelledBy="article-preview-title"
      onClose={onClose}
    >
      <div className="article-preview__image">
        <img className="article-preview__cover" src={article.image} alt={article.imageAlt} />
        <button
          className="site-content-dialog__close"
          type="button"
          aria-label="Закрыть статью"
          onClick={onClose}
        >
          ×
        </button>
      </div>
      <div className="article-preview__body" role="region" aria-label="Текст статьи" tabIndex={0}>
        <ArticleMeta article={article} />
        <h2 id="article-preview-title">{article.title}</h2>
        <p>{article.excerpt}</p>
        {fullArticle && (
          <>
            <p>{content.introduction}</p>
            <h3>{content.ageTitle}</h3>
            <ul>
              {content.ageOptions.map((option) => (
                <li key={option.label}>
                  <strong>{option.label}</strong>
                  {option.text}
                </li>
              ))}
            </ul>
            <p>
              {content.pricePrefix}
              <strong>{content.price}</strong>
              {content.priceSuffix}
            </p>
          </>
        )}
      </div>
      <div className="article-preview__actions">
        {fullArticle && (
          <a
            className="article-preview__action listing-button listing-button--solid"
            href={`/articles/${article.id}/`}
          >
            Открыть статью целиком
          </a>
        )}
        <button className="article-preview__action listing-button" type="button" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </SiteContentDialog>
  );
}
