import { notFound } from 'next/navigation';
import { getSite, metadataFor } from '../../../lib/site';
import policy from '../../../lib/privacy-policy.json';
import ListingPageShell, { ListingHero } from '../../../components/site/ListingPageShell';

export async function generateMetadata() {
  const site = await getSite();
  return site ? metadataFor(site, 'Политика конфиденциальности WARPOINT', 'Порядок обработки и защиты персональных данных пользователей сайта WARPOINT.', '/legal/privacy/') : {};
}

export default async function PrivacyPage() {
  const site = await getSite();
  if (!site) notFound();
  return <ListingPageShell site={site}>
    <div className="privacy-page">
      <ListingHero title="Политика" accent="конфиденциальности" crumb="Политика конфиденциальности" description="Порядок обработки и защиты персональных данных пользователей сайта WARPOINT" />
      <div className="privacy-page__content container">
        {policy.sections.map((section) => <section className="privacy-page__section" key={section.number} aria-labelledby={`policy-section-${section.number}`}>
          <h2 id={`policy-section-${section.number}`}><span>{section.number}</span>{section.title}</h2>
          <div className="privacy-page__clauses">
            {section.paragraphs.map((paragraph, index) => {
              const match = paragraph.match(/^(\d+(?:\.\d+)+)\.\s+(.+)$/);
              return <p key={`${section.number}-${index}`}>
                {match ? <><span className="privacy-page__clause-number">{match[1]}.</span><span>{match[2]}</span></> : <span className="privacy-page__clause-text">{paragraph}</span>}
              </p>;
            })}
          </div>
        </section>)}
        <p className="privacy-page__source">Текст политики: <a href={policy.source} target="_blank" rel="noopener noreferrer">warpoint.ru/privacy</a>. Сверено {new Date(`${policy.retrieved}T00:00:00Z`).toLocaleDateString('ru-RU', { timeZone: 'UTC' })}.</p>
      </div>
    </div>
  </ListingPageShell>;
}
