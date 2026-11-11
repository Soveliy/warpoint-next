import EventHeroFooter from './EventHeroFooter';
import EventHeroPrice from './EventHeroPrice';
import EventContentValue from './EventContentValue';
import EventParameters from './EventParameters';

export default function BirthdayHeroEvent() {
  return (
    <section className="hero-event hero-event--orange hero-event--birthday" data-event-hero="">
      <div className="hero-event__scene" aria-hidden="true">
        {'\n        '}
        <img
          className="hero-event__character hero-event__character--boy"
          src="/img/events-hero/birthday/4.png"
          width="301"
          height="412"
          alt=""
          fetchPriority="high"
          decoding="async"
        />
        {'\n        '}
        <svg className="hero-event__line" viewBox="0 0 990 703" xmlns="http://www.w3.org/2000/svg">
          {'\n          '}
          <defs>
            {'\n            '}
            <mask id="birthday-line-reveal" maskUnits="userSpaceOnUse">
              {'\n              '}
              <path
                className="hero-event__line-path"
                d="M 590 320 C 540 400 320 555 170 610 C 100 645 65 625 65 585 C -12 482 114 316 291 195 C 452 78 604 35 746 66 C 929 101 970 254 885 420 C 817 554 703 631 593 631"
                pathLength="1"
                fill="none"
                stroke="white"
                strokeWidth="220"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              {'\n              '}
              <rect
                className="hero-event__line-finish"
                x="0"
                y="0"
                width="990"
                height="703"
                fill="white"
              ></rect>
              {'\n            '}
            </mask>
            {'\n          '}
          </defs>
          {'\n          '}
          <image
            href="/img/events-hero/birthday/line.png"
            width="990"
            height="703"
            mask="url(#birthday-line-reveal)"
          ></image>
          {'\n        '}
        </svg>
        {'\n        '}
        <img
          className="hero-event__character hero-event__character--girl"
          src="/img/events-hero/birthday/3.png"
          width="450"
          height="675"
          alt=""
          fetchPriority="high"
          decoding="async"
        />
        {'\n        '}
        <img
          className="hero-event__character hero-event__character--cake"
          src="/img/events-hero/birthday/2.png"
          width="334"
          height="361"
          alt=""
          decoding="async"
        />
        {'\n        '}
        <img
          className="hero-event__character hero-event__character--balloon"
          src="/img/events-hero/birthday/1.png"
          width="456"
          height="459"
          alt=""
          decoding="async"
        />
        {'\n      '}
      </div>
      <div className="hero-event__content container">
        <div className="hero-event__wrap">
          <h1 className="hero-event__title">
            <EventContentValue category="birthday" field="title">
              {'\n            '}
              <span>{'День рождения'}</span>
              {'\n            '}
              <span>{'в парке виртуальной'}</span>
              {'\n            '}
              <span>{'реальности'}</span>
              {'\n          '}
            </EventContentValue>
          </h1>
          <p className="hero-event__desc">
            <EventContentValue category="birthday" field="description">
              {
                '\n            Организуем запоминающееся мероприятие, в котором смогут принять участие и взрослые, и\n            дети!\n          '
              }
            </EventContentValue>
          </p>
          <ul className="hero-event__params">
            <EventHeroPrice category="birthday" />
            {'\n            '}

            {'\n            '}
            <EventParameters category="birthday" fallback={{ age: '6+' }} />
            {'\n          '}
          </ul>
        </div>
      </div>
      <EventHeroFooter icon="cake" />
    </section>
  );
}
