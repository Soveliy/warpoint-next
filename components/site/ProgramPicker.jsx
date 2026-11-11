'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSiteLocation } from './SiteLocationProvider';
import SelectedLocationFields from './SelectedLocationFields';
import { getLocations } from '../../interactions/data/location-data';
import useFormValidation from './useFormValidation';
import FormError from './FormError';
import { contactRules, consentRule } from '../../lib/form-validation';
import { eventVideoPosters } from '../../lib/event-media';
import { eventContent, programExtras } from '../../lib/event-site-content';

const hints = [
  'Праздники в WARPOINT — это командные VR-игры, лаунж-зона и координатор, который всё организует за вас.',
  'Для младших у нас спокойные игры без стрельбы, а подросткам понравятся командные сражения на арене. Если играют и взрослые, подберём игры для всех.',
  'На арене одновременно играют до 10 человек. Если гостей больше, разделим их на команды и устроим турнир.',
  'Всё, что выберете, включим в расчёт. Торт можно принести свой — предупредите заранее.',
  'Подскажем свободное время на выбранную дату и придержим его, пока вы всё обсуждаете с гостями.',
  'Остался последний шаг! Пришлём расчёт с учётом ваших ответов и подскажем, как сэкономить.',
];

const events = [
  { value: 'birthday', title: 'День рождения', image: eventVideoPosters.birthday.src },
  { value: 'graduation', title: 'Школьный выпускной', image: eventVideoPosters.graduation.src },
  { value: 'other', title: 'Другое', image: eventVideoPosters['adult-birthday'].src },
];
const ages = [
  { value: '6-10', title: '6–10', suffix: 'лет' },
  { value: '11-14', title: '11–14', suffix: 'лет' },
  { value: '15-18', title: '15–18', suffix: 'лет' },
  { value: 'adults-and-kids', title: 'Взрослые', suffix: 'и дети' },
];
const guests = [
  { value: '4-10', title: 'от 4 до 10', suffix: 'человек' },
  { value: '11-20', title: 'от 11 до 20', suffix: 'человек' },
  { value: '21-30', title: 'от 21 до 30', suffix: 'человек' },
  { value: '30+', title: 'Более 30', suffix: 'человек' },
];

function ChoiceGroup({ name, options, value, onChange, image = false }) {
  return (
    <fieldset
      className={`program-picker__choices program-picker__choices--${image ? 'events' : options.length === 4 ? 'four' : 'extras'}`}
    >
      <legend className="visually-hidden">{name}</legend>
      {options.map((option) => (
        <label
          className={`program-picker__choice${image ? ' program-picker__choice--image' : name === 'services' ? ' program-picker__choice--extra' : ' program-picker__choice--number'}`}
          key={option.value}
        >
          <input
            className="visually-hidden"
            type={name === 'services' ? 'checkbox' : 'radio'}
            name={name}
            value={option.value}
            checked={name === 'services' ? value.includes(option.value) : value === option.value}
            onChange={() => onChange(option.value)}
          />
          <span className="program-picker__choice-body">
            {image && <img src={option.image} width="284" height="425" alt="" loading="lazy" />}
            <span
              className={
                image
                  ? 'program-picker__choice-title'
                  : name === 'services'
                    ? 'program-picker__choice-label'
                    : 'program-picker__choice-copy'
              }
            >
              {image || name === 'services' ? (
                option.title
              ) : (
                <>
                  <strong className="program-picker__choice-value">{option.title}</strong>
                  {option.suffix && (
                    <span className="program-picker__choice-suffix">{option.suffix}</span>
                  )}
                </>
              )}
            </span>
            <span className="program-picker__choice-mark" aria-hidden="true" />
          </span>
        </label>
      ))}
    </fieldset>
  );
}

export function Calendar({ date, onChange, className = 'program-picker__calendar' }) {
  const element = useRef(null);
  useEffect(() => {
    let instance;
    let alive = true;
    Promise.all([import('air-datepicker'), import('air-datepicker/locale/ru')]).then(
      ([picker, locale]) => {
        if (!alive || !element.current) return;
        instance = new picker.default(element.current, {
          inline: true,
          keyboardNav: true,
          locale: locale.default,
          minDate: new Date(),
          navTitles: { days: 'MMMM yyyy' },
          selectedDates: date ? [date] : [],
          onSelect({ date: selected }) {
            onChange(Array.isArray(selected) ? selected[0] || null : selected || null);
          },
        });
      },
    );
    return () => {
      alive = false;
      instance?.destroy();
    };
  }, [onChange]);
  return <div className={className} ref={element} />;
}

const dateKey = (date) =>
  [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');

export default function ProgramPicker({ site }) {
  const [step, setStep] = useState(1);
  const [eventType, setEventType] = useState('birthday');
  const [ageRange, setAgeRange] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [services, setServices] = useState([]);
  const [date, setDate] = useState(null);
  const { location, locationId, selectLocation } = useSiteLocation();
  const extras = useMemo(() => programExtras(site, location), [site, location]);
  const eventOptions = useMemo(
    () =>
      events.map((event) => ({
        ...event,
        title: eventContent(site, location, event.value)?.title || event.title,
        image: eventContent(site, location, event.value)?.image || event.image,
      })),
    [site, location],
  );
  const selectedServices = services.filter((value) =>
    extras.some((extra) => extra.value === value),
  );
  useEffect(() => {
    setServices((current) =>
      current.filter((value) => extras.some((extra) => extra.value === value)),
    );
  }, [extras]);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const locationSelect = useRef(null);
  const locationTrigger = useRef(null);
  const locationOptions = useRef([]);
  const [name, setName] = useState('');
  const [messenger, setMessenger] = useState('call');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState('');
  const heading = useRef(null);
  const form = useRef(null);
  const validation = useFormValidation(
    form,
    { locationId: { type: 'location', required: true }, ...contactRules, consent: consentRule },
    { countryId: site.countryId },
  );

  const locations = useMemo(
    () =>
      site.arenas?.length
        ? site.arenas.map((arena, index) => ({
            id: `erp-${index}`,
            name: arena.title,
            address: arena.address,
            type: 'Арена',
            bookingUrl: arena.bookingUrl,
            coordinates: arena.coordinates,
          }))
        : getLocations(site.countryId, site.city),
    [site],
  );
  const selectedLocation = locations.find((location) => location.id === locationId);

  useEffect(() => {
    if (!locationsOpen) return;
    const closeOutside = (event) => {
      if (!locationSelect.current?.contains(event.target)) setLocationsOpen(false);
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [locationsOpen]);

  const focusLocation = (index) => {
    if (!locations.length) return;
    locationOptions.current[(index + locations.length) % locations.length]?.focus();
  };
  const locationKeyDown = (event, index) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      setLocationsOpen(false);
      locationTrigger.current?.focus({ preventScroll: true });
    } else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      focusLocation(
        event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? locations.length - 1
            : index + (event.key === 'ArrowDown' ? 1 : -1),
      );
    }
  };
  const complete =
    step === 1
      ? Boolean(eventType)
      : step === 2
        ? Boolean(ageRange)
        : step === 3
          ? Boolean(guestCount)
          : step === 5
            ? Boolean(date)
            : true;

  const changeStep = (next) => {
    setStep(Math.max(1, Math.min(6, next)));
    setLocationsOpen(false);
    setStatus('');
    requestAnimationFrame(() => heading.current?.focus({ preventScroll: true }));
  };
  const toggleService = (value) =>
    setServices((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );

  const submit = () => {
    setStatus('');
    if (!validation.validate()) {
      if (!locationId) setLocationsOpen(true);
      return;
    }
    const values = new FormData(form.current);
    const phone = String(values.get('phone'));
    document.dispatchEvent(
      new CustomEvent('warpoint:event-quiz-complete', {
        detail: {
          city: String(values.get('city') || ''),
          countryId: String(values.get('countryId') || ''),
          eventType,
          ageRange,
          guestCount,
          services: selectedServices,
          date: dateKey(date),
          locationId,
          location: selectedLocation,
          name: name.trim(),
          phone,
          messenger,
          consent,
        },
      }),
    );
    setStatus('Спасибо! Мы свяжемся с вами и подготовим расчёт.');
  };

  return (
    <section
      className="program-picker"
      data-header-theme="brand"
      aria-labelledby="program-picker-title"
    >
      <div className="container">
        <div className="section-head section-head--center program-picker__head" data-reveal="">
          <h2 className="section-head__title" id="program-picker-title">
            Подберём лучшую программу
            <br />
            <span>для праздника</span>
          </h2>
        </div>
        <form
          className="program-picker__panel form-validation"
          ref={form}
          {...validation.formProps}
          onSubmit={(event) => {
            event.preventDefault();
            if (step === 6) submit();
          }}
        >
          <SelectedLocationFields includeLocation={false} />
          <div className="program-picker__main">
            <section className="program-picker__step" hidden={step !== 1}>
              <h3
                className="program-picker__question"
                ref={step === 1 ? heading : null}
                tabIndex="-1"
              >
                Какой праздник вы хотите организовать?
              </h3>
              <p className="program-picker__description">
                Выберите повод — подберём программу и тариф
              </p>
              <ChoiceGroup
                name="eventType"
                options={eventOptions}
                value={eventType}
                onChange={setEventType}
                image
              />
            </section>
            <section className="program-picker__step" hidden={step !== 2}>
              <h3
                className="program-picker__question"
                ref={step === 2 ? heading : null}
                tabIndex="-1"
              >
                Сколько лет имениннику?
              </h3>
              <p className="program-picker__description">
                Подберём игры и формат под возраст гостей
              </p>
              <ChoiceGroup name="ageRange" options={ages} value={ageRange} onChange={setAgeRange} />
            </section>
            <section className="program-picker__step" hidden={step !== 3}>
              <h3
                className="program-picker__question"
                ref={step === 3 ? heading : null}
                tabIndex="-1"
              >
                Сколько будет гостей?
              </h3>
              <p className="program-picker__description">
                Считайте всех, кто будет играть, вместе с именинником
              </p>
              <ChoiceGroup
                name="guestCount"
                options={guests}
                value={guestCount}
                onChange={setGuestCount}
              />
            </section>
            <section className="program-picker__step" hidden={step !== 4}>
              <h3
                className="program-picker__question"
                ref={step === 4 ? heading : null}
                tabIndex="-1"
              >
                Что добавить к празднику?
              </h3>
              <p className="program-picker__description">
                Можно выбрать несколько вариантов или пропустить этот шаг
              </p>
              <ChoiceGroup
                name="services"
                options={extras}
                value={selectedServices}
                onChange={toggleService}
              />
            </section>
            <section className="program-picker__step" hidden={step !== 5}>
              <h3
                className="program-picker__question"
                ref={step === 5 ? heading : null}
                tabIndex="-1"
              >
                Когда планируете праздник?
              </h3>
              <p className="program-picker__description">
                Выберите дату в календаре — выходные разбирают быстро, лучше бронировать за 2–3
                недели
              </p>
              {step === 5 && (
                <div className="program-picker__date-layout">
                  <Calendar date={date} onChange={setDate} />
                  <p className="program-picker__date-display">
                    <span>Дата праздника</span>
                    <strong>
                      {date
                        ? new Intl.DateTimeFormat('ru-RU', {
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit',
                          }).format(date)
                        : 'Невыбрана'}
                    </strong>
                  </p>
                </div>
              )}
            </section>
            <section className="program-picker__step" hidden={step !== 6}>
              <h3
                className="program-picker__question"
                ref={step === 6 ? heading : null}
                tabIndex="-1"
              >
                Когда планируете праздник?
              </h3>
              <p className="program-picker__description">
                Выберите локацию и оставьте контакты — подготовим расчёт
              </p>
              <div className="program-picker__fields">
                <div className="program-picker__field program-picker__field--location">
                  <input type="hidden" name="locationId" value={locationId} />
                  <span id="program-location-label">Локация</span>
                  <div
                    className="program-picker__location"
                    ref={locationSelect}
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget))
                        setLocationsOpen(false);
                    }}
                  >
                    <button
                      {...validation.fieldProps(
                        'locationId',
                        `program-picker__location-trigger button-reset${selectedLocation ? '' : ' is-placeholder'}`,
                      )}
                      type="button"
                      aria-labelledby="program-location-label program-location-value"
                      aria-haspopup="listbox"
                      aria-controls="program-location-options"
                      aria-expanded={locationsOpen}
                      ref={locationTrigger}
                      onKeyDown={(event) => {
                        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                          event.preventDefault();
                          setLocationsOpen(true);
                          const selected = locations.findIndex((item) => item.id === locationId);
                          requestAnimationFrame(() =>
                            focusLocation(
                              selected >= 0
                                ? selected
                                : event.key === 'ArrowUp'
                                  ? locations.length - 1
                                  : 0,
                            ),
                          );
                        } else if (event.key === 'Escape') setLocationsOpen(false);
                      }}
                      onClick={() => setLocationsOpen((open) => !open)}
                    >
                      <span id="program-location-value">
                        {selectedLocation?.name || 'Выберите локацию'}
                      </span>
                      <svg viewBox="0 0 16 16" aria-hidden="true">
                        <path d="m3 6 5 5 5-5" />
                      </svg>
                    </button>
                    <div
                      className="program-picker__location-options"
                      id="program-location-options"
                      role="listbox"
                      aria-labelledby="program-location-label"
                      hidden={!locationsOpen}
                    >
                      {locations.map((location, index) => (
                        <button
                          className="program-picker__location-option button-reset"
                          key={location.id}
                          type="button"
                          role="option"
                          aria-selected={location.id === locationId}
                          ref={(element) => {
                            locationOptions.current[index] = element;
                          }}
                          onKeyDown={(event) => locationKeyDown(event, index)}
                          onClick={() => {
                            selectLocation(Number(location.id.replace('erp-', '')));
                            validation.clearError('locationId');
                            setLocationsOpen(false);
                            locationTrigger.current?.focus({ preventScroll: true });
                            setStatus('');
                          }}
                        >
                          <span className="program-picker__location-name">{location.name}</span>
                          <small>
                            {[location.type, location.address].filter(Boolean).join(' · ')}
                          </small>
                          <span className="program-picker__location-mark" aria-hidden="true" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <FormError validation={validation} name="locationId" />
                </div>
                <label className="program-picker__field">
                  <span>Ваше имя</span>
                  <input
                    {...validation.fieldProps('name')}
                    name="name"
                    type="text"
                    autoComplete="name"
                    maxLength="100"
                    placeholder="Как к вам обращаться"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <FormError validation={validation} name="name" />
                </label>
                <label className="program-picker__field">
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
              </div>
              <fieldset className="program-picker__contact-methods">
                <legend>Как удобнее связаться?</legend>
                {[
                  ['call', 'Звонок'],
                  ['telegram', 'Telegram'],
                  ['whatsapp', 'WhatsApp'],
                  ['max', 'Макс'],
                ].map(([value, label]) => (
                  <label key={value}>
                    <input
                      className="visually-hidden"
                      type="radio"
                      name="messenger"
                      value={value}
                      checked={messenger === value}
                      onChange={() => setMessenger(value)}
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </fieldset>
              <label className="program-picker__consent">
                <input
                  {...validation.fieldProps('consent', 'form-checkbox')}
                  type="checkbox"
                  name="consent"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                  required
                />
                <span>
                  Нажимая кнопку «Получить расчёт», вы соглашаетесь на{' '}
                  <a href="/legal/consent/" target="_blank" rel="noopener noreferrer">
                    обработку персональных данных
                  </a>{' '}
                  и с{' '}
                  <a href="/legal/privacy/" target="_blank" rel="noopener noreferrer">
                    Политикой конфиденциальности
                  </a>
                </span>
              </label>
              <FormError validation={validation} name="consent" />
              {status && (
                <p className="program-picker__status" role="status" aria-live="polite">
                  {status}
                </p>
              )}
            </section>
            <div className="program-picker__footer">
              <div className="program-picker__progress" aria-live="polite">
                <strong>{Math.round(((step - 1) / 6) * 100)}%</strong>
                <span className="program-picker__progress-track">
                  <span style={{ width: `${Math.round(((step - 1) / 6) * 100)}%` }} />
                </span>
              </div>
              <div className="program-picker__navigation">
                <button
                  className="program-picker__back button-reset"
                  type="button"
                  aria-label="Предыдущий вопрос"
                  disabled={step === 1}
                  onClick={() => changeStep(step - 1)}
                >
                  ←
                </button>
                <button
                  className="program-picker__next btn btn--red button-reset"
                  type="button"
                  disabled={!complete}
                  onClick={() => (step === 6 ? submit() : changeStep(step + 1))}
                >
                  {step === 6
                    ? 'Получить расчёт'
                    : step === 4 && selectedServices.length === 0
                      ? 'Пропустить'
                      : 'Следующий вопрос'}
                </button>
              </div>
            </div>
          </div>
          <aside className="program-picker__manager" aria-label="Подсказка менеджера">
            <div className="program-picker__manager-header">
              <span className="program-picker__avatar" aria-hidden="true">
                <img src="/img/quiz/manager.svg" width="45" height="45" alt="" />
              </span>
              <div>
                <strong>
                  Менеджер
                  <br />
                  по праздникам
                </strong>
                <span>WARPOINT</span>
                <small>
                  <i aria-hidden="true" /> Онлайн
                </small>
              </div>
            </div>
            <p className="program-picker__hint">{hints[step - 1]}</p>
            <p className="program-picker__manager-note">
              <strong>Сориентируем по цене</strong> и поможем организовать праздник!
            </p>
          </aside>
        </form>
      </div>
    </section>
  );
}
