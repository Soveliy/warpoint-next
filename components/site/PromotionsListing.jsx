'use client';

import { useEffect, useRef, useState } from 'react';
import { promotions } from '../../lib/promotions';

export default function PromotionsListing({ site }) {
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const trigger = useRef(null);
  const close = () => { setSelected(null); requestAnimationFrame(() => trigger.current?.focus()); };

  useEffect(() => {
    if (selected === null) return;
    const prior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') close();
      if (event.key !== 'Tab') return;
      const items = [...dialog.current.querySelectorAll('button, a[href]')];
      if (event.shiftKey && document.activeElement === items[0]) { event.preventDefault(); items.at(-1)?.focus(); }
      else if (!event.shiftKey && document.activeElement === items.at(-1)) { event.preventDefault(); items[0]?.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = prior; document.removeEventListener('keydown', onKeyDown); };
  }, [selected]);

  if (site.city !== 'Екатеринбург') return <section className="promotions-list container"><p className="promotions-list__notice">Акции для вашего города появятся здесь после публикации условий.</p></section>;
  const promotion = selected === null ? null : promotions[selected];
  return <section className="promotions-list container" aria-label="Акции WARPOINT">
    <p className="promotions-list__notice">Наличие акции и условия участия уточняйте в выбранном парке.</p>
    <div className="promotions-list__grid">{promotions.map((item, index) => <article className={`promotion-card${index === 0 ? ' promotion-card--featured' : ''}`} key={`${item.title}-${index}`}>
      <span className="promotion-card__type">{item.type}</span>
      <h2>{item.value}</h2>
      <h3>{item.title}</h3>
      <p>{item.summary}</p>
      <div className="promotion-card__bottom">
        <span className="promotion-card__location">{item.location}</span>
        <button type="button" onClick={(event) => { trigger.current = event.currentTarget; setSelected(index); }}>Условия акции</button>
      </div>
    </article>)}</div>
    {promotion && <div className="promotion-dialog" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
      <div className="promotion-dialog__panel" role="dialog" aria-modal="true" aria-labelledby="promotion-dialog-title" tabIndex={-1} ref={dialog}>
        <button className="promotion-dialog__close" type="button" aria-label="Закрыть" onClick={close}>×</button>
        <span className="promotion-card__type">{promotion.type}</span>
        <h2 id="promotion-dialog-title">{promotion.title}</h2>
        <strong className="promotion-dialog__value">{promotion.value}</strong>
        <p>{promotion.summary}</p>
        <p className="promotion-dialog__location">{promotion.location}</p>
        <p className="promotion-dialog__note">Проверьте срок действия, список участвующих парков и полные условия у администратора перед посещением.</p>
        <button className="listing-button listing-button--solid" type="button" data-booking-open="" onClick={close}>Связаться с парком</button>
      </div>
    </div>}
  </section>;
}
