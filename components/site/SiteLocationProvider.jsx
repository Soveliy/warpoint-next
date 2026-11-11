'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { selectionCookie, selectionFromCookie } from '../../lib/location-selection';

const SiteLocationContext = createContext(null);

function applyLocation(site, index) {
  const root = document.documentElement;
  root.dataset.city = site.city;
  root.dataset.country = site.countryId;
  root.dataset.locationConfirmed = index === null ? 'false' : 'true';
  if (index === null) delete root.dataset.location;
  else root.dataset.location = 'erp-' + index;
}

async function logErpSelection(site, index) {
  const response = await fetch('/api/erp-debug', { cache: 'no-store' });
  if (!response.ok) throw new Error('Не удалось получить ответ ERP (' + response.status + ').');
  const { endpoint, data } = await response.json();

  console.groupCollapsed('[ERP] ' + site.city + ' — ' + site.arenas[index].title);
  console.log('Выбранная локация', site.arenas[index]);
  console.log('Данные сайта', site);
  console.log('Адрес запроса', endpoint);
  console.log('Полный ответ ERP', data);
  console.groupEnd();
}

export default function SiteLocationProvider({ site, children }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const saved = selectionFromCookie(site, document.cookie);
    setSelectedIndex(saved);
    applyLocation(site, saved);
    const onChange = (event) => {
      if (event.detail?.cityName !== site.city) return;
      const index = Number(String(event.detail.locationId).replace('erp-', ''));
      if (!Number.isInteger(index) || !site.arenas[index]) return;
      setSelectedIndex(index);
      applyLocation(site, index);
      const cookie = selectionCookie(site, index, window.location.protocol === 'https:');
      if (cookie) document.cookie = cookie;
      if (process.env.NODE_ENV === 'development') {
        logErpSelection(site, index).catch((error) => {
          console.error('[ERP] Ошибка вывода данных выбранной локации', error);
        });
      }
    };
    document.addEventListener('warpoint:location-change', onChange);
    return () => document.removeEventListener('warpoint:location-change', onChange);
  }, [site]);

  const selectLocation = useCallback(
    (index) => {
      if (!Number.isInteger(index) || !site.arenas[index]) return;
      document.dispatchEvent(
        new CustomEvent('warpoint:location-change', {
          detail: {
            cityName: site.city,
            countryId: site.countryId,
            locationId: 'erp-' + index,
            locationConfirmed: true,
          },
        }),
      );
    },
    [site],
  );

  const openLocation = useCallback((trigger) => {
    document.dispatchEvent(
      new CustomEvent('warpoint:location-open', {
        detail: { step: 'location', trigger },
      }),
    );
  }, []);

  return (
    <SiteLocationContext.Provider
      value={{
        site,
        selectedIndex,
        location: selectedIndex === null ? null : site.arenas[selectedIndex],
        locationId: selectedIndex === null ? '' : 'erp-' + selectedIndex,
        selectLocation,
        openLocation,
      }}
    >
      {children}
    </SiteLocationContext.Provider>
  );
}

export function useSiteLocation() {
  const context = useContext(SiteLocationContext);
  if (!context) throw new Error('SiteLocationProvider is required');
  return context;
}
