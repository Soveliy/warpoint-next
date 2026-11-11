import ContactIcon from './ContactIcon';

export default function ContactLocationCard({ location, selected, onSelect, onDetails }) {
  const rating = Number(location.rating);
  const showRating =
    location.rating !== null &&
    location.rating !== undefined &&
    location.rating !== '' &&
    Number.isFinite(rating);
  const park = location.type?.toLowerCase().includes('парк');

  return (
    <article
      className={`contact-location${selected ? ' contact-location--active' : ''}`}
      id={`contact-location-${location.index}`}
    >
      <div className="contact-location__head">
        <h3 className="contact-location__title">{location.title}</h3>
        <div className="contact-location__badges">
          {location.type && (
            <span
              className={`contact-location__type${park ? ' contact-location__type--park' : ''}`}
            >
              {location.type}
            </span>
          )}
          {showRating && (
            <span className="contact-location__rating" aria-label={`Рейтинг ${rating} из 5`}>
              <svg className="contact-location__star" viewBox="0 0 16 16" aria-hidden="true">
                <path d="m8 1 2.1 4.3 4.7.7-3.4 3.3.8 4.7L8 11.8 3.8 14l.8-4.7L1.2 6l4.7-.7L8 1Z" />
              </svg>
              {rating.toFixed(1)}
            </span>
          )}
        </div>
      </div>
      <div className="contact-location__details">
        <address className="contact-location__detail contact-location__address">
          <ContactIcon name="mappin" className="contact-location__icon" />
          <span className="contact-location__address-copy">
            {location.address}
            {location.addressRef && (
              <span className="contact-location__address-note">{location.addressRef}</span>
            )}
          </span>
        </address>
        {location.subwayStation && (
          <p className="contact-location__detail">
            <svg
              className="contact-location__icon contact-location__icon--metro"
              viewBox="0 0 32 36"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 25A14 14 0 1 1 26 25L16 35" />
              <path
                d="m7 20 5-13 4 8 4-8 5 13h-6l-2-6-1 3-1-3-2 6Z"
                fill="currentColor"
                stroke="none"
              />
            </svg>
            <span>Метро {location.subwayStation}</span>
          </p>
        )}
        {location.phone && (
          <a className="contact-location__detail contact-location__phone" href={location.phoneHref}>
            <ContactIcon name="phone" className="contact-location__icon" />
            {location.phone}
          </a>
        )}
      </div>
      {location.hours && <p className="contact-location__hours">Ежедневно {location.hours}</p>}
      <div className="contact-location__actions">
        <button
          className="listing-button listing-button--solid contact-location__action"
          type="button"
          aria-pressed={selected}
          aria-label={`Выбрать локацию ${location.title}`}
          onClick={() => onSelect(location.index)}
        >
          Выбрать
        </button>
        <button
          className="listing-button contact-location__action"
          type="button"
          aria-haspopup="dialog"
          aria-label={`Подробнее о локации ${location.title}`}
          onClick={() => onDetails(location.index)}
        >
          Подробнее
        </button>
      </div>
    </article>
  );
}
