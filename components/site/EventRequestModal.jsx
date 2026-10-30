'use client';

import { useEffect, useRef, useState } from 'react';
import { toggleScrollLock } from '../../interactions/_functions';
import { isPhoneComplete } from '../../interactions/components/phone-mask';

const dateKey = (date) => [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');

export default function EventRequestModal({ eventType }) {
  const [open, setOpen] = useState(false);
  const [tariff, setTariff] = useState('');
  const [minDate, setMinDate] = useState('');
  const dialog = useRef(null);
  const form = useRef(null);
  const trigger = useRef(null);

  useEffect(() => {
    const onClick = (event) => {
      const button = event.target.closest?.('[data-event-request-open]');
      if (!button) return;
      const tariffName = button.dataset.tariffTitle
        || button.closest('.event-tariffs__card')?.querySelector('.event-tariffs__card-title')?.textContent?.trim()
        || button.closest('.tariff-modal')?.querySelector('.tariff-modal__title')?.textContent?.trim()
        || '';
      trigger.current = button;
      setTariff(tariffName);
      setMinDate(dateKey(new Date()));
      form.current?.reset();
      setOpen(true);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    toggleScrollLock(true);
    const frame = requestAnimationFrame(() => form.current?.elements.namedItem('name')?.focus({ preventScroll: true }));
    return () => {
      cancelAnimationFrame(frame);
      toggleScrollLock(false);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    requestAnimationFrame(() => trigger.current?.focus?.({ preventScroll: true }));
  };
  const onKeyDown = (event) => {
    if (event.key === 'Escape') { event.preventDefault(); close(); return; }
    if (event.key !== 'Tab') return;
    const focusable = [...dialog.current.querySelectorAll('a[href], button:not(:disabled), input:not(:disabled)')]
      .filter((item) => item.getClientRects().length);
    if (event.shiftKey && document.activeElement === focusable[0]) { event.preventDefault(); focusable.at(-1)?.focus(); }
    else if (!event.shiftKey && document.activeElement === focusable.at(-1)) { event.preventDefault(); focusable[0]?.focus(); }
  };
  const onSubmit = (event) => {
    event.preventDefault();
    const phone = form.current.elements.namedItem('phone');
    phone.setCustomValidity(isPhoneComplete(phone) ? '' : 'Введите телефон полностью');
    if (!form.current.reportValidity()) return;
    const values = new FormData(form.current);
    document.dispatchEvent(new CustomEvent('warpoint:event-request', { detail: {
      eventType, tariff,
      name: String(values.get('name')).trim(), phone: String(values.get('phone')),
      email: String(values.get('email')).trim(), date: String(values.get('date')),
      consent: values.get('consent') === 'on',
      city: document.documentElement.dataset.city || '', countryId: document.documentElement.dataset.country || 'ru',
    } }));
    close();
  };
  return (
    <>
      <div
        className={`event-request-modal${open ? ' is-open' : ''}`}
        id="event-request-modal"
        aria-hidden={!open}
        inert={!open}
        data-event-request-modal=""
        data-event-type={eventType}
        onClick={(event) => { if (event.target === event.currentTarget) close(); }}
      >
        {'\n  '}
        <div
          className="event-request-modal__dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-request-title"
          tabIndex="-1"
          data-event-request-dialog=""
          ref={dialog}
          onKeyDown={onKeyDown}
        >
          {'\n    '}
          <button
            className="event-request-modal__close button-reset"
            type="button"
            aria-label="Закрыть заявку"
            data-event-request-close=""
            onClick={close}
          >
            {'\n      '}
            <span></span>
            <span></span>
            {'\n    '}
          </button>
          {'\n    '}
          <h2 className="event-request-modal__title" id="event-request-title">
            {'Оставить заявку'}
          </h2>
          {'\n    '}
          <p className="event-request-modal__lead">
            {
              '\n      Расскажите, когда планируете мероприятие. Менеджер свяжется с вами и поможет с организацией.\n    '
            }
          </p>
          {'\n    '}
          <form className="event-request-modal__form" ref={form} onSubmit={onSubmit}>
            {'\n      '}
            <label className="event-request-modal__field">
              {'\n        '}
              <span>{'Ваше имя'}</span>
              {'\n        '}
              <input
                name="name"
                type="text"
                autoComplete="name"
                minLength="2"
                maxLength="100"
                required={true}
              />
              {'\n      '}
            </label>
            {'\n      '}
            <label className="event-request-modal__field">
              {'\n        '}
              <span>{'Телефон'}</span>
              {'\n        '}
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                data-phone-mask=""
                onInput={(event) => event.currentTarget.setCustomValidity('')}
                required={true}
              />
              {'\n      '}
            </label>
            {'\n      '}
            <label className="event-request-modal__field">
              {'\n        '}
              <span>{'E-mail'}</span>
              {'\n        '}
              <input name="email" type="email" autoComplete="email" required={true} />
              {'\n      '}
            </label>
            {'\n      '}
            <label className="event-request-modal__field">
              {'\n        '}
              <span>{'Дата мероприятия'}</span>
              {'\n        '}
              <input name="date" type="date" min={minDate} required={true} />
              {'\n      '}
            </label>
            {'\n      '}
            <label className="event-request-modal__consent">
              {'\n        '}
              <input name="consent" type="checkbox" required={true} />
              {'\n        '}
              <span>
                {'\n          Согласен с\n          '}
                <a href="/legal/privacy/" target="_blank" rel="noopener noreferrer">
                  {'политикой конфиденциальности'}
                </a>
                {'\n          и\n          '}
                <a href="/legal/consent/" target="_blank" rel="noopener noreferrer">
                  {'обработкой персональных данных'}
                </a>
                {'\n        '}
              </span>
              {'\n      '}
            </label>
            {'\n      '}
            <button className="event-request-modal__submit btn btn--red" type="submit">
              {'\n        Оставить заявку\n      '}
            </button>
            {'\n    '}
          </form>
          {'\n  '}
        </div>
        {'\n'}
      </div>
    </>
  );
}
