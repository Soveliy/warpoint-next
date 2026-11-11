import { notFound } from 'next/navigation';
import { getSite, metadataFor } from '../../lib/site';
import ListingPageShell from '../../components/site/ListingPageShell';
import ListingHero from '../../components/site/ListingHero';
import ArticlesListing from '../../components/site/ArticlesListing';

export async function generateMetadata() {
  const site = await getSite();
  return site
    ? metadataFor(
        site,
        `Статьи WARPOINT — ${site.city}`,
        'Статьи о VR-играх, праздниках и виртуальной реальности.',
        '/articles/',
      )
    : {};
}

export default async function ArticlesPage() {
  const site = await getSite();
  if (!site) notFound();
  return (
    <ListingPageShell site={site}>
      <ListingHero
        className="listing-hero--editorial"
        title="Полезные"
        accent="статьи"
        crumb="Статьи"
        description={
          <>
            Полезные материалы, обзоры, советы и истории
            <br />
            из мира виртуальных развлечений WARPOINT
          </>
        }
      />
      <ArticlesListing />
    </ListingPageShell>
  );
}
