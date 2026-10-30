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
            <p className="section-head__lead section-head__lead--lit-width">
              {'\n            Провели более 1 000 детских праздников и точно знаем, как сделать школьный выпускной особенным!\n          '}
            </p>
            {'\n        '}
          </div>
          {'\n\n        '}
          <div className="gallery__grid">
            {'\n          '}
            <a className="gallery__item" href="/img/grad/1.jpg" data-fancybox="moments">
              {'\n            '}
              <img
                className="gallery__image gallery__image--birthday"
                src="/img/grad/1.jpg"
                width="3000"
                height="1996"
                alt="Игроки с VR-шлемами на синей арене Warpoint"
                loading="lazy"
                decoding="async"
              />
              {'\n          '}
            </a>
            {'\n\n          '}
            <a className="gallery__item" href="/img/grad/2.jpg" data-fancybox="moments">
              {'\n            '}
              <img
                className="gallery__image gallery__image--corporate"
                src="/img/grad/2.jpg"
                width="3000"
                height="1996"
                alt="Участница командной VR-игры с контроллерами"
                loading="lazy"
                decoding="async"
              />
              {'\n          '}
            </a>
            {'\n\n          '}
            <a className="gallery__item" href="/img/grad/3.jpg" data-fancybox="moments">
              {'\n            '}
              <img
                className="gallery__image gallery__image--graduation"
                src="/img/grad/3.jpg"
                width="3000"
                height="1996"
                alt="Команда игроков на красной стороне арены"
                loading="lazy"
                decoding="async"
              />
              {'\n          '}
            </a>
            {'\n\n          '}
            <a className="gallery__item" href="/img/grad/4.jpg" data-fancybox="moments">
              {'\n            '}
              <img
                className="gallery__image gallery__image--arena"
                src="/img/grad/4.jpg"
                width="3000"
                height="1996"
                alt="Игроки на большой VR-арене Warpoint"
                loading="lazy"
                decoding="async"
              />
              {'\n          '}
            </a>
            {'\n\n          '}
            <a className="gallery__item" href="/img/grad/5.jpg" data-fancybox="moments">
              {'\n            '}
              <img
                className="gallery__image gallery__image--station"
                src="/img/grad/5.jpg"
                width="3000"
                height="1996"
                alt="Командное сражение на площадке Warpoint"
                loading="lazy"
                decoding="async"
              />
              {'\n          '}
            </a>
            {'\n\n          '}
            <a className="gallery__item" href="/img/grad/6.jpg" data-fancybox="moments">
              {'\n            '}
              <img
                className="gallery__image gallery__image--extreme"
                src="/img/grad/6.jpg"
                width="3000"
                height="1996"
                alt="Гости играют в виртуальной реальности на арене"
                loading="lazy"
                decoding="async"
              />
              {'\n          '}
            </a>
            {'\n        '}
          </div>
          {'\n      '}
        </div>
        {'\n    '}
      </section>
    </>
  );
}
