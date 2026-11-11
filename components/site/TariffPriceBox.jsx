export default function TariffPriceBox({ tariff, local, event = false }) {
  if (tariff.isApiTariff) {
    if (!tariff.priceItems.length) {
      return <p className="tariffs-listing__price-label">Стоимость по запросу</p>;
    }
    return (
      <div
        className={`tariffs-listing__prices${tariff.priceItems.length === 1 ? ' tariffs-listing__prices--single' : ''}`}
      >
        {tariff.priceItems.map((price) => (
          <div className="tariffs-listing__price" key={price.label}>
            <span className="tariffs-listing__price-label">{price.label}</span>
            {price.oldAmount > price.amount && (
              <del className="tariffs-listing__old-price">{price.oldValue}</del>
            )}
            <strong className="tariffs-listing__price-value">{price.value}</strong>
            <small className="tariffs-listing__price-unit">{tariff.priceUnitLabel}</small>
          </div>
        ))}
      </div>
    );
  }
  if (tariff.rows) {
    return (
      <div className="tariffs-listing__matrix">
        <div className="tariffs-listing__matrix-head">
          <span />
          <span>Пн–Чт</span>
          <span>Пт–Вс и праздники</span>
        </div>
        {tariff.rows.map(([duration, weekday, weekend]) => (
          <div className="tariffs-listing__matrix-row" key={duration}>
            <span className="tariffs-listing__matrix-duration">{duration}</span>
            <strong className="tariffs-listing__matrix-price">
              {local ? weekday : 'По запросу'}
            </strong>
            <strong className="tariffs-listing__matrix-price">
              {local ? weekend : 'По запросу'}
            </strong>
          </div>
        ))}
        <small className="tariffs-listing__matrix-note">Цена с человека</small>
      </div>
    );
  }
  if (tariff.prices) {
    return (
      <div className="tariffs-listing__prices">
        {tariff.prices.map(([label, value]) => (
          <div className="tariffs-listing__price" key={label}>
            <span className="tariffs-listing__price-label">{label}</span>
            <strong className="tariffs-listing__price-value">{local ? value : 'По запросу'}</strong>
            <small className="tariffs-listing__price-unit">
              {event ? 'за группу' : 'с человека'}
            </small>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="tariffs-listing__single-price">
      <span className="tariffs-listing__single-label">
        1 сеанс<small className="tariffs-listing__single-unit">за игрока</small>
      </span>
      <strong className="tariffs-listing__single-value">
        {local ? tariff.price : 'По запросу'}
      </strong>
    </div>
  );
}
