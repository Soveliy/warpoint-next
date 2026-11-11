'use client';

import { useEffect, useRef, useState } from 'react';
import { toggleScrollLock } from '../../interactions/_functions';
import useFormValidation from './useFormValidation';
import EventRequestFields from './EventRequestFields';
import { useSiteLocation } from './SiteLocationProvider';
import { contactRules, consentRule, localDateKey } from '../../lib/form-validation';

export default function EventRequestModal({ eventType }) {
  const { site } = useSiteLocation();
  const [open, setOpen] = useState(false);
  const [tariff, setTariff] = useState('');
  const [minDate, setMinDate] = useState('');
  const dialog = useRef(null);
  const form = useRef(null);
  const validation = useFormValidation(
    form,
    {
      ...contactRules,
      email: { type: 'email' },
      date: { type: 'date', required: true, future: true },
      consent: consentRule,
    },
    { countryId: site.countryId },
  );
  const trigger = useRef(null);

  useEffect(() => {
    const onClick = (event) => {
      const button = event.target.closest?.('[data-event-request-open]');
      if (!button) return;
      const tariffName =
        button.dataset.tariffTitle ||
        button
          .closest('.event-tariffs__card')
          ?.querySelector('.event-tariffs__card-title')
          ?.textContent?.trim() ||
        button
          .closest('.tariff-modal')
          ?.querySelector('.tariff-modal__title')
          ?.textContent?.trim() ||
        '';
      trigger.current = button;
      setTariff(tariffName);
      setMinDate(localDateKey());
      form.current?.reset();
      validation.reset();
      setOpen(true);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    toggleScrollLock(true);
    const frame = requestAnimationFrame(() =>
      form.current?.elements.namedItem('name')?.focus({ preventScroll: true }),
    );
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
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = [
      ...dialog.current.querySelectorAll('a[href], button:not(:disabled), input:not(:disabled)'),
    ].filter((item) => item.getClientRects().length);
    if (event.shiftKey && document.activeElement === focusable[0]) {
      event.preventDefault();
      focusable.at(-1)?.focus();
    } else if (!event.shiftKey && document.activeElement === focusable.at(-1)) {
      event.preventDefault();
      focusable[0]?.focus();
    }
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (!validation.validate()) return;
    const values = new FormData(form.current);
    document.dispatchEvent(
      new CustomEvent('warpoint:event-request', {
        detail: {
          eventType,
          tariff,
          name: String(values.get('name')).trim(),
          phone: String(values.get('phone')),
          email: String(values.get('email') || '').trim(),
          date: String(values.get('date') || ''),
          locationId: String(values.get('locationId') || ''),
          consent: values.get('consent') === 'on',
          city: String(values.get('city') || ''),
          countryId: String(values.get('countryId') || ''),
        },
      }),
    );
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
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
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
              'Оставьте контакты и дату праздника. Менеджер свяжется с вами и поможет с организацией.'
            }
          </p>
          {'\n    '}
          <form
            className="event-request-modal__form form-validation"
            ref={form}
            {...validation.formProps}
            onSubmit={onSubmit}
          >
            <EventRequestFields validation={validation} minDate={minDate} />
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
