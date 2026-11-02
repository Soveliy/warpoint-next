const photos = [
  ['/img/gallery/3.jpg', 'Компания друзей играет на красной стороне VR-арены'],
  ['/img/gallery/2.jpg', 'Участница командной VR-игры с контроллерами'],
  ['/img/showcase/1.jpg', 'Гости играют вместе на синей стороне VR-арены'],
  ['/img/gallery/6.jpg', 'Командная игра на площадке WARPOINT'],
  ['/img/gallery/5.jpg', 'Друзья в шлемах виртуальной реальности'],
  ['/img/gallery/1.jpg', 'Гости праздника играют на VR-арене'],
];

export default function AdultBirthdayGallery() {
  return <section className="gallery" data-header-theme="brand" aria-labelledby="gallery-title">
    <div className="gallery__container container">
      <div className="gallery__section-head section-head" data-reveal="">
        <h2 className="section-head__title" id="gallery-title">Как проходят<br /><span>дни рождения</span></h2>
        <p className="section-head__lead section-head__lead--lit-width">Осторожно! Фото с игр повышают адреналин в крови!</p>
      </div>
      <div className="gallery__grid">{photos.map(([image, alt]) => <a className="gallery__item" href={image} data-fancybox="moments" key={image}>
        <img className="gallery__image" src={image} width="3000" height="1996" alt={alt} loading="lazy" decoding="async" />
      </a>)}</div>
    </div>
  </section>;
}
