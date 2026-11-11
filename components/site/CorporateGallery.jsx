import { eventGalleries } from '../../lib/event-media';
import { siteFields } from '../../lib/site-fields';

export default function CorporateGallery({ site }) {
  const fields = siteFields(site);
  return (
    <>
      <section className="gallery" data-header-theme="brand" aria-labelledby="gallery-title">
        {'\n      '}
        <div className="gallery__container container">
          {'\n        '}
          <div className="gallery__section-head section-head" data-reveal="">
            {'\n\n          '}
            <h2 className="section-head__title" id="gallery-title">
              {' КАК ПРОХОДЯТ '}
              <br />
              <span>{'КОРПОРАТИВЫ'}</span>
            </h2>
            {'\n\n          '}
            <p className="section-head__lead section-head__lead--lit-width">
              {'\n            Осторожно! Фото с игр повышают адреналин в крови!\n          '}
            </p>
            {'\n        '}
          </div>
          {'\n\n        '}
          <div className="gallery__grid">
            {eventGalleries.corporate.map((photo) => (
              <a className="gallery__item" href={photo.src} data-fancybox="moments" key={photo.src}>
                <img
                  className="gallery__image"
                  src={photo.src}
                  width={photo.width}
                  height={photo.height}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                />
              </a>
            ))}
          </div>
          {'\n      '}
        </div>
        {'\n    '}
      </section>
    </>
  );
}
