import { businessContacts } from '../../lib/contacts-data';
import ContactIcon from './ContactIcon';

export default function ContactBusiness() {
  return (
    <section className="contact-business container" aria-labelledby="contact-business-title">
      <h2 className="contact-business__title" id="contact-business-title">
        По другим <span className="contact-business__accent">вопросам</span>
      </h2>
      <div className="contact-business__grid">
        {businessContacts.map((contact) => (
          <article className="contact-business__card" key={contact.id}>
            <ContactIcon name="email" className="contact-business__icon" />
            <h3 className="contact-business__card-title">{contact.title}</h3>
            <p className="contact-business__description">{contact.description}</p>
            <a className="contact-business__link" href={`mailto:${contact.email}`}>
              {contact.email}
              <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
