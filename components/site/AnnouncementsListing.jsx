'use client';

import { useState } from 'react';
import { announcements } from '../../lib/announcements';
import SiteContentDialog from './SiteContentDialog';

export default function AnnouncementsListing({ site }) {
  const [selected, setSelected] = useState(null);
  const close = () => setSelected(null);
  if (site.city !== 'Екатеринбург') return <section className="announcements-list container"><p>Анонсы мероприятий в вашем городе появятся здесь.</p></section>;
  const item = selected === null ? null : announcements[selected];
  return <section className="announcements-list container" aria-label="Анонсы мероприятий">
    <div className="announcements-list__grid">{announcements.map((event, index) => <article className="announcement-card" key={event.title}>
      <div className="announcement-card__image"><img src={event.image} alt="" loading={index === 0 ? 'eager' : 'lazy'} /><div className="announcement-card__date"><strong>{event.day}</strong><span><b>{event.month}</b><small>{event.weekday}</small></span></div></div>
      <div className="announcement-card__body">
        <span className="announcement-card__category">{event.category}</span><h2>{event.titleLines.map((line) => <span key={line}>{line}</span>)}</h2><p>{event.description}</p>
        <div className="announcement-card__details"><span><svg aria-hidden="true"><use href="/img/sprite.svg#icon-calendar" /></svg><time dateTime={`${event.date}T${event.time}`}>{event.day} {event.month}, {event.time}</time></span><span><svg aria-hidden="true"><use href="/img/sprite.svg#icon-mappin" /></svg>{event.location}</span></div>
        <div className="announcement-card__actions"><button className="listing-button" type="button" onClick={() => setSelected(index)} aria-haspopup="dialog">Подробнее</button><button className="listing-button listing-button--solid" type="button" data-booking-open="" data-booking-event={event.title}>Оставить заявку</button></div>
      </div>
    </article>)}</div>
    {item && <SiteContentDialog className="announcement-dialog" labelledBy="announcement-dialog-title" onClose={close}>
      <div className="announcement-dialog__panel">
        <button type="button" className="site-content-dialog__close" onClick={close} aria-label="Закрыть мероприятие">×</button>
        <span className="announcement-card__category">{item.category}</span><h2 id="announcement-dialog-title">{item.title}</h2>
        <p>{item.description}</p><p>{item.day} {item.month}, {item.time}<br />{item.location}</p>
        <button className="listing-button listing-button--solid" type="button" data-booking-open="" data-booking-event={item.title} onClick={close}>Оставить заявку</button>
      </div>
    </SiteContentDialog>}
  </section>;
}
