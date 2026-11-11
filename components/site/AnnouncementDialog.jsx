import SiteContentDialog from './SiteContentDialog';

export default function AnnouncementDialog({ event, onClose }) {
  return (
    <SiteContentDialog
      className="announcement-dialog"
      labelledBy="announcement-dialog-title"
      onClose={onClose}
    >
      <div className="announcement-dialog__panel">
        <button
          type="button"
          className="site-content-dialog__close"
          onClick={onClose}
          aria-label="Закрыть мероприятие"
        >
          ×
        </button>
        <span className="announcement-card__category">{event.category}</span>
        <h2 className="announcement-dialog__title" id="announcement-dialog-title">
          {event.title}
        </h2>
        <p className="announcement-dialog__text">
          {event.detailedDescription || event.description}
        </p>
        <p className="announcement-dialog__text">
          {event.day} {event.month}, {event.time}
          <br />
          {event.location}
          {event.city && (
            <>
              <br />
              {event.city}
            </>
          )}
        </p>
        {event.phone && (
          <p className="announcement-dialog__text">
            <a href={'tel:' + event.phone.replace(/[^+\d]/g, '')}>{event.phone}</a>
          </p>
        )}
        {event.showRequestButton !== false && (
          <button
            className="listing-button listing-button--solid announcement-dialog__request"
            type="button"
            data-booking-open=""
            data-booking-event={event.title}
            onClick={onClose}
          >
            Оставить заявку
          </button>
        )}
      </div>
    </SiteContentDialog>
  );
}
