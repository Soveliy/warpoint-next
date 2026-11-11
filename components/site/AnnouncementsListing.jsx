'use client';
import { useState } from 'react';
import AnnouncementCard from './AnnouncementCard';
import AnnouncementDialog from './AnnouncementDialog';

export default function AnnouncementsListing({ announcements }) {
  const [selected, setSelected] = useState(null);
  if (!announcements.length)
    return (
      <section className="announcements-list container">
        <p>Анонсы мероприятий в вашем городе появятся здесь.</p>
      </section>
    );
  return (
    <section className="announcements-list container" aria-label="Анонсы мероприятий">
      <div className="announcements-list__grid">
        {announcements.map((event, index) => (
          <AnnouncementCard
            key={event.id}
            event={event}
            priority={index === 0}
            onOpen={setSelected}
          />
        ))}
      </div>
      {selected && <AnnouncementDialog event={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
