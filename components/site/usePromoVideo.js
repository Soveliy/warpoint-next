'use client';

import { useEffect, useRef, useState } from 'react';

export function usePromoVideo() {
  const sectionRef = useRef(null);
  const playRef = useRef(null);
  const closeRef = useRef(null);
  const videoRef = useRef(null);
  const [state, setState] = useState('closed');
  const [originStyle, setOriginStyle] = useState({});
  const [playFailed, setPlayFailed] = useState(false);

  const measureOrigin = () => {
    const section = sectionRef.current?.getBoundingClientRect();
    const button = playRef.current?.getBoundingClientRect();
    if (!section || !button) return;
    setOriginStyle({
      '--promo-play-x': `${button.left - section.left + button.width / 2}px`,
      '--promo-play-y': `${button.top - section.top + button.height / 2}px`,
      '--promo-play-size': `${button.width}px`,
      '--promo-play-radius': getComputedStyle(playRef.current).borderRadius,
    });
  };

  const open = () => {
    if (state !== 'closed') return;
    measureOrigin();
    setPlayFailed(false);
    setState('preparing');
    try { videoRef.current.currentTime = 0; } catch { /* Metadata may still load. */ }
    videoRef.current?.play().catch(() => setPlayFailed(true));
  };

  const close = () => {
    if (state === 'closed' || state === 'closing') return;
    measureOrigin();
    videoRef.current?.pause();
    setState('closing');
  };

  useEffect(() => {
    if (state !== 'preparing') return;
    let inner;
    const outer = requestAnimationFrame(() => { inner = requestAnimationFrame(() => setState('opening')); });
    return () => { cancelAnimationFrame(outer); if (inner) cancelAnimationFrame(inner); };
  }, [state]);

  useEffect(() => {
    if (state !== 'opening' && state !== 'closing') return;
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 720;
    const timer = setTimeout(() => {
      if (state === 'opening') {
        setState('open');
        closeRef.current?.focus({ preventScroll: true });
      } else {
        setState('closed');
        setOriginStyle({});
        try { videoRef.current.currentTime = 0; } catch { /* Metadata may still load. */ }
        playRef.current?.focus({ preventScroll: true });
      }
    }, duration);
    return () => clearTimeout(timer);
  }, [state]);

  useEffect(() => {
    if (state === 'closed') return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); close(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [state]);

  const className = `video-section${state !== 'closed' ? ' is-video-preparing' : ''}`
    + `${state === 'opening' ? ' is-video-opening' : ''}`
    + `${state === 'open' ? ' is-video-open' : ''}`
    + `${state === 'closing' ? ' is-video-closing' : ''}`;

  return { sectionRef, playRef, closeRef, videoRef, state, originStyle, playFailed, className, open, close };
}
