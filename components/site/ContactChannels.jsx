import ContactIcon from './ContactIcon';

export default function ContactChannels({ contacts }) {
  if (!contacts) return null;

  return (
    <section className="contact-channels container" aria-label="Связаться с парком">
      <p className="contact-channels__label">Вопросы и бронирование</p>
      <a className="contact-channels__link" href={contacts.phoneHref}>
        <ContactIcon name="phone" className="contact-channels__icon" />
        {contacts.phone}
      </a>
      <a className="contact-channels__link" href={`mailto:${contacts.email}`}>
        <ContactIcon name="email" className="contact-channels__icon" />
        {contacts.email}
      </a>
    </section>
  );
}
