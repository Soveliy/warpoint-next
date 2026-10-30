'use client';

import { useEffect } from 'react';

export default function SiteBehaviors({ site }) {
  useEffect(() => {
    window.__WARPOINT_SITE__ = {
      city: site.city,
      countryId: site.countryId,
      arenas: site.arenas,
    };
    let selectedArena = 0;
    try {
      const saved = Number.parseInt(sessionStorage.getItem(`warpoint-arena:${site.hostname}`) || '0', 10);
      if (Number.isInteger(saved) && saved >= 0 && saved < site.arenas.length) selectedArena = saved;
    } catch { /* Storage is optional. */ }
    document.documentElement.dataset.country = site.countryId;
    document.documentElement.dataset.city = site.city;
    document.documentElement.dataset.location = `erp-${selectedArena}`;
    document.documentElement.classList.add('is-loaded');

    // Deferring initialization until after hydration also avoids React's
    // development-only effect replay initializing third-party widgets twice.
    let mounted = true;
    const frame = window.requestAnimationFrame(async () => {
      const { initPageInteractions } = await import('../interactions/_components');
      if (mounted) initPageInteractions();
    });

    return () => {
      mounted = false;
      window.cancelAnimationFrame(frame);
    };
  }, [site]);

  return null;
}
