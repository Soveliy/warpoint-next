'use client';

import { useEffect, useRef, useState } from 'react';
import { siteFields } from '../../lib/site-fields';
import { toggleScrollLock } from '../../interactions/_functions';
import { Calendar } from './ProgramPicker';

export default function EventModal({ site }) {
  const fields = siteFields(site);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [eventType, setEventType] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [date, setDate] = useState(null);
  const dialog = useRef(null);
  const form = useRef(null);
  const opener = useRef(null);
  const content = useRef(null);
  const locations = site.arenas?.length
    ? site.arenas.map((arena, index) => ({ id: `erp-${index}`, name: arena.title, address: arena.address }))
    : [];
  const stepComplete = step === 1 ? Boolean(eventType)
    : step === 2 ? Boolean(guestCount)
    : step === 3 ? Boolean(date) : true;

  useEffect(() => {
    const onOpen = (event) => {
      const trigger = event.target.closest?.('[data-event-modal-open]');
      if (!trigger) return;
      opener.current = trigger;
      form.current?.reset();
      setStep(1);
      setEventType('');
      setGuestCount('');
      setDate(null);
      setOpen(true);
    };
    document.addEventListener('click', onOpen);
    return () => document.removeEventListener('click', onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    toggleScrollLock(true);
    const frame = requestAnimationFrame(() => dialog.current?.focus({ preventScroll: true }));
    return () => {
      cancelAnimationFrame(frame);
      if (!document.querySelector('.tariff-modal.is-open, .auth-modal.is-open, .game-modal.is-open') && !document.documentElement.classList.contains('is-mobile-menu-open')) toggleScrollLock(false);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    const trigger = opener.current?.closest('[data-mobile-menu]')
      ? document.querySelector('.header__burger') : opener.current;
    requestAnimationFrame(() => trigger?.focus({ preventScroll: true }));
  };
  const next = () => {
    if (!stepComplete) return;
    if (step < 5) {
      setStep(step + 1);
      if (content.current) content.current.scrollTop = 0;
      requestAnimationFrame(() => dialog.current?.querySelector(`[data-event-step="${step + 1}"] .event-modal__heading`)?.focus({ preventScroll: true }));
      return;
    }
    const fields = form.current.elements;
    fields.namedItem('name').setCustomValidity(fields.namedItem('name').value.trim() ? '' : 'Укажите ваше имя');
    fields.namedItem('phone').setCustomValidity(fields.namedItem('phone').value.replace(/\D/g, '').length >= 10 ? '' : 'Введите телефон полностью');
    if (!form.current.reportValidity()) return;
    const data = new FormData(form.current);
    const locationId = data.get('locationId');
    document.dispatchEvent(new CustomEvent('warpoint:event-quiz-complete', { detail: {
      city: site.city, countryId: site.countryId,
      date: [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-'),
      eventType: data.get('eventType'), guestCount: data.get('guestCount'),
      services: data.getAll('services'), name: String(data.get('name')).trim(),
      phone: data.get('phone'), email: String(data.get('email') || '').trim(),
      messenger: data.get('messenger'), consent: data.has('consent'),
      locationId, location: locations.find((item) => item.id === locationId),
    } }));
    close();
  };
  const onKeyDown = (event) => {
    if (event.key === 'Escape') { event.preventDefault(); close(); return; }
    if (event.key !== 'Tab') return;
    const items = [...dialog.current.querySelectorAll('a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled)')]
      .filter((item) => !item.closest('[hidden]') && item.getClientRects().length);
    const first = items[0];
    const last = items.at(-1);
    if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.current)) {
      event.preventDefault(); last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first?.focus();
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
          <form className="event-modal__form" ref={form} noValidate onSubmit={(event) => { event.preventDefault(); next(); }}
            onChange={(event) => {
              if (event.target.name === 'eventType') setEventType(event.target.value);
              if (event.target.name === 'guestCount') setGuestCount(event.target.value);
            }}
            onInput={(event) => { if (event.target.name === 'name' || event.target.name === 'phone') event.target.setCustomValidity(''); }}>
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
                      src="/img/events_modal/1.jpg"
                      width="284"
                      height="425"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                    {'\n              '}
                    <span className="event-modal__card-label">{'Детский день рождения'}</span>
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
                      src="/img/events_modal/2.jpg"
                      width="284"
                      height="425"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                    {'\n              '}
                    <span className="event-modal__card-label">{'Взрослый день рождения'}</span>
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
                      src="/img/events_modal/3.jpg"
                      width="284"
                      height="425"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                    {'\n              '}
                    <span className="event-modal__card-label">{'Корпоратив / тимбилдинг'}</span>
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
                      src="/img/events_modal/4.jpg"
                      width="284"
                      height="425"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                    {'\n              '}
                    <span className="event-modal__card-label">{'Школьный выпускной'}</span>
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
                    <span className="event-modal__card-label">{'Выездное мероприятие'}</span>
                    {'\n            '}
                  </label>
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
                {open && step === 3 && <Calendar date={date} onChange={setDate} className="event-modal__calendar" />}
                {'\n          '}
                <p
                  className="event-modal__selected-date"
                  aria-live="polite"
                >{date && `Выбрано: ${new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)}`}</p>
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
                  {'\n            '}
                  <legend className="visually-hidden">{'Дополнительные услуги'}</legend>
                  {'\n\n            '}
                  <label className="event-modal__card event-modal__card--service">
                    {'\n              '}
                    <input
                      className="visually-hidden"
                      type="checkbox"
                      name="services"
                      value="master-class"
                    />
                    {'\n              '}
                    <img
                      src="/img/events_modal/moctail.png"
                      width="153"
                      height="153"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                    {'\n              '}
                    <span className="event-modal__card-label">{'Мастер-класс'}</span>
                    {'\n            '}
                  </label>
                  {'\n            '}
                  <label className="event-modal__card event-modal__card--service">
                    {'\n              '}
                    <input
                      className="visually-hidden"
                      type="checkbox"
                      name="services"
                      value="photographer"
                    />
                    {'\n              '}
                    <span className="event-modal__card-label">{'Фотограф'}</span>
                    {'\n            '}
                  </label>
                  {'\n            '}
                  <label className="event-modal__card event-modal__card--service">
                    {'\n              '}
                    <input
                      className="visually-hidden"
                      type="checkbox"
                      name="services"
                      value="story-maker"
                    />
                    {'\n              '}
                    <span className="event-modal__card-label">{'Сторисмейкер'}</span>
                    {'\n            '}
                  </label>
                  {'\n            '}
                  <label className="event-modal__card event-modal__card--service">
                    {'\n              '}
                    <input
                      className="visually-hidden"
                      type="checkbox"
                      name="services"
                      value="cake"
                    />
                    {'\n              '}
                    <span className="event-modal__card-label">{'Праздничный торт'}</span>
                    {'\n            '}
                  </label>
                  {'\n            '}
                  <label className="event-modal__card event-modal__card--service">
                    {'\n              '}
                    <input
                      className="visually-hidden"
                      type="checkbox"
                      name="services"
                      value="balloons"
                    />
                    {'\n              '}
                    <img
                      src="/img/events_modal/baloon.png"
                      width="231"
                      height="234"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                    {'\n              '}
                    <span className="event-modal__card-label">{'Украшение шарами'}</span>
                    {'\n            '}
                  </label>
                  {'\n            '}
                  <label className="event-modal__card event-modal__card--service">
                    {'\n              '}
                    <input
                      className="visually-hidden"
                      type="checkbox"
                      name="services"
                      value="pinata"
                    />
                    {'\n              '}
                    <span className="event-modal__card-label">{'Пиньята'}</span>
                    {'\n            '}
                  </label>
                  {'\n            '}
                  <label className="event-modal__card event-modal__card--service">
                    {'\n              '}
                    <input
                      className="visually-hidden"
                      type="checkbox"
                      name="services"
                      value="host-dj"
                    />
                    {'\n              '}
                    <span className="event-modal__card-label">{'DJ и ведущий'}</span>
                    {'\n            '}
                  </label>
                  {'\n            '}
                  <label className="event-modal__card event-modal__card--service">
                    {'\n              '}
                    <input
                      className="visually-hidden"
                      type="checkbox"
                      name="services"
                      value="mirror-show"
                    />
                    {'\n              '}
                    <span className="event-modal__card-label">{'Шоу «Зеркальный человек»'}</span>
                    {'\n            '}
                  </label>
                  {'\n            '}
                  <label className="event-modal__card event-modal__card--service">
                    {'\n              '}
                    <input
                      className="visually-hidden"
                      type="checkbox"
                      name="services"
                      value="cryo-show"
                    />
                    {'\n              '}
                    <span className="event-modal__card-label">{'Крио шоу'}</span>
                    {'\n            '}
                  </label>
                  {'\n          '}
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
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Ваше имя"
                      required={true}
                      maxLength="100"
                    />
                    {'\n            '}
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
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      data-phone-mask=""
                      required={true}
                    />
                    {'\n            '}
                  </label>
                  {'\n            '}
                  <label className="event-modal__field">
                    {'\n              '}
                    <span className="visually-hidden">{'Email'}</span>
                    {'\n              '}
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="mail@example.ru"
                    />
                    {'\n            '}
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
                    <select name="locationId" data-event-location="" required={true}>
                      {'\n                '}
                      <option value="" disabled={true}>
                        {'Выберите локацию'}
                      </option>
                      {locations.map((location) => <option key={location.id} value={location.id}>{location.name} — {location.address}</option>)}
                      {'\n              '}
                    </select>
                    {'\n            '}
                  </label>
                  {'\n            '}
                  <label className="event-modal__field">
                    {'\n              '}
                    <span className="visually-hidden">
                      {'Куда отправить расчёт '}
                      <span aria-hidden="true">{'*'}</span>
                    </span>
                    {'\n              '}
                    <select name="messenger" required={true}>
                      {'\n                '}
                      <option value="" disabled={true}>
                        {'Куда отправить расчёт'}
                      </option>
                      {'\n                '}
                      <option value="whatsapp">{'WhatsApp'}</option>
                      {'\n                '}
                      <option value="telegram">{'Telegram'}</option>
                      {'\n                '}
                      <option value="max">{'Max'}</option>
                      {'\n              '}
                    </select>
                    {'\n            '}
                  </label>
                  {'\n            '}
                  <label className="event-modal__consent">
                    {'\n              '}
                    <input name="consent" type="checkbox" required={true} />
                    {'\n              '}
                    <span>
                      {'Согласен с\n                '}
                      <a href="/legal/privacy/" target="_blank" rel="noopener">
                        {'обработкой персональных данных'}
                      </a>
                    </span>
                    {'\n            '}
                  </label>
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
                  {[1, 2, 3, 4, 5].map((number) => <i key={number} className={number === step ? 'is-active' : number < step ? 'is-complete' : ''} />)}
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
