'use client';

import { useEffect, useRef, useState } from 'react';
import { locationTariffs, usesSiteTariffs } from '../../lib/site-tariffs';
import { useSiteLocation } from './SiteLocationProvider';
import { siteFields } from '../../lib/site-fields';
import { toggleScrollLock } from '../../interactions/_functions';

const details = {
  start: {
    included: ['VR-игры на арене', 'Продолжительность программы — 1 ч 45 мин'],
    benefits: ['Подходит для небольших компаний', 'Большой выбор VR-игр'],
  },
  basic: {
    included: [
      '60 минут на арене — погружение в виртуальную реальность, где каждый почувствует себя настоящим героем',
      'Координатор на всё время мероприятия',
      'Лаунж-зона: уютное пространство для отдыха и общения на всё время праздника',
      'Игровая приставка и настольные игры',
      'Поздравление для именинника от команды нашего VR-парка',
      'Памятный подарок имениннику',
      'Пригласительные для гостей',
    ],
    benefits: [
      '7 игр на выбор',
      '15 катаний на VR-аттракционах',
      'Украшение шарами (фонтаны из 3 гелиевых шаров)',
      'Бесплатные чай и кофе для ваших гостей',
    ],
  },
  standard: {
    included: ['VR-игры на арене', 'Продолжительность программы — 1 ч 45 мин'],
    benefits: ['Самый популярный тариф', 'Большой выбор VR-игр'],
  },
};
const generalBasicDetails = {
  included: ['VR-игры на арене', 'Продолжительность программы — 1 ч 45 мин'],
  benefits: ['Подходит для небольших компаний', 'Путешествие по виртуальным мирам'],
};
const focusable =
  'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), [tabindex]:not([tabindex="-1"])';

export default function TariffModal({ site }) {
  const [tariff, setTariff] = useState(null);
  const { location } = useSiteLocation();
  useEffect(() => setTariff(null), [location]);
  const dialog = useRef(null);
  const opener = useRef(null);

  useEffect(() => {
    const open = (event) => {
      const trigger = event.target.closest?.('[data-tariff-open]');
      const card = trigger?.closest('.event-tariffs__card');
      if (!card) return;
      const key = trigger.dataset.tariffOpen;
      const context = card.closest('[data-tariff-context]')?.dataset.tariffContext;
      if (usesSiteTariffs(site)) {
        const current = locationTariffs(site, location, context).find((item) => item.id === key);
        if (!current) return;
        opener.current = trigger;
        setTariff({
          ...current,
          tags: [current.duration, current.players, current.age].filter(Boolean),
          prices: current.priceItems,
        });
        return;
      }
      const birthday = context === 'birthday';
      const content = key === 'basic' && !birthday ? generalBasicDetails : details[key];
      if (!content) return;
      opener.current = trigger;
      setTariff({
        title: card.querySelector('.event-tariffs__card-title')?.textContent.trim() || '',
        description:
          card.querySelector('.event-tariffs__card-description')?.textContent.trim() || '',
        tags: [...card.querySelectorAll('.event-tariffs__card-tags span')].map((item) =>
          item.textContent.trim(),
        ),
        prices: [...card.querySelectorAll('.event-tariffs__card-prices > div')].map((item) => ({
          label: item.querySelector('dt')?.textContent.trim() || '',
          value: item.querySelector('dd')?.textContent.trim() || '',
        })),
        ...content,
      });
    };
    document.addEventListener('click', open);
    return () => document.removeEventListener('click', open);
  }, [site, location]);

  useEffect(() => {
    if (!tariff) return;
    toggleScrollLock(true);
    const frame = requestAnimationFrame(() => dialog.current?.focus({ preventScroll: true }));
    return () => {
      cancelAnimationFrame(frame);
      if (
        !document.querySelector(
          '.event-modal.is-open, .event-request-modal.is-open, .auth-modal.is-open, .game-modal.is-open',
        ) &&
        !document.documentElement.classList.contains('is-mobile-menu-open')
      )
        toggleScrollLock(false);
    };
  }, [tariff]);

  const close = (restoreFocus = true) => {
    setTariff(null);
    if (restoreFocus) requestAnimationFrame(() => opener.current?.focus({ preventScroll: true }));
  };
  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
    }
    if (event.key !== 'Tab') return;
    const items = [...dialog.current.querySelectorAll(focusable)].filter(
      (item) => item.getClientRects().length,
    );
    const first = items[0];
    const last = items.at(-1);
    if (
      event.shiftKey &&
      (document.activeElement === first || document.activeElement === dialog.current)
    ) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  if (!usesSiteTariffs(site) && !siteFields(site).local) return null;
  return (
    <div
      className={`tariff-modal${tariff ? ' is-open' : ''}`}
      id="tariff-modal"
      aria-hidden={!tariff}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        className="tariff-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tariff-modal-title"
        tabIndex="-1"
        ref={dialog}
        onKeyDown={onKeyDown}
      >
        <button
          className="tariff-modal__close button-reset"
          type="button"
          aria-label="Закрыть информацию о тарифе"
          onClick={() => close()}
        >
          <span />
          <span />
        </button>
        <div className="tariff-modal__tags">
          {tariff?.tags.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </div>
        <h2 className="tariff-modal__title" id="tariff-modal-title">
          {tariff?.title}
        </h2>
        <p className="tariff-modal__description">{tariff?.description}</p>
        <div className="tariff-modal__details">
          {tariff?.included.length > 0 && (
            <section className="tariff-modal__panel" aria-labelledby="tariff-modal-included-title">
              <h3 className="tariff-modal__panel-title" id="tariff-modal-included-title">
                В программу включено
              </h3>
              <ul className="tariff-modal__list">
                {tariff?.included.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}
          {tariff?.benefits.length > 0 && (
            <section className="tariff-modal__panel" aria-labelledby="tariff-modal-benefits-title">
              <h3 className="tariff-modal__panel-title" id="tariff-modal-benefits-title">
                Преимущества тарифа
              </h3>
              <ul className="tariff-modal__list">
                {tariff?.benefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
        <div className="tariff-modal__footer">
          <dl
            className={`tariff-modal__prices${tariff?.isApiTariff && tariff.prices.length <= 1 ? ' tariff-modal__prices--single' : ''}`}
          >
            {tariff?.prices.map((price, index) => (
              <div key={index}>
                <dt>{price.label}</dt>
                <dd>
                  {price.oldAmount > price.amount && (
                    <del className="tariff-modal__old-price">{price.oldValue}</del>
                  )}
                  {price.value}
                  {tariff?.priceUnitLabel && (
                    <small className="tariff-modal__price-unit">{tariff.priceUnitLabel}</small>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <button
            className="tariff-modal__request btn btn--red"
            type="button"
            data-event-request-open=""
            data-tariff-title={tariff?.title || ''}
            aria-haspopup="dialog"
            aria-controls="event-request-modal"
            onClick={() => close(false)}
          >
            Оставить заявку
          </button>
        </div>
      </div>
    </div>
  );
}
