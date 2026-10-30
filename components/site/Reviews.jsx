import { siteFields } from '../../lib/site-fields';

export default function Reviews({ site }) {
  const fields = siteFields(site);
  return (
    <>
      <section
        className="reviews"
        id="reviews"
        data-header-theme="dark"
        aria-labelledby="reviews-title"
        data-reviews=""
      >
        {'\n  '}
        <div className="reviews__sticky">
          {'\n    '}
          <div className="reviews__intro">
            {'\n      '}
            <h2 className="reviews__title" id="reviews-title">
              {'Отзывы наших игроков'}
            </h2>
            {'\n      '}
            <p className="reviews__lead">
              {'Взгляните на реальные эмоции наших гостей и развейте все сомнения'}
            </p>
            {'\n\n      '}
            <aside
              className="reviews__score"
              aria-label="Средняя оценка гостей 5 из 5"
              data-review-score=""
            >
              {'\n        '}
              <div className="reviews__services">
                {'\n          '}
                <a
                  href="https://go.2gis.com/upU86"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="reviews__service"
                  data-review-link="2gis"
                >
                  {'\n            '}
                  <img
                    className="reviews__service-icon"
                    src="/img/2gis.png"
                    width="39"
                    height="39"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  {'\n            '}
                  <span className="reviews__service-name">{'2ГИС'}</span>
                  {'\n            '}
                  <span className="reviews__service-count">{'1798 отзывов'}</span>
                  {'\n          '}
                </a>
                {'\n\n          '}
                <a
                  href="https://yandex.ru/maps/-/CXaiu2k2"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="reviews__service"
                  data-review-link="yandex"
                >
                  {'\n            '}
                  <img
                    className="reviews__service-icon"
                    src="/img/ymaps.svg"
                    width="36"
                    height="44"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  {'\n            '}
                  <span className="reviews__service-name">{'Карты'}</span>
                  {'\n            '}
                  <span className="reviews__service-count">{'2 495 отзывов'}</span>
                  {'\n          '}
                </a>
                {'\n        '}
              </div>
              {'\n\n        '}
              <div className="reviews__rating">
                {'\n          '}
                <p className="reviews__rating-label">{'Средняя оценка наших гостей'}</p>
                {'\n\n          '}
                <svg
                  className="reviews__rating-value"
                  width="87"
                  height="60"
                  viewBox="0 0 87 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {'\n            '}
                  <path
                    d="M0 41.2397L13.8127 40.6612C13.8949 45.6198 15.4571 48.3471 17.9236 48.3471C20.7191 48.3471 22.1168 45.2893 22.1168 39.5868C22.1168 33.719 20.9657 30.5785 18.0058 30.5785C16.1148 30.5785 14.6349 31.9835 13.9771 35.2893L1.15106 33.8017L4.68645 1.07438H33.7918V12.562H14.9638L13.8949 21.5703C15.4571 20.0826 17.5125 19.2562 20.5546 19.2562C30.1742 19.2562 36.2584 26.6116 36.2584 39.3388C36.2584 51.9835 29.1876 60 18.0881 60C6.6597 60 0.657748 51.8182 0 41.2397Z"
                    fill="#F4F4F5"
                  ></path>
                  {'\n            '}
                  <path
                    d="M43.5707 59.9174C38.9664 59.9174 35.8421 56.6942 35.8421 52.0661C35.8421 47.438 38.9664 44.2149 43.5707 44.2149C48.0927 44.2149 51.2992 47.438 51.2992 52.0661C51.2992 56.6942 48.0927 59.9174 43.5707 59.9174Z"
                    fill="#F4F4F5"
                  ></path>
                  {'\n            '}
                  <path
                    d="M68.5008 60C56.1681 60 50.0017 49.0909 50.0017 29.9174C50.0017 10.8264 56.1681 0 68.5008 0C80.8336 0 87 10.8264 87 29.9174C87 49.0909 80.8336 60 68.5008 60ZM68.5008 48.1818C71.4607 48.1818 72.9406 44.7107 72.9406 29.9174C72.9406 15.3719 71.4607 11.8182 68.5008 11.8182C65.541 11.8182 64.061 15.3719 64.061 29.9174C64.061 44.7107 65.541 48.1818 68.5008 48.1818Z"
                    fill="#F4F4F5"
                  ></path>
                  {'\n          '}
                </svg>
                {'\n        '}
              </div>
              {'\n      '}
            </aside>
            {'\n    '}
          </div>
          {'\n\n    '}
          <div className="reviews__content">
            {'\n      '}
            <div className="reviews__carousel">
              {'\n        '}
              <div className="reviews__slider swiper" data-reviews-slider="">
                {'\n          '}
                <div className="swiper-wrapper">
                  {'\n            '}
                  <article className="reviews__card swiper-slide" data-review-card="">
                    {'\n              '}
                    <a
                      className="reviews__image-link"
                      href="/img/reviews/svetlana.png"
                      data-fancybox=""
                      aria-label="Прочитать отзыв: Светлана"
                    >
                      {'\n                '}
                      <img
                        src="/img/reviews/svetlana.png"
                        width="880"
                        height="1520"
                        alt="Светлана — отзыв на Яндекс Картах, оценка 5 из 5"
                        loading="lazy"
                        decoding="async"
                      />
                      {'\n              '}
                    </a>
                    {'\n            '}
                  </article>
                  {'\n            '}
                  <article className="reviews__card swiper-slide" data-review-card="">
                    {'\n              '}
                    <a
                      className="reviews__image-link"
                      href="/img/reviews/yulia-b.png"
                      data-fancybox=""
                      aria-label="Прочитать отзыв: Юлия Б."
                    >
                      {'\n                '}
                      <img
                        src="/img/reviews/yulia-b.png"
                        width="880"
                        height="1520"
                        alt="Юлия Б. — отзыв на Яндекс Картах, оценка 5 из 5"
                        loading="lazy"
                        decoding="async"
                      />
                      {'\n              '}
                    </a>
                    {'\n            '}
                  </article>
                  {'\n            '}
                  <article
                    className="reviews__card reviews__card--video swiper-slide"
                    data-review-card=""
                  >
                    {'\n              '}
                    <img
                      src="/img/reviews/ivan.jpg"
                      width="403"
                      height="716"
                      alt="Иван — именинник в Warpoint"
                      loading="lazy"
                      decoding="async"
                    />
                    {'\n              '}
                    <div className="reviews__card-top">
                      {'\n                '}
                      <div className="reviews__card-info">
                        {'\n                  '}
                        <div className="reviews__card-name">{'Иван'}</div>
                        {'\n                  '}
                        <div className="reviews__card-place">{'Именинник'}</div>
                        {'\n                '}
                      </div>
                      {'\n              '}
                    </div>
                    {'\n              '}
                    <button
                      className="play-button play-button--centered"
                      type="button"
                      aria-label="Смотреть видеоотзыв Ивана"
                      data-review-video=""
                      data-aspect-ratio="9 / 16"
                      data-width="1080"
                      data-height="1920"
                    >
                      {'\n                '}
                      <svg className="play-button__icon" aria-hidden="true">
                        <use href="/img/sprite.svg#icon-play"></use>
                      </svg>
                      {'\n              '}
                    </button>
                    {'\n            '}
                  </article>
                  {'\n            '}
                  <article className="reviews__card swiper-slide" data-review-card="">
                    {'\n              '}
                    <a
                      className="reviews__image-link"
                      href="/img/reviews/artem-n.png"
                      data-fancybox=""
                      aria-label="Прочитать отзыв: Артем Н."
                    >
                      {'\n                '}
                      <img
                        src="/img/reviews/artem-n.png"
                        width="880"
                        height="1520"
                        alt="Артем Н. — отзыв на Яндекс Картах, оценка 5 из 5"
                        loading="lazy"
                        decoding="async"
                      />
                      {'\n              '}
                    </a>
                    {'\n            '}
                  </article>
                  {'\n            '}
                  <article className="reviews__card swiper-slide" data-review-card="">
                    {'\n              '}
                    <a
                      className="reviews__image-link"
                      href="/img/reviews/alina-b.png"
                      data-fancybox=""
                      aria-label="Прочитать отзыв: Алина Б."
                    >
                      {'\n                '}
                      <img
                        src="/img/reviews/alina-b.png"
                        width="880"
                        height="1520"
                        alt="Алина Б. — отзыв на Яндекс Картах, оценка 5 из 5"
                        loading="lazy"
                        decoding="async"
                      />
                      {'\n              '}
                    </a>
                    {'\n            '}
                  </article>
                  {'\n            '}
                  <article className="reviews__card swiper-slide" data-review-card="">
                    {'\n              '}
                    <a
                      className="reviews__image-link"
                      href="/img/reviews/alena-d.png"
                      data-fancybox=""
                      aria-label="Прочитать отзыв: Алёна Д."
                    >
                      {'\n                '}
                      <img
                        src="/img/reviews/alena-d.png"
                        width="880"
                        height="1520"
                        alt="Алёна Д. — отзыв на Яндекс Картах, оценка 5 из 5"
                        loading="lazy"
                        decoding="async"
                      />
                      {'\n              '}
                    </a>
                    {'\n            '}
                  </article>
                  {'\n            '}
                  <article className="reviews__card swiper-slide" data-review-card="">
                    {'\n              '}
                    <a
                      className="reviews__image-link"
                      href="/img/reviews/alexandra-o.png"
                      data-fancybox=""
                      aria-label="Прочитать отзыв: Александра О."
                    >
                      {'\n                '}
                      <img
                        src="/img/reviews/alexandra-o.png"
                        width="880"
                        height="1520"
                        alt="Александра О. — отзыв на Яндекс Картах, оценка 5 из 5"
                        loading="lazy"
                        decoding="async"
                      />
                      {'\n              '}
                    </a>
                    {'\n            '}
                  </article>
                  {'\n            '}
                  <article className="reviews__card swiper-slide" data-review-card="">
                    {'\n              '}
                    <a
                      className="reviews__image-link"
                      href="/img/reviews/valeriy-p.png"
                      data-fancybox=""
                      aria-label="Прочитать отзыв: Валерий П."
                    >
                      {'\n                '}
                      <img
                        src="/img/reviews/valeriy-p.png"
                        width="880"
                        height="1520"
                        alt="Валерий П. — отзыв на Яндекс Картах, оценка 5 из 5"
                        loading="lazy"
                        decoding="async"
                      />
                      {'\n              '}
                    </a>
                    {'\n            '}
                  </article>
                  {'\n            '}
                  <article className="reviews__card swiper-slide" data-review-card="">
                    {'\n              '}
                    <a
                      className="reviews__image-link"
                      href="/img/reviews/darya.png"
                      data-fancybox=""
                      aria-label="Прочитать отзыв: Дарья"
                    >
                      {'\n                '}
                      <img
                        src="/img/reviews/darya.png"
                        width="880"
                        height="1520"
                        alt="Дарья — отзыв на Яндекс Картах, оценка 5 из 5"
                        loading="lazy"
                        decoding="async"
                      />
                      {'\n              '}
                    </a>
                    {'\n            '}
                  </article>
                  {'\n            '}
                  <article className="reviews__card swiper-slide" data-review-card="">
                    {'\n              '}
                    <a
                      className="reviews__image-link"
                      href="/img/reviews/eseniya-l.png"
                      data-fancybox=""
                      aria-label="Прочитать отзыв: Есения Л."
                    >
                      {'\n                '}
                      <img
                        src="/img/reviews/eseniya-l.png"
                        width="880"
                        height="1520"
                        alt="Есения Л. — отзыв на Яндекс Картах, оценка 5 из 5"
                        loading="lazy"
                        decoding="async"
                      />
                      {'\n              '}
                    </a>
                    {'\n            '}
                  </article>
                  {'\n            '}
                  <article className="reviews__card swiper-slide" data-review-card="">
                    {'\n              '}
                    <a
                      className="reviews__image-link"
                      href="/img/reviews/ekaterina-k.png"
                      data-fancybox=""
                      aria-label="Прочитать отзыв: Екатерина К."
                    >
                      {'\n                '}
                      <img
                        src="/img/reviews/ekaterina-k.png"
                        width="880"
                        height="1520"
                        alt="Екатерина К. — отзыв на Яндекс Картах, оценка 5 из 5"
                        loading="lazy"
                        decoding="async"
                      />
                      {'\n              '}
                    </a>
                    {'\n            '}
                  </article>
                  {'\n            '}
                  <article className="reviews__card swiper-slide" data-review-card="">
                    {'\n              '}
                    <a
                      className="reviews__image-link"
                      href="/img/reviews/elizaveta-e.png"
                      data-fancybox=""
                      aria-label="Прочитать отзыв: Елизавета Е."
                    >
                      {'\n                '}
                      <img
                        src="/img/reviews/elizaveta-e.png"
                        width="880"
                        height="1520"
                        alt="Елизавета Е. — отзыв на Яндекс Картах, оценка 5 из 5"
                        loading="lazy"
                        decoding="async"
                      />
                      {'\n              '}
                    </a>
                    {'\n            '}
                  </article>
                  {'\n            '}
                  <article className="reviews__card swiper-slide" data-review-card="">
                    {'\n              '}
                    <a
                      className="reviews__image-link"
                      href="/img/reviews/evgeniya-l.png"
                      data-fancybox=""
                      aria-label="Прочитать отзыв: Евгения Л."
                    >
                      {'\n                '}
                      <img
                        src="/img/reviews/evgeniya-l.png"
                        width="880"
                        height="1520"
                        alt="Евгения Л. — отзыв на Яндекс Картах, оценка 5 из 5"
                        loading="lazy"
                        decoding="async"
                      />
                      {'\n              '}
                    </a>
                    {'\n            '}
                  </article>
                  {'\n          '}
                </div>
                {'\n          '}
                <div className="reviews__controls slider-controls">
                  {'\n            '}
                  <button
                    className="slider-arrow slider-arrow--prev button-reset"
                    type="button"
                    aria-label="Предыдущий отзыв"
                    data-review-prev=""
                  >
                    {'\n              '}
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      {'\n                '}
                      <path d="m9 5 7 7-7 7"></path>
                      {'\n              '}
                    </svg>
                    {'\n            '}
                  </button>
                  {'\n            '}
                  <button
                    className="slider-arrow slider-arrow--next button-reset"
                    type="button"
                    aria-label="Следующий отзыв"
                    data-review-next=""
                  >
                    {'\n              '}
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      {'\n                '}
                      <path d="m9 5 7 7-7 7"></path>
                      {'\n              '}
                    </svg>
                    {'\n            '}
                  </button>
                  {'\n          '}
                </div>
                {'\n        '}
              </div>
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
