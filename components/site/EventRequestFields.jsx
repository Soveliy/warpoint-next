import FormError from './FormError';
import SelectedLocationFields from './SelectedLocationFields';

export default function EventRequestFields({ validation, minDate }) {
  return (
    <>
      <SelectedLocationFields />
      <label className="event-request-modal__field">
        <span>Ваше имя</span>
        <input
          {...validation.fieldProps('name')}
          name="name"
          type="text"
          autoComplete="name"
          minLength={2}
          maxLength={100}
          required
        />
        <FormError validation={validation} name="name" />
      </label>
      <label className="event-request-modal__field">
        <span>Телефон</span>
        <input
          {...validation.fieldProps('phone')}
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          data-phone-mask=""
          required
        />
        <FormError validation={validation} name="phone" />
      </label>
      <label className="event-request-modal__field">
        <span>Email (необязательно)</span>
        <input
          {...validation.fieldProps('email')}
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
        />
        <FormError validation={validation} name="email" />
      </label>
      <label className="event-request-modal__field">
        <span>Дата мероприятия</span>
        <input
          {...validation.fieldProps('date')}
          name="date"
          type="date"
          min={minDate || undefined}
          required
        />
        <FormError validation={validation} name="date" />
      </label>
      <label className="event-request-modal__consent">
        <input
          {...validation.fieldProps('consent', 'form-checkbox')}
          name="consent"
          type="checkbox"
          required
        />
        <span>
          Согласен с{' '}
          <a href="/legal/privacy/" target="_blank" rel="noopener noreferrer">
            политикой конфиденциальности
          </a>{' '}
          и{' '}
          <a href="/legal/consent/" target="_blank" rel="noopener noreferrer">
            обработкой персональных данных
          </a>
        </span>
      </label>
      <FormError validation={validation} name="consent" />
    </>
  );
}
