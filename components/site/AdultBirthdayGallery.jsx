import { eventGalleries } from '../../lib/event-media';

const photos = eventGalleries['adult-birthday'];

export default function AdultBirthdayGallery() {
  return (
    <section className="gallery" data-header-theme="brand" aria-labelledby="gallery-title">
      <div className="gallery__container container">
        <div className="gallery__section-head section-head" data-reveal="">
          <h2 className="section-head__title" id="gallery-title">
            Как проходят
            <br />
            <span>дни рождения</span>
          </h2>
          <p className="section-head__lead section-head__lead--lit-width">
            Осторожно! Фото с игр повышают адреналин в крови!
          </p>
        </div>
        <div className="gallery__grid">
          {photos.map((photo) => (
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
      </div>
    </section>
  );
}
