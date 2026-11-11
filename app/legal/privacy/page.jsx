import { notFound } from 'next/navigation';
import { getSite, metadataFor } from '../../../lib/site';
import policy from '../../../lib/privacy-policy.json';
import ListingPageShell from '../../../components/site/ListingPageShell';
import PrivacyPolicy from '../../../components/site/PrivacyPolicy';
import ListingHero from '../../../components/site/ListingHero';

export async function generateMetadata() {
  const site = await getSite();
  return site
    ? metadataFor(
        site,
        'Политика конфиденциальности WARPOINT',
        'Порядок обработки и защиты персональных данных пользователей сайта WARPOINT.',
        '/legal/privacy/',
      )
    : {};
}

export default async function PrivacyPage() {
  const site = await getSite();
  if (!site) notFound();
  return (
    <ListingPageShell site={site}>
      <div className="privacy-page">
        <ListingHero
          title="Политика"
          accent="конфиденциальности"
          crumb="Политика конфиденциальности"
          description="Порядок обработки и защиты персональных данных пользователей сайта WARPOINT"
        />
        <PrivacyPolicy policy={policy} />
      </div>
    </ListingPageShell>
  );
}
