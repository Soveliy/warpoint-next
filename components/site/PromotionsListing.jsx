'use client';
import { useState } from 'react';
import PromotionCard from './PromotionCard';
import PromotionDialog from './PromotionDialog';

export default function PromotionsListing({ promotions }) {
  const [selected, setSelected] = useState(null);
  if (!promotions.length)
    return (
      <section className="promotions-list container">
        <p className="promotions-list__notice">
          Акции для вашего города появятся здесь после публикации условий.
        </p>
      </section>
    );
  return (
    <section className="promotions-list container" aria-label="Акции WARPOINT">
      <div className="promotions-list__grid">
        {promotions.map((promotion, index) => (
          <PromotionCard
            key={promotion.id}
            promotion={promotion}
            featured={index === 0}
            onOpen={setSelected}
          />
        ))}
      </div>
      {selected && <PromotionDialog promotion={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
