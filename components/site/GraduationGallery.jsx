import { eventGalleries } from '../../lib/event-media';
import { siteFields } from '../../lib/site-fields';

export default function GraduationGallery({ site }) {
  const fields = siteFields(site);
  return (
    <>
      <section className="gallery" data-header-theme="brand" aria-labelledby="gallery-title">
        {'\n      '}
        <div className="gallery__container container">
          {'\n        '}
          <div className="gallery__section-head section-head" data-reveal="">
            {'\n          '}
            <h2 className="section-head__title" id="gallery-title">
              {'Как проходят '}
              <br />
              <span>{'выпускные'}</span>
            </h2>
            {'\n\n          '}
            <p className="gallery__lead section-head__lead">
              {
                '\n            Провели более 1 000 детских праздников и точно знаем, как сделать школьный выпускной особенным!\n          '
              }
            </p>
            {'\n        '}
          </div>
          {'\n\n        '}
          <div className="gallery__grid">
            {eventGalleries.graduation.map((photo) => (
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
