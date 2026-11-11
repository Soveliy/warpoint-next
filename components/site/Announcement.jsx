'use client';
import { useEffect, useRef, useState } from 'react';
const key = 'warpoint:announcement:new-games';
export default function Announcement() {
  const notice = useRef(null);
  const [dismissed, setDismissed] = useState(false);
  const [bottom, setBottom] = useState(null);
  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(key) === 'true');
    } catch {}
  }, []);
  useEffect(() => {
    if (dismissed || !notice.current) return;

    const obstacles = [
      ...document.querySelectorAll('.hero__allerts, .mobile-actions, .cookie-notice'),
    ];
    let frame = null;
    const update = () => {
      frame = null;
      if (!notice.current) return;
      const bounds = notice.current.getBoundingClientRect();
      let offset = window.matchMedia('(max-width: 767px)').matches ? 16 : 24;
      const visible = obstacles
        .filter((element) => {
          const style = getComputedStyle(element);
          return (
            style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) > 0
          );
        })
        .map((element) => element.getBoundingClientRect())
        .filter((rect) => rect.height && rect.bottom > 0 && rect.top < window.innerHeight)
        .sort((a, b) => b.top - a.top);

      // Stack above visible controls only when they intersect the fixed card.
      for (const rect of visible) {
        const top = window.innerHeight - offset - bounds.height;
        const bottomEdge = window.innerHeight - offset;
        if (
          rect.left < bounds.right &&
          rect.right > bounds.left &&
          rect.top < bottomEdge + 12 &&
          rect.bottom > top - 12
        ) {
          offset = window.innerHeight - rect.top + 12;
        }
      }
      setBottom(Math.ceil(offset));
    };
    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };
    const resize = new ResizeObserver(schedule);
    [notice.current, ...obstacles].forEach((element) => resize.observe(element));
    const state = new MutationObserver(schedule);
    state.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style'],
    });
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();

    return () => {
      resize.disconnect();
      state.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [dismissed]);

  const close = () => {
    try {
      sessionStorage.setItem(key, 'true');
    } catch {}
    setDismissed(true);
  };
  if (dismissed) return null;
  return (
    <aside
      ref={notice}
      className={`announcement${bottom === null ? '' : ' announcement--visible'}`}
      aria-label="Анонс Warpoint"
      style={bottom === null ? undefined : { '--announcement-bottom': `${bottom}px` }}
    >
      <img
        className="announcement__image"
        src="/img/zones/арена.jpg"
        width="96"
        height="96"
        alt="Игроки на VR-арене"
        loading="lazy"
      />
      <div className="announcement__content">
        <p className="announcement__text">
          На VR-аренах WARPOINT появились новые игры и детские режимы
        </p>
        <a className="announcement__link" href="/games/">
          Подробнее <span aria-hidden="true">→</span>
        </a>
      </div>
      <button
        className="announcement__close button-reset"
        type="button"
        aria-label="Скрыть анонс"
        onClick={close}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      </button>
    </aside>
  );
}
