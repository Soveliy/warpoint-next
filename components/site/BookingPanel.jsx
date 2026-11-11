'use client';

import { useEffect, useRef, useState } from 'react';
import { toggleScrollLock } from '../../interactions/_functions';
import useFormValidation from './useFormValidation';
import FormError from './FormError';
import { contactRules, consentRule } from '../../lib/form-validation';
import SelectedLocationFields from './SelectedLocationFields';

export default function BookingPanel({ site }) {
  const [open, setOpen] = useState(false);
  const dialog = useRef(null);
  const form = useRef(null);
  const validation = useFormValidation(
    form,
    { ...contactRules, agreement: consentRule },
    { countryId: site.countryId },
  );
  const trigger = useRef(null);

  useEffect(() => {
    const onClick = (event) => {
      const button = event.target.closest?.('[data-booking-open]');
      if (!button) return;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      event.preventDefault();
      trigger.current = button;
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
  const submit = (event) => {
    event.preventDefault();
    if (!validation.validate()) return;
    const values = new FormData(form.current);
    document.dispatchEvent(
      new CustomEvent('warpoint:booking-request', {
        detail: {
          name: String(values.get('name')).trim(),
          phone: String(values.get('phone')),
          city: site.city,
          countryId: site.countryId,
          arena: document.documentElement.dataset.location || null,
          locationId: String(values.get('locationId') || ''),
          event: trigger.current?.dataset.bookingEvent || '',
        },
      }),
    );
    close();
  };
  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== 'Tab') return;
    const items = [
      ...dialog.current.querySelectorAll('a[href], button:not(:disabled), input:not(:disabled)'),
    ].filter((item) => item.getClientRects().length);
    if (event.shiftKey && document.activeElement === items[0]) {
      event.preventDefault();
      items.at(-1)?.focus();
    } else if (!event.shiftKey && document.activeElement === items.at(-1)) {
      event.preventDefault();
      items[0]?.focus();
    }
  };
  return (
    <>
      <div
        className={`booking-panel${open ? ' is-open' : ''}`}
        id="booking-panel"
        aria-hidden={!open}
        inert={!open}
      >
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

          <h2 className="booking-panel__title" id="booking-panel-title">
            Оставить заявку
          </h2>
          <p className="booking-panel__subtitle" id="booking-panel-description">
            Менеджер свяжется с вами и поможет с бронированием.
          </p>

          <section className="booking-panel__request" aria-labelledby="booking-request-title">
            <h3 className="visually-hidden" id="booking-request-title">
              Контактные данные
            </h3>
            <form
              className="booking-panel__form form-validation"
              ref={form}
              {...validation.formProps}
              onSubmit={submit}
            >
              <SelectedLocationFields summary />
              <div className="booking-panel__fields">
                <label className="booking-panel__field" htmlFor="booking-name">
                  <span className="visually-hidden">Ваше имя</span>
                  <input
                    {...validation.fieldProps('name', 'booking-panel__input')}
                    id="booking-name"
                    name="name"
                    type="text"
                    placeholder="Имя"
                    autoComplete="name"
                    minLength={2}
                    maxLength={100}
                    required
                  />
                  <FormError validation={validation} name="name" />
                </label>
                <label className="booking-panel__field" htmlFor="booking-phone">
                  <span className="visually-hidden">Телефон</span>
                  <input
                    {...validation.fieldProps('phone', 'booking-panel__input')}
                    id="booking-phone"
                    name="phone"
                    type="tel"
                    placeholder="+7 (000) 000-00-00"
                    autoComplete="tel"
                    inputMode="tel"
                    data-phone-mask=""
                    required
                  />
                  <FormError validation={validation} name="phone" />
                </label>
              </div>

              <label className="booking-panel__agreement">
                <input
                  {...validation.fieldProps('agreement', 'form-checkbox')}
                  name="agreement"
                  type="checkbox"
                  required
                />
                <span>
                  Я согласен на обработку персональных данных в соответствии с{' '}
                  <a href="/legal/privacy/">Политикой конфиденциальности</a>, а также с условиями{' '}
                  <a href="/legal/agreement/">Пользовательского соглашения</a>
                </span>
              </label>
              <FormError validation={validation} name="agreement" />

              <button
                className="booking-panel__button booking-panel__button--submit button-reset"
                type="submit"
                data-booking-submit=""
              >
                Оставить заявку
              </button>
            </form>
          </section>
        </aside>
      </div>
    </>
  );
}
