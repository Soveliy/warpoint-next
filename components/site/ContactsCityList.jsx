export default function ContactsCityList({ site, locations, onSelect, onDetails }) {
  return (
    <div className="contacts__content contacts__content--locations">
      <h3 className="contacts__city">{site.city}</h3>
      <p className="contacts__locations-intro">Выберите удобный парк</p>
      <div className="contacts__locations" aria-label={`Парки WARPOINT: ${site.city}`}>
        {locations.map((location) => (
          <article
            className="contacts__location-card"
            id={`contact-location-${location.index}`}
            key={location.id}
          >
            <h4 className="contacts__location-name">{location.title}</h4>
            <address className="contacts__location-address">{location.address}</address>
            {location.subwayStation && (
              <p className="contacts__location-meta">Метро: {location.subwayStation}</p>
            )}
            {location.phone && (
              <a className="contacts__location-phone" href={location.phoneHref}>
                {location.phone}
              </a>
            )}
            {location.hours && (
              <p className="contacts__location-meta">Ежедневно {location.hours}</p>
            )}
            <div className="contacts__location-actions">
              <button
                className="listing-button listing-button--solid contacts__location-action"
                type="button"
                onClick={() => onSelect(location.index)}
                aria-label={`Выбрать локацию: ${location.title}`}
              >
                Выбрать
              </button>
              <button
                className="listing-button contacts__location-action"
                type="button"
                aria-haspopup="dialog"
                onClick={() => onDetails(location.index)}
                aria-label={`Подробнее о локации: ${location.title}`}
              >
                Подробнее
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
