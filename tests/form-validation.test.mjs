import { initPhoneMasks, setPhoneCountry } from '../interactions/components/phone-mask.js';
import assert from 'node:assert/strict';
import test from 'node:test';
import { countries } from '../interactions/data/location-data.js';
import { phoneDigits, phoneIsComplete, formatPhoneValue } from '../lib/phone.js';
import {
  contactRules,
  consentRule,
  validateValue,
  validateValues,
  validationMessages,
} from '../lib/form-validation.js';

test('names are trimmed and checked consistently across lead forms', () => {
  for (const name of ['', '   ', 'А', '12', 'А'.repeat(101)])
    assert.ok(validateValue(name, contactRules.name));
  for (const name of [' Анна ', 'Анна-Мария', 'O’Neil', '李明'])
    assert.equal(validateValue(name, contactRules.name), '');
});

test('Russian national numbers starting with 7 or 8 keep their first digit', () => {
  for (const number of ['7123456789', '8123456789']) {
    assert.equal(phoneDigits(number, 'ru'), number);
    assert.equal(phoneIsComplete(number, 'ru'), true);
    assert.equal(phoneIsComplete(number, 'ru', { national: true }), true);
    assert.equal(phoneDigits(formatPhoneValue(number, 'ru'), 'ru'), number);
  }
});

test('phone completeness never relies on a formatter truncating invalid input', () => {
  for (const number of [
    '',
    '+7',
    '+7 (123) 456-78-9',
    '+7 (123) 456-78-901',
    '123456789012',
    '+44 1234567890',
    '+7 123abc4567890',
    '++71234567890',
  ]) {
    assert.equal(phoneIsComplete(number, 'ru'), false, number);
  }
  for (const number of ['+7 (123) 456-78-90', '8 (123) 456-78-90', '1234567890'])
    assert.equal(phoneIsComplete(number, 'ru'), true, number);
});

test('all supported country codes accept full and national numbers of the configured length', () => {
  for (const country of countries) {
    const national = '5'.repeat(country.phone.nationalLength);
    assert.equal(
      phoneIsComplete(`+${country.phone.prefix}${national}`, country.id),
      true,
      country.id,
    );
    assert.equal(phoneIsComplete(national, country.id, { national: true }), true, country.id);
    assert.equal(
      phoneIsComplete(national.slice(1), country.id, { national: true }),
      false,
      country.id,
    );
    assert.equal(
      phoneIsComplete(national + '5', country.id, { national: true }),
      false,
      country.id,
    );
  }
});

test('email is optional only when the form does not require it', () => {
  assert.equal(validateValue('  ', { type: 'email' }), '');
  assert.ok(validateValue('  ', { type: 'email', required: true }));
  assert.equal(validateValue(' guest@example.ru ', { type: 'email' }), '');
  for (const email of ['guest', 'guest@', 'guest@site', 'a b@site.ru', 'a@@site.ru'])
    assert.ok(validateValue(email, { type: 'email' }));
});

test('dates reject impossible days and the past but allow today and leap days', () => {
  const rule = { type: 'date', required: true, future: true };
  const options = { today: '2026-11-03' };
  assert.equal(validateValue('2026-11-02', rule, options), validationMessages.pastDate);
  assert.equal(validateValue('2026-11-03', rule, options), '');
  assert.equal(validateValue('2028-02-29', rule, options), '');
  assert.ok(validateValue('2027-02-29', rule, options));
  assert.ok(validateValue('2026-13-01', rule, options));
});

test('consent, location and authentication use field-specific errors', () => {
  assert.ok(validateValue(false, consentRule));
  assert.equal(validateValue(true, consentRule), '');
  const agreement = {
    ...consentRule,
    message: 'Подтвердите согласие с Пользовательским соглашением',
  };
  assert.equal(validateValue(false, agreement), agreement.message);
  assert.equal(validateValue(true, agreement), '');
  assert.equal(validateValue(false, { type: 'consent' }), '');
  assert.equal(
    validateValue('', { type: 'location', required: true }),
    validationMessages.location,
  );
  assert.equal(validateValue('', { type: 'login', required: true }), validationMessages.login);
  assert.equal(
    validateValue('', { type: 'password', required: true }),
    validationMessages.password,
  );
});

test('certificate and PIN require digits and exact lengths', () => {
  assert.equal(validateValue('1234 5678 9012 3456', { type: 'certificate', required: true }), '');
  assert.equal(validateValue('1234', { type: 'pin', required: true }), '');
  for (const value of ['123', '12345', '12ab'])
    assert.ok(validateValue(value, { type: 'pin', required: true }));
  assert.ok(validateValue('1234 5678 9012 345', { type: 'certificate', required: true }));
});

test('forms return every invalid field and ignore optional empty fields', () => {
  const rules = { ...contactRules, email: { type: 'email' }, consent: consentRule };
  assert.deepEqual(Object.keys(validateValues({ name: ' ', phone: '+7', consent: false }, rules)), [
    'name',
    'phone',
    'consent',
  ]);
  assert.deepEqual(
    validateValues({ name: 'Анна', phone: '+71234567890', email: '', consent: true }, rules),
    {},
  );
});

test('lead phone masks initialize with the country rendered by the server', () => {
  const previousDocument = globalThis.document;
  const input = { value: '', dataset: {}, addEventListener() {} };
  let change;
  globalThis.document = {
    documentElement: { dataset: { country: 'am' } },
    querySelectorAll: () => [input],
    dispatchEvent: (event) => {
      change = event.detail;
    },
  };
  try {
    initPhoneMasks();
    assert.equal(input.dataset.phoneCountry, 'am');
    assert.equal(input.placeholder.startsWith('+374'), true);
    assert.equal(change.countryId, 'am');
  } finally {
    setPhoneCountry('ru', { clearValue: false });
    if (previousDocument === undefined) delete globalThis.document;
    else globalThis.document = previousDocument;
  }
});
