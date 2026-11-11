import { phoneIsComplete } from './phone.js';

export const validationMessages = {
  required: 'Заполните поле',
  name: 'Укажите имя — от 2 до 100 символов',
  phone: 'Введите телефон полностью',
  email: 'Проверьте адрес электронной почты',
  consent: 'Подтвердите согласие на обработку персональных данных',
  date: 'Выберите дату мероприятия',
  pastDate: 'Выберите сегодняшнюю или будущую дату',
  location: 'Выберите локацию',
  messenger: 'Выберите способ связи',
  login: 'Введите логин',
  password: 'Введите пароль',
  promo: 'Введите промокод',
  certificate: 'Введите 16 цифр номера сертификата',
  pin: 'Введите 4 цифры ПИН-кода',
};

export const validationLabels = {
  name: 'Ваше имя',
  phone: 'Телефон',
  email: 'Email',
  date: 'Дата мероприятия',
  locationId: 'Локация',
  messenger: 'Способ связи',
  login: 'Логин',
  password: 'Пароль',
  promo: 'Промокод',
  number: 'Номер сертификата',
  pin: 'ПИН-код',
};

export const contactRules = {
  name: { type: 'name', required: true },
  phone: { type: 'phone', required: true },
};

export const consentRule = { type: 'consent', required: true };

export function localDateKey(date = new Date()) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');
}

export function validateValue(value, rule, { countryId = 'ru', today = localDateKey() } = {}) {
  const type = rule.type || 'text';
  const text = String(value ?? '').trim();
  const message = rule.message || validationMessages[type] || validationMessages.required;
  if (type === 'consent') return rule.required && !value ? message : '';
  if (!text) return rule.required ? message : '';

  if (type === 'name') {
    if (text.length < 2 || text.length > 100 || !/\p{L}/u.test(text)) return message;
  } else if (type === 'phone') {
    if (!phoneIsComplete(text, countryId, { national: rule.national })) return message;
  } else if (type === 'email') {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) return message;
  } else if (type === 'date') {
    const date = new Date(`${text}T12:00:00`);
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(text) ||
      Number.isNaN(date.getTime()) ||
      localDateKey(date) !== text
    )
      return message;
    if (rule.future && text < today) return validationMessages.pastDate;
  } else if (type === 'certificate') {
    if (!/^\d{16}$/.test(text.replace(/\s/g, ''))) return message;
  } else if (type === 'pin') {
    if (!/^\d{4}$/.test(text)) return message;
  }
  if (rule.options && !rule.options.includes(text)) return message;
  return '';
}

export function validateValues(values, rules, options) {
  return Object.fromEntries(
    Object.entries(rules)
      .map(([name, rule]) => [name, validateValue(values[name], rule, options)])
      .filter(([, error]) => error),
  );
}
