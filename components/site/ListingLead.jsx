'use client';

import { useRef, useState } from 'react';
import { contactRules, consentRule } from '../../lib/form-validation';
import useFormValidation from './useFormValidation';
import FormError from './FormError';
import SelectedLocationFields from './SelectedLocationFields';
import { useSiteLocation } from './SiteLocationProvider';

export default function ListingLead({
  site,
  title,
  accent,
  description = 'Оставьте заявку — менеджер подберёт игры под возраст и количество гостей',
}) {
  const [prepared, setPrepared] = useState(false);
  const { location } = useSiteLocation();
  const form = useRef(null);
  const validation = useFormValidation(
    form,
    { ...contactRules, consent: consentRule },
    { countryId: site.countryId },
  );
  const submit = (event) => {
    event.preventDefault();
    if (!validation.validate()) return;
    const values = new FormData(form.current);
    const subject = encodeURIComponent(`Заявка WARPOINT — ${site.city}`);
    const body = encodeURIComponent(
      `Имя: ${String(values.get('name')).trim()}\nТелефон: ${values.get('phone')}\nГород: ${site.city}\nЛокация: ${location ? location.title + ', ' + location.address : 'Не выбрана'}\nРаздел: ${title} ${accent}`,
    );
    window.location.href = `mailto:feedback@warpoint.ru?subject=${subject}&body=${body}`;
    setPrepared(true);
  };
  return (
    <section className="listing-lead container" id="contacts" aria-labelledby="listing-lead-title">
      <div className="listing-lead__copy">
        <h2 className="listing-lead__title" id="listing-lead-title">
          {title}
          <br className="listing-lead__description-break" />
          <span className="listing-lead__accent">{accent}</span>
        </h2>
        <p className="listing-lead__description">{description}</p>
      </div>
      <form
        className="listing-lead__form form-validation"
        ref={form}
        {...validation.formProps}
        onSubmit={submit}
      >
        <SelectedLocationFields summary />
        <div className="listing-lead__fields">
          <label className="listing-lead__field">
            <span className="visually-hidden">Ваше имя</span>
            <input
              {...validation.fieldProps('name', 'listing-lead__input')}
              name="name"
              autoComplete="name"
              placeholder="Ваше имя"
              minLength={2}
              maxLength={100}
              required
            />
            <FormError validation={validation} name="name" />
          </label>
          <label className="listing-lead__field">
            <span className="visually-hidden">Телефон</span>
            <input
              {...validation.fieldProps('phone', 'listing-lead__input')}
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="Телефон"
              data-phone-mask=""
              required
            />
            <FormError validation={validation} name="phone" />
          </label>
          <button
            className="listing-button listing-button--solid listing-lead__submit"
            type="submit"
          >
            Оставить заявку
          </button>
        </div>
        <label className="listing-lead__consent">
          <input
            {...validation.fieldProps('consent', 'form-checkbox')}
            name="consent"
            type="checkbox"
            required
          />
          <span>
            Принимаю условия{' '}
            <a className="listing-lead__link" href="/legal/privacy/">
              Политики конфиденциальности
            </a>{' '}
            и даю согласие на{' '}
            <a className="listing-lead__link" href="/legal/consent/">
              обработку персональных данных
            </a>
          </span>
        </label>
        <FormError validation={validation} name="consent" />
        {prepared && (
          <p className="listing-lead__message" role="status">
            Отправьте подготовленное письмо из почтовой программы. Если она не открылась, напишите
            на feedback@warpoint.ru.
          </p>
        )}
      </form>
    </section>
  );
}
