'use client';

import { useEffect, useRef, useState } from 'react';
import { siteFields } from '../../lib/site-fields';
import { toggleScrollLock } from '../../interactions/_functions';

export default function Header({ site }) {
  const fields = siteFields(site);
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [submenu, setSubmenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [topHidden, setTopHidden] = useState(false);
  const [theme, setTheme] = useState('brand');
  const [cityConfirmed, setCityConfirmed] = useState(false);
  const [selectedArenaIndex, setSelectedArenaIndex] = useState(0);
  const [messengerOpen, setMessengerOpen] = useState(false);
  const headerRef = useRef(null);
  const topRef = useRef(null);
  const burgerRef = useRef(null);
  const closeRef = useRef(null);
  const previousScroll = useRef(0);
  const messengerRef = useRef(null);
  const messengerToggle = useRef(null);

  useEffect(() => {
    const close = (event) => {
      if (!event || !messengerRef.current?.contains(event.target)) setMessengerOpen(false);
    };
    document.addEventListener('pointerdown', close);
    window.addEventListener('scroll', close, { passive: true });
    window.addEventListener('resize', close, { passive: true });
    return () => {
      document.removeEventListener('pointerdown', close);
      window.removeEventListener('scroll', close);
      window.removeEventListener('resize', close);
    };
  }, []);

  useEffect(() => {
    try {
      setCityConfirmed(localStorage.getItem('warpoint-city-confirmed') === site.city);
      const saved = Number.parseInt(sessionStorage.getItem(`warpoint-arena:${site.hostname}`) || '0', 10);
      if (Number.isInteger(saved) && saved >= 0 && saved < site.arenas.length) setSelectedArenaIndex(saved);
    } catch { /* Storage is optional. */ }
    const onLocationChange = (event) => {
      if (event.detail?.cityName !== site.city) return;
      const index = Number.parseInt(String(event.detail.locationId).replace('erp-', ''), 10);
      if (Number.isInteger(index) && index >= 0 && index < site.arenas.length) {
        setSelectedArenaIndex(index);
        document.documentElement.dataset.location = `erp-${index}`;
        try { sessionStorage.setItem(`warpoint-arena:${site.hostname}`, String(index)); } catch { /* Optional. */ }
      }
      setCityConfirmed(true);
      try { localStorage.setItem('warpoint-city-confirmed', site.city); } catch { /* Optional. */ }
    };
    document.addEventListener('warpoint:location-change', onLocationChange);
    return () => document.removeEventListener('warpoint:location-change', onLocationChange);
  }, [site]);

  useEffect(() => {
    const header = headerRef.current;
    const top = topRef.current;
    if (!header || !top) return;
    const updateOffset = () => {
      const margin = Number.parseFloat(getComputedStyle(top).marginBottom) || 0;
      header.style.setProperty('--header-top-offset', `${top.offsetHeight + margin}px`);
    };
    const update = () => {
      const y = window.scrollY;
      const delta = y - previousScroll.current;
      setScrolled(y > 24);
      if (y <= 12) setTopHidden(false);
      else if (Math.abs(delta) >= 10) setTopHidden(delta > 0);
      if (y <= 12 || Math.abs(delta) >= 10) previousScroll.current = y;
      const bounds = header.getBoundingClientRect();
      const x = Math.min(Math.max(window.innerWidth / 2, 1), window.innerWidth - 1);
      const sampleY = Math.min(Math.max(bounds.bottom + 1, 1), window.innerHeight - 1);
      const section = document.elementsFromPoint(x, sampleY)
        .find((element) => element !== header && !header.contains(element))
        ?.closest('[data-header-theme]');
      setTheme(section?.dataset.headerTheme === 'dark' ? 'dark' : 'brand');
    };
    let frame = null;
    const schedule = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => { frame = null; update(); });
    };
    const resize = new ResizeObserver(updateOffset);
    resize.observe(top);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    updateOffset();
    update();
    return () => {
      resize.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const mobileActions = document.querySelector('.mobile-actions');
    document.documentElement.classList.toggle('is-mobile-menu-open', menuOpen);
    if (mobileActions) mobileActions.inert = menuOpen;
    topRef.current.inert = topHidden && !menuOpen;
    toggleScrollLock(menuOpen);
    let focusFrame = null;
    if (menuOpen) focusFrame = requestAnimationFrame(() => closeRef.current?.focus({ preventScroll: true }));
    return () => {
      if (focusFrame !== null) cancelAnimationFrame(focusFrame);
      document.documentElement.classList.remove('is-mobile-menu-open');
      if (mobileActions) mobileActions.inert = false;
      if (menuOpen && !document.querySelector('.event-modal.is-open, .auth-modal.is-open, .game-modal.is-open')) toggleScrollLock(false);
    };
  }, [menuOpen, topHidden]);

  useEffect(() => {
    if (menuOpen) { setDrawer(true); return; }
    const timer = setTimeout(() => setDrawer(false), 380);
    return () => clearTimeout(timer);
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (submenu) { setSubmenu(null); return; }
        if (menuOpen) { setMenuOpen(false); burgerRef.current?.focus(); }
      }
      if (event.key !== 'Tab' || !menuOpen) return;
      const items = [burgerRef.current, ...headerRef.current.querySelectorAll('.menu a[href], .menu button:not(:disabled)')]
        .filter((item) => item?.getClientRects().length && !item.closest('[inert]'));
      const first = items[0];
      const last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen, submenu]);

  const closeMenu = () => { setMenuOpen(false); setSubmenu(null); };
  const confirmCity = () => {
    setCityConfirmed(true);
    try { localStorage.setItem('warpoint-city-confirmed', site.city); } catch { /* Optional. */ }
  };
  const openLocation = (step, trigger) => {
    closeMenu();
    document.dispatchEvent(new CustomEvent('warpoint:location-open', { detail: { step, trigger } }));
  };
  const selectedAddress = site.arenas[selectedArenaIndex]?.address || fields.first.address || site.city;
  return (
    <>
      <header ref={headerRef} className={`header${scrolled ? ' header--scrolled' : ''}${topHidden && !menuOpen ? ' header--top-hidden' : ''}${menuOpen ? ' header--menu-open' : ''}`} data-theme={theme}>
        {'\n  '}
        <div className="container">
          {'\n    '}
          <div className="header__top" ref={topRef}>
            {'\n      '}
            <div className="header__row">
              {'\n        '}
              <div className="header__item header__item--location">
                {'\n          '}
                <div className="city-confirm" hidden={cityConfirmed}>
                  <span className="city-confirm__question">Ваш город <strong>{site.city}</strong>?</span>
                  <button className="city-confirm__answer button-reset" type="button" onClick={confirmCity}>Да</button>
                  <button className="city-confirm__change button-reset" type="button" aria-haspopup="dialog" aria-controls="location-modal"
                    onClick={(event) => openLocation('city', event.currentTarget)}>Выбрать другой</button>
                </div>
                {'\n\n          '}
                <div className="city-confirm__current" hidden={!cityConfirmed}>
                  {'\n            '}
                  <button
                    className="city-confirm__selection button-reset"
                    type="button" aria-haspopup="dialog" aria-controls="location-modal"
                    onClick={(event) => openLocation('city', event.currentTarget)}
                  >
                    {'\n              '}
                    <svg className="city-confirm__icon">
                      {'\n                '}
                      <use href="/img/sprite.svg#icon-mappin"></use>
                      {'\n              '}
                    </svg>
                    {'\n              '}
                    <span data-header-city="">{site.city}</span>
                    {'\n              '}
                    <svg className="city-confirm__selection-icon" aria-hidden="true">
                      {'\n                '}
                      <use href="/img/sprite.svg#icon-cvervron_down"></use>
                      {'\n              '}
                    </svg>
                    {'\n            '}
                  </button>
                  {'\n            '}
                  <button
                    className="city-confirm__selection city-confirm__selection--location button-reset"
                    type="button" aria-haspopup="dialog" aria-controls="location-modal"
                    onClick={(event) => openLocation('location', event.currentTarget)}
                  >
                    {'\n              '}
                    <span className="city-confirm__address" data-header-address="">
                      {selectedAddress}
                    </span>
                    {'\n              '}
                    <svg className="city-confirm__selection-icon" aria-hidden="true">
                      {'\n                '}
                      <use href="/img/sprite.svg#icon-cvervron_down"></use>
                      {'\n              '}
                    </svg>
                    {'\n            '}
                  </button>
                  {'\n          '}
                </div>
                {'\n        '}
              </div>
              {'\n        '}
              <div className="header__item header__item--desk">
                {'\n          '}
                <div className="select header__select messenger-menu" ref={messengerRef} onKeyDown={(event) => {
                  const links = [...messengerRef.current.querySelectorAll('.messenger-menu__link')];
                  if (event.key === 'Escape' && messengerOpen) { event.preventDefault(); setMessengerOpen(false); messengerToggle.current?.focus(); return; }
                  if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && document.activeElement === messengerToggle.current) {
                    event.preventDefault(); setMessengerOpen(true);
                    (event.key === 'ArrowDown' ? links[0] : links.at(-1))?.focus();
                  }
                }}>
                  {'\n            '}
                  <button
                    className="select__button messenger-menu__toggle button-reset"
                    type="button"
                    aria-expanded={messengerOpen}
                    aria-controls="header-messengers"
                    ref={messengerToggle}
                    onClick={() => setMessengerOpen((value) => !value)}
                  >
                    {'\n              '}
                    <span className="select__button-text">{'Мессенджеры'}</span>
                    {'\n              '}
                    <svg className="icon select__button-icon" aria-hidden="true">
                      {'\n                '}
                      <use href="/img/sprite.svg#icon-cvervron_down"></use>
                      {'\n              '}
                    </svg>
                    {'\n            '}
                  </button>
                  {'\n            '}
                  <ul
                    className="messenger-menu__dropdown"
                    id="header-messengers"
                    aria-label="Мессенджеры Warpoint"
                    aria-hidden={!messengerOpen}
                    inert={!messengerOpen}
                  >
                    {'\n              '}
                    <li>
                      {'\n                '}
                      <a className="messenger-menu__link" href="#" onClick={(event) => { event.preventDefault(); setMessengerOpen(false); }}>
                        {'\n                  '}
                        <svg className="messenger-menu__icon" aria-hidden="true">
                          {'\n                    '}
                          <use href="/img/sprite.svg#icon-vk"></use>
                          {'\n                  '}
                        </svg>
                        {'\n                  '}
                        <span>{'Написать во ВКонтакте'}</span>
                        {'\n                '}
                      </a>
                      {'\n              '}
                    </li>
                    {'\n              '}
                    <li>
                      {'\n                '}
                      <a className="messenger-menu__link" href="#" onClick={(event) => { event.preventDefault(); setMessengerOpen(false); }}>
                        {'\n                  '}
                        <svg className="messenger-menu__icon" aria-hidden="true">
                          {'\n                    '}
                          <use href="/img/sprite.svg#icon-max"></use>
                          {'\n                  '}
                        </svg>
                        {'\n                  '}
                        <span>{'Написать в Макс'}</span>
                        {'\n                '}
                      </a>
                      {'\n              '}
                    </li>
                    {'\n              '}
                    <li>
                      {'\n                '}
                      <a className="messenger-menu__link" href="#" onClick={(event) => { event.preventDefault(); setMessengerOpen(false); }}>
                        {'\n                  '}
                        <svg className="messenger-menu__icon" aria-hidden="true">
                          {'\n                    '}
                          <use href="/img/sprite.svg#icon-tg"></use>
                          {'\n                  '}
                        </svg>
                        {'\n                  '}
                        <span>{'Написать в Telegram'}</span>
                        {'\n                '}
                      </a>
                      {'\n              '}
                    </li>
                    {'\n              '}
                    <li>
                      {'\n                '}
                      <a className="messenger-menu__link" href="#" onClick={(event) => { event.preventDefault(); setMessengerOpen(false); }}>
                        {'\n                  '}
                        <svg className="messenger-menu__icon" aria-hidden="true">
                          {'\n                    '}
                          <use href="/img/sprite.svg#icon-whatsapp"></use>
                          {'\n                  '}
                        </svg>
                        {'\n                  '}
                        <span>{'Написать в WhatsApp'}</span>
                        {'\n                '}
                      </a>
                      {'\n              '}
                    </li>
                    {'\n            '}
                  </ul>
                  {'\n          '}
                </div>
                {'\n          '}
                {fields.local && (
                  <a href="tel:+73433000000" className="header__link link">
                    {'+7 (343) 300-00-00'}
                  </a>
                )}
                {'\n        '}
              </div>
              {'\n      '}
            </div>
            {'\n    '}
          </div>
          {'\n    '}
          <div className="header__bottom">
            {'\n      '}
            <div className="header__row">
              {'\n        '}
              <a href="/" className="header__logo">
                {'\n          '}
                <img src="/img/logo.svg" alt="" />
                {'\n        '}
              </a>
              {'\n        '}
              <nav
                className={`header__menu menu${drawer ? ' is-drawer' : ''}${menuOpen ? ' is-open' : ''}`}
                id="header-navigation"
                aria-label="Основная навигация"
                data-mobile-menu=""
                aria-hidden={menuOpen ? undefined : drawer}
                inert={!menuOpen && drawer}
                onClickCapture={(event) => { if (menuOpen && event.target.closest('a[href], [data-mobile-menu-close]')) closeMenu(); }}
              >
                {'\n          '}
                <div className="menu__top">
                  {'\n            '}
                  <a className="menu__logo" href="/" aria-label="Warpoint — на главную">
                    {'\n              '}
                    <img src="/img/logo.svg" alt="" />
                    {'\n            '}
                  </a>
                  {'\n            '}
                  <button
                    className="menu__close button-reset"
                    type="button"
                    aria-label="Закрыть меню"
                    ref={closeRef}
                    onClick={closeMenu}
                  >
                    {'\n              '}
                    <span className="menu__close-icon" aria-hidden="true"></span>
                    {'\n            '}
                  </button>
                  {'\n          '}
                </div>
                {'\n\n          '}
                <div className="menu__scroll">
                  {'\n            '}
                  <ul className="menu__list">
                    {'\n              '}
                    <li className="menu__item">
                      {'\n                '}
                      <a href="/games/" className="menu__link">
                        {'Игры'}
                      </a>
                      {'\n              '}
                    </li>
                    {'\n              '}
                    <li className="menu__item menu__item--group">
                      {'\n                '}
                      <button
                        className="menu__link menu__toggle button-reset"
                        type="button"
                        aria-expanded={submenu === 'tariffs'}
                        aria-controls="header-tariffs-submenu"
                        onClick={() => setSubmenu((current) => current === 'tariffs' ? null : 'tariffs')}
                      >
                        {'\n                  '}
                        <span>{'Тарифы'}</span>
                        {'\n                  '}
                        <svg className="icon menu__link-icon" aria-hidden="true">
                          {'\n                    '}
                          <use href="/img/sprite.svg#icon-cvervron_down"></use>
                          {'\n                  '}
                        </svg>
                        {'\n                '}
                      </button>
                      {'\n                '}
                      <ul
                        className="menu__submenu"
                        id="header-tariffs-submenu"
                        aria-label="Тарифы и акции"
                        aria-hidden={submenu !== 'tariffs'}
                        inert={submenu !== 'tariffs'}
                        style={menuOpen ? { maxHeight: submenu === 'tariffs' ? '200px' : '0px' } : undefined}
                      >
                        {'\n                  '}
                        <li>
                          <a href="/tariffs/">{'Тарифы'}</a>
                        </li>
                        {'\n                  '}
                        <li>
                          <a href="/promotions/">{'Наши акции'}</a>
                        </li>
                        {'\n                '}
                      </ul>
                      {'\n              '}
                    </li>
                    {'\n              '}
                    <li className="menu__item menu__item--group">
                      {'\n                '}
                      <button
                        className="menu__link menu__toggle button-reset"
                        type="button"
                        aria-expanded={submenu === 'events'}
                        aria-controls="header-events-submenu"
                        onClick={() => setSubmenu((current) => current === 'events' ? null : 'events')}
                      >
                        {'\n                  '}
                        <span>{'Мероприятия'}</span>
                        {'\n                  '}
                        <svg className="icon menu__link-icon" aria-hidden="true">
                          {'\n                    '}
                          <use href="/img/sprite.svg#icon-cvervron_down"></use>
                          {'\n                  '}
                        </svg>
                        {'\n                '}
                      </button>
                      {'\n                '}
                      <ul
                        className="menu__submenu"
                        id="header-events-submenu"
                        aria-label="Разделы мероприятий"
                        aria-hidden={submenu !== 'events'}
                        inert={submenu !== 'events'}
                        style={menuOpen ? { maxHeight: submenu === 'events' ? '400px' : '0px' } : undefined}
                      >
                        {'\n                  '}
                        <li>
                          <a href="/events/birthday/">{'Детский день рождения'}</a>
                        </li>
                        {'\n                  '}
                        <li>
                          <a href="/events/adult-birthday/">{'Взрослый день рождения'}</a>
                        </li>
                        {'\n                  '}
                        <li>
                          <a href="/events/corporate/">{'Корпоратив и тимбилдинг'}</a>
                        </li>
                        {'\n                  '}
                        <li>
                          <a href="/events/graduation/">{'Школьный выпускной'}</a>
                        </li>
                        {'\n                  '}
                        <li>
                          <a href="/events/">{'Анонс мероприятий'}</a>
                        </li>
                        {'\n                '}
                      </ul>
                      {'\n              '}
                    </li>
                    {'\n              '}
                    <li className="menu__item">
                      {'\n                '}
                      <a href="/certificates/" className="menu__link">
                        {'Сертификаты'}
                      </a>
                      {'\n              '}
                    </li>
                    {'\n              '}
                    <li className="menu__item">
                      {'\n                '}
                      <a href="/franchise/" className="menu__link">
                        {'Франшиза'}
                      </a>
                      {'\n              '}
                    </li>
                    {'\n              '}
                    <li className="menu__item">
                      {'\n                '}
                      <a href="#contacts" className="menu__link">
                        {'Контакты'}
                      </a>
                      {'\n              '}
                    </li>
                    {'\n            '}
                  </ul>
                  {'\n\n            '}
                  <div className="menu__place">
                    {'\n              '}
                    <span className="menu__label">{'Ваш город и локация'}</span>
                    {'\n              '}
                    <button
                      className="menu__place-button button-reset"
                      type="button" aria-haspopup="dialog" aria-controls="location-modal"
                      onClick={(event) => openLocation('city', event.currentTarget)}
                    >
                      {'\n                '}
                      <svg className="menu__place-marker" aria-hidden="true">
                        {'\n                  '}
                        <use href="/img/sprite.svg#icon-mappin"></use>
                        {'\n                '}
                      </svg>
                      {'\n                '}
                      <span data-header-city="">{site.city}</span>
                      {'\n                '}
                      <svg className="icon menu__place-chevron" aria-hidden="true">
                        {'\n                  '}
                        <use href="/img/sprite.svg#icon-cvervron_down"></use>
                        {'\n                '}
                      </svg>
                      {'\n              '}
                    </button>
                    {'\n              '}
                    <button
                      className="menu__place-button menu__place-button--address button-reset"
                      type="button" aria-haspopup="dialog" aria-controls="location-modal"
                      onClick={(event) => openLocation('location', event.currentTarget)}
                    >
                      {'\n                '}
                      <span className="menu__place-address" data-header-address="">
                        {selectedAddress}
                      </span>
                      {'\n                '}
                      <svg className="icon menu__place-chevron" aria-hidden="true">
                        {'\n                  '}
                        <use href="/img/sprite.svg#icon-cvervron_down"></use>
                        {'\n                '}
                      </svg>
                      {'\n              '}
                    </button>
                    {'\n            '}
                  </div>
                  {'\n\n            '}
                  <div className="menu__footer">
                    {'\n              '}
                    <a className="menu__phone" href="tel:+73433000000">
                      {'+7 (343) 300-00-00'}
                    </a>
                    {'\n              '}
                    <button
                      className="menu__booking button-reset"
                      type="button"
                      data-booking-open=""
                      data-mobile-menu-close=""
                    >
                      {'\n                Забронировать\n              '}
                    </button>
                    {'\n              '}
                    <button
                      className="menu__booking menu__booking--event button-reset"
                      type="button"
                      aria-haspopup="dialog"
                      aria-controls="event-modal"
                      data-event-modal-open=""
                      data-mobile-menu-close=""
                    >
                      {'\n                Провести мероприятие\n              '}
                    </button>
                    {'\n            '}
                  </div>
                  {'\n          '}
                </div>
                {'\n        '}
              </nav>
              {'\n        '}
              <div className="header__buttons">
                {'\n          '}
                <button
                  className="header__button button-reset"
                  type="button"
                  aria-label="Личный кабинет"
                  aria-haspopup="dialog"
                  aria-controls="auth-modal"
                  data-js-auth=""
                >
                  {'\n            '}
                  <svg className="icon header__button-icon" aria-hidden="true">
                    {'\n              '}
                    <use href="/img/sprite.svg#icon-user"></use>
                    {'\n            '}
                  </svg>
                  {'\n          '}
                </button>
                {'\n          '}
                <button
                  className={`header__burger burger button-reset${menuOpen ? ' is-active' : ''}`}
                  type="button"
                  aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
                  aria-expanded={menuOpen}
                  aria-controls="header-navigation"
                  ref={burgerRef}
                  onClick={() => { setMenuOpen((open) => !open); setSubmenu(null); }}
                >
                  {'\n            '}
                  <span className="burger__line" aria-hidden="true"></span>
                  {'\n          '}
                </button>
                {'\n          '}
                <button
                  className="header__booking button-reset"
                  type="button"
                  data-booking-open=""
                >
                  {'\n            Забронировать\n          '}
                </button>
                {'\n        '}
              </div>
              {'\n      '}
            </div>
            {'\n    '}
          </div>
          {'\n  '}
        </div>
        {'\n  '}
        <div className={`menu-backdrop${menuOpen ? ' is-visible' : ''}`} hidden={!menuOpen} onClick={closeMenu}></div>
        {'\n'}
      </header>
    </>
  );
}
