import { siteFields } from '../../lib/site-fields';

export default function HomeExtras({ site }) {
  const fields = siteFields(site);
  return (
    <>
      <section
        className="extras"
        data-header-theme="brand"
        aria-label="Дополнительные возможности Warpoint"
      >
        {'\n  '}
        <div className="extras__container container">
          {'\n    '}
          <div className="extras__grid">
            {'\n      '}
            <article className="extras__item extras__item--certificate">
              {'\n        '}
              <div className="extras__content">
                {'\n          '}
                <h2 className="extras__title">
                  {'Подарочные'}
                  <br />
                  {'сертификаты'}
                </h2>
                {'\n          '}
                <p className="extras__description">
                  {'Не ищите идеальный подарок. Мы уже всё придумали'}
                </p>
                {'\n          '}
                <button className="extras__link button-reset" type="button">
                  {'Купить сертификат'}
                </button>
                {'\n        '}
              </div>
              {'\n        '}
              <div className="extras__image-container" aria-hidden="true">
                {'\n          '}
                <img
                  className="extras__image"
                  src="/img/sert-clean.png"
                  width="1665"
                  height="945"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                {'\n        '}
              </div>
              {'\n      '}
            </article>
            {'\n\n      '}
            <article className="extras__item extras__item--merch">
              {'\n        '}
              <div className="extras__content">
                {'\n          '}
                <h2 className="extras__title">
                  {'Фирменный'}
                  <br />
                  {'мерч'}
                </h2>
                {'\n          '}
                <p className="extras__description">
                  {
                    '\n            Каталог нашей атрибутики. Станьте частью виртуального мира Warpoint\n          '
                  }
                </p>
                {'\n          '}
                <button className="extras__link button-reset" type="button">
                  {'В каталог'}
                </button>
                {'\n        '}
              </div>
              {'\n        '}
              <div className="extras__image-container" aria-hidden="true">
                {'\n          '}
                <img
                  className="extras__image"
                  src="/img/merch.png"
                  width="409"
                  height="339"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                {'\n        '}
              </div>
              {'\n      '}
            </article>
            {'\n\n      '}
            <article className="extras__item extras__item--tournaments">
              {'\n        '}
              <div className="extras__content">
                {'\n          '}
                <h2 className="extras__title">
                  {'Киберспортивные'}
                  <br />
                  {'турниры'}
                </h2>
                {'\n          '}
                <p className="extras__description">
                  {
                    '\n            Расписание турниров. Примите участие в самых масштабных VR-соревнованиях\n          '
                  }
                </p>
                {'\n          '}
                <button className="extras__link button-reset" type="button">
                  {'Расписание'}
                </button>
                {'\n        '}
              </div>
              {'\n        '}
              <div className="extras__image-container" aria-hidden="true">
                {'\n          '}
                <img
                  className="extras__image"
                  src="/img/bonuses/3.png"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                {'\n        '}
              </div>
              {'\n      '}
            </article>
            {'\n\n      '}
            <article className="extras__item extras__item--bonus">
              {'\n        '}
              <div className="extras__content">
                {'\n          '}
                <h2 className="extras__title">
                  {'Бонусная'}
                  <br />
                  {'программа'}
                </h2>
                {'\n          '}
                <p className="extras__description">
                  {
                    '\n            Становитесь участником нашей системы лояльности и получайте игры бонусами\n          '
                  }
                </p>
                {'\n          '}
                <button className="extras__link button-reset" type="button">
                  {'Зарегистрироваться'}
                </button>
                {'\n        '}
              </div>
              {'\n        '}
              <div className="extras__image-container" aria-hidden="true">
                {'\n          '}
                <img
                  className="extras__image"
                  src="/img/bonuses/loyalty.png"
                  width="925"
                  height="1049"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                {'\n        '}
              </div>
              {'\n      '}
            </article>
            {'\n    '}
          </div>
          {'\n  '}
        </div>
        {'\n'}
      </section>
    </>
  );
}
