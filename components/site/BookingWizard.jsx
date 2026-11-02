'use client';

import { useEffect, useRef, useState } from 'react';
import { countries, getCountry } from '../../interactions/data/location-data';
import { formatPhone, getPhoneNationalDigits } from '../../interactions/components/phone-mask';
import { basicBenefits, basicIncluded, bookingFormats, bookingSlots, bookingTariffs, dateKey, duration, endTime, isWeekend, money, parseDate } from '../../lib/booking-data';

const stepNames = ['Локация', 'Формат', 'Тариф', 'Дата', 'Время', 'Контакты', 'Итог'];
const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const dateLabel = (key) => parseDate(key).toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'long' });

function Icon({ name, className = '' }) {
  return <svg className={className} aria-hidden="true"><use href={`/img/sprite.svg#icon-${name}`} /></svg>;
}
function Tags({ children }) { return <div className="booking-wizard__tags">{children.map((tag) => <span key={tag}>{tag}</span>)}</div>; }
function Mark() { return <span className="booking-wizard__mark" aria-hidden="true"><Icon name="check" /></span>; }

function BookingCities({ site, onClose }) {
  const modal = useRef(null);
  const [query, setQuery] = useState('');
  useEffect(() => {
    const element = modal.current;
    element.showModal();
    return () => element.close();
  }, []);
  const cities = site.directory.filter((item) => item.city.toLocaleLowerCase('ru-RU').includes(query.trim().toLocaleLowerCase('ru-RU')));
  return <dialog className="booking-tariff booking-cities" ref={modal} aria-labelledby="booking-city-title" onCancel={(event) => { event.preventDefault(); event.stopPropagation(); onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="booking-tariff__body">
      <button className="booking-wizard__close" type="button" aria-label="Закрыть выбор города" onClick={onClose}>×</button>
      <h2 id="booking-city-title">Выберите город</h2>
      <input className="booking-cities__search" aria-label="Поиск города" placeholder="Поиск города" value={query} onChange={(event) => setQuery(event.target.value)} />
      <p>При выборе другого города откроется его сайт.</p>
      <div className="booking-cities__list">{cities.map((item) => item.city === site.city && item.country === site.country
        ? <button type="button" key={`${item.country}-${item.city}`} onClick={onClose} aria-current="true">{item.city}<small>{item.country}</small></button>
        : <a key={`${item.country}-${item.city}`} href={item.url}>{item.city}<small>{item.country}</small></a>)}</div>
      {!cities.length && <p role="status">Город не найден</p>}
    </div>
  </dialog>;
}

function BookingCalendar({ selected, onChange, tariff, today }) {
  const [month, setMonth] = useState(() => {
    const shown = selected ? parseDate(selected) : today;
    return new Date(shown.getFullYear(), shown.getMonth(), 1);
  });
  const firstOffset = (month.getDay() + 6) % 7;
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const previousDisabled = month <= currentMonth;
  const nextDisabled = month >= new Date(today.getFullYear(), today.getMonth() + 12, 1);
  return <>
    <div className="booking-wizard__month">
      <button className="booking-wizard__round" type="button" disabled={previousDisabled} aria-label="Предыдущий месяц" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}>‹</button>
      <h3 aria-live="polite">{month.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' }).replace(' г.', '')}</h3>
      <button className="booking-wizard__round" type="button" disabled={nextDisabled} aria-label="Следующий месяц" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}>›</button>
    </div>
    <div className="booking-wizard__calendar" role="group" aria-label="Выберите дату">
      {weekdays.map((day, index) => <span className={`booking-wizard__weekday${index > 4 ? ' is-weekend' : ''}`} key={day}>{day}</span>)}
      {Array.from({ length: firstOffset }, (_, index) => <span key={`empty-${index}`} />)}
      {Array.from({ length: days }, (_, index) => {
        const day = new Date(month.getFullYear(), month.getMonth(), index + 1);
        const key = dateKey(day);
        const past = key < dateKey(today);
        const slots = past ? [] : bookingSlots(key, tariff, today);
        const busy = !past && slots.every((slot) => slot.past || slot.busy);
        const promo = slots.some((slot) => slot.tone === 'promo');
        return <button type="button" key={key} disabled={past || busy} aria-pressed={selected === key}
          aria-label={`${day.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}${busy ? ', занято' : ''}`}
          className={`booking-wizard__day${selected === key ? ' is-selected' : ''}${past ? ' is-past' : ''}${busy ? ' is-busy' : ''}`}
          onClick={() => onChange(key)}>
          <span>{index + 1}</span>
          {!past && <span className={`booking-wizard__availability booking-wizard__availability--${busy ? 'busy' : isWeekend(day) || tariff.event ? 'weekend' : 'weekday'}`}>
            {promo && <i />}
          </span>}
        </button>;
      })}
    </div>
    <div className="booking-wizard__legend">
      <span><i className="is-weekday" /><strong>{money(tariff.price)}{tariff.perPerson ? '/чел' : ''}</strong> Пн–Чт</span>
      <span><i className="is-holiday" /><strong>{money(tariff.weekendPrice)}{tariff.perPerson ? '/чел' : ''}</strong> Пт–Вс и праздники</span>
      {tariff.id === 'open-game' && <span><i className="is-promo" /><strong>500 ₽/чел</strong> Промо</span>}
      <span><i /> Занято</span>
    </div>
  </>;
}

function TariffDetails({ tariff, onClose, onSelect }) {
  const modal = useRef(null);
  useEffect(() => {
    const element = modal.current;
    element.showModal();
    return () => element.close();
  }, []);
  return <dialog className="booking-tariff" ref={modal} aria-labelledby="booking-tariff-title" onCancel={(event) => { event.preventDefault(); event.stopPropagation(); onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="booking-tariff__body">
      <button className="booking-wizard__close" type="button" aria-label="Закрыть информацию о тарифе" onClick={onClose}>×</button>
      <Tags>{[duration(tariff.minutes), `до ${tariff.maxPlayers} человек`]}</Tags>
      <h2 id="booking-tariff-title">{tariff.title}</h2>
      <p>{tariff.description}</p>
      <div className="booking-tariff__columns">
        <section><h3>В программу включено</h3><ul>{(tariff.id === 'basic' ? basicIncluded : ['VR-игры на арене', `Продолжительность программы — ${duration(tariff.minutes)}`, 'Отдых в лаунж-зоне']).map((text) => <li key={text}>{text}</li>)}</ul></section>
        <section><h3>Преимущества тарифа</h3><ul>{(tariff.id === 'basic' ? basicBenefits : ['Командные игры для вашей компании', 'Помощь команды парка в организации праздника']).map((text) => <li key={text}>{text}</li>)}</ul></section>
      </div>
      <div className="booking-tariff__footer"><div><span>Пн–Чт<strong>{money(tariff.price)}</strong></span><span>Пт–Вс и праздники<strong>{money(tariff.weekendPrice)}</strong></span></div><button className="booking-wizard__primary" type="button" onClick={onSelect}>Выбрать тариф</button></div>
    </div>
  </dialog>;
}

export default function BookingWizard({ site, onClose }) {
  const modal = useRef(null);
  const content = useRef(null);
  const title = useRef(null);
  const contactForm = useRef(null);
  const [now] = useState(() => new Date());
  const [step, setStep] = useState(0);
  const [arenaIndex, setArenaIndex] = useState(() => {
    const saved = typeof document === 'undefined' ? 0 : Number((document.documentElement.dataset.location || 'erp-0').replace('erp-', ''));
    return Number.isInteger(saved) && site.arenas[saved] ? saved : 0;
  });
  const [formatId, setFormatId] = useState('arena');
  const [tariffId, setTariffId] = useState('open-game');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [participants, setParticipants] = useState(1);
  const [contacts, setContacts] = useState({ name: '', phone: '', email: '', consent: false });
  const [countryId, setCountryId] = useState(getCountry(site.countryId).id);
  const [errors, setErrors] = useState({});
  const [promo, setPromo] = useState('');
  const [promoMessage, setPromoMessage] = useState('');
  const [payment, setPayment] = useState('card');
  const [certificate, setCertificate] = useState({ number: '', pin: '' });
  const [certificateMessage, setCertificateMessage] = useState('');
  const [details, setDetails] = useState(null);
  const [cityPicker, setCityPicker] = useState(false);
  const [complete, setComplete] = useState(false);
  const format = bookingFormats.find((item) => item.id === formatId);
  const tariffOptions = bookingTariffs(formatId);
  const tariff = tariffOptions.find((item) => item.id === tariffId) || tariffOptions[0];
  const arena = site.arenas[arenaIndex];
  const slots = date ? bookingSlots(date, tariff) : [];
  const slot = slots.find((item) => item.time === time);
  const total = slot ? slot.price * (tariff.perPerson ? participants : 1) : 0;
  const deposit = Math.ceil(total * 0.1);
  const phoneCountry = getCountry(countryId);

  useEffect(() => {
    const element = modal.current;
    element.showModal();
    return () => element.close();
  }, []);
  useEffect(() => {
    content.current?.scrollTo(0, 0);
    title.current?.focus({ preventScroll: true });
  }, [step, complete]);

  const chooseFormat = (id) => {
    const first = bookingTariffs(id)[0];
    setFormatId(id); setTariffId(first.id); setTime(''); setParticipants(first.perPerson ? 1 : first.maxPlayers);
  };
  const chooseTariff = (id) => {
    const next = tariffOptions.find((item) => item.id === id);
    setTariffId(id); setTime(''); setParticipants(next.perPerson ? 1 : next.maxPlayers);
  };
  const setContact = (key, value) => {
    setContacts((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: false }));
  };
  const next = () => {
    if (step === 5) {
      const invalid = {
        name: contacts.name.trim().length < 2,
        phone: getPhoneNationalDigits(contacts.phone, countryId).length !== phoneCountry.phone.nationalLength,
        email: !!contacts.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contacts.email),
        consent: !contacts.consent,
      };
      setErrors(invalid);
      const field = Object.keys(invalid).find((key) => invalid[key]);
      if (field) { contactForm.current.elements.namedItem(field)?.focus(); return; }
    }
    setStep((current) => Math.min(6, current + 1));
  };
  const finish = () => {
    if (payment === 'certificate' && (certificate.number.replace(/\D/g, '').length !== 16 || certificate.pin.length !== 4)) {
      setCertificateMessage('Введите 16 цифр номера сертификата и 4 цифры ПИН-кода.'); return;
    }
    // No reservation or payment is sent until a booking API is provided.
    document.dispatchEvent(new CustomEvent('warpoint:booking-request', { detail: {
      preview: true, city: site.city, countryId: site.countryId, arena: { index: arenaIndex, title: arena.title, address: arena.address },
      format: formatId, tariff: tariffId, date, time, participants, total, deposit,
      contacts: { ...contacts, name: contacts.name.trim(), email: contacts.email.trim() }, payment,
    } }));
    setComplete(true);
  };
  const ready = step === 0 ? !!arena : step === 3 ? !!date : step === 4 ? !!slot && !slot.past && !slot.busy && participants <= slot.places : true;

  const summary = () => <dl className="booking-wizard__summary">
    <div><dt>Адрес локации</dt><dd>{arena.title}<small>{arena.address}</small></dd></div>
    <div><dt>Зона и тариф</dt><dd>{format.title} · {tariff.title}</dd></div>
    <div><dt>Длительность</dt><dd>{duration(tariff.minutes)}</dd></div>
    <div><dt>Участники</dt><dd>{participants} чел.</dd></div>
    <div><dt>Дата и время</dt><dd>{date && dateLabel(date)} · {time} – {time && endTime(time, tariff.minutes)}</dd></div>
    <div><dt>Контакты</dt><dd>{contacts.name.trim()}<small>{contacts.phone}{contacts.email && <><br />{contacts.email}</>}</small></dd></div>
  </dl>;

  return <dialog className="booking-wizard" ref={modal} aria-labelledby="booking-wizard-title" onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <article className="booking-wizard__dialog">
      <header className="booking-wizard__header">
        <h2 ref={title} tabIndex={-1} id="booking-wizard-title">Бронирование <b>·</b> <span>{complete ? 'Готово' : stepNames[step]}</span></h2>
        <button className="booking-wizard__close" type="button" aria-label="Закрыть бронирование" onClick={onClose}>×</button>
        <p aria-live="polite">{complete ? 'Демонстрация завершена' : `Этап ${step + 1} из 7`}</p>
        <div className="booking-wizard__progress" role="progressbar" aria-label="Этапы бронирования" aria-valuemin={0} aria-valuemax={7} aria-valuenow={complete ? 7 : step + 1}><span style={{ width: `${(complete ? 7 : step + 1) / 7 * 100}%` }} /></div>
      </header>
      <div className="booking-wizard__content" ref={content}>
        {!complete && <p className="booking-wizard__demo">Демо формы · расписание и цены для примера, оплата не списывается</p>}
        {!complete && step === 0 && <>
          <h3 className="booking-wizard__label">Выберите локацию — <button className="booking-wizard__city" type="button" onClick={() => setCityPicker(true)}>{site.city}</button></h3>
          <div className="booking-wizard__choices" role="group" aria-label="Локация">
            {site.arenas.map((item, index) => <button type="button" className={`booking-wizard__choice booking-wizard__location${arenaIndex === index ? ' is-selected' : ''}`} aria-pressed={arenaIndex === index} key={`${item.title}-${index}`} onClick={() => { setArenaIndex(index); setDate(''); setTime(''); }}>
              <strong>{item.title}</strong><span className="booking-wizard__badge">{item.title.toLowerCase().includes('парк') ? 'Парк' : 'Арена'}</span>
              <span className="booking-wizard__address"><Icon name="mappin" />{item.address}</span>
              {item.hours && <span className="booking-wizard__hours">{typeof item.hours === 'string' ? item.hours : ''}</span>}
            </button>)}
          </div>
        </>}
        {!complete && step === 1 && ['Игровые зоны', 'Мероприятия'].map((group) => <section key={group} className="booking-wizard__group">
          <h3 className="booking-wizard__label">{group}</h3>
          <div className="booking-wizard__choices" role="group" aria-label={group}>{bookingFormats.filter((item) => item.group === group).map((item) => <button type="button" key={item.id} aria-pressed={formatId === item.id} className={`booking-wizard__choice booking-wizard__format${formatId === item.id ? ' is-selected' : ''}`} onClick={() => chooseFormat(item.id)}>
            <span className="booking-wizard__icon"><Icon name={item.icon} /></span><span className="booking-wizard__choice-main"><strong>{item.title}</strong><span className="booking-wizard__description">{item.description}</span><Tags>{item.tags}</Tags></span>
            <span className="booking-wizard__price"><small>от </small>{item.oldPrice && <del>{money(item.oldPrice)}</del>} {money(item.price)}</span>
          </button>)}</div>
        </section>)}
        {!complete && step === 2 && <>
          <h3 className="booking-wizard__label">Выберите тариф — {format.title}</h3>
          <div className="booking-wizard__choices" role="group" aria-label="Тариф">{tariffOptions.map((item) => <div key={item.id} className={`booking-wizard__choice booking-wizard__tariff${tariff.id === item.id ? ' is-selected' : ''}`}>
            <button className="booking-wizard__tariff-select" type="button" aria-pressed={tariff.id === item.id} onClick={() => chooseTariff(item.id)}>
              <strong>{item.title} {item.hit && <span className="booking-wizard__hit">Хит</span>}</strong><span className="booking-wizard__description">{item.description}</span>
              <Tags>{[duration(item.minutes), ...(!item.event ? [`до ${item.maxPlayers} игроков`] : [])]}</Tags>
              <span className="booking-wizard__price"><small>от </small>{money(item.price)}{item.perPerson && <small> /чел</small>}</span>
            </button>
            {item.event && <button className="booking-wizard__more" type="button" onClick={() => setDetails(item)}>Подробнее</button>}
          </div>)}</div>
        </>}
        {!complete && step === 3 && <>
          <h3 className="booking-wizard__label">Выберите дату</h3>
          <BookingCalendar today={now} selected={date} tariff={tariff} onChange={(value) => { setDate(value); setTime(''); }} />
        </>}
        {!complete && step === 4 && <>
          {!tariff.event && <><h3 className="booking-wizard__label">Участники</h3><div className="booking-wizard__counter">
            <button type="button" aria-label="Уменьшить число участников" disabled={participants <= 1} onClick={() => { setParticipants(participants - 1); setTime(''); }}>−</button>
            <output aria-live="polite">{participants}</output>
            <button type="button" aria-label="Увеличить число участников" disabled={participants >= tariff.maxPlayers} onClick={() => { setParticipants(participants + 1); setTime(''); }}>+</button>
            <span>От 1 до {tariff.maxPlayers} чел.</span>
          </div></>}
          <h3 className="booking-wizard__label">Выберите время — {date && dateLabel(date)}</h3>
          <div className="booking-wizard__times" role="group" aria-label="Время сеанса">{slots.map((item) => {
            const disabled = item.past || item.busy || item.places < participants;
            return <button type="button" key={item.time} disabled={disabled} aria-pressed={time === item.time} className={`booking-wizard__time booking-wizard__time--${item.tone}${time === item.time ? ' is-selected' : ''}`} onClick={() => setTime(item.time)}>
              <strong>{item.time}</strong><span>{item.past ? 'Прошло' : item.busy ? 'Занято' : item.places < participants ? 'Мало мест' : tariff.perPerson ? `${item.places} из ${tariff.maxPlayers} мест` : 'Свободно'}</span>
              {!disabled && <b>{item.oldPrice && <del>{money(item.oldPrice)} </del>}{money(item.price)}</b>}
            </button>;
          })}</div>
          {slot && <><div className="booking-wizard__subtotal"><span>{tariff.perPerson ? <>{money(slot.price)} × <b>{participants} чел.</b></> : tariff.title}</span><strong>{money(total)}</strong></div><p className="booking-wizard__session">{tariff.event ? 'Праздник' : 'Сеанс'} · <b>{duration(tariff.minutes)}</b> · {time} – {endTime(time, tariff.minutes)}</p></>}
        </>}
        {!complete && step === 5 && <>
          <p className="booking-wizard__login">Есть личный кабинет? <button type="button" data-auth-open="">Войти</button> — подставим данные и покажем бонусы</p>
          <form className="booking-wizard__contacts" id="booking-contact-form" noValidate ref={contactForm} onSubmit={(event) => { event.preventDefault(); next(); }}>
            <label className={`booking-wizard__field${errors.name ? ' is-invalid' : ''}`}><span>Ваше имя</span><input name="name" autoComplete="name" placeholder="Как к вам обращаться" value={contacts.name} onChange={(event) => setContact('name', event.target.value)} maxLength={100} required aria-invalid={!!errors.name} />{errors.name && <small>Укажите имя, минимум 2 символа</small>}</label>
            <label className={`booking-wizard__field${errors.phone ? ' is-invalid' : ''}`}><span>Телефон</span><div className="booking-wizard__phone"><select aria-label="Код страны" value={countryId} onChange={(event) => { setCountryId(event.target.value); setContact('phone', ''); }}>{countries.map((country) => <option key={country.id} value={country.id} title={country.name}>+{country.phone.prefix}</option>)}</select><input aria-label="Телефон" name="phone" type="tel" autoComplete="tel" inputMode="tel" required placeholder={phoneCountry.phone.mask.replace(/^\+\d+\s*/, '').replaceAll('#', '0')} value={contacts.phone.replace(/^\+\d+\s*/, '')} onChange={(event) => {
              const typed = event.target.value;
              const full = typed.startsWith('+') || typed.replace(/\D/g, '').length > phoneCountry.phone.nationalLength;
              setContact('phone', formatPhone(full ? typed : `+${phoneCountry.phone.prefix} ${typed}`, countryId).replace(/[^\d]+$/, ''));
            }} aria-invalid={!!errors.phone} /></div>{errors.phone && <small>Введите телефон полностью</small>}</label>
            <label className={`booking-wizard__field${errors.email ? ' is-invalid' : ''}`}><span>Email</span><input name="email" type="email" autoComplete="email" placeholder="name@mail.ru" value={contacts.email} onChange={(event) => setContact('email', event.target.value)} aria-invalid={!!errors.email} />{errors.email && <small>Проверьте адрес электронной почты</small>}</label>
            <label className={`booking-wizard__consent${errors.consent ? ' is-invalid' : ''}`}><input name="consent" type="checkbox" checked={contacts.consent} onChange={(event) => setContact('consent', event.target.checked)} required aria-invalid={!!errors.consent} /><span>Нажимая кнопку «Далее», вы соглашаетесь на обработку персональных данных в соответствии с <a href="/legal/privacy/" target="_blank" rel="noreferrer">Политикой конфиденциальности</a> и условиями <a href="/legal/agreement/" target="_blank" rel="noreferrer">Пользовательского соглашения</a></span></label>
          </form>
        </>}
        {!complete && step === 6 && <>
          <h3 className="booking-wizard__label">Проверьте данные брони</h3>{summary()}
          <section className="booking-wizard__group"><h3 className="booking-wizard__label">Промокод</h3><div className="booking-wizard__promo"><input aria-label="Промокод" placeholder="Введите промокод" value={promo} onChange={(event) => { setPromo(event.target.value); setPromoMessage(''); }} /><button className="booking-wizard__outline" type="button" onClick={() => setPromoMessage(promo.trim() ? 'Проверка промокодов станет доступна после подключения сервиса бронирования.' : 'Введите промокод.')}>Применить</button></div>{promoMessage && <p className="booking-wizard__message" role="status">{promoMessage}</p>}</section>
          <section className="booking-wizard__group"><h3 className="booking-wizard__label">Бонусы</h3><div className="booking-wizard__bonus"><span className="booking-wizard__coins" aria-hidden="true">◉</span><div><strong>Оплатите часть брони бонусами</strong><p>Войдите в личный кабинет, чтобы списать до 50% стоимости</p></div><button className="booking-wizard__outline" type="button" data-auth-open="">Войти</button></div></section>
          <dl className="booking-wizard__totals"><div><dt>Итого</dt><dd>{money(total)}</dd></div><div><dt>Предоплата</dt><dd>{money(deposit)}</dd></div><div><dt>К доплате</dt><dd>{money(total - deposit)}</dd></div></dl>
          <h3 className="booking-wizard__label">Оплата</h3><div className="booking-wizard__payments" role="group" aria-label="Способ оплаты">
            <button type="button" aria-pressed={payment === 'card'} className={`booking-wizard__choice${payment === 'card' ? ' is-selected' : ''}`} onClick={() => setPayment('card')}><span><strong>Оплата картой</strong><small>Предоплата 10% — {money(deposit)},<br />остальное — в парке в день визита</small></span><Mark /></button>
            <button type="button" aria-pressed={payment === 'certificate'} className={`booking-wizard__choice${payment === 'certificate' ? ' is-selected' : ''}`} onClick={() => setPayment('certificate')}><span><strong>Сертификат</strong><small>Подарочный сертификат<br />WARPOINT</small></span><Mark /></button>
          </div>
          {payment === 'certificate' && <div className="booking-wizard__certificate"><label><span>Номер сертификата</span><input inputMode="numeric" autoComplete="off" placeholder="0000 0000 0000 0000" value={certificate.number} onChange={(event) => { setCertificate({ ...certificate, number: event.target.value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ') }); setCertificateMessage(''); }} /></label><label><span>ПИН-код</span><input type="password" inputMode="numeric" autoComplete="off" placeholder="••••" value={certificate.pin} onChange={(event) => { setCertificate({ ...certificate, pin: event.target.value.replace(/\D/g, '').slice(0, 4) }); setCertificateMessage(''); }} /></label><button className="booking-wizard__outline" type="button" onClick={() => setCertificateMessage(certificate.number.replace(/\D/g, '').length === 16 && certificate.pin.length === 4 ? 'Формат верный. Проверка баланса будет доступна после подключения сервиса сертификатов.' : 'Введите 16 цифр номера сертификата и 4 цифры ПИН-кода.')}>Проверить</button><small>16 символов с лицевой стороны сертификата и 4 цифры ПИН-кода под защитным слоем</small>{certificateMessage && <p className="booking-wizard__message" role="status">{certificateMessage}</p>}</div>}
        </>}
        {complete && <div className="booking-wizard__success"><span className="booking-wizard__success-mark"><Icon name="check" /></span><h3>Ждём вас, {contacts.name.trim()}!</h3><p>Вы прошли все шаги демонстрационной формы.<br />Бронь не отправлена, предоплата не списана.<br />Настоящее подтверждение и SMS появятся после подключения API.</p>{summary()}<button className="booking-wizard__primary" type="button" onClick={onClose}>Готово</button></div>}
      </div>
      {!complete && <footer className="booking-wizard__footer">
        <button className="booking-wizard__back booking-wizard__outline" type="button" disabled={step === 0} aria-label="Предыдущий этап" onClick={() => setStep(step - 1)}>←</button>
        <button className="booking-wizard__primary" type={step === 5 ? 'submit' : 'button'} form={step === 5 ? 'booking-contact-form' : undefined} disabled={!ready}
          onClick={step === 5 ? undefined : (event) => {
            // The next render can turn this same DOM button into a form submit.
            event.preventDefault();
            if (step === 6) finish();
            else next();
          }}>{step === 6 ? `Внести предоплату ${money(deposit)}` : 'Далее'}</button>
      </footer>}
    </article>
    {details && <TariffDetails tariff={details} onClose={() => setDetails(null)} onSelect={() => { chooseTariff(details.id); setDetails(null); }} />}
    {cityPicker && <BookingCities site={site} onClose={() => setCityPicker(false)} />}
  </dialog>;
}
