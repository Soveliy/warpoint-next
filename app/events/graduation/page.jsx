import { notFound } from 'next/navigation';
import { getSite, metadataFor } from '../../../lib/site';
import SitePage from '../../../components/SitePage';

export async function generateMetadata() {
  const site = await getSite();
  if (!site) return {};
  return metadataFor(
    site,
    `Школьный выпускной в VR-парке WARPOINT — ${site.city}`,
    `Выпускной в VR-парке WARPOINT, ${site.city}. Командные игры для школьников, программа и адреса арен.`,
    '/events/graduation/',
  );
}

export default async function GraduationPage() {
  const site = await getSite();
  if (!site) notFound();
  return <SitePage page="graduation" site={site} event />;
}
