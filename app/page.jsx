import { notFound } from 'next/navigation';
import { getSite, metadataFor } from '../lib/site';
import SitePage from '../components/SitePage';

export async function generateMetadata() {
  const site = await getSite();
  if (!site) return {};
  return metadataFor(
    site,
    `WARPOINT — парк виртуальной реальности, ${site.city}`,
    `VR-арены WARPOINT в городе ${site.city}: игры и праздники для друзей, семей и команд. Адреса и бронирование.`,
  );
}

export default async function HomePage() {
  const site = await getSite();
  if (!site) notFound();

  return <SitePage page="home" site={site} />;
}
