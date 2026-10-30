'use client';

import { useEffect } from 'react';

export default function PageIndexReady() {
  useEffect(() => {
    document.documentElement.classList.remove('is-preloading');
    document.documentElement.classList.add('is-loaded');
  }, []);
  return null;
}
