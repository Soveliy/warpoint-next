import ArticleMeta from './ArticleMeta';
import ListingHero from './ListingHero';

export default function ArticleHero({ article, heading }) {
  return (
    <ListingHero
      className="listing-hero--article"
      title={heading.title}
      accent={heading.accent}
      description={article.excerpt}
      crumb={article.categoryLabel}
      parents={[{ title: 'Статьи', href: '/articles/' }]}
      image={article.heroImage ?? article.image}
      meta={<ArticleMeta article={article} />}
    />
  );
}
