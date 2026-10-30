import { siteFields } from '../../lib/site-fields';

export default function HomeGamesGroup({ site }) {
  const fields = siteFields(site);
  return (
    <>
      <div className="games-group" data-games-group="" data-pixel-section="">
        {'\n      '}
        <div className="games-group__background" aria-hidden="true">
          {'\n        '}
          <span className="games-group__background-pattern"></span>
          {'\n        '}
          <span className="games-group__background-gradient"></span>
          {'\n      '}
        </div>
        {'\n      '}
        <section
          className="games-catalog"
          data-header-theme="dark"
          aria-labelledby="games-catalog-title"
          data-slider-root=""
        >
          {'\n        '}
          <h2 className="games-catalog__title" id="games-catalog-title">
            {'\n          '}
            <span>{'Выберите своё'}</span>
            {'\n          '}
            <span>{'виртуальное приключение'}</span>
            {'\n        '}
          </h2>
          {'\n        '}
          <div className="games-catalog__track">
            {'\n          '}
            <div className="games-catalog__slider swiper" data-slider="" data-games-slider="">
              {'\n            '}
              <div className="swiper-wrapper">
                {'\n              '}
                <article className="game-card swiper-slide">
                  {'\n                '}
                  <img
                    className="game-card__image"
                    src="/img/games/1.jpg"
                    width="436"
                    height="624"
                    alt="WARPOINT АРЕНА"
                    loading="lazy"
                    decoding="async"
                  />
                  {'\n                '}
                  <div className="game-card__meta">
                    {'\n                  '}
                    <span className="game-card__tag game-card__tag--accent">{'Арена'}</span>
                    {'\n                  '}
                    <span className="game-card__tag">{'Стрелялка'}</span>
                    {'\n                  '}
                    <span className="game-card__tag">{'2–10 игроков'}</span>
                    {'\n                  '}
                    <span className="game-card__tag game-card__tag--age">{'12+'}</span>
                    {'\n                '}
                  </div>
                  {'\n                '}
                  <div className="game-card__content">
                    {'\n                  '}
                    <h3 className="game-card__title">{'WARPOINT АРЕНА'}</h3>
                    {'\n                  '}
                    <p className="game-card__description">
                      {
                        'Для фанатов реалистичных шутеров, мощного оружия, стратегии и\n                    тактики'
                      }
                    </p>
                    {'\n                  '}
                    <button
                      className="game-card__more button-reset"
                      type="button"
                      data-game-open="warpoint-arena"
                      aria-haspopup="dialog"
                      aria-controls="game-modal"
                    >
                      {'Подробнее'}
                    </button>
                    {'\n                '}
                  </div>
                  {'\n              '}
                </article>
                {'\n              '}
                <article className="game-card swiper-slide">
                  {'\n                '}
                  <img
                    className="game-card__image"
                    src="/img/games/vert/snow-battle.png"
                    width="1080"
                    height="1920"
                    alt="СНЕЖНАЯ БИТВА"
                    loading="lazy"
                    decoding="async"
                  />
                  {'\n                '}
                  <div className="game-card__meta">
                    {'\n                  '}
                    <span className="game-card__tag game-card__tag--accent">{'Арена'}</span>
                    {'\n                  '}
                    <span className="game-card__tag">{'Активная'}</span>
                    {'\n                  '}
                    <span className="game-card__tag">{'2–10 игроков'}</span>
                    {'\n                  '}
                    <span className="game-card__tag game-card__tag--age">{'6+'}</span>
                    {'\n                '}
                  </div>
                  {'\n                '}
                  <div className="game-card__content">
                    {'\n                  '}
                    <h3 className="game-card__title">{'СНЕЖНАЯ БИТВА'}</h3>
                    {'\n                  '}
                    <p className="game-card__description">
                      {'Постройте снежную крепость и разбейте снеговиков противника'}
                    </p>
                    {'\n                  '}
                    <button
                      className="game-card__more button-reset"
                      type="button"
                      data-game-open="snow-battle"
                      aria-haspopup="dialog"
                      aria-controls="game-modal"
                    >
                      {'Подробнее'}
                    </button>
                    {'\n                '}
                  </div>
                  {'\n              '}
                </article>
                {'\n              '}
                <article className="game-card swiper-slide">
                  {'\n                '}
                  <img
                    className="game-card__image"
                    src="/img/games/vert/farm.png"
                    width="1080"
                    height="1920"
                    alt="ВЕСЕЛАЯ ФЕРМА"
                    loading="lazy"
                    decoding="async"
                  />
                  {'\n                '}
                  <div className="game-card__meta">
                    {'\n                  '}
                    <span className="game-card__tag game-card__tag--accent">{'Арена'}</span>
                    {'\n                  '}
                    <span className="game-card__tag">{'Казуал'}</span>
                    {'\n                  '}
                    <span className="game-card__tag">{'2–10 игроков'}</span>
                    {'\n                  '}
                    <span className="game-card__tag game-card__tag--age">{'6+'}</span>
                    {'\n                '}
                  </div>
                  {'\n                '}
                  <div className="game-card__content">
                    {'\n                  '}
                    <h3 className="game-card__title">{'ВЕСЕЛАЯ ФЕРМА'}</h3>
                    {'\n                  '}
                    <p className="game-card__description">
                      {'Вырастите урожай всей командой и сдайте его раньше соперника'}
                    </p>
                    {'\n                  '}
                    <button
                      className="game-card__more button-reset"
                      type="button"
                      data-game-open="farm"
                      aria-haspopup="dialog"
                      aria-controls="game-modal"
                    >
                      {'Подробнее'}
                    </button>
                    {'\n                '}
                  </div>
                  {'\n              '}
                </article>
                {'\n              '}
                <article className="game-card swiper-slide">
                  {'\n                '}
                  <img
                    className="game-card__image"
                    src="/img/games/vert/diamonds.png"
                    width="1080"
                    height="1920"
                    alt="ПОИСК АЛМАЗОВ"
                    loading="lazy"
                    decoding="async"
                  />
                  {'\n                '}
                  <div className="game-card__meta">
                    {'\n                  '}
                    <span className="game-card__tag game-card__tag--accent">{'Арена'}</span>
                    {'\n                  '}
                    <span className="game-card__tag">{'Активная'}</span>
                    {'\n                  '}
                    <span className="game-card__tag">{'2–10 игроков'}</span>
                    {'\n                  '}
                    <span className="game-card__tag game-card__tag--age">{'6+'}</span>
                    {'\n                '}
                  </div>
                  {'\n                '}
                  <div className="game-card__content">
                    {'\n                  '}
                    <h3 className="game-card__title">{'ПОИСК АЛМАЗОВ'}</h3>
                    {'\n                  '}
                    <p className="game-card__description">
                      {'Прорубайте туннели в скале и добывайте алмазы быстрее соперника'}
                    </p>
                    {'\n                  '}
                    <button
                      className="game-card__more button-reset"
                      type="button"
                      data-game-open="diamonds"
                      aria-haspopup="dialog"
                      aria-controls="game-modal"
                    >
                      {'Подробнее'}
                    </button>
                    {'\n                '}
                  </div>
                  {'\n              '}
                </article>
                {'\n              '}
                <article className="game-card swiper-slide">
                  {'\n                '}
                  <img
                    className="game-card__image"
                    src="/img/games/vert/paint-battle.png"
                    width="1080"
                    height="1920"
                    alt="БИТВА КРАСОК"
                    loading="lazy"
                    decoding="async"
                  />
                  {'\n                '}
                  <div className="game-card__meta">
                    {'\n                  '}
                    <span className="game-card__tag game-card__tag--accent">{'Арена'}</span>
                    {'\n                  '}
                    <span className="game-card__tag">{'Активная'}</span>
                    {'\n                  '}
                    <span className="game-card__tag">{'2–10 игроков'}</span>
                    {'\n                  '}
                    <span className="game-card__tag game-card__tag--age">{'6+'}</span>
                    {'\n                '}
                  </div>
                  {'\n                '}
                  <div className="game-card__content">
                    {'\n                  '}
                    <h3 className="game-card__title">{'БИТВА КРАСОК'}</h3>
                    {'\n                  '}
                    <p className="game-card__description">
                      {'Захватите арену своим цветом — и не дайте закрасить её обратно'}
                    </p>
                    {'\n                  '}
                    <button
                      className="game-card__more button-reset"
                      type="button"
                      data-game-open="paint-battle"
                      aria-haspopup="dialog"
                      aria-controls="game-modal"
                    >
                      {'Подробнее'}
                    </button>
                    {'\n                '}
                  </div>
                  {'\n              '}
                </article>
                {'\n              '}
                <article className="game-card swiper-slide">
                  {'\n                '}
                  <img
                    className="game-card__image"
                    src="/img/games/vert/flying-saucers.jpg"
                    width="557"
                    height="714"
                    alt="ЛЕТАЮЩИЕ ТАРЕЛКИ"
                    loading="lazy"
                    decoding="async"
                  />
                  {'\n                '}
                  <div className="game-card__meta">
                    {'\n                  '}
                    <span className="game-card__tag game-card__tag--accent">{'Арена'}</span>
                    {'\n                  '}
                    <span className="game-card__tag">{'Казуал'}</span>
                    {'\n                  '}
                    <span className="game-card__tag">{'2–10 игроков'}</span>
                    {'\n                  '}
                    <span className="game-card__tag game-card__tag--age">{'6+'}</span>
                    {'\n                '}
                  </div>
                  {'\n                '}
                  <div className="game-card__content">
                    {'\n                  '}
                    <h3 className="game-card__title">{'ЛЕТАЮЩИЕ ТАРЕЛКИ'}</h3>
                    {'\n                  '}
                    <p className="game-card__description">
                      {'Похищайте добычу гравитационным лучом с борта НЛО'}
                    </p>
                    {'\n                  '}
                    <button
                      className="game-card__more button-reset"
                      type="button"
                      data-game-open="flying-saucers"
                      aria-haspopup="dialog"
                      aria-controls="game-modal"
                    >
                      {'Подробнее'}
                    </button>
                    {'\n                '}
                  </div>
                  {'\n              '}
                </article>
                {'\n              '}
                <article className="game-card swiper-slide">
                  {'\n                '}
                  <img
                    className="game-card__image"
                    src="/img/games/vert/kids-arena.png"
                    width="1080"
                    height="1920"
                    alt="ДЕТСКАЯ АРЕНА"
                    loading="lazy"
                    decoding="async"
                  />
                  {'\n                '}
                  <div className="game-card__meta">
                    {'\n                  '}
                    <span className="game-card__tag game-card__tag--accent">{'Арена'}</span>
                    {'\n                  '}
                    <span className="game-card__tag">{'Стрелялка'}</span>
                    {'\n                  '}
                    <span className="game-card__tag">{'2–10 игроков'}</span>
                    {'\n                  '}
                    <span className="game-card__tag game-card__tag--age">{'6+'}</span>
                    {'\n                '}
                  </div>
                  {'\n                '}
                  <div className="game-card__content">
                    {'\n                  '}
                    <h3 className="game-card__title">{'ДЕТСКАЯ АРЕНА'}</h3>
                    {'\n                  '}
                    <p className="game-card__description">
                      {
                        'Мультяшные герои, разнообразные пушки и командный бой на всю\n                    площадку'
                      }
                    </p>
                    {'\n                  '}
                    <button
                      className="game-card__more button-reset"
                      type="button"
                      data-game-open="kids-arena"
                      aria-haspopup="dialog"
                      aria-controls="game-modal"
                    >
                      {'Подробнее'}
                    </button>
                    {'\n                '}
                  </div>
                  {'\n              '}
                </article>
                {'\n            '}
              </div>
              {'\n          '}
            </div>
            {'\n          '}
            <div className="games-catalog__controls slider-controls">
              {'\n            '}
              <button
                className="slider-arrow slider-arrow--prev button-reset"
                type="button"
                aria-label="Предыдущая игра"
                data-slider-prev=""
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
                aria-label="Следующая игра"
                data-slider-next=""
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
        </section>
        {'\n    '}
      </div>
    </>
  );
}
