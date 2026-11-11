import { getCountry } from '../interactions/data/location-data.js';

export function phoneDigits(value, countryId = 'ru', { national = false } = {}) {
  const config = getCountry(countryId).phone;
  const text = String(value || '').trim();
  let digits = text.replace(/\D/g, '');
  if (national) return digits;

  // A national number may itself start with the country or trunk code.
  // Strip these codes only from an explicitly international or longer number.
  if (text.startsWith('+') || digits.length > config.nationalLength) {
    const prefix = [config.prefix, ...(config.trunkPrefixes || [])].find((code) =>
      digits.startsWith(code),
    );
    if (prefix) digits = digits.slice(prefix.length);
  }
  return digits;
}

export function phoneIsComplete(value, countryId = 'ru', options) {
  const text = String(value || '').trim();
  const config = getCountry(countryId).phone;
  if (!/^[+\d\s().-]+$/.test(text) || (text.match(/\+/g) || []).length > 1) return false;
  if (text.includes('+') && !text.startsWith('+')) return false;
  if (text.startsWith('+') && !text.replace(/\D/g, '').startsWith(config.prefix)) return false;
  return phoneDigits(text, countryId, options).length === config.nationalLength;
}

export function formatPhoneValue(value, countryId = 'ru', { national = false } = {}) {
  const config = getCountry(countryId).phone;
  const digits = phoneDigits(value, countryId).slice(0, config.nationalLength);
  const pattern = national ? config.mask.replace(/^\+\d+\s*/, '') : config.mask;
  if (!digits.length) return national ? '' : pattern.slice(0, pattern.indexOf('#'));
  let index = 0;
  let result = '';
  for (const character of pattern) {
    if (character === '#' && index >= digits.length) break;
    result += character === '#' ? digits[index++] : character;
  }
  return result.trimEnd();
}
