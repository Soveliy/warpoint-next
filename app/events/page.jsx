import { notFound } from 'next/navigation';
import { getSite, metadataFor } from '../../lib/site';
import ListingPageShell, { ListingHero } from '../../components/site/ListingPageShell';
import AnnouncementsListing from '../../components/site/AnnouncementsListing';

export async function generateMetadata() {
  const site = await getSite();
  if (!site) return {};
  return { ...metadataFor(site, `Анонс мероприятий — WARPOINT ${site.city}`, 'Турниры, тематические вечеринки и VR-приключения в WARPOINT.', '/events/'), robots: { index: false, follow: true } };
}

export default async function EventsPage() {
  const site = await getSite();
  if (!site) notFound();
  return <ListingPageShell site={site}>
    <div className="announcements-page"><ListingHero title="Анонс" accent="мероприятий" crumb="Анонс мероприятий" description={<>Турниры, тематические вечеринки и VR-приключения.<br />Выбирайте событие и готовьтесь к ярким эмоциям</>} /></div>
    <AnnouncementsListing site={site} />
  </ListingPageShell>;
}
