import { notFound } from 'next/navigation';
import { getSite, metadataFor } from '../../lib/site';
import ListingPageShell from '../../components/site/ListingPageShell';
import ListingHero from '../../components/site/ListingHero';
import { promotions } from '../../lib/promotions';
import PromotionsListing from '../../components/site/PromotionsListing';

export async function generateMetadata() {
  const site = await getSite();
  if (!site) return {};
  return {
    ...metadataFor(
      site,
      `Акции WARPOINT — ${site.city}`,
      'Акции и специальные предложения в парках WARPOINT.',
      '/promotions/',
    ),
    robots: { index: false, follow: true },
  };
}

export default async function PromotionsPage() {
  const site = await getSite();
  if (!site) notFound();
  return (
    <ListingPageShell site={site}>
      <ListingHero
        className="listing-hero--editorial"
        title="Наши"
        accent="акции"
        crumb="Акции"
        description={
          <>
            Акции и специальные предложения
            <br />в парках виртуальной реальности WARPOINT
          </>
        }
      />
      <PromotionsListing promotions={site.city === 'Екатеринбург' ? promotions : []} />
    </ListingPageShell>
  );
}
