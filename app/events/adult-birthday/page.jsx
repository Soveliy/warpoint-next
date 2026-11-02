import { notFound } from 'next/navigation';
import { getSite, metadataFor } from '../../../lib/site';
import SitePage from '../../../components/SitePage';

export async function generateMetadata() {
  const site = await getSite();
  return site ? metadataFor(
    site,
    `Взрослый день рождения в VR-парке WARPOINT — ${site.city}`,
    `Отметьте день рождения с друзьями в WARPOINT, ${site.city}: командные VR-игры, турнир и лаунж-зона для вашей компании.`,
    '/events/adult-birthday/',
  ) : {};
}

export default async function AdultBirthdayPage() {
  const site = await getSite();
  if (!site) notFound();
  return <SitePage page="adult-birthday" site={site} event />;
}
