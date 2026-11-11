export default function AnnouncementCard({ event, priority, onOpen }) {
  return (
    <article className="announcement-card">
      <div className="announcement-card__image">
        <img
          className="announcement-card__cover"
          src={event.image}
          alt=""
          loading={priority ? 'eager' : 'lazy'}
        />
        <div className="announcement-card__date">
          <strong className="announcement-card__day">{event.day}</strong>
          <span className="announcement-card__date-copy">
            <b className="announcement-card__month">{event.month}</b>
            <small className="announcement-card__weekday">{event.weekday}</small>
          </span>
        </div>
      </div>
      <div className="announcement-card__body">
        <span className="announcement-card__category">{event.category}</span>
        <h2 className="announcement-card__title">
          {event.titleLines.map((line) => (
            <span className="announcement-card__title-line" key={line}>
              {line}
            </span>
          ))}
        </h2>
        <p className="announcement-card__description">{event.description}</p>
        <div className="announcement-card__details">
          <span className="announcement-card__detail">
            <svg className="announcement-card__detail-icon" aria-hidden="true">
              <use href="/img/sprite.svg#icon-calendar" />
            </svg>
            <time dateTime={`${event.date}T${event.time}`}>
              {event.day} {event.month}, {event.time}
            </time>
          </span>
          <span className="announcement-card__detail">
            <svg className="announcement-card__detail-icon" aria-hidden="true">
              <use href="/img/sprite.svg#icon-mappin" />
            </svg>
            {event.location}
          </span>
        </div>
        <div className="announcement-card__actions">
          <button
            className="listing-button announcement-card__action"
            type="button"
            onClick={() => onOpen(event)}
            aria-haspopup="dialog"
          >
            Подробнее
          </button>
          <button
            className="listing-button listing-button--solid announcement-card__action--primary announcement-card__action"
            type="button"
            data-booking-open=""
            data-booking-event={event.title}
          >
            Оставить заявку
          </button>
        </div>
      </div>
    </article>
  );
}
