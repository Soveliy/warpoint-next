import SiteContentDialog from './SiteContentDialog';

export default function PromotionDialog({ promotion, onClose }) {
  return (
    <SiteContentDialog
      className="promotion-dialog"
      labelledBy="promotion-dialog-title"
      onClose={onClose}
    >
      <div className="promotion-dialog__panel">
        <button
          className="site-content-dialog__close"
          type="button"
          aria-label="Закрыть акцию"
          onClick={onClose}
        >
          ×
        </button>
        <span className="promotion-card__type">{promotion.type}</span>
        <h2 className="promotion-dialog__title" id="promotion-dialog-title">
          {promotion.title}
        </h2>
        <strong className="promotion-dialog__value">{promotion.value}</strong>
        <p className="promotion-dialog__text">{promotion.summary}</p>
        <p className="promotion-dialog__location promotion-dialog__text">{promotion.location}</p>
        {promotion.terms ? (
          <p className="promotion-dialog__text">{promotion.terms}</p>
        ) : (
          <p className="promotion-dialog__note promotion-dialog__text">
            Проверьте срок действия, список участвующих парков и полные условия у администратора
            перед посещением.
          </p>
        )}
        {promotion.buttonUrl ? (
          <a
            className="listing-button listing-button--solid promotion-dialog__request"
            href={promotion.buttonUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {promotion.buttonText || 'Подробнее'}
          </a>
        ) : (
          <button
            className="listing-button listing-button--solid promotion-dialog__request"
            type="button"
            data-booking-open=""
            onClick={onClose}
          >
            {promotion.buttonText || 'Связаться с парком'}
          </button>
        )}
      </div>
    </SiteContentDialog>
  );
}
