import EventHeroFooter from './EventHeroFooter';
import EventHeroPrice from './EventHeroPrice';
import EventContentValue from './EventContentValue';
import EventParameters from './EventParameters';

export default function GraduationHeroEvent() {
  return (
    <section
      className="hero-event hero-event--blue hero-event--graduation"
      data-event-hero=""
      data-event-line-src="img/events-hero/graduation/line.png"
    >
      <div className="hero-event__scene" aria-hidden="true">
        {'\n        '}
        <svg className="hero-event__line" viewBox="0 0 1114 968" xmlns="http://www.w3.org/2000/svg">
          {'\n          '}
          <defs>
            {'\n            '}
            <mask id="graduation-line-reveal" maskUnits="userSpaceOnUse">
              {'\n              '}
              <path
                className="hero-event__line-path"
                d="M 140 500 C 155 300 225 100 395 110 C 520 120 555 245 540 425 C 510 640 420 760 330 760 C 270 760 260 700 300 590 C 375 365 575 170 720 225 C 850 270 825 470 790 650 C 755 805 700 810 680 710 C 650 590 730 380 850 310 C 945 250 1010 315 1010 315"
                pathLength="1"
                fill="none"
                stroke="white"
                strokeWidth="310"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              {'\n              '}
              <rect
                className="hero-event__line-finish"
                x="0"
                y="0"
                width="1114"
                height="968"
                fill="white"
              ></rect>
              {'\n            '}
            </mask>
            {'\n          '}
          </defs>
          {'\n          '}
          <image
            href="/img/events-hero/graduation/line.png"
            width="1114"
            height="968"
            mask="url(#graduation-line-reveal)"
          ></image>
          {'\n        '}
        </svg>
        {'\n        '}
        <img
          className="hero-event__character hero-event__character--grad-backpack"
          src="/img/events-hero/graduation/3.png"
          width="308"
          height="290"
          alt=""
          decoding="async"
          data-line-progress="0.08"
        />
        {'\n        '}
        <img
          className="hero-event__character hero-event__character--grad-girl"
          src="/img/events-hero/graduation/1.png"
          width="464"
          height="693"
          alt=""
          fetchPriority="high"
          decoding="async"
          data-line-progress="0.23"
        />
        {'\n        '}
        <img
          className="hero-event__character hero-event__character--grad-boy"
          src="/img/events-hero/graduation/4.png"
          width="537"
          height="578"
          alt=""
          fetchPriority="high"
          decoding="async"
          data-line-progress="0.5"
        />
        {'\n        '}
        <img
          className="hero-event__character hero-event__character--grad-cap"
          src="/img/events-hero/graduation/2.png"
          width="315"
          height="276"
          alt=""
          decoding="async"
          data-line-progress="0.74"
        />
        {'\n      '}
      </div>
      <div className="hero-event__content container">
        <div className="hero-event__wrap">
          <h1 className="hero-event__title">
            <EventContentValue category="graduation" field="title">
              {'\n            '}
              <span>{'Школьный выпускной'}</span>
              {'\n            '}
              <span>{'в парке виртуальной'}</span>
              {'\n            '}
              <span>{'реальности'}</span>
              {'\n          '}
            </EventContentValue>
          </h1>
          <p className="hero-event__desc">
            <EventContentValue category="graduation" field="description">
              {'Незабываемый праздник в честь окончания учебного года!'}
            </EventContentValue>
          </p>
          <ul className="hero-event__params">
            <EventHeroPrice category="graduation" />
            {'\n            '}

            {'\n            '}
            <EventParameters category="graduation" fallback={{ classes: '4, 9 и 11 классы' }} />
            {'\n          '}
          </ul>
        </div>
      </div>
      <EventHeroFooter icon="graduationcap" />
    </section>
  );
}
