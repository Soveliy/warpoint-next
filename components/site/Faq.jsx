import FaqAccordion from './FaqAccordion';
import CallbackForm from './CallbackForm';

export default function Faq({ site }) {
  return (
    <section className="faq" id="faq" data-header-theme="dark" aria-labelledby="faq-title">
      <div className="faq__container container">
        <div className="faq__aside">
          <h2 className="faq__title" id="faq-title">
            Часто задаваемые вопросы
          </h2>
          <div className="faq__callback faq__callback--desk">
            <CallbackForm countryId={site.countryId} />
            <img
              className="faq__image"
              src="/img/form.png"
              width="378"
              height="438"
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
        <FaqAccordion />
        <div className="faq__callback faq__callback--mobile">
          <CallbackForm countryId={site.countryId} mobile />
          <img
            className="faq__image"
            src="/img/form.png"
            width="378"
            height="438"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
