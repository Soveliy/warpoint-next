import { notFound } from 'next/navigation';
import { getSite, metadataFor } from '../../lib/site';
import { contactPageSchema, contactsForSite } from '../../lib/contacts-data';
import ListingPageShell from '../../components/site/ListingPageShell';
import ListingHero from '../../components/site/ListingHero';
import ContactLocations from '../../components/site/ContactLocations';
import ListingLead from '../../components/site/ListingLead';

export async function generateMetadata() {
  const site = await getSite();
  return site
    ? metadataFor(
        site,
        `Контакты WARPOINT — ${site.city}`,
        `Адреса парков WARPOINT, время работы и контакты для связи. ${site.city}: выберите удобную локацию и постройте маршрут.`,
        '/contacts/',
      )
    : {};
}

export default async function ContactsPage() {
  const site = await getSite();
  if (!site) notFound();
  const contacts = contactsForSite(site);

  return (
    <ListingPageShell site={site}>
      <div className="contacts-page">
        <ListingHero
          title="Контакты"
          crumb="Контакты"
          description={
            <>
              Здесь вы найдёте адреса, контакты и режим работы локаций
              <br className="contacts-page__description-break" /> WARPOINT. Выберите удобную и
              постройте маршрут
            </>
          }
        />
        <ContactLocations site={site} locations={contacts.locations} />
        <ListingLead
          className="contacts-page__request"
          id="contact-request"
          site={site}
          title="Остались"
          accent="вопросы?"
          description="Оставьте номер — менеджер перезвонит и ответит на все вопросы"
        />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageSchema(site, contacts)).replace(/</g, '\\u003c'),
        }}
      />
    </ListingPageShell>
  );
}
