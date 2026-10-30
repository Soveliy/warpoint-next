'use client';

import { useEffect, useRef, useState } from 'react';
import { toggleScrollLock } from '../../interactions/_functions';
import { isPhoneComplete } from '../../interactions/components/phone-mask';

export default function BookingPanel({ site }) {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const dialog = useRef(null);
  const form = useRef(null);
  const trigger = useRef(null);

  useEffect(() => {
    const onClick = (event) => {
      const button = event.target.closest?.('[data-booking-open]');
      if (!button) return;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      trigger.current = button;
      form.current?.reset();
      setReady(false);
      setOpen(true);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    toggleScrollLock(true);
    const frame = requestAnimationFrame(() => dialog.current?.focus({ preventScroll: true }));
    return () => {
      cancelAnimationFrame(frame);
      toggleScrollLock(false);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    requestAnimationFrame(() => trigger.current?.focus?.({ preventScroll: true }));
  };
  const updateReady = () => {
    if (!form.current) return;
    const name = form.current.elements.namedItem('name');
    const phone = form.current.elements.namedItem('phone');
    const agreement = form.current.elements.namedItem('agreement');
    setReady(name.value.trim().length >= 2 && isPhoneComplete(phone) && agreement.checked);
  };
  const submit = (event) => {
    event.preventDefault();
    if (!form.current.reportValidity() || !ready) return;
    const values = new FormData(form.current);
    document.dispatchEvent(new CustomEvent('warpoint:booking-request', { detail: {
      name: String(values.get('name')).trim(), phone: String(values.get('phone')),
      city: site.city, countryId: site.countryId,
      arena: document.documentElement.dataset.location || 'erp-0',
    } }));
    close();
  };
  const bookOnline = () => {
    const index = Number.parseInt((document.documentElement.dataset.location || 'erp-0').replace('erp-', ''), 10);
    const selectedUrl = site.arenas[index]?.bookingUrl || site.arenas[0]?.bookingUrl;
    try {
      const url = new URL(selectedUrl);
      if (['https:', 'http:'].includes(url.protocol)) { window.location.assign(url.href); return; }
    } catch { /* No booking URL from ERP. */ }
    form.current?.elements.namedItem('name')?.focus();
  };
  const onKeyDown = (event) => {
    if (event.key === 'Escape') { event.preventDefault(); close(); return; }
    if (event.key !== 'Tab') return;
    const items = [...dialog.current.querySelectorAll('a[href], button:not(:disabled), input:not(:disabled)')].filter((item) => item.getClientRects().length);
    if (event.shiftKey && document.activeElement === items[0]) { event.preventDefault(); items.at(-1)?.focus(); }
    else if (!event.shiftKey && document.activeElement === items.at(-1)) { event.preventDefault(); items[0]?.focus(); }
  };
  return (
    <div className={`booking-panel${open ? ' is-open' : ''}`} id="booking-panel" aria-hidden={!open} inert={!open}>
      <button
        className="booking-panel__backdrop button-reset"
        type="button"
        tabIndex={-1}
        aria-label="Закрыть окно бронирования"
        data-booking-close=""
        onClick={close}
      />

      <aside
        className="booking-panel__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-panel-title"
        aria-describedby="booking-panel-description"
        tabIndex={-1}
        data-booking-dialog=""
        ref={dialog}
        onKeyDown={onKeyDown}
      >
        <button
          className="booking-panel__close button-reset"
          type="button"
          aria-label="Закрыть окно бронирования"
          data-booking-close=""
          onClick={close}
        >
          <span />
          <span />
        </button>

        <section className="booking-panel__online">
          <h2 className="booking-panel__title" id="booking-panel-title">
            <span>Запишитесь</span>
            <span>онлайн</span>
          </h2>
          <p className="booking-panel__subtitle" id="booking-panel-description">
            Выберите игровую зону, дату<br />и удобное время
          </p>
          <button
            className="booking-panel__button booking-panel__button--online button-reset"
            type="button"
            data-booking-online=""
            onClick={bookOnline}
          >
            Записаться онлайн
          </button>
        </section>

        <section className="booking-panel__request" aria-labelledby="booking-request-title">
          <h3 className="booking-panel__request-title" id="booking-request-title">
            Или оставьте заявку и мы свяжемся с вами
          </h3>
          <form className="booking-panel__form" ref={form} onSubmit={submit} onInput={updateReady} onChange={updateReady}>
            <div className="booking-panel__fields">
              <label className="visually-hidden" htmlFor="booking-name">Ваше имя</label>
              <input
                className="booking-panel__input"
                id="booking-name"
                name="name"
                type="text"
                placeholder="Имя"
                autoComplete="name"
                minLength={2}
                data-validate=""
                required
              />
              <label className="visually-hidden" htmlFor="booking-phone">Телефон</label>
              <input
                className="booking-panel__input"
                id="booking-phone"
                name="phone"
                type="tel"
                placeholder="+7 (000) 000-00-00"
                autoComplete="tel"
                inputMode="tel"
                data-phone-mask=""
                data-validate=""
                required
              />
            </div>

            <label className="booking-panel__agreement">
              <input
                className="booking-panel__agreement-input visually-hidden"
                name="agreement"
                type="checkbox"
                data-validate=""
                required
              />
              <span className="booking-panel__agreement-box" aria-hidden="true" />
              <span>
                Я согласен на обработку персональных данных в соответствии с{' '}
                <a href="/legal/privacy/">Политикой конфиденциальности</a>, а также с условиями{' '}
                <a href="/legal/agreement/">Пользовательского соглашения</a>
              </span>
            </label>

            <button
              className="booking-panel__button booking-panel__button--submit button-reset"
              type="submit"
              data-booking-submit=""
              disabled={!ready}
            >
              Оставить заявку
            </button>
          </form>
        </section>
      </aside>
    </div>
  );
}
