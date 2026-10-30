import { notFound } from 'next/navigation';
import { getSite, metadataFor } from '../../lib/site';
import SiteDirectory from '../../components/SiteDirectory';

export async function generateMetadata() {
  const site = await getSite();
  if (!site) return {};
  return metadataFor(site, `Города WARPOINT — ${site.city}`, 'Выберите город и откройте сайт WARPOINT для вашей локации.', '/locations/');
}

export default async function LocationsPage() {
  const site = await getSite();
  if (!site) notFound();
  const sites = site.directory
    .filter((entry) => {
      try { return ['https:', 'http:'].includes(new URL(entry.url).protocol); } catch { return false; }
    })
    .sort((a, b) => a.city.localeCompare(b.city, 'ru'));
  return <SiteDirectory currentCity={site.city} sites={sites} />;
}
