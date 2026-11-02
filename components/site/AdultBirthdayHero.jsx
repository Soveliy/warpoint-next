import { siteFields } from '../../lib/site-fields';

export default function AdultBirthdayHero({ site }) {
  const { local } = siteFields(site);
  return <section className="hero-event hero-event--orange hero-event--adult" data-event-hero="" data-event-line-src="/img/events-hero/adult_dr/line.svg" aria-labelledby="adult-birthday-title">
    <div className="hero-event__scene" aria-hidden="true">
      <svg className="hero-event__line" viewBox="0 0 902 601" xmlns="http://www.w3.org/2000/svg">
        <defs><mask id="adult-birthday-line-reveal" maskUnits="userSpaceOnUse" x="0" y="0" width="902" height="601">
          <path className="hero-event__line-path" d="M 470 310 C 360 250 270 360 165 400 C 35 465 -10 325 90 280 C 260 220 470 205 690 95 C 960 -40 925 205 800 340 C 650 495 430 600 285 535 C 220 510 200 435 165 400" pathLength="1" fill="none" stroke="white" strokeWidth="180" strokeLinecap="round" strokeLinejoin="round" />
          <rect className="hero-event__line-finish" width="902" height="601" fill="white" />
        </mask></defs>
        <image href="/img/events-hero/adult_dr/line.svg" width="902" height="601" mask="url(#adult-birthday-line-reveal)" />
      </svg>
      <img className="hero-event__character hero-event__character--adult-dog" src="/img/events-hero/adult_dr/baloon_dog.png" width="234" height="239" alt="" decoding="async" data-line-progress="0.52" />
      <img className="hero-event__character hero-event__character--adult-balloon-small" src="/img/events-hero/adult_dr/ballon_lit.png" width="149" height="149" alt="" decoding="async" data-line-progress="0.16" />
      <img className="hero-event__character hero-event__character--adult-w" src="/img/events-hero/adult_dr/ballon_w.png" width="449" height="436" alt="" decoding="async" data-line-progress="0.08" />
      <img className="hero-event__character hero-event__character--adult-woman" src="/img/events-hero/adult_dr/girl.png" width="609" height="849" alt="" fetchPriority="high" decoding="async" data-line-progress="0.36" />
      <img className="hero-event__character hero-event__character--adult-man" src="/img/events-hero/adult_dr/man.png" width="443" height="702" alt="" fetchPriority="high" decoding="async" data-line-progress="0.22" />
      <img className="hero-event__character hero-event__character--adult-balloon-big" src="/img/events-hero/adult_dr/ballon_big.png" width="263" height="317" alt="" decoding="async" data-line-progress="0.82" />
    </div>
    <div className="container hero-event__content"><div className="hero-event__wrap">
      <h1 className="hero-event__title" id="adult-birthday-title"><span>Взрослый день</span><span>рождения</span><span>в VR-парке</span></h1>
      <p className="hero-event__desc">Отметьте праздник с друзьями по-новому: командные VR-сражения, азарт и лаунж-зона для всей компании</p>
      <ul className="hero-event__params">
        {local && <li className="hero-event__param"><small>от</small>15 900 ₽</li>}
        <li className="hero-event__param">до 20 гостей</li>
      </ul>
    </div></div>
    <div className="container hero-event__adult-actions"><div className="hero-event__buttons">
      <button className="hero-event__request btn button-reset" type="button" aria-haspopup="dialog" aria-controls="event-request-modal" data-event-request-open=""><svg className="btn__icon" aria-hidden="true"><use href="/img/sprite.svg#icon-cake" /></svg>Оставить заявку</button>
      <button className="hero-event__calculate btn btn--outline button-reset" type="button" aria-haspopup="dialog" aria-controls="event-modal" data-event-modal-open=""><svg className="btn__icon" aria-hidden="true"><use href="/img/sprite.svg#icon-calc" /></svg>Рассчитать стоимость</button>
    </div></div>
  </section>;
}
