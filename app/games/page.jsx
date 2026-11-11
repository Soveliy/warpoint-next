import { notFound } from 'next/navigation';
import { getSite, metadataFor } from '../../lib/site';
import ListingPageShell from '../../components/site/ListingPageShell';
import ListingHero from '../../components/site/ListingHero';
import GamesListing from '../../components/site/GamesListing';

export async function generateMetadata() {
  const site = await getSite();
  return site
    ? metadataFor(
        site,
        `Каталог VR-игр WARPOINT — ${site.city}`,
        'Выберите VR-игру в WARPOINT: командные сражения и развлечения для детей и взрослых.',
        '/games/',
      )
    : {};
}

export default async function GamesPage() {
  const site = await getSite();
  if (!site) notFound();
  return (
    <ListingPageShell site={site} gameModal>
      <ListingHero
        title="Каталог"
        accent="игр"
        crumb="Каталог игр"
        description={
          <>
            Большой выбор игр для детей и взрослых.
            <br />
            Каждый найдёт себе развлечение по вкусу!
          </>
        }
      />
      <GamesListing site={site} />
    </ListingPageShell>
  );
}
