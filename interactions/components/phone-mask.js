import { phoneDigits, phoneIsComplete, formatPhoneValue } from '../../lib/phone.js';
import { defaultLocationState, getCountry } from '../data/location-data.js';

let activeCountryId = defaultLocationState.countryId;

const getPhoneConfig = (countryId = activeCountryId) => getCountry(countryId).phone;

const getMaskPrefix = (mask) => mask.slice(0, mask.indexOf('#'));

export function getPhoneNationalDigits(value, countryId = activeCountryId) {
  return phoneDigits(value, countryId).slice(0, getPhoneConfig(countryId).nationalLength);
}

export function formatPhone(value, countryId = activeCountryId) {
  return formatPhoneValue(value, countryId);
}

export function isPhoneComplete(input) {
  return phoneIsComplete(input.value, input.dataset.phoneCountry || activeCountryId);
}

function moveCaretToEnd(input) {
  const end = input.value.length;

  input.setSelectionRange(end, end);
}

function updateInputCountry(input, countryId, clearValue) {
  const config = getPhoneConfig(countryId);

  input.dataset.phoneCountry = countryId;
  input.placeholder = config.mask.replaceAll('#', '0');

  if (clearValue) {
    input.value = '';
  } else if (input.value) {
    input.value = formatPhone(input.value, countryId);
  }
}

export function setPhoneCountry(countryId, { clearValue = true } = {}) {
  activeCountryId = getCountry(countryId).id;

  document.querySelectorAll('[data-phone-mask]').forEach((input) => {
    updateInputCountry(input, activeCountryId, clearValue);
  });

  document.dispatchEvent(
    new CustomEvent('phone-mask:country-change', {
      detail: {
        countryId: activeCountryId,
        mask: getPhoneConfig().mask,
      },
    }),
  );
}

export function initPhoneMask(input) {
  if (input.dataset.phoneMaskReady === 'true') {
    return;
  }

  input.dataset.phoneMaskReady = 'true';
  updateInputCountry(input, activeCountryId, false);

  input.addEventListener('focus', () => {
    if (!input.value) {
      input.value = getMaskPrefix(getPhoneConfig(input.dataset.phoneCountry).mask);
    }

    requestAnimationFrame(() => moveCaretToEnd(input));
  });

  input.addEventListener('input', () => {
    input.value = formatPhone(input.value, input.dataset.phoneCountry);
    moveCaretToEnd(input);
  });

  input.addEventListener('keydown', (event) => {
    const isCaretAtEnd =
      input.selectionStart === input.value.length && input.selectionEnd === input.value.length;
    const countryId = input.dataset.phoneCountry;
    const digits = getPhoneNationalDigits(input.value, countryId);

    if (event.key !== 'Backspace' || !isCaretAtEnd || !digits.length) {
      return;
    }

    event.preventDefault();
    input.value = formatPhone(
      `${getPhoneConfig(countryId).prefix}${digits.slice(0, -1)}`,
      countryId,
    );
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });

  input.addEventListener('blur', () => {
    if (!getPhoneNationalDigits(input.value, input.dataset.phoneCountry).length) {
      input.value = '';
    }
  });
}

export function initPhoneMasks() {
  setPhoneCountry(document.documentElement.dataset.country || activeCountryId, {
    clearValue: false,
  });
  document.querySelectorAll('[data-phone-mask]').forEach(initPhoneMask);
}
