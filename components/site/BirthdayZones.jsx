import { siteFields } from '../../lib/site-fields';

export default function BirthdayZones({ site }) {
  const fields = siteFields(site);
  return (
    <>
      <section
        className="zones"
        data-header-theme="brand"
        data-zone-tabs=""
        aria-labelledby="zones-title"
      >
        {'\n      '}
        <div className="zones__inner container">
          {'\n        '}
          <div className="zones__heading section-head">
            {'\n          '}
            <h2 className="section-head__title" id="zones-title">
              {'\n            '}
              <span>{'Игровые зоны'}</span> <br />
              {'\n            в нашем парке\n          '}
            </h2>
            {'\n          '}
            <div className="section-head__lead section-head__lead--big-width">
              {
                '\n            Выберите свою зону и погрузитесь в мир технологий, адреналина и незабываемых эмоций\n          '
              }
            </div>
            {'\n        '}
          </div>
          {'\n\n        '}
          <span className="visually-hidden" id="zones-navigation-label">
            {'Доступные игровые зоны'}
          </span>
          {'\n        '}
          <div className="zones__navigation">
            {'\n          '}
            <div
              className="zones__tabs"
              id="zones-activity-tabs"
              role="group"
              aria-labelledby="zones-navigation-label"
            >
              {'\n            '}
              <button
                className="zones__tab button-reset is-active"
                id="zone-tab-arena"
                type="button"
                aria-pressed="true"
                aria-controls="zone-panel-arena"
                data-zone-tab=""
              >
                {'\n              '}
                <svg className="zones__tab-icon" aria-hidden="true">
                  {'\n                '}
                  <use href="/img/sprite.svg#icon-arena"></use>
                  {'\n              '}
                </svg>
                {'\n              '}
                <span>{'Арена'}</span>
                {'\n            '}
              </button>
              {'\n            '}
              <button
                className="zones__tab button-reset"
                id="zone-tab-vr"
                type="button"
                aria-pressed="false"
                aria-controls="zone-panel-vr"
                tabIndex="-1"
                data-zone-tab=""
              >
                {'\n              '}
                <svg className="zones__tab-icon" aria-hidden="true">
                  {'\n                '}
                  <use href="/img/sprite.svg#icon-vr"></use>
                  {'\n              '}
                </svg>
                {'\n              '}
                <span>{'Вр станция'}</span>
                {'\n            '}
              </button>
              {'\n            '}
              <button
                className="zones__tab button-reset"
                id="zone-tab-extreme"
                type="button"
                aria-pressed="false"
                aria-controls="zone-panel-extreme"
                tabIndex="-1"
                data-zone-tab=""
              >
                {'\n              '}
                <svg className="zones__tab-icon" aria-hidden="true">
                  {'\n                '}
                  <use href="/img/sprite.svg#icon-lightning"></use>
                  {'\n              '}
                </svg>
                {'\n              '}
                <span>{'Экстрим'}</span>
                {'\n            '}
              </button>
              {'\n            '}
              <button
                className="zones__tab button-reset"
                id="zone-tab-simulators"
                type="button"
                aria-pressed="false"
                aria-controls="zone-panel-simulators"
                tabIndex="-1"
                data-zone-tab=""
              >
                {'\n              '}
                <svg className="zones__tab-icon" aria-hidden="true">
                  {'\n                '}
                  <use href="/img/sprite.svg#icon-wheel"></use>
                  {'\n              '}
                </svg>
                {'\n              '}
                <span>{'Симуляторы'}</span>
                {'\n            '}
              </button>
              {'\n            '}
              <button
                className="zones__tab button-reset"
                id="zone-tab-lounge"
                type="button"
                aria-pressed="false"
                aria-controls="zone-panel-lounge"
                tabIndex="-1"
                data-zone-tab=""
              >
                {'\n              '}
                <svg className="zones__tab-icon" aria-hidden="true">
                  {'\n                '}
                  <use href="/img/sprite.svg#icon-confeti"></use>
                  {'\n              '}
                </svg>
                {'\n              '}
                <span>{'Лаунж'}</span>
                {'\n            '}
              </button>
              {'\n          '}
            </div>
            {'\n        '}
          </div>
          {'\n\n        '}
          <div className="zones__mobile-select" data-zone-mobile-select="">
            {'\n          '}
            <span className="zones__mobile-label" id="zones-mobile-select-label">
              {'\n            Выберите свою игровую зону\n          '}
            </span>
            {'\n          '}
            <button
              className="zones__mobile-trigger button-reset"
              type="button"
              aria-haspopup="listbox"
              aria-expanded="false"
              aria-controls="zones-mobile-options"
              aria-labelledby="zones-mobile-select-label zones-mobile-select-value"
              data-zone-mobile-trigger=""
            >
              {'\n            '}
              <span
                className="zones__mobile-value"
                id="zones-mobile-select-value"
                data-zone-mobile-value=""
              >
                {'\n              '}
                <svg className="zones__tab-icon" aria-hidden="true">
                  {'\n                '}
                  <use href="/img/sprite.svg#icon-gun"></use>
                  {'\n              '}
                </svg>
                {'\n              '}
                <span>{'Арена'}</span>
                {'\n            '}
              </span>
              {'\n            '}
              <span className="zones__mobile-chevron" aria-hidden="true"></span>
              {'\n          '}
            </button>
            {'\n          '}
            <div
              className="zones__mobile-dropdown"
              id="zones-mobile-options"
              role="listbox"
              aria-labelledby="zones-mobile-select-label"
              data-zone-mobile-menu=""
              hidden={true}
            ></div>
            {'\n        '}
          </div>
          {'\n\n        '}
          <div className="zones__panels">
            {'\n          '}
            <section
              className="zone zone--red"
              id="zone-panel-arena"
              role="region"
              aria-labelledby="zone-tab-arena"
              data-zone-panel=""
            >
              {'\n            '}
              <div className="zone__row">
                {'\n              '}
                <div className="zone__image-container">
                  {'\n                '}
                  <img
                    className="zone__image"
                    src="/img/zones/арена.jpg"
                    width="3000"
                    height="1996"
                    alt="Игроки на арене WARPOINT"
                    loading="lazy"
                    decoding="async"
                  />
                  {'\n                '}
                  <button
                    className="play-button play-button--centered"
                    type="button"
                    data-zone-video="arena"
                    aria-label="Смотреть видео зоны «Арена»"
                  >
                    {'\n                  '}
                    <svg className="play-button__icon" aria-hidden="true">
                      {'\n                    '}
                      <use href="/img/sprite.svg#icon-play"></use>
                      {'\n                  '}
                    </svg>
                    {'\n                '}
                  </button>
                  {'\n              '}
                </div>
                {'\n              '}
                <div className="zone__content">
                  {'\n                '}
                  <div className="zone__wrap">
                    {'\n                  '}
                    <h3 className="zone__title">
                      <span>{'Арена'}</span>
                      {' для командных сражений'}
                    </h3>
                    {'\n                  '}
                    <p className="zone__desc">
                      {
                        '\n                    Совместные игры на большой площадке, по которой участники могут свободно\n                    перемещаться. В виртуальном мире все участники видят персонажей друг друга и\n                    могут взаимодействовать между собой\n                  '
                      }
                    </p>
                    {'\n                  '}
                    <ul className="zone__params">
                      {'\n                    '}
                      <li className="zone__params-item">{'площадь 350 м²'}</li>
                      {'\n                    '}
                      <li className="zone__params-item">{'2–10 человек'}</li>
                      {'\n                    '}
                      {fields.local && <li className="zone__params-item">{'1000 ₽'}</li>}
                      {'\n                    '}
                      <li className="zone__params-item">{'12+'}</li>
                      {'\n                  '}
                    </ul>
                    {'\n                  '}
                    <div className="zone__bottom">
                      {'\n                    '}
                      
                      {'\n\n                    '}
                      <div className="zone__price">
                        {fields.local ? '1000 ₽' : 'Цена по запросу'}
                      </div>
                      {'\n                  '}
                    </div>
                    {'\n                '}
                  </div>
                  {'\n                '}
                  <span className="zone__watermark" aria-hidden="true">
                    {'01'}
                  </span>
                  {'\n              '}
                </div>
                {'\n            '}
              </div>
              {'\n          '}
            </section>
            {'\n\n          '}
            <section
              className="zone zone--violet"
              id="zone-panel-vr"
              role="region"
              aria-labelledby="zone-tab-vr"
              data-zone-panel=""
              hidden={true}
            >
              {'\n            '}
              <div className="zone__row">
                {'\n              '}
                <div className="zone__image-container">
                  {'\n                '}
                  <img
                    className="zone__image"
                    src="/img/zones/2.jpg"
                    alt="Игроки на VR-станции WARPOINT"
                    loading="lazy"
                    decoding="async"
                  />
                  {'\n                '}
                  <button
                    className="play-button play-button--centered"
                    type="button"
                    data-zone-video="vr"
                    aria-label="Смотреть видео VR-станции"
                  >
                    {'\n                  '}
                    <svg className="play-button__icon" aria-hidden="true">
                      {'\n                    '}
                      <use href="/img/sprite.svg#icon-play"></use>
                      {'\n                  '}
                    </svg>
                    {'\n                '}
                  </button>
                  {'\n              '}
                </div>
                {'\n              '}
                <div className="zone__content">
                  {'\n                '}
                  <div className="zone__wrap">
                    {'\n                  '}
                    <h3 className="zone__title">
                      <span>{'VR станция'}</span>
                      {' игры на прохождение'}
                    </h3>
                    {'\n                  '}
                    <p className="zone__desc">
                      {
                        '\n                    Большой выбор игр разных жанров: победите плохих парней, спасите мир от зомби\n                    или пройдите увлекательный квест\n                  '
                      }
                    </p>
                    {'\n                  '}
                    <ul className="zone__params">
                      {'\n                    '}
                      <li className="zone__params-item">{'1–4 человека'}</li>
                      {'\n                    '}
                      <li className="zone__params-item">{'Oculus Quest'}</li>
                      {'\n                    '}
                      <li className="zone__params-item">{'Valve Index'}</li>
                      {'\n                    '}
                      {fields.local && <li className="zone__params-item">{'700 ₽'}</li>}
                      {'\n                    '}
                      <li className="zone__params-item">{'6+'}</li>
                      {'\n                  '}
                    </ul>
                    {'\n                  '}
                    <div className="zone__bottom">
                      {'\n                    '}
                      
                      {'\n\n                    '}
                      <div className="zone__price">
                        {fields.local ? '700 ₽' : 'Цена по запросу'}
                      </div>
                      {'\n                  '}
                    </div>
                    {'\n                '}
                  </div>
                  {'\n                '}
                  <span className="zone__watermark" aria-hidden="true">
                    {'02'}
                  </span>
                  {'\n              '}
                </div>
                {'\n            '}
              </div>
              {'\n          '}
            </section>
            {'\n\n          '}
            <section
              className="zone zone--red"
              id="zone-panel-extreme"
              role="region"
              aria-labelledby="zone-tab-extreme"
              data-zone-panel=""
              hidden={true}
            >
              {'\n            '}
              <div className="zone__row">
                {'\n              '}
                <div className="zone__image-container">
                  {'\n                '}
                  <img
                    className="zone__image"
                    src="/img/zones/3.jpg"
                    alt="Игроки в экстрим-зоне WARPOINT"
                    loading="lazy"
                    decoding="async"
                  />
                  {'\n                '}
                  <button
                    className="play-button play-button--centered"
                    type="button"
                    data-zone-video="extreme"
                    aria-label="Смотреть видео экстрим-зоны"
                  >
                    {'\n                  '}
                    <svg className="play-button__icon" aria-hidden="true">
                      {'\n                    '}
                      <use href="/img/sprite.svg#icon-play"></use>
                      {'\n                  '}
                    </svg>
                    {'\n                '}
                  </button>
                  {'\n              '}
                </div>
                {'\n              '}
                <div className="zone__content">
                  {'\n                '}
                  <div className="zone__wrap">
                    {'\n                  '}
                    <h3 className="zone__title">
                      {'\n                    '}
                      <span>{'Экстрим-зона'}</span>
                      {' для любителей острых ощущений\n                  '}
                    </h3>
                    {'\n                  '}
                    <p className="zone__desc">
                      {
                        '\n                    Зона с аттракционами, от которых захватывает дух! Прокатитесь на безумных\n                    американских горках, полетайте на дельтаплане, погрузитесь на дно океана или\n                    покорите космос\n                  '
                      }
                    </p>
                    {'\n                  '}
                    <ul className="zone__params">
                      {'\n                    '}
                      <li className="zone__params-item">{'1–4 человека'}</li>
                      {'\n                    '}
                      {fields.local && <li className="zone__params-item">{'700 ₽'}</li>}
                      {'\n                    '}
                      <li className="zone__params-item">{'6+'}</li>
                      {'\n                  '}
                    </ul>
                    {'\n                  '}
                    <div className="zone__bottom">
                      {'\n                    '}
                      
                      {'\n\n                    '}
                      <div className="zone__price">
                        {fields.local ? '700 ₽' : 'Цена по запросу'}
                      </div>
                      {'\n                  '}
                    </div>
                    {'\n                '}
                  </div>
                  {'\n                '}
                  <span className="zone__watermark" aria-hidden="true">
                    {'03'}
                  </span>
                  {'\n              '}
                </div>
                {'\n            '}
              </div>
              {'\n          '}
            </section>
            {'\n\n          '}
            <section
              className="zone zone--violet"
              id="zone-panel-simulators"
              role="region"
              aria-labelledby="zone-tab-simulators"
              data-zone-panel=""
              hidden={true}
            >
              {'\n            '}
              <div className="zone__row">
                {'\n              '}
                <div className="zone__image-container">
                  {'\n                '}
                  <img
                    className="zone__image"
                    src="/img/zones/4.jpg"
                    alt="Автосимуляторы WARPOINT"
                    loading="lazy"
                    decoding="async"
                  />
                  {'\n                '}
                  <button
                    className="play-button play-button--centered"
                    type="button"
                    data-zone-video="simulators"
                    aria-label="Смотреть видео зоны симуляторов"
                  >
                    {'\n                  '}
                    <svg className="play-button__icon" aria-hidden="true">
                      {'\n                    '}
                      <use href="/img/sprite.svg#icon-play"></use>
                      {'\n                  '}
                    </svg>
                    {'\n                '}
                  </button>
                  {'\n              '}
                </div>
                {'\n              '}
                <div className="zone__content">
                  {'\n                '}
                  <div className="zone__wrap">
                    {'\n                  '}
                    <h3 className="zone__title">
                      <span>{'Симуляторы'}</span>
                      {' для фанатов скорости'}
                    </h3>
                    {'\n                  '}
                    <p className="zone__desc">
                      {
                        '\n                    Игровая зона с профессиональными автосимуляторами, где можно устроить\n                    соревновательные заезды с друзьями и показать, кто настоящий король скорости\n                  '
                      }
                    </p>
                    {'\n                  '}
                    <ul className="zone__params">
                      {'\n                    '}
                      <li className="zone__params-item">{'1–4 человека'}</li>
                      {'\n                    '}
                      {fields.local && <li className="zone__params-item">{'700 ₽'}</li>}
                      {'\n                    '}
                      <li className="zone__params-item">{'6+'}</li>
                      {'\n                  '}
                    </ul>
                    {'\n                  '}
                    <div className="zone__bottom">
                      {'\n                    '}
                      
                      {'\n\n                    '}
                      <div className="zone__price">
                        {fields.local ? '700 ₽' : 'Цена по запросу'}
                      </div>
                      {'\n                  '}
                    </div>
                    {'\n                '}
                  </div>
                  {'\n                '}
                  <span className="zone__watermark" aria-hidden="true">
                    {'04'}
                  </span>
                  {'\n              '}
                </div>
                {'\n            '}
              </div>
              {'\n          '}
            </section>
            {'\n\n          '}
            <section
              className="zone zone--red"
              id="zone-panel-lounge"
              role="region"
              aria-labelledby="zone-tab-lounge"
              data-zone-panel=""
              hidden={true}
            >
              {'\n            '}
              <div className="zone__row">
                {'\n              '}
                <div className="zone__image-container">
                  {'\n                '}
                  <img
                    className="zone__image"
                    src="/img/zones/лаунж.jpg"
                    width="3000"
                    height="1996"
                    alt="Праздник в лаунж-зоне WARPOINT"
                    loading="lazy"
                    decoding="async"
                  />
                  {'\n                '}
                  <button
                    className="play-button play-button--centered"
                    type="button"
                    data-zone-video="lounge"
                    aria-label="Смотреть видео лаунж-зоны"
                  >
                    {'\n                  '}
                    <svg className="play-button__icon" aria-hidden="true">
                      {'\n                    '}
                      <use href="/img/sprite.svg#icon-play"></use>
                      {'\n                  '}
                    </svg>
                    {'\n                '}
                  </button>
                  {'\n              '}
                </div>
                {'\n              '}
                <div className="zone__content">
                  {'\n                '}
                  <div className="zone__wrap">
                    {'\n                  '}
                    <h3 className="zone__title">
                      <span>{'Лаунж-зона'}</span>
                      {' для проведения мероприятий'}
                    </h3>
                    {'\n                  '}
                    <p className="zone__desc">
                      {
                        '\n                    Комфортное пространство, где можно весело провести время с друзьями и отметить\n                    любой праздник: день рождения, школьный выпускной или корпоратив с коллегами\n                  '
                      }
                    </p>
                    {'\n                  '}
                    <ul className="zone__params">
                      {'\n                    '}
                      <li className="zone__params-item">{'площадь 40 м²'}</li>
                      {'\n                    '}
                      <li className="zone__params-item">{'ТВ с приставкой'}</li>
                      {'\n                    '}
                      <li className="zone__params-item">{'до 30 человек'}</li>
                      {'\n                  '}
                    </ul>
                    {'\n                  '}
                    {'\n                '}
                  </div>
                  {'\n                '}
                  <span className="zone__watermark" aria-hidden="true">
                    {'05'}
                  </span>
                  {'\n              '}
                </div>
                {'\n            '}
              </div>
              {'\n          '}
            </section>
            {'\n        '}
          </div>
          {'\n      '}
        </div>
        {'\n    '}
      </section>
    </>
  );
}
