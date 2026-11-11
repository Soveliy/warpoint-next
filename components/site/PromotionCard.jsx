export default function PromotionCard({ promotion, featured, onOpen }) {
  return (
    <article className={`promotion-card${featured ? ' promotion-card--featured' : ''}`}>
      <span className="promotion-card__type">{promotion.type}</span>
      <h2 className="promotion-card__value">
        {promotion.value.startsWith('до ') ? (
          <>
            <small className="promotion-card__value-prefix">до </small>
            {promotion.value.slice(3)}
          </>
        ) : (
          promotion.value
        )}
      </h2>
      <h3 className="promotion-card__title">{promotion.title}</h3>
      <p className="promotion-card__summary">{promotion.summary}</p>
      <div className="promotion-card__bottom">
        <span className="promotion-card__location">
          <svg className="promotion-card__location-icon" aria-hidden="true">
            <use href="/img/sprite.svg#icon-mappin" />
          </svg>
          {promotion.location}
        </span>
        <button
          className="promotion-card__conditions"
          type="button"
          onClick={() => onOpen(promotion)}
          aria-haspopup="dialog"
        >
          Условия акции
        </button>
      </div>
    </article>
  );
}
