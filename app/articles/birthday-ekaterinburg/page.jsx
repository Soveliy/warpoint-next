import { notFound } from 'next/navigation';
import { getSite, metadataFor } from '../../../lib/site';
import { articles } from '../../../lib/articles';
import { birthdayArticleContent, birthdayArticleContents } from '../../../lib/article-details';
import ListingPageShell from '../../../components/site/ListingPageShell';
import ArticleDetail from '../../../components/site/ArticleDetail';
import BirthdayArticleContent from '../../../components/site/BirthdayArticleContent';

const article = articles[0];

export async function generateMetadata() {
  const site = await getSite();
  return site ? metadataFor(site, article.title, article.excerpt, `/articles/${article.id}/`) : {};
}

export default async function BirthdayArticlePage() {
  const site = await getSite();
  if (!site || site.city !== 'Екатеринбург') notFound();
  const shareUrl = new URL('/articles/' + article.id + '/', site.canonicalUrl).toString();
  return (
    <ListingPageShell site={site}>
      <ArticleDetail
        article={article}
        heading={birthdayArticleContent.heading}
        contents={birthdayArticleContents}
        shareUrl={shareUrl}
        related={articles.slice(1)}
      >
        <BirthdayArticleContent content={birthdayArticleContent} />
      </ArticleDetail>
    </ListingPageShell>
  );
}
