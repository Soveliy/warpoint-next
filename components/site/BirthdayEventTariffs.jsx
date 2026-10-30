import { siteFields } from '../../lib/site-fields';

export default function BirthdayEventTariffs({ site }) {
  const fields = siteFields(site);
  return (
    <>
      <section
        className="event-tariffs"
        id="event-tariffs"
        aria-labelledby="event-tariffs-title"
        data-header-theme="brand"
        data-slider-root=""
        data-tariff-context="birthday"
      >
        {'\n  '}
        <div className="container">
          {'\n    '}
          <div className="event-tariffs__head section-head section-head--center" data-reveal="">
            {'\n      '}
            <h2 className="section-head__title" id="event-tariffs-title">
              {'\n        Тарифы на '}
              <br />
              <span>{'день рождения'}</span>
              {'\n      '}
            </h2>
            {'\n    '}
          </div>
          {'\n    '}
          <div className="event-tariffs__track" data-reveal="">
            {'\n      '}
            <div
              className="event-tariffs__slider swiper"
              data-slider=""
              data-event-tariffs-slider=""
            >
              {'\n        '}
              <div className="swiper-wrapper">
                {'\n          '}
                <article className="event-tariffs__card swiper-slide">
                  {'\n            '}
                  <div className="event-tariffs__card-tags">
                    {'\n              '}
                    <span>{'1ч 45 мин'}</span>
                    <span>{'До 8 человек'}</span>
                    {'\n            '}
                  </div>
                  {'\n            '}
                  <h3 className="event-tariffs__card-title">{'Тариф «Старт»'}</h3>
                  {'\n            '}
                  <p className="event-tariffs__card-description">
                    {
                      '\n              Тариф для небольших компаний. Большой выбор VR-игр — каждый найдёт себе развлечение по\n              вкусу!\n            '
                    }
                  </p>
                  {'\n            '}
                  <dl className="event-tariffs__card-prices">
                    {'\n              '}
                    <div>
                      {'\n                '}
                      <dt>{'Пн–Чт'}</dt>
                      {'\n                '}
                      <dd>{fields.local ? '22 900 ₽' : 'По запросу'}</dd>
                      {'\n              '}
                    </div>
                    {'\n              '}
                    <div>
                      {'\n                '}
                      <dt>
                        {'Пт–Вс '}
                        <small>{'и праздники'}</small>
                      </dt>
                      {'\n                '}
                      <dd>{fields.local ? '26 900 ₽' : 'По запросу'}</dd>
                      {'\n              '}
                    </div>
                    {'\n            '}
                  </dl>
                  {'\n            '}
                  <div className="event-tariffs__card-actions">
                    {'\n              '}
                    {fields.local ? (
                      <button
                        className="event-tariffs__card-more"
                        type="button"
                        aria-haspopup="dialog"
                        aria-controls="tariff-modal"
                        data-tariff-open="start"
                      >
                        {'\n                Подробнее\n              '}
                      </button>
                    ) : (
                      <a className="event-tariffs__card-more" href={fields.booking}>
                        {'\n                Подробнее\n              '}
                      </a>
                    )}
                    {'\n              '}
                    <button
                      className="event-tariffs__card-request btn btn--red"
                      type="button"
                      aria-haspopup="dialog"
                      aria-controls="event-request-modal"
                      data-event-request-open=""
                    >
                      {'\n                Оставить заявку\n              '}
                    </button>
                    {'\n            '}
                  </div>
                  {'\n          '}
                </article>
                {'\n          '}
                <article className="event-tariffs__card swiper-slide">
                  {'\n            '}
                  <div className="event-tariffs__card-tags">
                    {'\n              '}
                    <span>{'1ч 45 мин'}</span>
                    <span>{'До 10 человек'}</span>
                    {'\n            '}
                  </div>
                  {'\n            '}
                  <h3 className="event-tariffs__card-title">{'Тариф «Базовый»'}</h3>
                  {'\n            '}
                  <p className="event-tariffs__card-description">
                    {
                      '\n              Откройте для себя мир виртуальной реальности вместе с нашим стартовым пакетом, который\n              отлично подходит для небольших компаний.\n            '
                    }
                  </p>
                  {'\n            '}
                  <dl className="event-tariffs__card-prices">
                    {'\n              '}
                    <div>
                      {'\n                '}
                      <dt>{'Пн–Чт'}</dt>
                      {'\n                '}
                      <dd>{fields.local ? '27 900 ₽' : 'По запросу'}</dd>
                      {'\n              '}
                    </div>
                    {'\n              '}
                    <div>
                      {'\n                '}
                      <dt>
                        {'Пт–Вс '}
                        <small>{'и праздники'}</small>
                      </dt>
                      {'\n                '}
                      <dd>{fields.local ? '31 900 ₽' : 'По запросу'}</dd>
                      {'\n              '}
                    </div>
                    {'\n            '}
                  </dl>
                  {'\n            '}
                  <div className="event-tariffs__card-actions">
                    {'\n              '}
                    {fields.local ? (
                      <button
                        className="event-tariffs__card-more"
                        type="button"
                        aria-haspopup="dialog"
                        aria-controls="tariff-modal"
                        data-tariff-open="basic"
                      >
                        {'\n                Подробнее\n              '}
                      </button>
                    ) : (
                      <a className="event-tariffs__card-more" href={fields.booking}>
                        {'\n                Подробнее\n              '}
                      </a>
                    )}
                    {'\n              '}
                    <button
                      className="event-tariffs__card-request btn btn--red"
                      type="button"
                      aria-haspopup="dialog"
                      aria-controls="event-request-modal"
                      data-event-request-open=""
                    >
                      {'\n                Оставить заявку\n              '}
                    </button>
                    {'\n            '}
                  </div>
                  {'\n          '}
                </article>
                {'\n          '}
                <article className="event-tariffs__card event-tariffs__card--popular swiper-slide">
                  {'\n            '}
                  <div className="event-tariffs__card-popular-icon-container">
                    {'\n              '}
                    <svg className="event-tariffs__card-popular-icon" aria-hidden="true">
                      {'\n                '}
                      <use href="/img/sprite.svg#icon-fire"></use>
                      {'\n              '}
                    </svg>
                    {'\n            '}
                  </div>
                  {'\n\n            '}
                  <div className="event-tariffs__card-tags">
                    {'\n              '}
                    <span>{'1ч 45 мин'}</span>
                    <span>{'До 8 человек'}</span>
                    {'\n            '}
                  </div>
                  {'\n            '}
                  <h3 className="event-tariffs__card-title">{'Тариф «Стандарт»'}</h3>
                  {'\n            '}
                  <p className="event-tariffs__card-description">
                    {
                      '\n              Самый популярный тариф в нашей линейке — для тех, кто хочет отправиться в путешествие\n              по виртуальным мирам по полной!\n            '
                    }
                  </p>
                  {'\n            '}
                  <dl className="event-tariffs__card-prices">
                    {'\n              '}
                    <div>
                      {'\n                '}
                      <dt>{'Пн–Чт'}</dt>
                      {'\n                '}
                      <dd>{fields.local ? '40 900 ₽' : 'По запросу'}</dd>
                      {'\n              '}
                    </div>
                    {'\n              '}
                    <div>
                      {'\n                '}
                      <dt>
                        {'Пт–Вс '}
                        <small>{'и праздники'}</small>
                      </dt>
                      {'\n                '}
                      <dd>{fields.local ? '45 900 ₽' : 'По запросу'}</dd>
                      {'\n              '}
                    </div>
                    {'\n            '}
                  </dl>
                  {'\n            '}
                  <div className="event-tariffs__card-actions">
                    {'\n              '}
                    {fields.local ? (
                      <button
                        className="event-tariffs__card-more"
                        type="button"
                        aria-haspopup="dialog"
                        aria-controls="tariff-modal"
                        data-tariff-open="standard"
                      >
                        {'\n                Подробнее\n              '}
                      </button>
                    ) : (
                      <a className="event-tariffs__card-more" href={fields.booking}>
                        {'\n                Подробнее\n              '}
                      </a>
                    )}
                    {'\n              '}
                    <button
                      className="event-tariffs__card-request btn btn--red"
                      type="button"
                      aria-haspopup="dialog"
                      aria-controls="event-request-modal"
                      data-event-request-open=""
                    >
                      {'\n                Оставить заявку\n              '}
                    </button>
                    {'\n            '}
                  </div>
                  {'\n          '}
                </article>
                {'\n        '}
              </div>
              {'\n      '}
            </div>
            {'\n      '}
            <div className="event-tariffs__controls">
              {'\n        '}
              <button
                className="event-tariffs__arrow button-reset"
                type="button"
                aria-label="Предыдущий тариф"
                data-slider-prev=""
              >
                {'\n          '}
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  {'\n            '}
                  <path d="m15 4-8 8 8 8"></path>
                  {'\n          '}
                </svg>
                {'\n        '}
              </button>
              {'\n        '}
              <button
                className="event-tariffs__arrow button-reset"
                type="button"
                aria-label="Следующий тариф"
                data-slider-next=""
              >
                {'\n          '}
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  {'\n            '}
                  <path d="m9 4 8 8-8 8"></path>
                  {'\n          '}
                </svg>
                {'\n        '}
              </button>
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
