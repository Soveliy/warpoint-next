import ContactIcon from './ContactIcon';

export default function ContactLocationCard({ location, selected, onSelect }) {
  return (
    <article
      className={`contact-location${selected ? ' contact-location--active' : ''}`}
      id={`contact-location-${location.index}`}
    >
      <div className="contact-location__head">
        <span className="contact-location__type">{location.type || 'WARPOINT'}</span>
        <span className="contact-location__selection" aria-hidden="true">
          {selected ? 'На карте' : String(location.index + 1).padStart(2, '0')}
        </span>
      </div>
      <h3 className="contact-location__title">
        <button
          className="contact-location__select"
          type="button"
          aria-pressed={selected}
          aria-controls="contact-location-map"
          onClick={() => onSelect(location.index, true)}
        >
          {location.title}
        </button>
      </h3>
      <address className="contact-location__address">{location.address}</address>
      {location.addressRef && (
        <p className="contact-location__address-note">{location.addressRef}</p>
      )}
      <div className="contact-location__details">
        {location.subwayStation && (
          <p className="contact-location__detail">
            <span className="contact-location__detail-label">Метро</span>
            {location.subwayStation}
          </p>
        )}
        {location.hours && (
          <p className="contact-location__detail">
            <span className="contact-location__detail-label">Ежедневно</span>
            {location.hours}
          </p>
        )}
      </div>
      <div className="contact-location__actions">
        <button
          className="listing-button listing-button--solid contact-location__book"
          type="button"
          data-booking-open=""
          onClick={() => onSelect(location.index)}
        >
          Забронировать
        </button>
        <a
          className="contact-location__route"
          href={location.route}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Маршрут: ${location.title}`}
        >
          <ContactIcon name="route" className="contact-location__route-icon" />
          Маршрут
        </a>
      </div>
    </article>
  );
}
