import { siteFields } from '../../lib/site-fields';

export default function HomeBloggers({ site }) {
  const fields = siteFields(site);
  return (
    <>
      <section
        className="bloggers"
        data-header-theme="dark"
        aria-labelledby="bloggers-title"
        data-slider-root=""
      >
        {'\n  '}
        <h2 className="bloggers__title" id="bloggers-title">
          {'Блогеры играют'}
          <br />
          {'в Warpoint'}
        </h2>
        {'\n\n  '}
        <div className="bloggers__slider swiper" data-slider="" data-bloggers-slider="">
          {'\n    '}
          <div className="swiper-wrapper">
            {'\n      '}
            <article className="bloggers__slide swiper-slide">
              {'\n        '}
              <div className="bloggers__media">
                {'\n          '}
                <div className="bloggers__preview">
                  {'\n            '}
                  <img
                    className="bloggers__image"
                    src="/img/bloggers/wylsacom_1.jpeg"
                    width="1280"
                    height="720"
                    alt="Wylsacom играет в Warpoint"
                    loading="lazy"
                    decoding="async"
                  />
                  {'\n            '}
                  <button
                    className="play-button play-button--centered"
                    type="button"
                    aria-label="Смотреть видео: Wylsacom"
                    data-blogger-video="https://www.youtube.com/watch?v=0kLFbWBNggs"
                  >
                    {'\n              '}
                    <svg className="play-button__icon" aria-hidden="true">
                      <use href="/img/sprite.svg#icon-play"></use>
                    </svg>
                    {'\n            '}
                  </button>
                  {'\n          '}
                </div>
                {'\n          '}
                <div className="bloggers__info">
                  {'\n            '}
                  <div className="bloggers__info-item-content">
                    {'\n              '}
                    <div className="bloggers__info-item-name">{'Wylsacom'}</div>
                    {'\n              '}
                    <div className="bloggers__info-item-type">{'Блогер'}</div>
                    {'\n            '}
                  </div>
                  {'\n            '}
                  <div className="bloggers__info-item bloggers__info-item--subscribers">
                    {'\n              '}
                    <span className="bloggers__subscribers-icon" aria-hidden="true">
                      <svg>
                        <use href="/img/sprite.svg#icon-subscribers"></use>
                      </svg>
                    </span>
                    {'\n              '}
                    <div className="bloggers__info-item-content">
                      {'\n                '}
                      <div className="bloggers__info-item-name">
                        {'11,5+ '}
                        <small>{'млн'}</small>
                      </div>
                      {'\n                '}
                      <div className="bloggers__info-item-type">{'подписчиков'}</div>
                      {'\n              '}
                    </div>
                    {'\n            '}
                  </div>
                  {'\n          '}
                </div>
                {'\n        '}
              </div>
              {'\n      '}
            </article>
            {'\n      '}
            <article className="bloggers__slide swiper-slide">
              {'\n        '}
              <div className="bloggers__media">
                {'\n          '}
                <div className="bloggers__preview">
                  {'\n            '}
                  <img
                    className="bloggers__image"
                    src="/img/bloggers/Bulkin.jpg"
                    width="1280"
                    height="720"
                    alt="Bulkin играет в Warpoint"
                    loading="lazy"
                    decoding="async"
                  />
                  {'\n            '}
                  <button
                    className="play-button play-button--centered"
                    type="button"
                    aria-label="Смотреть видео: Bulkin"
                    data-blogger-video="https://www.youtube.com/watch?v=7O74OFyElXc"
                  >
                    {'\n              '}
                    <svg className="play-button__icon" aria-hidden="true">
                      <use href="/img/sprite.svg#icon-play"></use>
                    </svg>
                    {'\n            '}
                  </button>
                  {'\n          '}
                </div>
                {'\n          '}
                <div className="bloggers__info">
                  {'\n            '}
                  <div className="bloggers__info-item-content">
                    {'\n              '}
                    <div className="bloggers__info-item-name">{'Bulkin'}</div>
                    {'\n              '}
                    <div className="bloggers__info-item-type">{'Блогер'}</div>
                    {'\n            '}
                  </div>
                  {'\n            '}
                  <div className="bloggers__info-item bloggers__info-item--subscribers">
                    {'\n              '}
                    <span className="bloggers__subscribers-icon" aria-hidden="true">
                      <svg>
                        <use href="/img/sprite.svg#icon-subscribers"></use>
                      </svg>
                    </span>
                    {'\n              '}
                    <div className="bloggers__info-item-content">
                      {'\n                '}
                      <div className="bloggers__info-item-name">
                        {'5+ '}
                        <small>{'млн'}</small>
                      </div>
                      {'\n                '}
                      <div className="bloggers__info-item-type">{'подписчиков'}</div>
                      {'\n              '}
                    </div>
                    {'\n            '}
                  </div>
                  {'\n          '}
                </div>
                {'\n        '}
              </div>
              {'\n      '}
            </article>
            {'\n      '}
            <article className="bloggers__slide swiper-slide">
              {'\n        '}
              <div className="bloggers__media">
                {'\n          '}
                <div className="bloggers__preview">
                  {'\n            '}
                  <img
                    className="bloggers__image"
                    src="/img/bloggers/Buster.jpg"
                    width="1280"
                    height="720"
                    alt="Бустер играет в Warpoint"
                    loading="lazy"
                    decoding="async"
                  />
                  {'\n            '}
                  <button
                    className="play-button play-button--centered"
                    type="button"
                    aria-label="Смотреть видео: Бустер"
                    data-blogger-video="https://www.youtube.com/watch?v=Taa8ZLcxXGI"
                  >
                    {'\n              '}
                    <svg className="play-button__icon" aria-hidden="true">
                      <use href="/img/sprite.svg#icon-play"></use>
                    </svg>
                    {'\n            '}
                  </button>
                  {'\n          '}
                </div>
                {'\n          '}
                <div className="bloggers__info">
                  {'\n            '}
                  <div className="bloggers__info-item-content">
                    {'\n              '}
                    <div className="bloggers__info-item-name">{'Бустер'}</div>
                    {'\n              '}
                    <div className="bloggers__info-item-type">{'Блогер'}</div>
                    {'\n            '}
                  </div>
                  {'\n            '}
                  <div className="bloggers__info-item bloggers__info-item--subscribers">
                    {'\n              '}
                    <span className="bloggers__subscribers-icon" aria-hidden="true">
                      <svg>
                        <use href="/img/sprite.svg#icon-subscribers"></use>
                      </svg>
                    </span>
                    {'\n              '}
                    <div className="bloggers__info-item-content">
                      {'\n                '}
                      <div className="bloggers__info-item-name">
                        {'3,7+ '}
                        <small>{'млн'}</small>
                      </div>
                      {'\n                '}
                      <div className="bloggers__info-item-type">{'подписчиков'}</div>
                      {'\n              '}
                    </div>
                    {'\n            '}
                  </div>
                  {'\n          '}
                </div>
                {'\n        '}
              </div>
              {'\n      '}
            </article>
            {'\n      '}
            <article className="bloggers__slide swiper-slide">
              {'\n        '}
              <div className="bloggers__media">
                {'\n          '}
                <div className="bloggers__preview">
                  {'\n            '}
                  <img
                    className="bloggers__image"
                    src="/img/bloggers/Recrent.jpg"
                    width="1280"
                    height="720"
                    alt="Recrent играет в Warpoint"
                    loading="lazy"
                    decoding="async"
                  />
                  {'\n            '}
                  <button
                    className="play-button play-button--centered"
                    type="button"
                    aria-label="Смотреть видео: Recrent"
                    data-blogger-video="https://www.youtube.com/watch?v=vP_Q2rE7ffc"
                  >
                    {'\n              '}
                    <svg className="play-button__icon" aria-hidden="true">
                      <use href="/img/sprite.svg#icon-play"></use>
                    </svg>
                    {'\n            '}
                  </button>
                  {'\n          '}
                </div>
                {'\n          '}
                <div className="bloggers__info">
                  {'\n            '}
                  <div className="bloggers__info-item-content">
                    {'\n              '}
                    <div className="bloggers__info-item-name">{'Recrent'}</div>
                    {'\n              '}
                    <div className="bloggers__info-item-type">{'Блогер'}</div>
                    {'\n            '}
                  </div>
                  {'\n            '}
                  <div className="bloggers__info-item bloggers__info-item--subscribers">
                    {'\n              '}
                    <span className="bloggers__subscribers-icon" aria-hidden="true">
                      <svg>
                        <use href="/img/sprite.svg#icon-subscribers"></use>
                      </svg>
                    </span>
                    {'\n              '}
                    <div className="bloggers__info-item-content">
                      {'\n                '}
                      <div className="bloggers__info-item-name">
                        {'1,2+ '}
                        <small>{'млн'}</small>
                      </div>
                      {'\n                '}
                      <div className="bloggers__info-item-type">{'подписчиков'}</div>
                      {'\n              '}
                    </div>
                    {'\n            '}
                  </div>
                  {'\n          '}
                </div>
                {'\n        '}
              </div>
              {'\n      '}
            </article>
            {'\n      '}
            <article className="bloggers__slide swiper-slide">
              {'\n        '}
              <div className="bloggers__media">
                {'\n          '}
                <div className="bloggers__preview">
                  {'\n            '}
                  <img
                    className="bloggers__image"
                    src="/img/bloggers/warpatch.jpg"
                    width="1280"
                    height="720"
                    alt="TheWarpath играет в Warpoint"
                    loading="lazy"
                    decoding="async"
                  />
                  {'\n            '}
                  <button
                    className="play-button play-button--centered"
                    type="button"
                    aria-label="Смотреть видео: TheWarpath"
                    data-blogger-video="https://www.youtube.com/watch?v=_e4OFq06zZU"
                  >
                    {'\n              '}
                    <svg className="play-button__icon" aria-hidden="true">
                      <use href="/img/sprite.svg#icon-play"></use>
                    </svg>
                    {'\n            '}
                  </button>
                  {'\n          '}
                </div>
                {'\n          '}
                <div className="bloggers__info">
                  {'\n            '}
                  <div className="bloggers__info-item-content">
                    {'\n              '}
                    <div className="bloggers__info-item-name">{'TheWarpath'}</div>
                    {'\n              '}
                    <div className="bloggers__info-item-type">{'Блогер'}</div>
                    {'\n            '}
                  </div>
                  {'\n            '}
                  <div className="bloggers__info-item bloggers__info-item--subscribers">
                    {'\n              '}
                    <span className="bloggers__subscribers-icon" aria-hidden="true">
                      <svg>
                        <use href="/img/sprite.svg#icon-subscribers"></use>
                      </svg>
                    </span>
                    {'\n              '}
                    <div className="bloggers__info-item-content">
                      {'\n                '}
                      <div className="bloggers__info-item-name">
                        {'4,5+ '}
                        <small>{'млн'}</small>
                      </div>
                      {'\n                '}
                      <div className="bloggers__info-item-type">{'подписчиков'}</div>
                      {'\n              '}
                    </div>
                    {'\n            '}
                  </div>
                  {'\n          '}
                </div>
                {'\n        '}
              </div>
              {'\n      '}
            </article>
            {'\n      '}
            <article className="bloggers__slide swiper-slide">
              {'\n        '}
              <div className="bloggers__media">
                {'\n          '}
                <div className="bloggers__preview">
                  {'\n            '}
                  <img
                    className="bloggers__image"
                    src="/img/bloggers/duches.jpg"
                    width="1280"
                    height="720"
                    alt="Дюшес Games играет в Warpoint"
                    loading="lazy"
                    decoding="async"
                  />
                  {'\n            '}
                  <button
                    className="play-button play-button--centered"
                    type="button"
                    aria-label="Смотреть видео: Дюшес Games"
                    data-blogger-video="https://www.youtube.com/watch?v=N1QjAugh95k"
                  >
                    {'\n              '}
                    <svg className="play-button__icon" aria-hidden="true">
                      <use href="/img/sprite.svg#icon-play"></use>
                    </svg>
                    {'\n            '}
                  </button>
                  {'\n          '}
                </div>
                {'\n          '}
                <div className="bloggers__info">
                  {'\n            '}
                  <div className="bloggers__info-item-content">
                    {'\n              '}
                    <div className="bloggers__info-item-name">{'Дюшес Games'}</div>
                    {'\n              '}
                    <div className="bloggers__info-item-type">{'Блогер'}</div>
                    {'\n            '}
                  </div>
                  {'\n            '}
                  <div className="bloggers__info-item bloggers__info-item--subscribers">
                    {'\n              '}
                    <span className="bloggers__subscribers-icon" aria-hidden="true">
                      <svg>
                        <use href="/img/sprite.svg#icon-subscribers"></use>
                      </svg>
                    </span>
                    {'\n              '}
                    <div className="bloggers__info-item-content">
                      {'\n                '}
                      <div className="bloggers__info-item-name">
                        {'1 '}
                        <small>{'млн'}</small>
                      </div>
                      {'\n                '}
                      <div className="bloggers__info-item-type">{'подписчиков'}</div>
                      {'\n              '}
                    </div>
                    {'\n            '}
                  </div>
                  {'\n          '}
                </div>
                {'\n        '}
              </div>
              {'\n      '}
            </article>
            {'\n      '}
            <article className="bloggers__slide swiper-slide">
              {'\n        '}
              <div className="bloggers__media">
                {'\n          '}
                <div className="bloggers__preview">
                  {'\n            '}
                  <img
                    className="bloggers__image"
                    src="/img/bloggers/granatka.jpg"
                    width="1280"
                    height="720"
                    alt="Гранатка играет в Warpoint"
                    loading="lazy"
                    decoding="async"
                  />
                  {'\n            '}
                  <button
                    className="play-button play-button--centered"
                    type="button"
                    aria-label="Смотреть видео: Гранатка"
                    data-blogger-video="https://www.youtube.com/watch?v=nNEsUetJ9OM"
                  >
                    {'\n              '}
                    <svg className="play-button__icon" aria-hidden="true">
                      <use href="/img/sprite.svg#icon-play"></use>
                    </svg>
                    {'\n            '}
                  </button>
                  {'\n          '}
                </div>
                {'\n          '}
                <div className="bloggers__info">
                  {'\n            '}
                  <div className="bloggers__info-item-content">
                    {'\n              '}
                    <div className="bloggers__info-item-name">{'Гранатка'}</div>
                    {'\n              '}
                    <div className="bloggers__info-item-type">{'Блогер'}</div>
                    {'\n            '}
                  </div>
                  {'\n            '}
                  <div className="bloggers__info-item bloggers__info-item--subscribers">
                    {'\n              '}
                    <span className="bloggers__subscribers-icon" aria-hidden="true">
                      <svg>
                        <use href="/img/sprite.svg#icon-subscribers"></use>
                      </svg>
                    </span>
                    {'\n              '}
                    <div className="bloggers__info-item-content">
                      {'\n                '}
                      <div className="bloggers__info-item-name">
                        {'800 '}
                        <small>{'тыс.'}</small>
                      </div>
                      {'\n                '}
                      <div className="bloggers__info-item-type">{'подписчиков'}</div>
                      {'\n              '}
                    </div>
                    {'\n            '}
                  </div>
                  {'\n          '}
                </div>
                {'\n        '}
              </div>
              {'\n      '}
            </article>
            {'\n      '}
            <article className="bloggers__slide swiper-slide">
              {'\n        '}
              <div className="bloggers__media">
                {'\n          '}
                <div className="bloggers__preview">
                  {'\n            '}
                  <img
                    className="bloggers__image"
                    src="/img/bloggers/wylsacom2.png"
                    width="1280"
                    height="720"
                    alt="Wylsacom играет в Warpoint"
                    loading="lazy"
                    decoding="async"
                  />
                  {'\n            '}
                  <button
                    className="play-button play-button--centered"
                    type="button"
                    aria-label="Смотреть видео: Wylsacom"
                    data-blogger-video="https://www.youtube.com/watch?v=RSXiiqzflZU"
                  >
                    {'\n              '}
                    <svg className="play-button__icon" aria-hidden="true">
                      <use href="/img/sprite.svg#icon-play"></use>
                    </svg>
                    {'\n            '}
                  </button>
                  {'\n          '}
                </div>
                {'\n          '}
                <div className="bloggers__info">
                  {'\n            '}
                  <div className="bloggers__info-item-content">
                    {'\n              '}
                    <div className="bloggers__info-item-name">{'Wylsacom'}</div>
                    {'\n              '}
                    <div className="bloggers__info-item-type">{'Блогер'}</div>
                    {'\n            '}
                  </div>
                  {'\n            '}
                  <div className="bloggers__info-item bloggers__info-item--subscribers">
                    {'\n              '}
                    <span className="bloggers__subscribers-icon" aria-hidden="true">
                      <svg>
                        <use href="/img/sprite.svg#icon-subscribers"></use>
                      </svg>
                    </span>
                    {'\n              '}
                    <div className="bloggers__info-item-content">
                      {'\n                '}
                      <div className="bloggers__info-item-name">
                        {'11,5+ '}
                        <small>{'млн'}</small>
                      </div>
                      {'\n                '}
                      <div className="bloggers__info-item-type">{'подписчиков'}</div>
                      {'\n              '}
                    </div>
                    {'\n            '}
                  </div>
                  {'\n          '}
                </div>
                {'\n        '}
              </div>
              {'\n      '}
            </article>
            {'\n    '}
          </div>
          {'\n    '}
          <div className="bloggers__controls slider-controls">
            {'\n      '}
            <button
              className="slider-arrow slider-arrow--prev button-reset"
              type="button"
              aria-label="Предыдущее видео"
              data-slider-prev=""
            >
              {'\n        '}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {'\n          '}
                <path d="m9 5 7 7-7 7"></path>
                {'\n        '}
              </svg>
              {'\n      '}
            </button>
            {'\n      '}
            <button
              className="slider-arrow slider-arrow--next button-reset"
              type="button"
              aria-label="Следующее видео"
              data-slider-next=""
            >
              {'\n        '}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {'\n          '}
                <path d="m9 5 7 7-7 7"></path>
                {'\n        '}
              </svg>
              {'\n      '}
            </button>
            {'\n    '}
          </div>
          {'\n  '}
        </div>
        {'\n'}
      </section>
    </>
  );
}
