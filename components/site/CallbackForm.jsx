'use client';

import { useRef } from 'react';
import { contactRules, consentRule } from '../../lib/form-validation';
import useFormValidation from './useFormValidation';
import FormError from './FormError';

export default function CallbackForm({ countryId, mobile = false }) {
  const form = useRef(null);
  const validation = useFormValidation(
    form,
    {
      ...contactRules,
      email: { type: 'email', required: true },
      agreement: consentRule,
    },
    { countryId },
  );
  const prefix = mobile ? 'callback-mobile' : 'callback';
  const submit = (event) => {
    event.preventDefault();
    if (!validation.validate()) return;
    const values = Object.fromEntries(new FormData(form.current));
    form.current.dispatchEvent(
      new CustomEvent('callback-form:valid', {
        bubbles: true,
        detail: { ...values, name: values.name.trim(), email: values.email.trim() },
      }),
    );
  };

  return (
    <form
      className="faq__form form-validation"
      ref={form}
      {...validation.formProps}
      onSubmit={submit}
    >
      <p className="faq__form-title">Остались вопросы? {mobile && <br />}Задайте их менеджеру</p>
      <div className="faq__fields">
        <label className="faq__field" htmlFor={`${prefix}-name`}>
          <span className="visually-hidden">Ваше имя</span>
          <input
            {...validation.fieldProps('name', 'faq__input')}
            id={`${prefix}-name`}
            name="name"
            type="text"
            placeholder="Ваше имя"
            autoComplete="name"
            minLength={2}
            maxLength={100}
            required
          />
          <FormError validation={validation} name="name" />
        </label>
        <label className="faq__field" htmlFor={`${prefix}-phone`}>
          <span className="visually-hidden">Телефон</span>
          <input
            {...validation.fieldProps('phone', 'faq__input')}
            id={`${prefix}-phone`}
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
        <label className="faq__field" htmlFor={`${prefix}-email`}>
          <span className="visually-hidden">Email</span>
          <input
            {...validation.fieldProps('email', 'faq__input')}
            id={`${prefix}-email`}
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            required
          />
          <FormError validation={validation} name="email" />
        </label>
      </div>
      <label className="faq__agreement">
        <input
          {...validation.fieldProps('agreement', 'form-checkbox')}
          name="agreement"
          type="checkbox"
          required
        />
        <span>
          Принимаю условия <a href="/legal/privacy/">политики конфиденциальности</a> и даю согласие
          на <a href="/legal/consent/">обработку персональных данных</a>
        </span>
      </label>
      <FormError validation={validation} name="agreement" />
      <button className={`faq__submit button-reset${mobile ? '' : ' btn btn--red'}`} type="submit">
        {!mobile && (
          <svg width="24" height="24" aria-hidden="true">
            <use href="/img/sprite.svg#icon-phone" />
          </svg>
        )}
        Заказать звонок
      </button>
    </form>
  );
}
