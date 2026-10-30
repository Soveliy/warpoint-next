'use client';

import { useRef, useState } from 'react';
import { eventCategoryLinks, tariffCategories, tariffs } from '../../lib/catalog-data';
import { siteFields } from '../../lib/site-fields';
import ListingLead from './ListingLead';

const eventCards = [
  { id: 'start', title: 'Тариф «Старт»', duration: '1 ч 45 мин', players: 'до 8 человек', description: 'Для небольшой компании. Большой выбор VR-игр — каждый найдёт себе развлечение по вкусу!', prices: [['Пн–Чт', '22 900 ₽'], ['Пт–Вс и праздники', '26 900 ₽']] },
  { id: 'basic', title: 'Тариф «Базовый»', duration: '1 ч 45 мин', players: 'до 10 человек', description: 'VR-игры и уютное пространство для праздника с друзьями.', prices: [['Пн–Чт', '27 900 ₽'], ['Пт–Вс и праздники', '31 900 ₽']] },
  { id: 'standard', title: 'Тариф «Стандарт»', duration: '1 ч 45 мин', players: 'до 8 человек', description: 'Программа для полного погружения в виртуальные миры.', prices: [['Пн–Чт', '40 900 ₽'], ['Пт–Вс и праздники', '45 900 ₽']] },
];

function PriceBox({ tariff, local, event = false }) {
  if (tariff.rows) return <div className="tariffs-listing__matrix">
    <div className="tariffs-listing__matrix-head"><span /><span>Пн–Чт</span><span>Пт–Вс и праздники</span></div>
    {tariff.rows.map(([duration, weekday, weekend]) => <div className="tariffs-listing__matrix-row" key={duration}><span>{duration}</span><strong>{local ? weekday : 'По запросу'}</strong><strong>{local ? weekend : 'По запросу'}</strong></div>)}
    <small>Цена с человека</small>
  </div>;
  if (tariff.prices) return <div className="tariffs-listing__prices">
    {tariff.prices.map(([label, value]) => <div key={label}><span>{label}</span><strong>{local ? value : 'По запросу'}</strong><small>{event ? 'за группу' : 'с человека'}</small></div>)}
  </div>;
  return <div className="tariffs-listing__single-price"><span>1 сеанс<small>за игрока</small></span><strong>{local ? tariff.price : 'По запросу'}</strong></div>;
}

export default function TariffsListing({ site }) {
  const [category, setCategory] = useState('arena');
  const [detail, setDetail] = useState(null);
  const dialog = useRef(null);
  const local = siteFields(site).local;
  const cards = tariffs[category] || (eventCategoryLinks[category] ? eventCards : []);
  const selected = tariffCategories.find(([key]) => key === category)?.[1];
  const openDetail = (tariff) => { setDetail(tariff); requestAnimationFrame(() => dialog.current?.showModal()); };
  const closeDetail = () => { dialog.current?.close(); setDetail(null); };
  const onTabKeyDown = (event) => {
    const current = tariffCategories.findIndex(([key]) => key === category);
    const next = event.key === 'ArrowRight' ? (current + 1) % tariffCategories.length
      : event.key === 'ArrowLeft' ? (current - 1 + tariffCategories.length) % tariffCategories.length
      : event.key === 'Home' ? 0 : event.key === 'End' ? tariffCategories.length - 1 : -1;
    if (next < 0) return;
    event.preventDefault();
    setCategory(tariffCategories[next][0]);
    document.getElementById(`tariff-tab-${tariffCategories[next][0]}`)?.focus();
  };

  return <>
    <section className="tariffs-listing container" aria-label="Тарифы по категориям">
      <div className="tariffs-listing__tabs" role="tablist" aria-label="Категории тарифов" onKeyDown={onTabKeyDown}>
        {tariffCategories.map(([key, label]) => <button key={key} type="button" role="tab" aria-selected={category === key} aria-controls="tariffs-panel" id={`tariff-tab-${key}`} className={category === key ? 'is-active' : ''} onClick={() => { setCategory(key); closeDetail(); }}>{label}</button>)}
      </div>
      <div role="tabpanel" id="tariffs-panel" aria-labelledby={`tariff-tab-${category}`}>
        {cards.length ? <div className={`tariffs-listing__grid${cards.length === 2 ? ' tariffs-listing__grid--two' : ''}`}>
          {cards.map((tariff) => <article className="tariffs-listing__card" key={tariff.id}>
            <div className="tariffs-listing__tags"><span>{tariff.duration}</span><span>{tariff.players}</span></div>
            <h2>{tariff.title}</h2><p>{tariff.description}</p>
            <PriceBox tariff={tariff} local={local} event={Boolean(eventCategoryLinks[category])} />
            <div className="tariffs-listing__actions">
              {eventCategoryLinks[category] ? <a className="listing-button listing-button--outline" href={eventCategoryLinks[category]}>Подробнее</a> : <button className="listing-button listing-button--outline" type="button" onClick={() => openDetail(tariff)}>Подробнее</button>}
              <a className="listing-button listing-button--solid" href="#contacts">Оставить заявку</a>
            </div>
          </article>)}
        </div> : <div className="tariffs-listing__unavailable">
          <h2>{selected}</h2><p>Стоимость и доступность этой зоны уточнит менеджер вашего парка.</p>
          <a className="listing-button listing-button--solid" href="#contacts">Узнать стоимость</a>
        </div>}
      </div>
      <p className="tariffs-listing__note"><span>*</span> В игровых зонах цена указана за одного человека, у мероприятий — за всю группу.<br />Пятница, выходные и праздничные дни рассчитываются по тарифу «Пт–Вс и праздники».</p>
    </section>
    <ListingLead site={site} title="Поможем" accent="выбрать тариф" />
    <dialog className="listing-detail" ref={dialog} aria-labelledby="listing-detail-title" onClose={() => setDetail(null)}>
      <button className="listing-detail__close" type="button" aria-label="Закрыть" onClick={closeDetail}>×</button>
      {detail && <>
        <div className="tariffs-listing__tags"><span>{detail.duration}</span><span>{detail.players}</span></div>
        <h2 id="listing-detail-title">{detail.title}</h2>
        <p>{detail.description}</p>
        <PriceBox tariff={detail} local={local} />
        <a className="listing-button listing-button--solid" href="#contacts" onClick={closeDetail}>Оставить заявку</a>
      </>}
    </dialog>
  </>;
}
