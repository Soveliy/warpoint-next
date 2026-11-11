import { notFound } from 'next/navigation';
import { getSite, metadataFor } from '../../../lib/site';
import { legalDocuments } from '../../../lib/legal-pages';
import ListingPageShell from '../../../components/site/ListingPageShell';
import ListingHero from '../../../components/site/ListingHero';
import PrivacyPolicy from '../../../components/site/PrivacyPolicy';

export async function generateMetadata({ params }) {
  const { document: slug } = await params;
  const document = Object.hasOwn(legalDocuments, slug) ? legalDocuments[slug] : null;
  if (!document) return {};
  const site = await getSite();
  return site
    ? metadataFor(site, document.name + ' — WARPOINT', document.description, '/legal/' + slug + '/')
    : {};
}

export default async function LegalDocumentPage({ params }) {
  const { document: slug } = await params;
  if (!Object.hasOwn(legalDocuments, slug)) notFound();
  const document = legalDocuments[slug];
  const site = await getSite();
  if (!site) notFound();
  return (
    <ListingPageShell site={site}>
      <div className="privacy-page privacy-page--document">
        <ListingHero
          title={document.title}
          accent={document.accent}
          crumb={document.name}
          description={document.description}
        />
        <PrivacyPolicy policy={document.policy} />
      </div>
    </ListingPageShell>
  );
}
