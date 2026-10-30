import { siteFields } from '../../lib/site-fields';

export default function HomeZones({ site }) {
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
                      {fields.local && <li className="zone__params-item">{'от 1000 ₽'}</li>}
                      {'\n                    '}
                      <li className="zone__params-item">{'12+'}</li>
                      {'\n                  '}
                    </ul>
                    {'\n                  '}
                    <div className="zone__bottom">
                      {'\n                    '}
                      <a
                        className="zone__button btn btn--red"

                        href={fields.booking} data-booking-open=""
                      >
                        {'\n                      '}
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {'\n                        '}
                          <path
                            d="M28.9968 20.3613C28.9973 20.3559 28.9973 20.3504 28.9968 20.3449L27.0761 10.4813C27.0761 10.4742 27.0761 10.4672 27.0761 10.4602C26.7796 8.84069 25.9249 7.37634 24.6606 6.32169C23.3964 5.26705 21.8025 4.68881 20.1561 4.6875H9.83074C8.17974 4.68687 6.58138 5.26839 5.31678 6.3298C4.05218 7.39121 3.20232 8.86452 2.91668 10.4906L1.00535 20.3449C1.00479 20.3504 1.00479 20.3559 1.00535 20.3613C0.849775 21.2447 0.979813 22.1547 1.37658 22.9592C1.77335 23.7636 2.4162 24.4207 3.2118 24.8349C4.00739 25.2492 4.91432 25.3991 5.80089 25.2628C6.68747 25.1266 7.50755 24.7114 8.14207 24.0773L8.18308 24.034L12.8343 18.75H17.1702L21.8237 24.034C21.8366 24.0492 21.8507 24.0633 21.8647 24.0773C22.6555 24.8664 23.7265 25.3105 24.8436 25.3125C25.4594 25.3121 26.0677 25.1769 26.6256 24.9164C27.1836 24.6559 27.6778 24.2764 28.0735 23.8045C28.4692 23.3327 28.7567 22.7799 28.916 22.1851C29.0753 21.5903 29.1025 20.9678 28.9956 20.3613H28.9968ZM12.1874 13.125H11.2499V14.0625C11.2499 14.3111 11.1511 14.5496 10.9753 14.7254C10.7995 14.9012 10.561 15 10.3124 15C10.0637 15 9.82528 14.9012 9.64947 14.7254C9.47365 14.5496 9.37488 14.3111 9.37488 14.0625V13.125H8.43738C8.18874 13.125 7.95028 13.0262 7.77447 12.8504C7.59865 12.6746 7.49988 12.4361 7.49988 12.1875C7.49988 11.9389 7.59865 11.7004 7.77447 11.5246C7.95028 11.3488 8.18874 11.25 8.43738 11.25H9.37488V10.3125C9.37488 10.0639 9.47365 9.8254 9.64947 9.64959C9.82528 9.47377 10.0637 9.375 10.3124 9.375C10.561 9.375 10.7995 9.47377 10.9753 9.64959C11.1511 9.8254 11.2499 10.0639 11.2499 10.3125V11.25H12.1874C12.436 11.25 12.6745 11.3488 12.8503 11.5246C13.0261 11.7004 13.1249 11.9389 13.1249 12.1875C13.1249 12.4361 13.0261 12.6746 12.8503 12.8504C12.6745 13.0262 12.436 13.125 12.1874 13.125ZM16.8749 12.1875C16.8749 11.9389 16.9737 11.7004 17.1495 11.5246C17.3253 11.3488 17.5637 11.25 17.8124 11.25H20.6249C20.8735 11.25 21.112 11.3488 21.2878 11.5246C21.4636 11.7004 21.5624 11.9389 21.5624 12.1875C21.5624 12.4361 21.4636 12.6746 21.2878 12.8504C21.112 13.0262 20.8735 13.125 20.6249 13.125H17.8124C17.5637 13.125 17.3253 13.0262 17.1495 12.8504C16.9737 12.6746 16.8749 12.4361 16.8749 12.1875ZM26.762 22.4379C26.5864 22.6907 26.3624 22.9062 26.1029 23.0717C25.8433 23.2373 25.5536 23.3497 25.2503 23.4023C24.8834 23.4665 24.5065 23.4427 24.1506 23.3329C23.7947 23.2231 23.47 23.0304 23.203 22.7707L19.6639 18.75H20.1561C21.353 18.7502 22.5302 18.4448 23.5761 17.8628C24.6219 17.2808 25.5019 16.4414 26.1327 15.4242L27.1569 20.6977C27.2091 20.9994 27.201 21.3086 27.1332 21.6072C27.0655 21.9059 26.9393 22.1882 26.762 22.4379Z"
                            fill="white"
                          ></path>
                          {'\n                      '}
                        </svg>
                        {'\n                      забронировать игру\n                    '}
                      </a>
                      {'\n\n                    '}
                      <div className="zone__price">
                        {fields.local ? 'от\n                       1000 ₽' : 'Цена по запросу'}
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
                      {fields.local && <li className="zone__params-item">{'от 700 ₽'}</li>}
                      {'\n                    '}
                      <li className="zone__params-item">{'6+'}</li>
                      {'\n                  '}
                    </ul>
                    {'\n                  '}
                    <div className="zone__bottom">
                      {'\n                    '}
                      <a
                        className="zone__button btn btn--red"

                        href={fields.booking} data-booking-open=""
                      >
                        {'\n                      '}
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {'\n                        '}
                          <path
                            d="M28.9968 20.3613C28.9973 20.3559 28.9973 20.3504 28.9968 20.3449L27.0761 10.4813C27.0761 10.4742 27.0761 10.4672 27.0761 10.4602C26.7796 8.84069 25.9249 7.37634 24.6606 6.32169C23.3964 5.26705 21.8025 4.68881 20.1561 4.6875H9.83074C8.17974 4.68687 6.58138 5.26839 5.31678 6.3298C4.05218 7.39121 3.20232 8.86452 2.91668 10.4906L1.00535 20.3449C1.00479 20.3504 1.00479 20.3559 1.00535 20.3613C0.849775 21.2447 0.979813 22.1547 1.37658 22.9592C1.77335 23.7636 2.4162 24.4207 3.2118 24.8349C4.00739 25.2492 4.91432 25.3991 5.80089 25.2628C6.68747 25.1266 7.50755 24.7114 8.14207 24.0773L8.18308 24.034L12.8343 18.75H17.1702L21.8237 24.034C21.8366 24.0492 21.8507 24.0633 21.8647 24.0773C22.6555 24.8664 23.7265 25.3105 24.8436 25.3125C25.4594 25.3121 26.0677 25.1769 26.6256 24.9164C27.1836 24.6559 27.6778 24.2764 28.0735 23.8045C28.4692 23.3327 28.7567 22.7799 28.916 22.1851C29.0753 21.5903 29.1025 20.9678 28.9956 20.3613H28.9968ZM12.1874 13.125H11.2499V14.0625C11.2499 14.3111 11.1511 14.5496 10.9753 14.7254C10.7995 14.9012 10.561 15 10.3124 15C10.0637 15 9.82528 14.9012 9.64947 14.7254C9.47365 14.5496 9.37488 14.3111 9.37488 14.0625V13.125H8.43738C8.18874 13.125 7.95028 13.0262 7.77447 12.8504C7.59865 12.6746 7.49988 12.4361 7.49988 12.1875C7.49988 11.9389 7.59865 11.7004 7.77447 11.5246C7.95028 11.3488 8.18874 11.25 8.43738 11.25H9.37488V10.3125C9.37488 10.0639 9.47365 9.8254 9.64947 9.64959C9.82528 9.47377 10.0637 9.375 10.3124 9.375C10.561 9.375 10.7995 9.47377 10.9753 9.64959C11.1511 9.8254 11.2499 10.0639 11.2499 10.3125V11.25H12.1874C12.436 11.25 12.6745 11.3488 12.8503 11.5246C13.0261 11.7004 13.1249 11.9389 13.1249 12.1875C13.1249 12.4361 13.0261 12.6746 12.8503 12.8504C12.6745 13.0262 12.436 13.125 12.1874 13.125ZM16.8749 12.1875C16.8749 11.9389 16.9737 11.7004 17.1495 11.5246C17.3253 11.3488 17.5637 11.25 17.8124 11.25H20.6249C20.8735 11.25 21.112 11.3488 21.2878 11.5246C21.4636 11.7004 21.5624 11.9389 21.5624 12.1875C21.5624 12.4361 21.4636 12.6746 21.2878 12.8504C21.112 13.0262 20.8735 13.125 20.6249 13.125H17.8124C17.5637 13.125 17.3253 13.0262 17.1495 12.8504C16.9737 12.6746 16.8749 12.4361 16.8749 12.1875ZM26.762 22.4379C26.5864 22.6907 26.3624 22.9062 26.1029 23.0717C25.8433 23.2373 25.5536 23.3497 25.2503 23.4023C24.8834 23.4665 24.5065 23.4427 24.1506 23.3329C23.7947 23.2231 23.47 23.0304 23.203 22.7707L19.6639 18.75H20.1561C21.353 18.7502 22.5302 18.4448 23.5761 17.8628C24.6219 17.2808 25.5019 16.4414 26.1327 15.4242L27.1569 20.6977C27.2091 20.9994 27.201 21.3086 27.1332 21.6072C27.0655 21.9059 26.9393 22.1882 26.762 22.4379Z"
                            fill="white"
                          ></path>
                          {'\n                      '}
                        </svg>
                        {'\n                      забронировать игру\n                    '}
                      </a>
                      {'\n\n                    '}
                      <div className="zone__price">
                        {fields.local ? 'от\n                       1000 ₽' : 'Цена по запросу'}
                      </div>
                      {'\n                  '}
                    </div>
                    {'\n\n                '}
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
                      {fields.local && <li className="zone__params-item">{'от 700 ₽'}</li>}
                      {'\n                    '}
                      <li className="zone__params-item">{'6+'}</li>
                      {'\n                  '}
                    </ul>
                    {'\n                  '}
                    <div className="zone__bottom">
                      {'\n                    '}
                      <a
                        className="zone__button btn btn--red"

                        href={fields.booking} data-booking-open=""
                      >
                        {'\n                      '}
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {'\n                        '}
                          <path
                            d="M28.9968 20.3613C28.9973 20.3559 28.9973 20.3504 28.9968 20.3449L27.0761 10.4813C27.0761 10.4742 27.0761 10.4672 27.0761 10.4602C26.7796 8.84069 25.9249 7.37634 24.6606 6.32169C23.3964 5.26705 21.8025 4.68881 20.1561 4.6875H9.83074C8.17974 4.68687 6.58138 5.26839 5.31678 6.3298C4.05218 7.39121 3.20232 8.86452 2.91668 10.4906L1.00535 20.3449C1.00479 20.3504 1.00479 20.3559 1.00535 20.3613C0.849775 21.2447 0.979813 22.1547 1.37658 22.9592C1.77335 23.7636 2.4162 24.4207 3.2118 24.8349C4.00739 25.2492 4.91432 25.3991 5.80089 25.2628C6.68747 25.1266 7.50755 24.7114 8.14207 24.0773L8.18308 24.034L12.8343 18.75H17.1702L21.8237 24.034C21.8366 24.0492 21.8507 24.0633 21.8647 24.0773C22.6555 24.8664 23.7265 25.3105 24.8436 25.3125C25.4594 25.3121 26.0677 25.1769 26.6256 24.9164C27.1836 24.6559 27.6778 24.2764 28.0735 23.8045C28.4692 23.3327 28.7567 22.7799 28.916 22.1851C29.0753 21.5903 29.1025 20.9678 28.9956 20.3613H28.9968ZM12.1874 13.125H11.2499V14.0625C11.2499 14.3111 11.1511 14.5496 10.9753 14.7254C10.7995 14.9012 10.561 15 10.3124 15C10.0637 15 9.82528 14.9012 9.64947 14.7254C9.47365 14.5496 9.37488 14.3111 9.37488 14.0625V13.125H8.43738C8.18874 13.125 7.95028 13.0262 7.77447 12.8504C7.59865 12.6746 7.49988 12.4361 7.49988 12.1875C7.49988 11.9389 7.59865 11.7004 7.77447 11.5246C7.95028 11.3488 8.18874 11.25 8.43738 11.25H9.37488V10.3125C9.37488 10.0639 9.47365 9.8254 9.64947 9.64959C9.82528 9.47377 10.0637 9.375 10.3124 9.375C10.561 9.375 10.7995 9.47377 10.9753 9.64959C11.1511 9.8254 11.2499 10.0639 11.2499 10.3125V11.25H12.1874C12.436 11.25 12.6745 11.3488 12.8503 11.5246C13.0261 11.7004 13.1249 11.9389 13.1249 12.1875C13.1249 12.4361 13.0261 12.6746 12.8503 12.8504C12.6745 13.0262 12.436 13.125 12.1874 13.125ZM16.8749 12.1875C16.8749 11.9389 16.9737 11.7004 17.1495 11.5246C17.3253 11.3488 17.5637 11.25 17.8124 11.25H20.6249C20.8735 11.25 21.112 11.3488 21.2878 11.5246C21.4636 11.7004 21.5624 11.9389 21.5624 12.1875C21.5624 12.4361 21.4636 12.6746 21.2878 12.8504C21.112 13.0262 20.8735 13.125 20.6249 13.125H17.8124C17.5637 13.125 17.3253 13.0262 17.1495 12.8504C16.9737 12.6746 16.8749 12.4361 16.8749 12.1875ZM26.762 22.4379C26.5864 22.6907 26.3624 22.9062 26.1029 23.0717C25.8433 23.2373 25.5536 23.3497 25.2503 23.4023C24.8834 23.4665 24.5065 23.4427 24.1506 23.3329C23.7947 23.2231 23.47 23.0304 23.203 22.7707L19.6639 18.75H20.1561C21.353 18.7502 22.5302 18.4448 23.5761 17.8628C24.6219 17.2808 25.5019 16.4414 26.1327 15.4242L27.1569 20.6977C27.2091 20.9994 27.201 21.3086 27.1332 21.6072C27.0655 21.9059 26.9393 22.1882 26.762 22.4379Z"
                            fill="white"
                          ></path>
                          {'\n                      '}
                        </svg>
                        {'\n                      забронировать игру\n                    '}
                      </a>
                      {'\n\n                    '}
                      <div className="zone__price">
                        {fields.local ? 'от\n                       1000 ₽' : 'Цена по запросу'}
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
                      {fields.local && <li className="zone__params-item">{'от 700 ₽'}</li>}
                      {'\n                    '}
                      <li className="zone__params-item">{'6+'}</li>
                      {'\n                  '}
                    </ul>
                    {'\n                  '}
                    <div className="zone__bottom">
                      {'\n                    '}
                      <a
                        className="zone__button btn btn--red"

                        href={fields.booking} data-booking-open=""
                      >
                        {'\n                      '}
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {'\n                        '}
                          <path
                            d="M28.9968 20.3613C28.9973 20.3559 28.9973 20.3504 28.9968 20.3449L27.0761 10.4813C27.0761 10.4742 27.0761 10.4672 27.0761 10.4602C26.7796 8.84069 25.9249 7.37634 24.6606 6.32169C23.3964 5.26705 21.8025 4.68881 20.1561 4.6875H9.83074C8.17974 4.68687 6.58138 5.26839 5.31678 6.3298C4.05218 7.39121 3.20232 8.86452 2.91668 10.4906L1.00535 20.3449C1.00479 20.3504 1.00479 20.3559 1.00535 20.3613C0.849775 21.2447 0.979813 22.1547 1.37658 22.9592C1.77335 23.7636 2.4162 24.4207 3.2118 24.8349C4.00739 25.2492 4.91432 25.3991 5.80089 25.2628C6.68747 25.1266 7.50755 24.7114 8.14207 24.0773L8.18308 24.034L12.8343 18.75H17.1702L21.8237 24.034C21.8366 24.0492 21.8507 24.0633 21.8647 24.0773C22.6555 24.8664 23.7265 25.3105 24.8436 25.3125C25.4594 25.3121 26.0677 25.1769 26.6256 24.9164C27.1836 24.6559 27.6778 24.2764 28.0735 23.8045C28.4692 23.3327 28.7567 22.7799 28.916 22.1851C29.0753 21.5903 29.1025 20.9678 28.9956 20.3613H28.9968ZM12.1874 13.125H11.2499V14.0625C11.2499 14.3111 11.1511 14.5496 10.9753 14.7254C10.7995 14.9012 10.561 15 10.3124 15C10.0637 15 9.82528 14.9012 9.64947 14.7254C9.47365 14.5496 9.37488 14.3111 9.37488 14.0625V13.125H8.43738C8.18874 13.125 7.95028 13.0262 7.77447 12.8504C7.59865 12.6746 7.49988 12.4361 7.49988 12.1875C7.49988 11.9389 7.59865 11.7004 7.77447 11.5246C7.95028 11.3488 8.18874 11.25 8.43738 11.25H9.37488V10.3125C9.37488 10.0639 9.47365 9.8254 9.64947 9.64959C9.82528 9.47377 10.0637 9.375 10.3124 9.375C10.561 9.375 10.7995 9.47377 10.9753 9.64959C11.1511 9.8254 11.2499 10.0639 11.2499 10.3125V11.25H12.1874C12.436 11.25 12.6745 11.3488 12.8503 11.5246C13.0261 11.7004 13.1249 11.9389 13.1249 12.1875C13.1249 12.4361 13.0261 12.6746 12.8503 12.8504C12.6745 13.0262 12.436 13.125 12.1874 13.125ZM16.8749 12.1875C16.8749 11.9389 16.9737 11.7004 17.1495 11.5246C17.3253 11.3488 17.5637 11.25 17.8124 11.25H20.6249C20.8735 11.25 21.112 11.3488 21.2878 11.5246C21.4636 11.7004 21.5624 11.9389 21.5624 12.1875C21.5624 12.4361 21.4636 12.6746 21.2878 12.8504C21.112 13.0262 20.8735 13.125 20.6249 13.125H17.8124C17.5637 13.125 17.3253 13.0262 17.1495 12.8504C16.9737 12.6746 16.8749 12.4361 16.8749 12.1875ZM26.762 22.4379C26.5864 22.6907 26.3624 22.9062 26.1029 23.0717C25.8433 23.2373 25.5536 23.3497 25.2503 23.4023C24.8834 23.4665 24.5065 23.4427 24.1506 23.3329C23.7947 23.2231 23.47 23.0304 23.203 22.7707L19.6639 18.75H20.1561C21.353 18.7502 22.5302 18.4448 23.5761 17.8628C24.6219 17.2808 25.5019 16.4414 26.1327 15.4242L27.1569 20.6977C27.2091 20.9994 27.201 21.3086 27.1332 21.6072C27.0655 21.9059 26.9393 22.1882 26.762 22.4379Z"
                            fill="white"
                          ></path>
                          {'\n                      '}
                        </svg>
                        {'\n                      забронировать игру\n                    '}
                      </a>
                      {'\n\n                    '}
                      <div className="zone__price">
                        {fields.local ? 'от\n                       1000 ₽' : 'Цена по запросу'}
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
                    <div className="zone__bottom">
                      {'\n                    '}
                      <button
                        className="zone__button zone__button--calculate btn btn--red"
                        type="button"
                        aria-haspopup="dialog"
                        aria-controls="event-modal"
                        data-event-modal-open=""
                      >
                        {'\n                      '}
                        <svg
                          width="24"
                          height="28"
                          aria-hidden="true"
                          style={{ color: '#fff', stroke: 'none', fill: 'none' }}
                        >
                          {'\n                        '}
                          <use href="/img/sprite.svg#icon-calc"></use>
                          {'\n                      '}
                        </svg>
                        {'\n                      Рассчитать стоимость\n                    '}
                      </button>
                      {'\n                  '}
                    </div>
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
