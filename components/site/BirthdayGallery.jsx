import Image from 'next/image';
import { eventGalleries } from '../../lib/event-media';

const photos = eventGalleries.birthday;

export default function BirthdayGallery() {
  return (
    <section className="gallery" data-header-theme="brand" aria-labelledby="gallery-title">
      <div className="gallery__container container">
        <div className="gallery__section-head section-head" data-reveal="">
          <h2 className="section-head__title" id="gallery-title">
            Как проходят <br />
            <span>дни рождения</span>
          </h2>
          <p className="gallery__lead section-head__lead">
            Провели более 1 000 детских праздников и точно знаем, как сделать день рождения ребенка
            особенным!
          </p>
        </div>

        <div className="gallery__grid">
          {photos.map((photo) => (
            <a className="gallery__item" href={photo.src} data-fancybox="moments" key={photo.src}>
              <Image
                className="gallery__image"
                src={photo.src}
                width={photo.width}
                height={photo.height}
                alt={photo.alt}
                sizes="(max-width: 767px) 50vw, (max-width: 1023px) 50vw, 33vw"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
