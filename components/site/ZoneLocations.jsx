'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useSiteLocation } from './SiteLocationProvider';
import { locationCountLabel, zoneAvailableAt, zoneLocations, zones } from '../../lib/zones';

export default function ZoneLocations({ zoneId, locked = false }) {
  const { site, location, selectedIndex, selectLocation } = useSiteLocation();
  const locations = zoneLocations(site, zoneId);
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [location, zoneId]);
  const root = useRef(null);
  const trigger = useRef(null);
  const options = useRef([]);
  const id = useId();
  const label = !locations.length
    ? 'Нет доступных локаций'
    : locked
      ? 'Выбрать другую локацию'
      : location?.title || locationCountLabel(locations.length);
  const close = (focus = false) => {
    setOpen(false);
    if (focus) trigger.current?.focus({ preventScroll: true });
  };

  useEffect(() => {
    if (!open) return;
    const outside = (event) => {
      if (!root.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [open]);

  const chooseLocation = (index) => {
    const block = root.current?.closest('.zones');
    selectLocation(index);
    close(!locked);
    if (locked) {
      requestAnimationFrame(() => {
        const mobile = block?.querySelector('.zones__mobile-trigger');
        const target = mobile?.getClientRects().length
          ? mobile
          : block?.querySelector('#zone-tab-' + zoneId);
        target?.focus({ preventScroll: true });
      });
    }
  };

  const focusOption = (index) =>
    options.current[(index + locations.length) % locations.length]?.focus();
  const keyDown = (event, index) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close(true);
    } else if (event.key === 'Tab') close();
    else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      const next =
        event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? locations.length - 1
            : index + (event.key === 'ArrowDown' ? 1 : -1);
      focusOption(next);
    }
  };

  return (
    <div className="zone-locations" ref={root}>
      <div className="zone-locations__select">
        <button
          className="zone-locations__trigger button-reset"
          type="button"
          ref={trigger}
          aria-expanded={open && locations.length > 0}
          disabled={!locations.length}
          aria-controls={id}
          aria-haspopup="listbox"
          onClick={() => setOpen(!open)}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              event.preventDefault();
              setOpen(true);
              requestAnimationFrame(() =>
                focusOption(
                  Math.max(
                    0,
                    locations.findIndex((item) => item.index === selectedIndex),
                  ),
                ),
              );
            } else if (event.key === 'Escape') close();
          }}
        >
          <span className="zone-locations__value">{label}</span>
          <svg className="zone-locations__chevron" viewBox="0 0 16 16" aria-hidden="true">
            <path d="m3 6 5 4 5-4" />
          </svg>
        </button>
        {open && locations.length > 0 && (
          <ul
            className="zone-locations__list"
            id={id}
            role="listbox"
            aria-label="Локации, где доступна зона"
          >
            {locations.map((arena, index) => (
              <li className="zone-locations__item" key={arena.index} role="presentation">
                <button
                  className="zone-locations__option button-reset"
                  type="button"
                  role="option"
                  aria-selected={arena.index === selectedIndex}
                  ref={(element) => {
                    options.current[index] = element;
                  }}
                  onKeyDown={(event) => keyDown(event, index)}
                  onClick={() => chooseLocation(arena.index)}
                >
                  <span className="zone-locations__name">{arena.title}</span>
                  <span className="zone-locations__address">{arena.address}</span>
                  <span className="zone-locations__mark" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {location && !locked && zones.some((zone) => !zoneAvailableAt(location, zone.id)) && (
        <p className="zone-locations__note">
          <svg
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_8223_13706)">
              <path
                d="M4.5 0.84375C3.77686 0.84375 3.06997 1.05819 2.4687 1.45994C1.86743 1.86169 1.3988 2.43272 1.12207 3.10081C0.845334 3.76891 0.772928 4.50406 0.914005 5.2133C1.05508 5.92254 1.40331 6.57402 1.91464 7.08536C2.42598 7.59669 3.07746 7.94492 3.7867 8.086C4.49595 8.22707 5.2311 8.15467 5.89919 7.87793C6.56728 7.6012 7.13831 7.13257 7.54006 6.5313C7.94182 5.93004 8.15625 5.22314 8.15625 4.5C8.15523 3.53062 7.76969 2.60123 7.08423 1.91577C6.39877 1.23031 5.46939 0.844774 4.5 0.84375ZM4.21875 2.8125C4.21875 2.73791 4.24838 2.66637 4.30113 2.61363C4.35387 2.56088 4.42541 2.53125 4.5 2.53125C4.57459 2.53125 4.64613 2.56088 4.69888 2.61363C4.75162 2.66637 4.78125 2.73791 4.78125 2.8125V4.78125C4.78125 4.85584 4.75162 4.92738 4.69888 4.98012C4.64613 5.03287 4.57459 5.0625 4.5 5.0625C4.42541 5.0625 4.35387 5.03287 4.30113 4.98012C4.24838 4.92738 4.21875 4.85584 4.21875 4.78125V2.8125ZM4.5 6.46875C4.41656 6.46875 4.335 6.44401 4.26562 6.39765C4.19624 6.35129 4.14217 6.28541 4.11024 6.20832C4.07831 6.13123 4.06995 6.04641 4.08623 5.96457C4.10251 5.88274 4.14269 5.80756 4.20169 5.74856C4.26069 5.68956 4.33586 5.64938 4.4177 5.63311C4.49953 5.61683 4.58436 5.62518 4.66145 5.65711C4.73853 5.68904 4.80442 5.74312 4.85078 5.81249C4.89713 5.88187 4.92188 5.96344 4.92188 6.04688C4.92188 6.15876 4.87743 6.26607 4.79831 6.34519C4.7192 6.4243 4.61189 6.46875 4.5 6.46875Z"
                fill="white"
                fill-opacity="0.4"
              />
            </g>
            <defs>
              <clipPath id="clip0_8223_13706">
                <rect width="9" height="9" fill="white" />
              </clipPath>
            </defs>
          </svg>{' '}
          Не все зоны доступны в этой локации
        </p>
      )}
    </div>
  );
}
