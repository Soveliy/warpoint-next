'use client';

import { useEffect, useRef, useState } from 'react';

const key = 'warpoint:announcement:new-games';

export default function Announcement() {
  const slot = useRef(null);
  const [dismissed, setDismissed] = useState(false);
  const [floating, setFloating] = useState(false);
  const [slotHeight, setSlotHeight] = useState(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(key) === 'true') { setDismissed(true); return; }
    } catch { /* Storage is optional. */ }
    let frame = null;
    const update = () => {
      frame = null;
      const hero = slot.current?.closest('.hero, .hero-event');
      if (!hero) return;
      const bottom = hero.getBoundingClientRect().bottom;
      const shouldFloat = window.matchMedia('(max-width: 767px)').matches
        ? bottom <= 0 : bottom <= window.innerHeight * 0.45;
      setFloating(shouldFloat);
      if (shouldFloat) setSlotHeight(slot.current?.getBoundingClientRect().height || null);
      else setSlotHeight(null);
    };
    const schedule = () => { frame ??= requestAnimationFrame(update); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  const close = () => {
    try { sessionStorage.setItem(key, 'true'); } catch { /* Storage is optional. */ }
    setDismissed(true);
  };

  if (dismissed) return null;
  return <div className="hero__announcement" data-announcement-slot="" ref={slot}
    style={slotHeight ? { minHeight: slotHeight } : undefined}>
    <aside className={`announcement${floating ? ' is-floating' : ''}`} aria-label="Анонс Warpoint" data-announcement="new-games">
      <img className="announcement__image" src="/img/zones/арена.jpg" width="96" height="96" alt="Игроки на VR-арене" loading="lazy" />
      <div className="announcement__content">
        <p>На VR-аренах WARPOINT появились новые игры и детские режимы</p>
        <a className="announcement__link" href="/games">Подробнее <span aria-hidden="true">→</span></a>
      </div>
      <button className="announcement__close button-reset" type="button" aria-label="Скрыть анонс" onClick={close}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
      </button>
    </aside>
  </div>;
}
