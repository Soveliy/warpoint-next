import { siteFields } from '../../lib/site-fields';

export default function CorporateImmersiveShowcase({ site }) {
  const fields = siteFields(site);
  return (
    <>
      <section
        className="immersive-showcase"
        id="immersion"
        data-header-theme="brand"
        aria-labelledby="immersive-showcase-title"
      >
        {'\n  '}
        <div className="immersive-showcase__container container">
          {'\n    '}
          <div className="immersive-showcase__card" data-reveal-image="">
            {'\n      '}
            <div className="immersive-showcase__content">
              {'\n        '}
              <h2 className="immersive-showcase__title" id="immersive-showcase-title">
                {'\n          Невероятный'}
                <br />
                {'уровень'}
                <br />
                <span>{'погружения'}</span>
                {'\n        '}
              </h2>
              {'\n        '}
              <ul>
                {'\n          '}
                <li>{'Свободное перемещение по всей арене'}</li>
                {'\n          '}
                <li>{'Никаких проводов и тяжёлых рюкзаков'}</li>
                {'\n          '}
                <li>{'Участники видят друг друга и могут взаимодействовать'}</li>
                {'\n          '}
                <li>{'Нужно активно двигаться и слаженно работать в команде'}</li>
                {'\n        '}
              </ul>
              {'\n      '}
            </div>
            {'\n      '}
            <div className="immersive-showcase__media">
              {'\n        '}
              <video
                className="immersive-showcase__image"
                autoPlay={true}
                muted={true}
                loop={true}
                playsInline={true}
                preload="metadata"
                poster="/img/showcase/1.jpg"
                aria-hidden="true"
              >
                {'\n          '}
                <source src="/video/corporate-immersion.mp4" type="video/mp4" />
                {'\n        '}
              </video>
              {'\n      '}
            </div>
            {'\n    '}
          </div>
          {'\n  '}
        </div>
        {'\n'}
      </section>
    </>
  );
}
