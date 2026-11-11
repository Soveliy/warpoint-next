'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { contactsForSite } from '../../lib/contacts-data';
import { validExternalUrl } from '../../lib/site-fields';
import ContactIcon from './ContactIcon';
import ContactParking from './ContactParking';
import LocationMap from './LocationMap';
import SiteContentDialog from './SiteContentDialog';

export default function ContactLocationDetail({
  site,
  location,
  onSelect,
  onClose,
  embedded = false,
}) {
  const locations = contactsForSite(site).locations;
  const [previewIndex, setPreviewIndex] = useState(location.index ?? 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const select = useRef(null);
  const trigger = useRef(null);
  const options = useRef([]);
  const id = useId();
  const currentIndex = embedded ? location.index : previewIndex;
  const currentLocation = locations[currentIndex] || location;
  const Surface = embedded ? 'section' : SiteContentDialog;
  const socialLinks = [
    { id: 'vk', label: 'ВКонтакте', href: validExternalUrl(currentLocation.socialLinks?.vk) },
    { id: 'max', label: 'Макс', href: validExternalUrl(currentLocation.socialLinks?.max) },
  ].filter((social) => social.href);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOutside = (event) => {
      if (!select.current?.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [menuOpen]);

  const focusOption = (index) => {
    if (!locations.length) return;
    options.current[(index + locations.length) % locations.length]?.focus();
  };
  const closeMenu = () => {
    setMenuOpen(false);
    trigger.current?.focus({ preventScroll: true });
  };
  const optionKeyDown = (event, index) => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Home') focusOption(0);
    else if (event.key === 'End') focusOption(locations.length - 1);
    else focusOption(index + (event.key === 'ArrowDown' ? 1 : -1));
  };

  return (
    <Surface
      className={`contact-location-detail${embedded ? ' contact-location-detail--embedded' : ''}`}
      {...(embedded
        ? { id: `contact-location-${currentLocation.index}`, 'aria-labelledby': `${id}-title` }
        : { labelledBy: `${id}-title`, onClose })}
    >
      {!embedded && (
        <button
          className="contact-location-detail__close button-reset"
          type="button"
          aria-label="Закрыть информацию о локации"
          onClick={onClose}
        >
          <svg
            className="contact-location-detail__close-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="m5 5 14 14M19 5 5 19" />
          </svg>
        </button>
      )}
      <div
        className="contact-location-detail__body"
        onKeyDownCapture={(event) => {
          if (event.key === 'Escape' && menuOpen) {
            event.preventDefault();
            event.stopPropagation();
            closeMenu();
          }
        }}
      >
        <div className="contact-location-detail__content">
          <h2 className="contact-location-detail__city" id={`${id}-title`}>
            {site.city}
          </h2>
          <div
            className="contact-location-detail__select"
            ref={select}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false);
            }}
          >
            <button
              className="contact-location-detail__location button-reset"
              type="button"
              role="combobox"
              aria-label={`Локация ${currentLocation.title}`}
              aria-haspopup="listbox"
              aria-controls={`${id}-options`}
              aria-expanded={menuOpen}
              ref={trigger}
              onClick={() => {
                setMenuOpen(!menuOpen);
                if (!menuOpen) requestAnimationFrame(() => focusOption(currentIndex));
              }}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                  event.preventDefault();
                  setMenuOpen(true);
                  requestAnimationFrame(() => focusOption(currentIndex));
                }
              }}
            >
              <span className="contact-location-detail__location-value">
                {currentLocation.title}
              </span>
              <svg
                className="contact-location-detail__chevron"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path d="m3 6 5 4 5-4" />
              </svg>
            </button>
            <div
              className="contact-location-detail__options"
              id={`${id}-options`}
              role="listbox"
              aria-label="Локации города"
              hidden={!menuOpen}
            >
              {locations.map((option, index) => (
                <button
                  className="contact-location-detail__option button-reset"
                  key={option.id}
                  type="button"
                  role="option"
                  aria-selected={option.index === currentIndex}
                  tabIndex={-1}
                  ref={(element) => {
                    options.current[index] = element;
                  }}
                  onKeyDown={(event) => optionKeyDown(event, index)}
                  onClick={() => {
                    if (embedded) onSelect(option.index);
                    else setPreviewIndex(option.index);
                    closeMenu();
                  }}
                >
                  <span className="contact-location-detail__option-name">{option.title}</span>
                  <span className="contact-location-detail__option-address">{option.address}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="contact-location-detail__details">
            <h3 className="contact-location-detail__label">Адрес и телефон</h3>
            <address className="contact-location-detail__address">
              <div className="contact-location-detail__row">
                <ContactIcon name="mappin" className="contact-location-detail__icon" />
                <span className="contact-location-detail__text">
                  {currentLocation.address}
                  <br />
                  {currentLocation.addressRef || currentLocation.title}
                </span>
              </div>
              {currentLocation.subwayStation && (
                <div className="contact-location-detail__row">
                  <svg
                    className="contact-location-detail__icon contact-location-detail__icon--metro"
                    viewBox="0 0 32 36"
                    aria-hidden="true"
                  >
                    <path d="M6 25A14 14 0 1 1 26 25L16 35" />
                    <path
                      className="contact-location-detail__metro-sign"
                      d="m7 20 5-13 4 8 4-8 5 13h-6l-2-6-1 3-1-3-2 6Z"
                    />
                  </svg>
                  <span className="contact-location-detail__text">
                    Метро «{currentLocation.subwayStation}»
                  </span>
                </div>
              )}
              {currentLocation.phone && (
                <div className="contact-location-detail__row">
                  <ContactIcon name="phone" className="contact-location-detail__icon" />
                  <a className="contact-location-detail__link" href={currentLocation.phoneHref}>
                    {currentLocation.phone}
                  </a>
                </div>
              )}
              {currentLocation.email && (
                <div className="contact-location-detail__row">
                  <ContactIcon
                    name="email"
                    className="contact-location-detail__icon contact-location-detail__icon--outline"
                  />
                  <a
                    className="contact-location-detail__link"
                    href={`mailto:${currentLocation.email}`}
                  >
                    {currentLocation.email}
                  </a>
                </div>
              )}
            </address>
          </div>

          {currentLocation.hours && (
            <div className="contact-location-detail__hours">
              <h3 className="contact-location-detail__label">Время работы</h3>
              <dl className="contact-location-detail__schedule">
                <div className="contact-location-detail__schedule-row">
                  <dt className="contact-location-detail__days">Пн–Вс</dt>
                  <dd className="contact-location-detail__time">{currentLocation.hours}</dd>
                </div>
              </dl>
            </div>
          )}

          {socialLinks.length > 0 && (
            <div className="contact-location-detail__socials" aria-label="Социальные сети">
              {socialLinks.map((social) => (
                <a
                  className="contact-location-detail__social"
                  href={social.href}
                  key={social.id}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ContactIcon name={social.id} className="contact-location-detail__social-icon" />
                </a>
              ))}
            </div>
          )}

          <div className="contact-location-detail__actions">
            <button
              className="contact-location-detail__booking btn btn--red"
              type="button"
              data-booking-open=""
              data-booking-return-id={`contact-location-${currentLocation.index}`}
              onClick={() => onSelect(currentLocation.index)}
            >
              <ContactIcon name="game" className="contact-location-detail__booking-icon" />
              <span className="contact-location-detail__booking-label">Забронировать игру</span>
            </button>
          </div>
        </div>
        <div className="contact-location-detail__map-wrap">
          <LocationMap location={currentLocation} className="contact-location-detail__map" />
          {site.city === 'Екатеринбург' && (
            <ContactParking className="contact-location-detail__parking" />
          )}
        </div>
      </div>
    </Surface>
  );
}
