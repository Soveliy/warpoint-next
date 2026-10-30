'use client';

import { useEffect } from 'react';

export default function BodyPageClass({ event }) {
  useEffect(() => {
    document.body.classList.toggle('page--event', event);
    return () => {
      document.body.classList.remove('page--event');
    };
  }, [event]);

  return null;
}
