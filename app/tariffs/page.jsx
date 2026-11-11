import { notFound } from 'next/navigation';
import { getSite, metadataFor } from '../../lib/site';
import ListingPageShell from '../../components/site/ListingPageShell';
import ListingHero from '../../components/site/ListingHero';
import TariffsListing from '../../components/site/TariffsListing';

export async function generateMetadata() {
  const site = await getSite();
  return site
    ? metadataFor(
        site,
        `Тарифы WARPOINT — ${site.city}`,
        'Тарифы на VR-игры, аттракционы и мероприятия WARPOINT.',
        '/tariffs/',
      )
    : {};
}

export default async function TariffsPage() {
  const site = await getSite();
  if (!site) notFound();
  return (
    <ListingPageShell site={site}>
      <ListingHero
        title="Наши"
        accent="тарифы"
        crumb="Тарифы"
        description={
          <>
            Выберите формат, который подходит именно вам.
            <br />
            Яркие эмоции, командные игры и полное погружение в виртуальные миры!
          </>
        }
      />
      <TariffsListing site={site} />
    </ListingPageShell>
  );
}
