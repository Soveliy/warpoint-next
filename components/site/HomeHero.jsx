import { siteFields } from '../../lib/site-fields';
import Announcement from './Announcement';

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
              {'Сеть клубов виртуальной реальности '}
              <span className="hero__city">
                {fields.local ? 'в Екатеринбурге' : `в г. ${site.city}`}
              </span>
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
            <Announcement />
            <div className="allert">
              {'\n            '}
              <div className="allert__row">
                {'\n              '}
                <div className="allert__pic">
                  {'\n                '}
                  <img src="/img/ypoint.png" alt="" />
                  {'\n              '}
                </div>
                {'\n              '}
                <div className="allert__content">
                  {'\n                '}
                  <div className="allert__title">{'5.0'}</div>
                  {'\n                '}
                  <div className="allert__desc">
                    {
                      '\n                  Средняя оценка наших гостей на основании 2048 отзывов\n                '
                    }
                  </div>
                  {'\n              '}
                </div>
                {'\n            '}
              </div>
              {'\n          '}
            </div>
            {'\n        '}
          </div>
          {'\n      '}
        </div>
        {'\n    '}
      </div>
    </>
  );
}
