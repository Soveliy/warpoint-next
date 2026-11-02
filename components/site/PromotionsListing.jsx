'use client';

import { useState } from 'react';
import { promotions } from '../../lib/promotions';
import SiteContentDialog from './SiteContentDialog';

export default function PromotionsListing({ site }) {
  const [selected, setSelected] = useState(null);
  const close = () => setSelected(null);

  if (site.city !== 'Екатеринбург') return <section className="promotions-list container"><p className="promotions-list__notice">Акции для вашего города появятся здесь после публикации условий.</p></section>;
  const promotion = selected === null ? null : promotions[selected];
  return <section className="promotions-list container" aria-label="Акции WARPOINT">
    <div className="promotions-list__grid">{promotions.map((item, index) => <article className={`promotion-card${index === 0 ? ' promotion-card--featured' : ''}`} key={`${item.title}-${index}`}>
      <span className="promotion-card__type">{item.type}</span>
      <h2>{item.value.startsWith('до ') ? <><small>до </small>{item.value.slice(3)}</> : item.value}</h2>
      <h3>{item.title}</h3>
      <p>{item.summary}</p>
      <div className="promotion-card__bottom">
        <span className="promotion-card__location"><svg aria-hidden="true"><use href="/img/sprite.svg#icon-mappin" /></svg>{item.location}</span>
        <button type="button" onClick={() => setSelected(index)} aria-haspopup="dialog">Условия акции</button>
      </div>
    </article>)}</div>
    {promotion && <SiteContentDialog className="promotion-dialog" labelledBy="promotion-dialog-title" onClose={close}>
      <div className="promotion-dialog__panel">
        <button className="site-content-dialog__close" type="button" aria-label="Закрыть акцию" onClick={close}>×</button>
        <span className="promotion-card__type">{promotion.type}</span>
        <h2 id="promotion-dialog-title">{promotion.title}</h2>
        <strong className="promotion-dialog__value">{promotion.value}</strong>
        <p>{promotion.summary}</p>
        <p className="promotion-dialog__location">{promotion.location}</p>
        <p className="promotion-dialog__note">Проверьте срок действия, список участвующих парков и полные условия у администратора перед посещением.</p>
        <button className="listing-button listing-button--solid" type="button" data-booking-open="" onClick={close}>Связаться с парком</button>
      </div>
    </SiteContentDialog>}
  </section>;
}
