'use client';

import { useEffect, useRef, useState } from 'react';

const consentKey = 'warpoint:cookie-consent';
const dismissKey = 'warpoint:cookie-dismissed';

function storageValue(storage, key) {
  try { return window[storage].getItem(key); } catch { return null; }
}

function saveValue(storage, key, value) {
  try { window[storage].setItem(key, value); } catch { /* Storage may be unavailable. */ }
}

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);
  const notice = useRef(null);

  useEffect(() => {
    setVisible(storageValue('localStorage', consentKey) !== 'accepted' && storageValue('sessionStorage', dismissKey) !== 'true');
  }, []);

  useEffect(() => {
    const syncSpace = () => {
      const height = visible && notice.current ? notice.current.getBoundingClientRect().height + 12 : 0;
      document.documentElement.style.setProperty('--cookie-notice-height', `${height}px`);
    };
    syncSpace();
    const observer = new ResizeObserver(syncSpace);
    if (notice.current) observer.observe(notice.current);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty('--cookie-notice-height');
    };
  }, [visible]);

  const dismiss = (accepted) => {
    if (accepted) {
      saveValue('localStorage', consentKey, 'accepted');
      document.dispatchEvent(new CustomEvent('warpoint:cookie-consent-change', { detail: { accepted: true } }));
    } else {
      saveValue('sessionStorage', dismissKey, 'true');
    }
    setVisible(false);
  };

  return (
    <aside ref={notice} className="cookie-notice" aria-label="Использование файлов cookie" hidden={!visible}>
      <div className="cookie-notice__icon" aria-hidden="true">
        <svg viewBox="0 0 32 32"><path d="M28 17A12 12 0 1 1 15 4a7 7 0 0 0 7 8 6 6 0 0 0 6 5Z" /><circle cx="10" cy="15" r="1" /><circle cx="16" cy="22" r="1" /><circle cx="9" cy="22" r="1" /><circle cx="19" cy="16" r="1" /></svg>
      </div>
      <div className="cookie-notice__content">
        <p>Мы используем файлы cookie, чтобы сайт работал корректно и был удобнее. Подробности — в <a href="/legal/cookies/">политике использования cookie</a>.</p>
        <div className="cookie-notice__actions"><button className="cookie-notice__accept btn btn--red" type="button" onClick={() => dismiss(true)}>Принять</button></div>
      </div>
      <button className="cookie-notice__close button-reset" type="button" aria-label="Закрыть уведомление о cookie" onClick={() => dismiss(false)}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
      </button>
    </aside>
  );
}
