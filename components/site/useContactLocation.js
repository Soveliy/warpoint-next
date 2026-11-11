'use client';

import { useSiteLocation } from './SiteLocationProvider';

export default function useContactLocation() {
  const { selectedIndex, selectLocation } = useSiteLocation();
  return { selectedIndex: selectedIndex ?? 0, selectLocation };
}
