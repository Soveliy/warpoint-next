'use client';
import { useState } from 'react';
import PromotionCard from './PromotionCard';
import PromotionDialog from './PromotionDialog';
import ListingLead from './ListingLead';
import LocationSelection from './LocationSelection';
import { useSiteLocation } from './SiteLocationProvider';
import { locationPromotions } from '../../lib/site-content';

export default function PromotionsListing({ site, promotions }) {
  const { location } = useSiteLocation();
  const [selected, setSelected] = useState(null);
  const items = site.source === 'wp-sites' ? locationPromotions(location, promotions) : promotions;
  const active = items.find((item) => item.id === selected?.id);
  if (!location) {
    return (
      <section className="promotions-list container" aria-label="Акции WARPOINT">
        <LocationSelection description="Покажем акции выбранного парка." />
      </section>
    );
  }
  return (
    <>
      <section className="promotions-list container" aria-label="Акции WARPOINT">
        {items.length ? (
          <div className="promotions-list__grid">
            {items.map((promotion, index) => (
              <PromotionCard
                key={promotion.id}
                promotion={promotion}
                featured={index === 0}
                onOpen={setSelected}
              />
            ))}
          </div>
        ) : (
          <p className="promotions-list__notice">
            Акции для вашего города появятся здесь после публикации условий.
          </p>
        )}
        {active && <PromotionDialog promotion={active} onClose={() => setSelected(null)} />}
      </section>
      <ListingLead site={site} title="Не знаете," accent="что выбрать?" />
    </>
  );
}
