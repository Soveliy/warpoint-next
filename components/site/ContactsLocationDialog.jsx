import ContactLocationDetail from './ContactLocationDetail';
import SiteContentDialog from './SiteContentDialog';

export default function ContactsLocationDialog({ city, location, onSelect, onClose, site }) {
  if (site) {
    return (
      <ContactLocationDetail
        site={site}
        location={location}
        onSelect={onSelect}
        onClose={onClose}
      />
    );
  }
  return (
    <SiteContentDialog
      className="contacts__location-dialog"
      labelledBy="contacts-location-dialog-title"
      onClose={onClose}
    >
      <div className="contacts__location-dialog-body">
        <button
          className="site-content-dialog__close"
          type="button"
          aria-label="Закрыть информацию о локации"
          onClick={onClose}
        >
          ×
        </button>
        {location.type && <span className="contacts__location-kind">{location.type}</span>}
        <h2 className="contacts__location-dialog-title" id="contacts-location-dialog-title">
          {location.title}
        </h2>
        <address className="contacts__location-dialog-address">
          {city}, {location.address}
        </address>
        {location.addressRef && <p className="contacts__location-meta">{location.addressRef}</p>}
        <dl className="contacts__location-dialog-details">
          {location.subwayStation && (
            <div className="contacts__location-dialog-row">
              <dt>Метро</dt>
              <dd>{location.subwayStation}</dd>
            </div>
          )}
          {location.hours && (
            <div className="contacts__location-dialog-row">
              <dt>Время работы</dt>
              <dd>Ежедневно {location.hours}</dd>
            </div>
          )}
          {location.phone && (
            <div className="contacts__location-dialog-row">
              <dt>Телефон</dt>
              <dd>
                <a href={location.phoneHref}>{location.phone}</a>
              </dd>
            </div>
          )}
          {location.email && (
            <div className="contacts__location-dialog-row">
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${location.email}`}>{location.email}</a>
              </dd>
            </div>
          )}
        </dl>
        <div className="contacts__location-actions">
          <button
            className="listing-button listing-button--solid contacts__location-action"
            type="button"
            onClick={onSelect}
          >
            Выбрать локацию
          </button>
          <a
            className="listing-button contacts__location-action"
            href={location.route}
            target="_blank"
            rel="noopener noreferrer"
          >
            Проложить маршрут
          </a>
        </div>
      </div>
    </SiteContentDialog>
  );
}
