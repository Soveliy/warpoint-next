import { notFound } from 'next/navigation';
import { getSite, metadataFor } from '../lib/site';
import HomePageLinks from '../components/site/HomePageLinks';
import PageIndexReady from '../components/site/PageIndexReady';

export async function generateMetadata() {
  const site = await getSite();
  if (!site) return {};
  return {
    ...metadataFor(site, 'Страницы сайта WARPOINT', 'Временный список доступных страниц сайта.'),
    robots: { index: false, follow: true },
  };
}

export default async function PageIndex() {
  const site = await getSite();
  if (!site) notFound();

  return <main className="main page-index"><PageIndexReady /><HomePageLinks site={site} /></main>;
}
