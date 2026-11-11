import { CalendarIcon, ReadingTimeIcon } from './ArticleIcons';

export default function ArticleMeta({ article }) {
  return (
    <div className="articles-card__meta">
      <span className="articles-card__category">{article.categoryLabel}</span>
      <span className="articles-card__meta-item">
        <CalendarIcon className="articles-card__icon" />
        <time dateTime={article.dateTime}>{article.date}</time>
      </span>
      <span className="articles-card__meta-item">
        <ReadingTimeIcon className="articles-card__icon" />
        {article.minutes} мин
      </span>
    </div>
  );
}
