import { notFound } from 'next/navigation';
import { getSite, metadataFor } from '../../../lib/site';
import SitePage from '../../../components/SitePage';

export async function generateMetadata() {
  const site = await getSite();
  if (!site) return {};
  return metadataFor(
    site,
    `Корпоратив в VR-парке WARPOINT — ${site.city}`,
    `Корпоративы и тимбилдинг в WARPOINT, ${site.city}. Командные VR-игры, программы и адреса арен.`,
    '/events/corporate/',
  );
}

export default async function CorporatePage() {
  const site = await getSite();
  if (!site) notFound();
  return <SitePage page="corporate" site={site} event />;
}
