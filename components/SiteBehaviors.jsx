'use client';

import { useEffect } from 'react';

export default function SiteBehaviors({ site }) {
  useEffect(() => {
    window.__WARPOINT_SITE__ = {
      city: site.city,
      countryId: site.countryId,
      arenas: site.arenas,
    };
    document.documentElement.classList.add('is-loaded');

    // Deferring initialization until after hydration also avoids React's
    // development-only effect replay initializing third-party widgets twice.
    let mounted = true;
    const frame = window.requestAnimationFrame(async () => {
      await document.fonts?.ready;
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
