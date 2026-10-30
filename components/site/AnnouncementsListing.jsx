'use client';

import { useEffect, useRef, useState } from 'react';
import { announcements } from '../../lib/announcements';

export default function AnnouncementsListing({ site }) {
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const trigger = useRef(null);
  const close = () => { setSelected(null); requestAnimationFrame(() => trigger.current?.focus()); };
  useEffect(() => {
    if (selected === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current?.focus();
    const onKeyDown = (event) => { if (event.key === 'Escape') close(); };
    document.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', onKeyDown); };
  }, [selected]);
  if (site.city !== 'Екатеринбург') return <section className="announcements-list container"><p>Анонсы мероприятий в вашем городе появятся здесь.</p></section>;
  const item = selected === null ? null : announcements[selected];
  return <section className="announcements-list container" aria-label="Анонсы мероприятий">
    <div className="announcements-list__grid">{announcements.map((event, index) => <article className="announcement-card" key={event.title}>
      <div className="announcement-card__image"><img src={event.image} alt="" loading={index === 0 ? 'eager' : 'lazy'} /><div className="announcement-card__date"><strong>{event.day}</strong><span>{event.month}<br />{event.weekday}</span></div></div>
      <div className="announcement-card__body">
        <span className="announcement-card__category">{event.category}</span><h2>{event.title}</h2><p>{event.description}</p>
        <div className="announcement-card__details"><span>▦ &nbsp;{event.day} {event.month}, {event.time}</span><span>● &nbsp;{event.location}</span></div>
        <div className="announcement-card__actions"><button className="listing-button" type="button" onClick={(event) => { trigger.current = event.currentTarget; setSelected(index); }}>Подробнее</button><button className="listing-button listing-button--solid" type="button" disabled title="Мероприятие прошло">Оставить заявку</button></div>
      </div>
    </article>)}</div>
    {item && <div className="announcement-dialog" onMouseDown={(event) => { if (event.currentTarget === event.target) close(); }}>
      <div className="announcement-dialog__panel" role="dialog" aria-modal="true" aria-labelledby="announcement-dialog-title" tabIndex={-1} ref={dialog}>
        <button type="button" className="announcement-dialog__close" onClick={close} aria-label="Закрыть">×</button>
        <span className="announcement-card__category">{item.category}</span><h2 id="announcement-dialog-title">{item.title}</h2>
        <p>{item.description}</p><p>{item.day} {item.month} 2026, {item.time}<br />{item.location}</p><strong>Мероприятие прошло</strong>
      </div>
    </div>}
  </section>;
}
