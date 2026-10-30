import { notFound } from 'next/navigation';
import { getSite, metadataFor } from '../../lib/site';
import ListingPageShell, { ListingHero } from '../../components/site/ListingPageShell';
import PromotionsListing from '../../components/site/PromotionsListing';

export async function generateMetadata() {
  const site = await getSite();
  if (!site) return {};
  return { ...metadataFor(site, `Акции WARPOINT — ${site.city}`, 'Акции и специальные предложения в парках WARPOINT.', '/promotions/'), robots: { index: false, follow: true } };
}

export default async function PromotionsPage() {
  const site = await getSite();
  if (!site) notFound();
  return <ListingPageShell site={site}>
    <ListingHero title="Наши" accent="акции" crumb="Акции" description={<>Акции и специальные предложения<br />в парках виртуальной реальности WARPOINT</>} />
    <PromotionsListing site={site} />
  </ListingPageShell>;
}
