'use client';

import { useEffect, useRef, useState } from 'react';
import { siteFields } from '../../lib/site-fields';
import { eventVideoPosters } from '../../lib/event-media';
import { additionalEventChoices, programExtras } from '../../lib/event-site-content';
import EventContentValue from './EventContentValue';
import EventParameters from './EventParameters';
import { toggleScrollLock } from '../../interactions/_functions';
import { Calendar } from './ProgramPicker';
import useFormValidation from './useFormValidation';
import FormError from './FormError';
import { useSiteLocation } from './SiteLocationProvider';
import SelectedLocationFields from './SelectedLocationFields';
import { contactRules, consentRule } from '../../lib/form-validation';

export default function EventModal({ site, defaultEventType = '' }) {
  const fields = siteFields(site);
  const { location, locationId, selectLocation } = useSiteLocation();
  const extras = programExtras(site, location);
  const extraEvents = additionalEventChoices(site, location);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [eventType, setEventType] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [date, setDate] = useState(null);
  const dialog = useRef(null);
  const form = useRef(null);
  const validation = useFormValidation(
    form,
    {
      ...contactRules,
      email: { type: 'email' },
      locationId: { type: 'location', required: true },
      messenger: { type: 'messenger', required: true },
      consent: consentRule,
    },
    { countryId: site.countryId },
  );
  const opener = useRef(null);
  const content = useRef(null);
  const locations = site.arenas?.length
    ? site.arenas.map((arena, index) => ({
        id: `erp-${index}`,
        name: arena.title,
        address: arena.address,
      }))
    : [];
  const stepComplete =
    step === 1
      ? Boolean(eventType)
      : step === 2
        ? Boolean(guestCount)
        : step === 3
          ? Boolean(date)
          : true;

  useEffect(() => {
    const onOpen = (event) => {
      const trigger = event.target.closest?.('[data-event-modal-open]');
      if (!trigger) return;
      opener.current = trigger;
      form.current?.reset();
      validation.reset();
      const typeFields = form.current?.elements.namedItem('eventType');
      if (typeFields) typeFields.value = defaultEventType;
      setStep(1);
      setEventType(defaultEventType);
      setGuestCount('');
      setDate(null);
      setOpen(true);
    };
    document.addEventListener('click', onOpen);
    return () => document.removeEventListener('click', onOpen);
  }, [defaultEventType]);

  useEffect(() => {
    if (!open) return;
    toggleScrollLock(true);
    const frame = requestAnimationFrame(() => dialog.current?.focus({ preventScroll: true }));
    return () => {
      cancelAnimationFrame(frame);
      if (
        !document.querySelector(
          '.tariff-modal.is-open, .auth-modal.is-open, .game-modal.is-open',
        ) &&
        !document.documentElement.classList.contains('is-mobile-menu-open')
      )
        toggleScrollLock(false);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    const trigger = opener.current?.closest('[data-mobile-menu]')
      ? document.querySelector('.header__burger')
      : opener.current;
    requestAnimationFrame(() => trigger?.focus({ preventScroll: true }));
  };
  const next = () => {
    if (!stepComplete) return;
    if (step < 5) {
      setStep(step + 1);
      if (content.current) content.current.scrollTop = 0;
      requestAnimationFrame(() =>
        dialog.current
          ?.querySelector(`[data-event-step="${step + 1}"] .event-modal__heading`)
          ?.focus({ preventScroll: true }),
      );
      return;
    }
    if (!validation.validate()) return;
    const data = new FormData(form.current);
    const locationId = data.get('locationId');
    document.dispatchEvent(
      new CustomEvent('warpoint:event-quiz-complete', {
        detail: {
          city: site.city,
          countryId: site.countryId,
          date: [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, '0'),
            String(date.getDate()).padStart(2, '0'),
          ].join('-'),
          eventType: data.get('eventType'),
          guestCount: data.get('guestCount'),
          services: data
            .getAll('services')
            .filter((value) => extras.some((extra) => extra.value === value)),
          name: String(data.get('name')).trim(),
          phone: data.get('phone'),
          email: String(data.get('email') || '').trim(),
          messenger: data.get('messenger'),
          consent: data.has('consent'),
          locationId,
          location: locations.find((item) => item.id === locationId),
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
      ...dialog.current.querySelectorAll(
        'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled)',
      ),
    ].filter((item) => !item.closest('[hidden]') && item.getClientRects().length);
    const first = items[0];
    const last = items.at(-1);
    if (
      event.shiftKey &&
      (document.activeElement === first || document.activeElement === dialog.current)
    ) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };
  return (
    <>
      <div className={`event-modal${open ? ' is-open' : ''}`} id="event-modal" aria-hidden={!open}>
        {'\n  '}
        <div
          className="event-modal__dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-modal-title"
          tabIndex="-1"
          ref={dialog}
          onKeyDown={onKeyDown}
        >
          {'\n    '}
          <header className="event-modal__header">
            {'\n      '}
            <h2 className="event-modal__title" id="event-modal-title">
              {'Рассчитайте стоимость мероприятия'}
            </h2>
            {'\n      '}
            <button
              className="event-modal__close button-reset"
              type="button"
              aria-label="Закрыть расчёт стоимости"
              onClick={close}
            >
              {'\n        '}
              <span></span>
              {'\n        '}
              <span></span>
              {'\n      '}
            </button>
            {'\n    '}
          </header>
          {'\n\n    '}
          <form
            className="event-modal__form form-validation"
            ref={form}
            {...validation.formProps}
            onSubmit={(event) => {
              event.preventDefault();
              next();
            }}
            onChange={(event) => {
              validation.formProps.onChange(event);
              if (event.target.name === 'eventType') setEventType(event.target.value);
              if (event.target.name === 'guestCount') setGuestCount(event.target.value);
            }}
          >
            <SelectedLocationFields includeLocation={false} />
            {'\n      '}
            <main className="event-modal__content" ref={content}>
              {'\n        '}
              <p className="event-modal__intro">
                {'\n          Ответьте на несколько вопросов'}
                <br />
                {'\n          и получите спецпредложение\n        '}
              </p>
              {'\n\n        '}
              <section
                className="event-modal__step"
                data-event-step="1"
                aria-labelledby="event-step-1-title"
                hidden={step !== 1}
              >
                {'\n          '}
                <h3 className="event-modal__heading" id="event-step-1-title" tabIndex="-1">
                  {'\n            Выберите мероприятие\n          '}
                </h3>
                {'\n          '}
                <fieldset className="event-modal__options event-modal__options--events">
                  {'\n            '}
                  <legend className="visually-hidden">{'Тип мероприятия'}</legend>
                  {'\n\n            '}
                  <label className="event-modal__card event-modal__card--image event-modal__card--kids">
                    {'\n              '}
                    <input
                      className="visually-hidden"
                      type="radio"
                      name="eventType"
                      value="kids-birthday"
                    />
                    {'\n              '}
                    <img
                      src={eventVideoPosters.birthday.src}
                      width={eventVideoPosters.birthday.width}
                      height={eventVideoPosters.birthday.height}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                    {'\n              '}
                    <span className="event-modal__card-label">
                      <EventContentValue category="birthday" field="title">
                        Детский день рождения
                      </EventContentValue>
                    </span>
                    {'\n            '}
                  </label>
                  {'\n            '}
                  <label className="event-modal__card event-modal__card--image event-modal__card--adult">
                    {'\n              '}
                    <input
                      className="visually-hidden"
                      type="radio"
                      name="eventType"
                      value="adult-birthday"
                    />
                    {'\n              '}
                    <img
                      src={eventVideoPosters['adult-birthday'].src}
                      width={eventVideoPosters['adult-birthday'].width}
                      height={eventVideoPosters['adult-birthday'].height}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                    {'\n              '}
                    <span className="event-modal__card-label">
                      <EventContentValue category="adult-birthday" field="title">
                        Взрослый день рождения
                      </EventContentValue>
                    </span>
                    {'\n            '}
                  </label>
                  {'\n            '}
                  <label className="event-modal__card event-modal__card--image event-modal__card--corporate">
                    {'\n              '}
                    <input
                      className="visually-hidden"
                      type="radio"
                      name="eventType"
                      value="corporate"
                    />
                    {'\n              '}
                    <img
                      src={eventVideoPosters.corporate.src}
                      width={eventVideoPosters.corporate.width}
                      height={eventVideoPosters.corporate.height}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                    {'\n              '}
                    <span className="event-modal__card-label">
                      <EventContentValue category="corporate" field="title">
                        Корпоратив / тимбилдинг
                      </EventContentValue>
                    </span>
                    {'\n            '}
                  </label>
                  {'\n            '}
                  <label className="event-modal__card event-modal__card--image event-modal__card--graduation">
                    {'\n              '}
                    <input
                      className="visually-hidden"
                      type="radio"
                      name="eventType"
                      value="graduation"
                    />
                    {'\n              '}
                    <img
                      src={eventVideoPosters.graduation.src}
                      width={eventVideoPosters.graduation.width}
                      height={eventVideoPosters.graduation.height}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                    {'\n              '}
                    <span className="event-modal__card-label">
                      <EventContentValue category="graduation" field="title">
                        Школьный выпускной
                      </EventContentValue>
                    </span>
                    {'\n            '}
                  </label>
                  {'\n            '}
                  <label className="event-modal__card event-modal__card--image event-modal__card--mobile">
                    {'\n              '}
                    <input
                      className="visually-hidden"
                      type="radio"
                      name="eventType"
                      value="mobile-event"
                    />
                    {'\n              '}
                    <img
                      src="/img/events_modal/mobile-arena.jpg"
                      width="739"
                      height="494"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                    {'\n              '}
                    <span className="event-modal__card-label">
                      <EventContentValue category="mobile-event" field="title">
                        Выездное мероприятие
                      </EventContentValue>
                    </span>
                    {'\n            '}
                  </label>
                  {extraEvents.map((event) => (
                    <label className="event-modal__card" key={event.value}>
                      <input
                        className="visually-hidden"
                        type="radio"
                        name="eventType"
                        value={event.value}
                      />
                      <span className="event-modal__card-label">{event.title}</span>
                      <span className="event-modal__card-label">
                        <EventParameters
                          category={event.value}
                          as="span"
                          className="event-modal__card-label"
                        />
                      </span>
                    </label>
                  ))}
                  {'\n          '}
                </fieldset>
                {'\n        '}
              </section>
              {'\n\n        '}
              <section
                className="event-modal__step"
                data-event-step="2"
                aria-labelledby="event-step-2-title"
                hidden={step !== 2}
              >
                {'\n          '}
                <h3 className="event-modal__heading" id="event-step-2-title" tabIndex="-1">
                  {'\n            Сколько человек планируется?\n          '}
                </h3>
                {'\n          '}
                <fieldset className="event-modal__options event-modal__options--guests">
                  {'\n            '}
                  <legend className="visually-hidden">{'Количество гостей'}</legend>
                  {'\n\n            '}
                  <label className="event-modal__card event-modal__card--plain">
                    {'\n              '}
                    <input
                      className="visually-hidden"
                      type="radio"
                      name="guestCount"
                      value="4-10"
                    />
                    {'\n              '}
                    <span className="event-modal__card-label">{'от 4 до 10'}</span>
                    {'\n            '}
                  </label>
                  {'\n            '}
                  <label className="event-modal__card event-modal__card--plain">
                    {'\n              '}
                    <input
                      className="visually-hidden"
                      type="radio"
                      name="guestCount"
                      value="11-20"
                    />
                    {'\n              '}
                    <span className="event-modal__card-label">{'от 11 до 20'}</span>
                    {'\n            '}
                  </label>
                  {'\n            '}
                  <label className="event-modal__card event-modal__card--plain">
                    {'\n              '}
                    <input
                      className="visually-hidden"
                      type="radio"
                      name="guestCount"
                      value="21-30"
                    />
                    {'\n              '}
                    <span className="event-modal__card-label">{'от 21 до 30'}</span>
                    {'\n            '}
                  </label>
                  {'\n            '}
                  <label className="event-modal__card event-modal__card--plain">
                    {'\n              '}
                    <input className="visually-hidden" type="radio" name="guestCount" value="30+" />
                    {'\n              '}
                    <span className="event-modal__card-label">{'Более 30'}</span>
                    {'\n            '}
                  </label>
                  {'\n          '}
                </fieldset>
                {'\n        '}
              </section>
              {'\n\n        '}
              <section
                className="event-modal__step event-modal__step--calendar"
                data-event-step="3"
                aria-labelledby="event-step-3-title"
                hidden={step !== 3}
              >
                {'\n          '}
                <h3 className="event-modal__heading" id="event-step-3-title" tabIndex="-1">
                  {'\n            В какой день планируете'}
                  <br />
                  {'\n            мероприятие?\n          '}
                </h3>
                {'\n          '}
                {open && step === 3 && (
                  <Calendar date={date} onChange={setDate} className="event-modal__calendar" />
                )}
                {'\n          '}
                <p className="event-modal__selected-date" aria-live="polite">
                  {date &&
                    `Выбрано: ${new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)}`}
                </p>
                {'\n        '}
              </section>
              {'\n\n        '}
              <section
                className="event-modal__step event-modal__step--services"
                data-event-step="4"
                aria-labelledby="event-step-4-title"
                hidden={step !== 4}
              >
                {'\n          '}
                <h3 className="event-modal__heading" id="event-step-4-title" tabIndex="-1">
                  {'\n            Добавим что-нибудь ещё?\n          '}
                </h3>
                {'\n          '}
                <fieldset className="event-modal__options event-modal__options--services">
                  <legend className="visually-hidden">Дополнительные услуги</legend>
                  {extras.map((extra) => (
                    <label
                      className="event-modal__card event-modal__card--service"
                      key={extra.value}
                    >
                      <input
                        className="visually-hidden"
                        type="checkbox"
                        name="services"
                        value={extra.value}
                      />
                      <span className="event-modal__card-label">{extra.title}</span>
                    </label>
                  ))}
                </fieldset>
                {'\n        '}
              </section>
              {'\n\n        '}
              <section
                className="event-modal__step event-modal__step--finish"
                data-event-step="5"
                aria-labelledby="event-step-5-title"
                hidden={step !== 5}
              >
                {'\n          '}
                <h3 className="event-modal__heading" id="event-step-5-title" tabIndex="-1">
                  {'Почти готово'}
                </h3>
                {'\n          '}
                <div className="event-modal__contact-fields">
                  {'\n            '}
                  <p className="event-modal__contact-intro">
                    {
                      '\n              Оставьте контакты для расчёта стоимости мероприятия\n            '
                    }
                  </p>
                  {'\n            '}
                  <label className="event-modal__field">
                    {'\n              '}
                    <span className="visually-hidden">
                      {'Имя '}
                      <span aria-hidden="true">{'*'}</span>
                    </span>
                    {'\n              '}
                    <input
                      {...validation.fieldProps('name')}
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Ваше имя"
                      required={true}
                      maxLength="100"
                    />
                    {'\n            '}
                    <FormError validation={validation} name="name" />
                  </label>
                  {'\n            '}
                  <label className="event-modal__field">
                    {'\n              '}
                    <span className="visually-hidden">
                      {'Телефон '}
                      <span aria-hidden="true">{'*'}</span>
                    </span>
                    {'\n              '}
                    <input
                      {...validation.fieldProps('phone')}
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      data-phone-mask=""
                      required={true}
                    />
                    {'\n            '}
                    <FormError validation={validation} name="phone" />
                  </label>
                  {'\n            '}
                  <label className="event-modal__field">
                    {'\n              '}
                    <span className="visually-hidden">{'Email'}</span>
                    {'\n              '}
                    <input
                      {...validation.fieldProps('email')}
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="mail@example.ru"
                    />
                    {'\n            '}
                    <FormError validation={validation} name="email" />
                  </label>
                  {'\n            '}
                  <label className="event-modal__field" data-event-location-field="">
                    {'\n              '}
                    <span className="visually-hidden">
                      {'Локация '}
                      <span>({site.city})</span>
                      {'\n                '}
                      <span aria-hidden="true">{'*'}</span>
                    </span>
                    {'\n              '}
                    <select
                      {...validation.fieldProps('locationId')}
                      name="locationId"
                      value={locationId}
                      onChange={(event) => {
                        if (event.target.value)
                          selectLocation(Number(event.target.value.replace('erp-', '')));
                      }}
                      data-event-location=""
                      required={true}
                    >
                      {'\n                '}
                      <option value="" disabled={true}>
                        {'Выберите локацию'}
                      </option>
                      {locations.map((location) => (
                        <option key={location.id} value={location.id}>
                          {location.name} — {location.address}
                        </option>
                      ))}
                      {'\n              '}
                    </select>
                    {'\n            '}
                    <FormError validation={validation} name="locationId" />
                  </label>
                  {'\n            '}
                  <fieldset className="event-modal__contact-methods">
                    <legend className="event-modal__contact-methods-title">
                      Как удобнее связаться?
                    </legend>
                    {[
                      ['call', 'Звонок'],
                      ['telegram', 'Telegram'],
                      ['whatsapp', 'WhatsApp'],
                      ['max', 'Макс'],
                    ].map(([value, label]) => (
                      <label className="event-modal__contact-method" key={value}>
                        <input
                          {...validation.fieldProps(
                            'messenger',
                            'visually-hidden event-modal__contact-method-input',
                          )}
                          type="radio"
                          name="messenger"
                          value={value}
                          aria-label={label}
                          defaultChecked={value === 'call'}
                          required
                        />
                        <span className="event-modal__contact-method-label">{label}</span>
                      </label>
                    ))}
                  </fieldset>
                  <FormError validation={validation} name="messenger" />
                  {'\n            '}
                  <label className="event-modal__consent">
                    {'\n              '}
                    <input
                      {...validation.fieldProps('consent', 'form-checkbox')}
                      name="consent"
                      type="checkbox"
                      required={true}
                    />
                    {'\n              '}
                    <span>
                      {'Согласен с\n                '}
                      <a href="/legal/privacy/" target="_blank" rel="noopener">
                        {'обработкой персональных данных'}
                      </a>
                    </span>
                    {'\n            '}
                  </label>
                  <FormError validation={validation} name="consent" />
                  {'\n          '}
                </div>
                {'\n        '}
              </section>
              {'\n      '}
            </main>
            {'\n\n      '}
            <footer className="event-modal__footer">
              {'\n        '}
              <button
                className="event-modal__nav event-modal__nav--back btn btn--m"
                type="button"
                disabled={step === 1}
                onClick={() => setStep((current) => Math.max(1, current - 1))}
              >
                {'\n          Назад\n        '}
              </button>
              {'\n\n        '}
              <div className="event-modal__progress" aria-live="polite">
                {'\n          '}
                <span>Шаг {step} из 5</span>
                {'\n          '}
                <span
                  className="event-modal__progress-dots"
                  aria-hidden="true"
                  data-event-progress-dots=""
                >
                  {'\n            '}
                  {[1, 2, 3, 4, 5].map((number) => (
                    <i
                      key={number}
                      className={number === step ? 'is-active' : number < step ? 'is-complete' : ''}
                    />
                  ))}
                  {'\n          '}
                </span>
                {'\n        '}
              </div>
              {'\n\n        '}
              <button
                className="event-modal__nav event-modal__nav--next btn btn--m btn--red"
                type="button"
                disabled={!stepComplete}
                onClick={next}
              >
                {step === 5 ? 'Получить расчёт' : 'Далее'}
              </button>
              {'\n      '}
            </footer>
            {'\n    '}
          </form>
          {'\n  '}
        </div>
        {'\n'}
      </div>
    </>
  );
}
