import TariffPriceBox from './TariffPriceBox';

export default function TariffCard({ tariff, local, eventHref, onOpen }) {
  return (
    <article className="tariffs-listing__card">
      <div className="tariffs-listing__tags">
        <span className="tariffs-listing__tag">{tariff.duration}</span>
        <span className="tariffs-listing__tag">{tariff.players}</span>
        {tariff.age && <span className="tariffs-listing__tag">{tariff.age}</span>}
        {tariff.hit && <span className="tariffs-listing__tag">Хит</span>}
      </div>
      <h2 className="tariffs-listing__title">{tariff.title}</h2>
      <p className="tariffs-listing__description">{tariff.description}</p>
      <TariffPriceBox tariff={tariff} local={local} event={Boolean(eventHref)} />
      <div className="tariffs-listing__actions">
        {eventHref && !tariff.isApiTariff ? (
          <a
            className="listing-button listing-button--outline tariffs-listing__action"
            href={eventHref}
          >
            Подробнее
          </a>
        ) : (
          <button
            className="listing-button listing-button--outline tariffs-listing__action"
            type="button"
            onClick={() => onOpen(tariff)}
          >
            Подробнее
          </button>
        )}
        <a
          className="listing-button listing-button--solid tariffs-listing__action"
          href="#contacts"
        >
          Оставить заявку
        </a>
      </div>
    </article>
  );
}
