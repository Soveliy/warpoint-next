'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useSiteLocation } from './SiteLocationProvider';
import { validateValue, validationLabels } from '../../lib/form-validation';

export default function useFormValidation(form, rules, { countryId = 'ru' } = {}) {
  const prefix = useId();
  const { site, locationId } = useSiteLocation();
  useEffect(() => {
    const element = form.current;
    if (!element) return;
    const appendSiteContext = (event) => {
      event.formData.set('city', site.city);
      event.formData.set('countryId', site.countryId);
      if (!event.formData.has('locationId')) event.formData.set('locationId', locationId);
    };
    element.addEventListener('formdata', appendSiteContext);
    return () => element.removeEventListener('formdata', appendSiteContext);
  }, [form, locationId, site.city, site.countryId]);
  const [errors, setErrors] = useState({});
  const touched = useRef(new Set());
  const reset = useCallback(() => {
    touched.current.clear();
    setErrors({});
  }, []);
  const clearError = useCallback((name) => {
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }, []);

  useEffect(() => {
    const onCountryChange = () => {
      // Only globally masked inputs follow the city/country picker.
      const input = form.current?.elements.namedItem('phone');
      if (!input?.hasAttribute?.('data-phone-mask')) return;
      touched.current.delete('phone');
      clearError('phone');
    };
    document.addEventListener('phone-mask:country-change', onCountryChange);
    return () => document.removeEventListener('phone-mask:country-change', onCountryChange);
  }, [form, clearError]);

  const messageFor = (name) => {
    const element = form.current?.elements.namedItem(name);
    const data = new FormData(form.current);
    const value = rules[name].type === 'consent' ? data.has(name) : data.get(name);
    return validateValue(value, rules[name], {
      countryId: element?.dataset?.phoneCountry || countryId,
    });
  };
  const validateField = (name) => {
    if (!rules[name] || !form.current) return;
    const error = messageFor(name);
    setErrors((current) => {
      if ((current[name] || '') === error) return current;
      const next = { ...current };
      if (error) next[name] = error;
      else delete next[name];
      return next;
    });
  };
  const handleBlur = (event) => {
    const name = event.target.dataset.validationField || event.target.name;
    if (!rules[name]) return;
    touched.current.add(name);
    validateField(name);
  };
  const handleChange = (event) => {
    const name = event.target.dataset.validationField || event.target.name;
    if (touched.current.has(name)) validateField(name);
  };
  const validate = () => {
    if (!form.current) return false;
    const next = {};
    Object.keys(rules).forEach((name) => {
      touched.current.add(name);
      const error = messageFor(name);
      if (error) next[name] = error;
    });
    setErrors(next);
    const first = Object.keys(next)[0];
    if (!first) return true;
    const control = [...form.current.querySelectorAll('[data-validation-field]')].find(
      (element) => element.dataset.validationField === first,
    );
    // Commit the description before focusing so screen readers read the error.
    requestAnimationFrame(() => control?.focus());
    return false;
  };
  const errorId = (name) => `${prefix}-${name}-error`;

  return {
    errors,
    reset,
    clearError,
    validate,
    formProps: {
      noValidate: true,
      onBlurCapture: handleBlur,
      onInput: handleChange,
      onChange: handleChange,
      onReset: reset,
    },
    fieldProps: (name, className = '') => ({
      className: [className, 'form-validation__control'].filter(Boolean).join(' '),
      'data-validation-field': name,
      'aria-label': rules[name]?.label || validationLabels[name],
      'aria-invalid': Boolean(errors[name]),
      'aria-describedby': errorId(name),
    }),
    errorProps: (name) => ({ id: errorId(name), error: errors[name] || '' }),
  };
}
