'use client';

import ContactIcon from './ContactIcon';
import { useSiteLocation } from './SiteLocationProvider';
import { contactsForSite } from '../../lib/contacts-data';

export default function ContactChannels({ site }) {
  const { selectedIndex } = useSiteLocation();
  const contacts = selectedIndex === null ? null : contactsForSite(site).locations[selectedIndex];
  if (!contacts || (!contacts.phone && !contacts.email)) return null;

  return (
    <section className="contact-channels container" aria-label="Связаться с парком">
      <p className="contact-channels__label">Вопросы и бронирование</p>
      {contacts.phone && (
        <a className="contact-channels__link" href={contacts.phoneHref}>
          <ContactIcon name="phone" className="contact-channels__icon" />
          {contacts.phone}
        </a>
      )}
      {contacts.email && (
        <a className="contact-channels__link" href={`mailto:${contacts.email}`}>
          <ContactIcon name="email" className="contact-channels__icon" />
          {contacts.email}
        </a>
      )}
    </section>
  );
}
