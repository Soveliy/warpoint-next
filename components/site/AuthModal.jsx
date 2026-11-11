'use client';

import { useEffect, useRef, useState } from 'react';
import { countries, getCountry } from '../../interactions/data/location-data';
import { toggleScrollLock } from '../../interactions/_functions';
import { formatPhoneValue, phoneDigits } from '../../lib/phone';
import useFormValidation from './useFormValidation';
import FormError from './FormError';
import SelectedLocationFields from './SelectedLocationFields';

export default function AuthModal({ site }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('phone');
  const [countryId, setCountryId] = useState(getCountry(site.countryId).id);
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState({ phone: '', password: '' });
  const modal = useRef(null);
  const trigger = useRef(null);
  const password = useRef(null);
  const phoneForm = useRef(null);
  const passwordForm = useRef(null);
  const phoneValidation = useFormValidation(
    phoneForm,
    { phone: { type: 'phone', required: true, national: true, label: 'Номер телефона' } },
    { countryId },
  );
  const passwordValidation = useFormValidation(passwordForm, {
    login: { type: 'login', required: true },
    password: { type: 'password', required: true },
  });
  const wasLocked = useRef(false);
  const country = getCountry(countryId);

  useEffect(() => {
    const onClick = (event) => {
      const button = event.target.closest?.('[data-js-auth], [data-auth-open]');
      if (!button) return;
      event.preventDefault();
      trigger.current = button;
      setTab('phone');
      phoneValidation.reset();
      passwordValidation.reset();
      setStatus({ phone: '', password: '' });
      setOpen(true);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (!open || !modal.current) return;
    wasLocked.current = document.documentElement.classList.contains('is-scroll-locked');
    if (!modal.current.open) modal.current.showModal();
    toggleScrollLock(true);
    return () => {
      if (modal.current?.open) modal.current.close();
      toggleScrollLock(wasLocked.current);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    if (password.current) password.current.value = '';
    requestAnimationFrame(() => trigger.current?.focus?.({ preventScroll: true }));
  };
  const onSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const isPhone = tab === 'phone';
    const validation = isPhone ? phoneValidation : passwordValidation;
    if (!validation.validate()) return;
    const digits = phoneDigits(phone, countryId, { national: true });
    const request = new CustomEvent('warpoint:auth-submit', {
      bubbles: true,
      cancelable: true,
      detail: {
        method: tab,
        formData: new FormData(form),
        phone: isPhone ? `+${country.phone.prefix}${digits}` : null,
        setStatus: (message) => setStatus((current) => ({ ...current, [tab]: message })),
      },
    });
    if (form.dispatchEvent(request))
      setStatus((current) => ({
        ...current,
        [tab]: 'Сервис входа пока недоступен. Попробуйте позже.',
      }));
  };
  const onTabKeyDown = (event, index) => {
    const keys = { ArrowRight: 1, ArrowLeft: -1, Home: -index, End: 1 - index };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const next = ['phone', 'password'][(index + keys[event.key] + 2) % 2];
    setTab(next);
    phoneValidation.reset();
    passwordValidation.reset();
    modal.current?.querySelector(`[data-auth-tab="${next}"]`)?.focus();
  };

  return (
    <dialog
      className="auth-modal"
      id="auth-modal"
      aria-labelledby="auth-modal-title"
      ref={modal}
      onClose={close}
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === modal.current) close();
      }}
    >
      <button
        className="auth-modal__close button-reset"
        type="button"
        aria-label="Закрыть окно входа"
        onClick={close}
      >
        <span aria-hidden="true" />
      </button>
      <img
        className="auth-modal__logo"
        src="/img/logo.svg"
        width="248"
        height="42"
        alt="Warpoint"
      />
      <div className="auth-modal__tabs" role="tablist" aria-label="Способ входа">
        {[
          ['phone', 'По телефону'],
          ['password', 'Логин и пароль'],
        ].map(([key, label], index) => (
          <button
            className="auth-modal__tab button-reset"
            id={`auth-${key}-tab`}
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            aria-controls={`auth-${key}-panel`}
            data-auth-tab={key}
            tabIndex={tab === key ? 0 : -1}
            onClick={() => {
              setTab(key);
              phoneValidation.reset();
              passwordValidation.reset();
              setStatus({ phone: '', password: '' });
            }}
            onKeyDown={(event) => onTabKeyDown(event, index)}
          >
            {label}
          </button>
        ))}
      </div>
      <h2 className="auth-modal__title" id="auth-modal-title" tabIndex={-1}>
        Вход в личный кабинет
      </h2>
      <p className="auth-modal__subtitle">
        {tab === 'phone'
          ? 'Введите номер телефона — пришлём код подтверждения'
          : 'Введите логин и пароль для входа в личный кабинет'}
      </p>

      <form
        className="auth-modal__form form-validation"
        ref={phoneForm}
        {...phoneValidation.formProps}
        id="auth-phone-panel"
        role="tabpanel"
        aria-labelledby="auth-phone-tab"
        hidden={tab !== 'phone'}
        onSubmit={onSubmit}
      >
        <SelectedLocationFields includeLocation={false} />
        <label className="auth-modal__label" htmlFor="auth-phone">
          Номер телефона
        </label>
        <div className="auth-modal__phone">
          <div className="auth-modal__country">
            <span aria-hidden="true">+{country.phone.prefix}</span>
            <svg aria-hidden="true">
              <use href="/img/sprite.svg#icon-cvervron_down" />
            </svg>
            <select
              name="country"
              aria-label="Телефонный код страны"
              value={countryId}
              onChange={(event) => {
                setCountryId(event.target.value);
                setPhone('');
                phoneValidation.reset();
                setStatus({ phone: '', password: '' });
              }}
            >
              {countries.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} (+{item.phone.prefix})
                </option>
              ))}
            </select>
          </div>
          <input
            {...phoneValidation.fieldProps('phone', 'auth-modal__input')}
            id="auth-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder={country.phone.mask.replace(/^\+\d+\s*/, '').replaceAll('#', '0')}
            value={phone}
            onChange={(event) => {
              setPhone(formatPhoneValue(event.target.value, countryId, { national: true }));
              setStatus((current) => ({ ...current, phone: '' }));
            }}
            required
          />
        </div>
        <FormError validation={phoneValidation} name="phone" />
        <fieldset className="auth-modal__delivery">
          <legend className="auth-modal__label">Куда прислать код</legend>
          <div className="auth-modal__methods">
            {[
              ['max', 'Макс', 'max'],
              ['call', 'Звонок', 'phone'],
              ['sms', 'СМС', 'mess'],
            ].map(([value, label, icon], index) => (
              <label className="auth-modal__method" key={value}>
                <input
                  className="visually-hidden"
                  type="radio"
                  name="delivery"
                  value={value}
                  defaultChecked={index === 0}
                />
                <span className="auth-modal__method-card">
                  {index === 0 && <span className="auth-modal__badge">Рекомендуем</span>}
                  <span className={`auth-modal__method-icon auth-modal__method-icon--${value}`}>
                    <svg aria-hidden="true">
                      <use href={`/img/sprite.svg#icon-${icon}`} />
                    </svg>
                  </span>
                  <span>{label}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <p className="auth-modal__agreement">
          Выбирая способ входа, вы соглашаетесь
          <br />с{' '}
          <a href="/legal/privacy/" target="_blank" rel="noopener">
            Политикой конфиденциальности
          </a>{' '}
          и{' '}
          <a href="/legal/bonuses/" target="_blank" rel="noopener">
            Программой лояльности
          </a>
        </p>
        <p
          className="auth-modal__status"
          id="auth-phone-status"
          role="status"
          hidden={!status.phone}
        >
          {status.phone}
        </p>
        <button className="auth-modal__submit button-reset" type="submit">
          Получить код
        </button>
      </form>

      <form
        className="auth-modal__form form-validation"
        ref={passwordForm}
        {...passwordValidation.formProps}
        id="auth-password-panel"
        role="tabpanel"
        aria-labelledby="auth-password-tab"
        hidden={tab !== 'password'}
        onSubmit={onSubmit}
      >
        <SelectedLocationFields includeLocation={false} />
        <label className="auth-modal__label" htmlFor="auth-login">
          Логин
        </label>
        <input
          {...passwordValidation.fieldProps(
            'login',
            'auth-modal__input auth-modal__input--standalone',
          )}
          id="auth-login"
          name="login"
          type="text"
          autoComplete="username"
          placeholder="Введите логин"
          required
          onChange={() => setStatus((current) => ({ ...current, password: '' }))}
        />
        <FormError validation={passwordValidation} name="login" />
        <label className="auth-modal__label auth-modal__label--spaced" htmlFor="auth-password">
          Пароль
        </label>
        <input
          {...passwordValidation.fieldProps(
            'password',
            'auth-modal__input auth-modal__input--standalone',
          )}
          id="auth-password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Введите пароль"
          required
          ref={password}
          onChange={() => setStatus((current) => ({ ...current, password: '' }))}
        />
        <FormError validation={passwordValidation} name="password" />
        <p
          className="auth-modal__status"
          id="auth-password-status"
          role="status"
          hidden={!status.password}
        >
          {status.password}
        </p>
        <button className="auth-modal__submit button-reset" type="submit">
          Войти
        </button>
      </form>
    </dialog>
  );
}
