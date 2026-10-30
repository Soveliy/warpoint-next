import { notFound } from 'next/navigation';
import { getSite, metadataFor } from '../../../lib/site';
import SitePage from '../../../components/SitePage';

export async function generateMetadata() {
  const site = await getSite();
  if (!site) return {};
  return metadataFor(
    site,
    `День рождения в VR-парке WARPOINT — ${site.city}`,
    `Отпразднуйте день рождения в WARPOINT, ${site.city}. VR-игры для детей и взрослых, адреса арен и бронирование.`,
    '/events/birthday/',
  );
}

export default async function BirthdayPage() {
  const site = await getSite();
  if (!site) notFound();

  return <SitePage page="birthday" site={site} event />;
}
