import Image from 'next/image';

const photos = [
  {
    src: '/img/birthday-gallery/1.jpg',
    width: 2500,
    height: 1875,
    alt: 'Дети празднуют день рождения с конфетти в Warpoint',
  },
  {
    src: '/img/birthday-gallery/2.jpg',
    width: 2500,
    height: 1875,
    alt: 'Дети с VR-шлемами и контроллерами на арене Warpoint',
  },
  {
    src: '/img/birthday-gallery/3.jpg',
    width: 2500,
    height: 1406,
    alt: 'Компания детей с VR-шлемами на празднике в Warpoint',
  },
  {
    src: '/img/birthday-gallery/4.jpg',
    width: 2500,
    height: 1875,
    alt: 'Дети играют на VR-арене Warpoint',
  },
  {
    src: '/img/birthday-gallery/5.jpg',
    width: 2500,
    height: 1875,
    alt: 'Гостья детского праздника в Warpoint',
  },
  {
    src: '/img/birthday-gallery/6.jpg',
    width: 2500,
    height: 1663,
    alt: 'Дети радуются игре на VR-арене Warpoint',
  },
];

export default function BirthdayGallery() {
  return (
    <section className="gallery" data-header-theme="brand" aria-labelledby="gallery-title">
      <div className="gallery__container container">
        <div className="gallery__section-head section-head" data-reveal="">
          <h2 className="section-head__title" id="gallery-title">
            Как проходят <br />
            <span>дни рождения</span>
          </h2>
          <p className="section-head__lead section-head__lead--lit-width">
            Провели более 1 000 детских праздников и точно знаем, как сделать день рождения ребенка особенным!
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
