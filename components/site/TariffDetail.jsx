import TariffPriceBox from './TariffPriceBox';

export default function TariffDetail({ dialogRef, detail, local, onClose, onDismiss }) {
  return (
    <dialog
      className="listing-detail"
      ref={dialogRef}
      aria-labelledby="listing-detail-title"
      onClose={onDismiss}
    >
      <button
        className="listing-detail__close"
        type="button"
        aria-label="Закрыть"
        onClick={onClose}
      >
        ×
      </button>
      {detail && (
        <>
          <div className="tariffs-listing__tags">
            <span className="tariffs-listing__tag">{detail.duration}</span>
            <span className="tariffs-listing__tag">{detail.players}</span>
          </div>
          <h2 className="listing-detail__title" id="listing-detail-title">
            {detail.title}
          </h2>
          <p className="listing-detail__description">{detail.description}</p>
          <TariffPriceBox tariff={detail} local={local} />
          <a
            className="listing-button listing-button--solid listing-detail__request"
            href="#contacts"
            onClick={onClose}
          >
            Оставить заявку
          </a>
        </>
      )}
    </dialog>
  );
}
