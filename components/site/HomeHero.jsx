import GoodPlaceBadge from './GoodPlaceBadge';
import HomeHeroDescription from './HomeHeroDescription';
import { siteFields } from '../../lib/site-fields';

export default function HomeHero({ site }) {
  const fields = siteFields(site);
  return (
    <>
      <div className="hero" data-header-theme="brand">
        {'\n      '}
        <picture className="hero__picture">
          {'\n        '}
          <source srcSet="/img/hero_mob.jpg" media="(max-width: 800px)" />
          {'\n        '}
          <img className="hero__image" src="/img/hero_desk.jpg" width="1508" height="978" alt="" />
          {'\n      '}
        </picture>
        {'\n      '}
        <div className="hero__content container">
          {'\n        '}
          <div className="hero__wrap">
            {'\n          '}
            <div className="hero__pretitle">
              <HomeHeroDescription>
                {'Сеть клубов виртуальной реальности '}
                <span className="hero__city">
                  {fields.local ? 'в Екатеринбурге' : `в г. ${site.city}`}
                </span>
              </HomeHeroDescription>
              {'\n          '}
            </div>
            {'\n          '}
            <h1 className="hero__title">
              {'\n            Путешествуйте по виртуальным мирам вместе с '}
              <span>{'warpoint'}</span>
              {'\n          '}
            </h1>
            {'\n          '}
            <div className="hero__buttons">
              {'\n            '}
              <a className="btn btn--red button-reset" href={fields.booking} data-booking-open="">
                {'\n              '}
                <svg className="btn__icon" aria-hidden="true">
                  {'\n                '}
                  <use href="/img/sprite.svg#icon-game"></use>
                  {'\n              '}
                </svg>
                {'\n              забронировать игру\n            '}
              </a>
              {'\n            '}
              <button
                className="btn btn--purple button-reset"
                type="button"
                aria-haspopup="dialog"
                aria-controls="event-modal"
                data-event-modal-open=""
              >
                {'\n              '}
                <svg className="btn__icon" aria-hidden="true">
                  {'\n                '}
                  <use href="/img/sprite.svg#icon-calendar"></use>
                  {'\n              '}
                </svg>
                {'\n              провести мероприятие\n            '}
              </button>
              {'\n          '}
            </div>
            {'\n        '}
          </div>
          {'\n        '}
          <div className="hero__allerts allerts">
            {'\n          '}
            <GoodPlaceBadge />
            {'\n        '}
          </div>
          {'\n      '}
        </div>
        {'\n    '}
      </div>
    </>
  );
}
