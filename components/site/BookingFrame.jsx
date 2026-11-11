'use client';

import { useEffect, useRef, useState } from 'react';
import { useSiteLocation } from './SiteLocationProvider';
import {
  bookingWidgetLocationIndex,
  bookingWidgetMessage,
  bookingWidgetUrl,
} from '../../lib/booking-widget';

const widgetUrl =
  process.env.NEXT_PUBLIC_BOOKING_WIDGET_URL ||
  (process.env.NODE_ENV === 'development' ? 'http://localhost:3004/' : '');

export default function BookingFrame({ site, onClose, onReturn }) {
  const { locationId, location, selectLocation } = useSiteLocation();
  const [request, setRequest] = useState({ locationId, location });
  const [session, setSession] = useState(null);
  const [status, setStatus] = useState('loading');
  const dialog = useRef(null);
  const iframe = useRef(null);
  const closeButton = useRef(null);
  const close = useRef(onClose);

  useEffect(() => {
    close.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const element = dialog.current;
    element.showModal();
    const frame = requestAnimationFrame(() => closeButton.current?.focus({ preventScroll: true }));
    return () => {
      cancelAnimationFrame(frame);
      element.close();
    };
  }, []);

  useEffect(() => {
    const instanceId = window.crypto.randomUUID();
    const url = bookingWidgetUrl(widgetUrl, {
      hostname: site.hostname,
      locationId: request.locationId,
      location: request.location,
      parentOrigin: window.location.origin,
      instanceId,
    });
    if (!url) {
      setSession(null);
      setStatus('unavailable');
      return;
    }

    setStatus('loading');
    const timer = window.setTimeout(() => setStatus('error'), 20000);
    const receive = (event) => {
      const message = bookingWidgetMessage(event, {
        origin: url.origin,
        source: iframe.current?.contentWindow,
        instanceId,
      });
      if (!message) return;
      if (message.type === 'ready') {
        window.clearTimeout(timer);
        setStatus('ready');
      } else if (message.type === 'close') {
        close.current();
      } else if (message.type === 'result') {
        document.dispatchEvent(
          new CustomEvent('warpoint:booking-request', { detail: message.payload }),
        );
      } else if (message.type === 'location-change') {
        const index = bookingWidgetLocationIndex(site, message.payload);
        if (index >= 0) selectLocation(index);
        else
          document.dispatchEvent(
            new CustomEvent('warpoint:booking-location-change', { detail: message.payload }),
          );
      }
      // The iframe uses the dialog viewport. Child resize messages cannot enlarge it.
    };
    window.addEventListener('message', receive);
    setSession({ url: url.href, instanceId });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('message', receive);
    };
  }, [request, site, selectLocation]);

  useEffect(() => {
    if (status === 'loading') return;
    const frame = requestAnimationFrame(() => {
      const target = status === 'ready' ? iframe.current : closeButton.current;
      target?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [status]);

  const ready = status === 'ready';
  return (
    <dialog
      className="booking-frame"
      ref={dialog}
      aria-labelledby="booking-frame-title"
      aria-busy={status === 'loading'}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <h2 className="visually-hidden" id="booking-frame-title">
        Онлайн-бронирование WARPOINT
      </h2>
      {!ready && (
        <button
          className="booking-frame__close button-reset"
          type="button"
          ref={closeButton}
          aria-label="Закрыть бронирование"
          onClick={onClose}
        >
          ×
        </button>
      )}
      {session && (
        <iframe
          className={`booking-frame__iframe${ready ? ' booking-frame__iframe--ready' : ''}`}
          key={session.instanceId}
          ref={iframe}
          src={session.url}
          title="Онлайн-бронирование WARPOINT"
          referrerPolicy="origin"
          tabIndex={ready ? 0 : -1}
          aria-hidden={!ready}
          inert={!ready}
          onError={() => setStatus('error')}
        />
      )}
      {!ready && (
        <div className="booking-frame__state" role="status" aria-live="polite">
          {status === 'loading' ? (
            <>
              <span className="booking-frame__loader" aria-hidden="true" />
              <p className="booking-frame__title">Загружаем форму бронирования</p>
            </>
          ) : (
            <>
              <p className="booking-frame__title">
                {status === 'unavailable'
                  ? 'Онлайн-бронирование пока недоступно'
                  : 'Не удалось открыть бронирование'}
              </p>
              <p className="booking-frame__description">
                Оставьте заявку, и менеджер поможет выбрать удобное время для игры.
              </p>
              <div className="booking-frame__actions">
                {status === 'error' && (
                  <button
                    className="booking-frame__retry btn btn--red button-reset"
                    type="button"
                    onClick={() => setRequest({ locationId, location })}
                  >
                    Попробовать ещё раз
                  </button>
                )}
                <button
                  className="booking-frame__return button-reset"
                  type="button"
                  onClick={onReturn || onClose}
                >
                  Вернуться к заявке
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </dialog>
  );
}
