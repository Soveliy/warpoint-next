import EventHeroFooter from './EventHeroFooter';

export default function CorporateHeroEvent() {
  return (
    <section
      className="hero-event hero-event--purple hero-event--corporate"
      data-event-hero=""
      data-event-line-src="img/events-hero/corp/line.png"
    >
      <div className="hero-event__scene" aria-hidden="true">
        {'\n        '}
        <svg className="hero-event__line" viewBox="0 0 919 795" xmlns="http://www.w3.org/2000/svg">
          {'\n          '}
          <defs>
            {'\n            '}
            <mask id="corporate-line-reveal" maskUnits="userSpaceOnUse">
              {'\n              '}
              <path
                className="hero-event__line-path"
                d="M 935 160 C 905 40 820 -20 725 80 C 625 180 560 330 415 420 C 300 460 10 480 80 575 C 120 635 290 585 380 610 C 500 650 575 780 665 835"
                pathLength="1"
                fill="none"
                stroke="white"
                strokeWidth="360"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              {'\n              '}
              <rect
                className="hero-event__line-finish"
                x="0"
                y="0"
                width="919"
                height="795"
                fill="white"
              ></rect>
              {'\n            '}
            </mask>
            {'\n          '}
          </defs>
          {'\n          '}
          <image
            href="/img/events-hero/corp/line.png"
            width="919"
            height="795"
            mask="url(#corporate-line-reveal)"
          ></image>
          {'\n        '}
        </svg>
        {'\n        '}
        <img
          className="hero-event__character hero-event__character--corp-balloon"
          src="/img/events-hero/corp/1.png"
          width="299"
          height="357"
          alt=""
          decoding="async"
          data-line-progress="0.08"
        />
        {'\n        '}
        <img
          className="hero-event__character hero-event__character--corp-woman"
          src="/img/events-hero/corp/3.png"
          width="436"
          height="756"
          alt=""
          fetchPriority="high"
          decoding="async"
          data-line-progress="0.24"
        />
        {'\n        '}
        <img
          className="hero-event__character hero-event__character--corp-man"
          src="/img/events-hero/corp/2.png"
          width="476"
          height="820"
          alt=""
          fetchPriority="high"
          decoding="async"
          data-line-progress="0.46"
        />
        {'\n        '}
        <img
          className="hero-event__character hero-event__character--corp-cocktail"
          src="/img/events-hero/corp/4.png"
          width="278"
          height="278"
          alt=""
          decoding="async"
          data-line-progress="0.72"
        />
        {'\n      '}
      </div>
      <div className="hero-event__content container">
        <div className="hero-event__wrap">
          <h1 className="hero-event__title">
            {'\n            '}
            <span>{'Захватывающий'}</span>
            {'\n            '}
            <span>{'корпоратив'}</span>
            {'\n            '}
            <span>{'в парке виртуальной'}</span>
            {'\n            '}
            <span>{'реальности'}</span>
            {'\n          '}
          </h1>
          <p className="hero-event__desc">
            {
              '\n            Тимбилдинг, праздник или турнир между отделами — проведём мероприятие, которое команда\n            будет вспоминать весь год\n          '
            }
          </p>
          <ul className="hero-event__params">
            {'\n            '}

            {'\n            '}
            <li className="hero-event__param">{'До 30 гостей'}</li>
            {'\n          '}
          </ul>
        </div>
      </div>
      <EventHeroFooter icon="martini" />
    </section>
  );
}
