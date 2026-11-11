import { notFound } from 'next/navigation';
import { getSite, metadataFor } from '../../lib/site';
import { contactPageSchema, contactsForSite } from '../../lib/contacts-data';
import ListingPageShell from '../../components/site/ListingPageShell';
import ListingHero from '../../components/site/ListingHero';
import ContactChannels from '../../components/site/ContactChannels';
import Contacts from '../../components/site/Contacts';
import ContactBusiness from '../../components/site/ContactBusiness';

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
          title="Наши"
          accent="контакты"
          crumb="Контакты"
          description={
            <>
              Адреса парков WARPOINT — {site.city}.<br />
              Выберите удобную локацию и приезжайте за яркими эмоциями!
            </>
          }
        />
        <ContactChannels contacts={contacts.city} />
        <Contacts site={site} showAllLocations />
        <ContactBusiness />
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
