'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useSiteLocation } from './SiteLocationProvider';

const messengers = [
  { id: 'vk', icon: 'vk', label: 'Написать во ВКонтакте', href: '#' },
  { id: 'max', icon: 'max', label: 'Написать в Макс', href: '#' },
  { id: 'telegram', icon: 'tg', label: 'Написать в Telegram', href: '#' },
  { id: 'whatsapp', icon: 'whatsapp', label: 'Написать в WhatsApp', href: '#' },
];

export default function MobileActions() {
  const { selectedIndex } = useSiteLocation();
  const [messengerOpen, setMessengerOpen] = useState(false);
  const messengerRef = useRef(null);
  const messengerToggle = useRef(null);
  const messengerId = useId();

  useEffect(() => {
    setMessengerOpen(false);
  }, [selectedIndex]);

  useEffect(() => {
    if (!messengerOpen) return;
    const closeOutside = (event) => {
      if (!messengerRef.current?.contains(event.target)) setMessengerOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      setMessengerOpen(false);
      messengerToggle.current?.focus({ preventScroll: true });
    };
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [messengerOpen]);

  return (
    <nav className="mobile-actions" aria-label="Быстрые действия">
      <button className="mobile-actions__booking button-reset" type="button" data-booking-open="">
        Забронировать
      </button>
      <div
        className="mobile-actions__messengers messenger-menu"
        ref={messengerRef}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setMessengerOpen(false);
        }}
      >
        <button
          className="mobile-actions__button mobile-actions__button--message button-reset"
          type="button"
          aria-label="Мессенджеры"
          aria-expanded={messengerOpen}
          aria-controls={messengerId}
          ref={messengerToggle}
          onClick={() => setMessengerOpen((value) => !value)}
        >
          <svg className="mobile-actions__icon" aria-hidden="true">
            <use href="/img/sprite.svg#icon-mess" />
          </svg>
        </button>
        <ul
          className="messenger-menu__dropdown"
          id={messengerId}
          aria-label="Мессенджеры Warpoint"
          aria-hidden={!messengerOpen}
          inert={!messengerOpen}
          hidden={!messengerOpen}
        >
          {messengers.map((messenger) => (
            <li key={messenger.id}>
              <a
                className="messenger-menu__link"
                href={messenger.href}
                data-messenger-link={messenger.id}
                onClick={(event) => {
                  if (messenger.href === '#') event.preventDefault();
                  setMessengerOpen(false);
                }}
              >
                <svg className="messenger-menu__icon" aria-hidden="true">
                  <use href={`/img/sprite.svg#icon-${messenger.icon}`} />
                </svg>
                <span>{messenger.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <a
        className="mobile-actions__button mobile-actions__button--phone"
        href="tel:+73433000000"
        aria-label="Позвонить в Warpoint"
        title="Позвонить"
      >
        <svg className="mobile-actions__icon" aria-hidden="true">
          <use href="/img/sprite.svg#icon-phone" />
        </svg>
      </a>
    </nav>
  );
}
