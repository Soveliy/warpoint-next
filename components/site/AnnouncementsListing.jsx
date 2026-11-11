'use client';
import { useState } from 'react';
import AnnouncementCard from './AnnouncementCard';
import AnnouncementDialog from './AnnouncementDialog';
import LocationSelection from './LocationSelection';
import { useSiteLocation } from './SiteLocationProvider';
import { locationAnnouncements } from '../../lib/site-content';

export default function AnnouncementsListing({ announcements }) {
  const { site, location } = useSiteLocation();
  const items =
    site.source === 'wp-sites'
      ? locationAnnouncements(location, site.timezone, announcements)
      : announcements;
  const [selected, setSelected] = useState(null);
  const active = items.find((item) => item.id === selected?.id);
  if (!location) {
    return (
      <section className="announcements-list container" aria-label="Анонсы мероприятий">
        <LocationSelection description="Покажем мероприятия выбранного парка." />
      </section>
    );
  }
  if (!items.length)
    return (
      <section className="announcements-list container">
        <p>Анонсы мероприятий в вашем городе появятся здесь.</p>
      </section>
    );
  return (
    <section className="announcements-list container" aria-label="Анонсы мероприятий">
      <div className="announcements-list__grid">
        {items.map((event, index) => (
          <AnnouncementCard
            key={event.id}
            event={event}
            priority={index === 0}
            onOpen={setSelected}
          />
        ))}
      </div>
      {active && <AnnouncementDialog event={active} onClose={() => setSelected(null)} />}
    </section>
  );
}
