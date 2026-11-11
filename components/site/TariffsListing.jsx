'use client';

import { useEffect, useRef, useState } from 'react';
import {
  eventCategoryLinks,
  tariffCategories,
  tariffs,
  eventTariffs,
} from '../../lib/catalog-data';
import { locationTariffs, usesSiteTariffs } from '../../lib/site-tariffs';
import { siteFields } from '../../lib/site-fields';
import ListingLead from './ListingLead';
import LocationSelection from './LocationSelection';
import { useSiteLocation } from './SiteLocationProvider';
import TariffCard from './TariffCard';
import TariffDetail from './TariffDetail';

export default function TariffsListing({ site }) {
  const { location } = useSiteLocation();
  const [category, setCategory] = useState('arena');
  const [detail, setDetail] = useState(null);
  const dialog = useRef(null);
  const local = siteFields(site).local;
  const api = usesSiteTariffs(site);
  const categories = api
    ? [
        ...tariffCategories.map(([key, label]) => [
          key,
          key === 'birthday' ? 'Детские дни рождения' : label,
        ]),
        ...(locationTariffs(site, location, 'adult-birthday').length
          ? [['adult-birthday', 'Взрослые дни рождения']]
          : []),
      ]
    : tariffCategories;
  const cards =
    locationTariffs(site, location, category) ??
    (tariffs[category] || (eventCategoryLinks[category] ? eventTariffs : []));
  const selected = categories.find(([key]) => key === category)?.[1];
  useEffect(() => {
    dialog.current?.close();
    setDetail(null);
    if (!categories.some(([key]) => key === category)) setCategory('arena');
  }, [location]);
  const openDetail = (tariff) => {
    setDetail(tariff);
    requestAnimationFrame(() => dialog.current?.showModal());
  };
  const closeDetail = () => {
    dialog.current?.close();
    setDetail(null);
  };
  const onTabKeyDown = (event) => {
    const current = categories.findIndex(([key]) => key === category);
    const positions = {
      ArrowRight: (current + 1) % categories.length,
      ArrowLeft: (current - 1 + categories.length) % categories.length,
      Home: 0,
      End: categories.length - 1,
    };
    const next = positions[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setCategory(categories[next][0]);
    document.getElementById(`tariff-tab-${categories[next][0]}`)?.focus();
  };

  return (
    <>
      <section className="tariffs-listing container" aria-label="Тарифы по категориям">
        <LocationSelection>
          <div
            className="tariffs-listing__tabs"
            role="tablist"
            aria-label="Категории тарифов"
            onKeyDown={onTabKeyDown}
          >
            {categories.map(([key, label]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={category === key}
                aria-controls="tariffs-panel"
                id={`tariff-tab-${key}`}
                className={
                  category === key
                    ? 'tariffs-listing__tab tariffs-listing__tab--active'
                    : 'tariffs-listing__tab'
                }
                onClick={() => {
                  setCategory(key);
                  closeDetail();
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <div role="tabpanel" id="tariffs-panel" aria-labelledby={`tariff-tab-${category}`}>
            {cards.length ? (
              <div
                className={`tariffs-listing__grid${cards.length === 2 ? ' tariffs-listing__grid--two' : ''}`}
              >
                {cards.map((tariff) => (
                  <TariffCard
                    key={tariff.id}
                    tariff={tariff}
                    local={local}
                    eventHref={eventCategoryLinks[category]}
                    onOpen={openDetail}
                  />
                ))}
              </div>
            ) : (
              <div className="tariffs-listing__unavailable">
                <h2 className="tariffs-listing__unavailable-title">{selected}</h2>
                <p className="tariffs-listing__unavailable-description">
                  Стоимость и доступность этой зоны уточнит менеджер вашего парка.
                </p>
                <a className="listing-button listing-button--solid" href="#contacts">
                  Узнать стоимость
                </a>
              </div>
            )}
          </div>
          <p className="tariffs-listing__note">
            <span className="tariffs-listing__asterisk">*</span>{' '}
            {api
              ? 'Единица расчёта — за человека или за компанию — указана у каждого тарифа.'
              : 'В игровых зонах цена указана за одного человека, у мероприятий — за всю группу.'}
            <br />
            Пятница, выходные и праздничные дни рассчитываются по тарифу «Пт–Вс и праздники».
          </p>
        </LocationSelection>
      </section>
      {location && <ListingLead site={site} title="Поможем" accent="выбрать тариф" />}
      <TariffDetail
        dialogRef={dialog}
        detail={detail}
        local={local}
        onClose={closeDetail}
        onDismiss={() => setDetail(null)}
      />
    </>
  );
}
