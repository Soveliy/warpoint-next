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
            {[detail.duration, detail.players, detail.age].filter(Boolean).map((tag) => (
              <span className="tariffs-listing__tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <h2 className="listing-detail__title" id="listing-detail-title">
            {detail.title}
          </h2>
          <p className="listing-detail__description">{detail.description}</p>
          <TariffPriceBox tariff={detail} local={local} />
          {detail.included?.length > 0 && (
            <section className="listing-detail__section">
              <h3 className="listing-detail__section-title">В программу включено</h3>
              <ul className="listing-detail__list">
                {detail.included.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}
          {detail.benefits?.length > 0 && (
            <section className="listing-detail__section">
              <h3 className="listing-detail__section-title">Преимущества тарифа</h3>
              <ul className="listing-detail__list">
                {detail.benefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}
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
