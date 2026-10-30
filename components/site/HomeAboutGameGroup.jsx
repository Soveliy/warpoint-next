import { siteFields } from '../../lib/site-fields';

export default function HomeAboutGameGroup({ site }) {
  const fields = siteFields(site);
  return (
    <>
      <div className="about-game-group" data-about-game-group="">
        {'\n      '}
        <section
          className="about-game"
          data-header-theme="brand"
          aria-labelledby="about-game-title"
        >
          {'\n        '}
          <div className="about-game__inner container">
            {'\n          '}
            <div className="about-game__heading">
              {'\n            '}
              <h2 className="about-game__title" id="about-game-title">
                {'\n              '}
                <span>{'Почему выбирают'}</span>
                {'\n              '}
                <span className="about-game__title-accent">{'WARPOINT'}</span>
                {'\n            '}
              </h2>
              {'\n            '}
              <p className="about-game__lead">
                {
                  '\n              Современные VR-развлечения для всей семьи. Ощутите игру по-новому!\n            '
                }
              </p>
              {'\n          '}
            </div>
            {'\n          '}
            <div className="about-game__stage">
              {'\n            '}
              <div className="about-game__visual-wrap" data-about-game-scene="">
                {'\n              '}
                <span className="about-game__visual-aura" aria-hidden="true"></span>
                {'\n              '}
                <span className="about-game__visual-shadow" aria-hidden="true"></span>
                {'\n              '}
                <div className="about-game__visual-model">
                  {'\n                '}
                  <div
                    className="about-game__visual-state about-game__visual-state--team"
                    data-about-scene-state="team"
                    aria-hidden="true"
                  >
                    {'\n                  '}
                    <img
                      className="about-game__visual"
                      src="/img/about/2.png"
                      width="1080"
                      height="1440"
                      alt="Командная игра в виртуальной реальности"
                      loading="lazy"
                      decoding="async"
                    />
                    {'\n                '}
                  </div>
                  {'\n                '}
                  <div
                    className="about-game__visual-state about-game__visual-state--immersion"
                    data-about-scene-state="immersion"
                    aria-hidden="true"
                  >
                    {'\n                  '}
                    <img
                      className="about-game__visual"
                      src="/img/about/4.png"
                      width="1080"
                      height="1440"
                      alt="Погружение в виртуальный игровой мир"
                      loading="lazy"
                      decoding="async"
                    />
                    {'\n                '}
                  </div>
                  {'\n                '}
                  <div
                    className="about-game__visual-state about-game__visual-state--family is-active"
                    data-about-scene-state="family"
                  >
                    {'\n                  '}
                    <img
                      className="about-game__visual"
                      src="/img/about/1.png"
                      width="1080"
                      height="1440"
                      alt="Семья играет в виртуальной реальности"
                      loading="lazy"
                      decoding="async"
                    />
                    {'\n                '}
                  </div>
                  {'\n                '}
                  <div
                    className="about-game__visual-state about-game__visual-state--events"
                    data-about-scene-state="events"
                    aria-hidden="true"
                  >
                    {'\n                  '}
                    <img
                      className="about-game__visual"
                      src="/img/about/3.png"
                      width="1080"
                      height="1440"
                      alt="День рождения в парке виртуальной реальности"
                      loading="lazy"
                      decoding="async"
                    />
                    {'\n                '}
                  </div>
                  {'\n                '}
                  <span className="about-game__visual-light" aria-hidden="true"></span>
                  {'\n              '}
                </div>
                {'\n            '}
              </div>
              {'\n            '}
              <ol className="about-game__benefits">
                {'\n              '}
                <li
                  className="about-game__benefit about-game__benefit--one"
                  data-about-benefit="team"
                >
                  {'\n                '}
                  <span className="about-game__number">
                    <svg
                      width="44"
                      height="51"
                      viewBox="0 0 44 51"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {'\n                    '}
                      <path
                        d="M0 33.2518V17.8159C0 12.1493 1.06449 7.7633 3.19347 4.65798C5.32246 1.55266 8.30472 0 12.1403 0C15.9927 0 18.9834 1.52999 21.1124 4.58998C23.2583 7.64996 24.3312 12.0586 24.3312 17.8159V33.2518C24.3312 39.0091 23.2245 43.4178 21.011 46.4778C18.7976 49.5151 15.8406 51.0224 12.1403 50.9997C8.27093 50.9997 5.28022 49.4811 3.16813 46.4438C1.05604 43.3838 0 38.9865 0 33.2518ZM9.90991 35.1898C9.90991 37.3205 10.0873 38.9411 10.4422 40.0518C10.8139 41.1625 11.3884 41.7178 12.1656 41.7178C12.9429 41.7178 13.5089 41.1625 13.8637 40.0518C14.2355 38.9411 14.4213 37.3205 14.4213 35.1898V16.0479C14.4213 13.8719 14.2355 12.2286 13.8637 11.1179C13.492 10.0073 12.926 9.45195 12.1656 9.45195C11.3884 9.45195 10.8139 10.0073 10.4422 11.1179C10.0873 12.2286 9.90991 13.8719 9.90991 16.0479V35.1898Z"
                        fill="var(--red-600)"
                      ></path>
                      {'\n                    '}
                      <path
                        d="M33.938 50.2518V12.2059L25.6248 16.2179V5.77997L36.2191 0.475998H44V50.2518H33.938Z"
                        fill="var(--red-600)"
                      ></path>
                      {'\n                  '}
                    </svg>
                  </span>
                  {'\n                '}
                  <div className="about-game__benefit-content">
                    {'\n                  '}
                    <h3 className="about-game__benefit-title">{'Захватывающие командные игры'}</h3>
                    {'\n                  '}
                    <p className="about-game__benefit-description">
                      {
                        '\n                    Совместные миссии, одиночные игры или соревнования между командами. Играйте в\n                    команде или друг против друга\n                  '
                      }
                    </p>
                    {'\n                '}
                  </div>
                  {'\n              '}
                </li>
                {'\n              '}
                <li
                  className="about-game__benefit about-game__benefit--two"
                  data-about-benefit="immersion"
                >
                  {'\n                '}
                  <span className="about-game__number">
                    {'\n                  '}
                    <svg
                      width="44"
                      height="51"
                      viewBox="0 0 44 51"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {'\n                    '}
                      <path
                        d="M0 33.2518V17.8159C0 12.1493 0.956007 7.7633 2.86802 4.65798C4.78004 1.55266 7.45837 0 10.903 0C14.3629 0 17.0488 1.52999 18.9608 4.58998C20.888 7.64996 21.8516 12.0586 21.8516 17.8159V33.2518C21.8516 39.0091 20.8576 43.4178 18.8698 46.4778C16.8819 49.5151 14.2263 51.0224 10.903 50.9997C7.42802 50.9997 4.7421 49.4811 2.84526 46.4438C0.94842 43.3838 0 38.9865 0 33.2518ZM8.89997 35.1898C8.89997 37.3205 9.05931 38.9411 9.37797 40.0518C9.71182 41.1625 10.2278 41.7178 10.9258 41.7178C11.6238 41.7178 12.1322 41.1625 12.4509 40.0518C12.7847 38.9411 12.9516 37.3205 12.9516 35.1898V16.0479C12.9516 13.8719 12.7847 12.2286 12.4509 11.1179C12.117 10.0073 11.6087 9.45195 10.9258 9.45195C10.2278 9.45195 9.71182 10.0073 9.37797 11.1179C9.05931 12.2286 8.89997 13.8719 8.89997 16.0479V35.1898Z"
                        fill="var(--red-600)"
                      ></path>
                      {'\n                    '}
                      <path
                        d="M22.0118 50.2518V41.8198L31.8223 23.6639C32.5658 22.0546 33.2184 20.4226 33.7798 18.7679C34.3565 17.1132 34.6448 15.4359 34.6448 13.7359C34.6448 12.0359 34.5082 10.9026 34.2351 10.3359C33.9771 9.76929 33.4384 9.48595 32.619 9.48595C31.7844 9.48595 31.2532 9.90528 31.0256 10.7439C30.8132 11.5599 30.7069 13.1353 30.7069 15.4699V17.9859H21.9208V14.9259C21.9208 10.3019 22.8768 6.66397 24.7888 4.01198C26.7008 1.33733 29.3488 0 32.7328 0C36.4051 0 39.1213 1.14466 40.8816 3.43398C42.6419 5.70064 43.5296 8.94196 43.5448 13.1579C43.5448 16.8299 43.1123 19.9012 42.2473 22.3719C41.3824 24.8425 40.2746 27.3245 38.9241 29.8179L34.3261 39.8818H44V50.2518H22.0118Z"
                        fill="var(--red-600)"
                      ></path>
                      {'\n                  '}
                    </svg>
                    {'\n                '}
                  </span>
                  {'\n                '}
                  <div className="about-game__benefit-content">
                    {'\n                  '}
                    <h3 className="about-game__benefit-title">
                      {'Невероятный уровень погружения'}
                    </h3>
                    {'\n                  '}
                    <p className="about-game__benefit-description">
                      {
                        '\n                    Виртуальная реальность нового поколения, свободное перемещение и современные\n                    VR очки без проводов и ограничений\n                  '
                      }
                    </p>
                    {'\n                '}
                  </div>
                  {'\n              '}
                </li>
                {'\n              '}
                <li
                  className="about-game__benefit about-game__benefit--three"
                  data-about-benefit="family"
                >
                  {'\n                '}
                  <span className="about-game__number">
                    {'\n                  '}
                    <svg
                      width="44"
                      height="51"
                      viewBox="0 0 44 51"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {'\n                    '}
                      <path
                        d="M0 33.0278V18.0059C0 12.3769 0.941197 7.96871 2.82359 4.78123C4.72081 1.59374 7.38877 0 10.8275 0C14.2958 0 16.9712 1.58244 18.8536 4.74732C20.7508 7.88959 21.6994 12.3091 21.6994 18.0059V33.0278C21.6994 38.7245 20.7286 43.1554 18.7869 46.3203C16.8452 49.4625 14.1921 51.0224 10.8275 50.9998C7.35912 50.9998 4.68375 49.4286 2.80136 46.2863C0.933786 43.1441 0 38.7245 0 33.0278ZM8.6931 34.7911C8.6931 37.0065 8.86356 38.7245 9.20446 39.9453C9.54537 41.1434 10.0938 41.7425 10.8497 41.7425C11.6204 41.7425 12.1763 41.1434 12.5172 39.9453C12.8581 38.7245 13.0285 37.0065 13.0285 34.7911V16.4122C13.0285 14.1515 12.8507 12.4221 12.4949 11.224C12.154 10.0033 11.6056 9.39291 10.8497 9.39291C10.0938 9.39291 9.54537 10.0033 9.20446 11.224C8.86356 12.4221 8.6931 14.1515 8.6931 16.4122V34.7911Z"
                        fill="var(--red-600)"
                      ></path>
                      {'\n                    '}
                      <path
                        d="M21.4113 36.4526V34.1468H29.882V36.4526C29.882 38.2837 30.1118 39.6514 30.5713 40.5557C31.0456 41.4373 31.7793 41.8781 32.7723 41.8781C33.7802 41.8781 34.4546 41.4147 34.7955 40.4878C35.1513 39.561 35.3291 37.8203 35.3291 35.2658C35.3291 32.8017 35.092 31.1062 34.6177 30.1794C34.1434 29.2299 33.1799 28.7552 31.7274 28.7552H28.6592V20.4474H31.5495C32.839 20.4474 33.6765 19.9839 34.0619 19.0571C34.4472 18.1076 34.6399 16.593 34.6399 14.5132C34.6399 12.5239 34.5065 11.1449 34.2397 10.3763C33.9877 9.58506 33.4245 9.18945 32.55 9.18945C31.7052 9.18945 31.1123 9.59636 30.7714 10.4102C30.4305 11.224 30.26 12.5126 30.26 14.2759V16.0392H21.9226V14.1402C21.9226 9.89025 22.8861 6.4767 24.8129 3.89958C26.7546 1.29986 29.4003 0 32.7501 0C36.2629 0 38.879 1.19813 40.5984 3.5944C42.3325 5.96806 43.1996 9.11033 43.1996 13.0212C43.1996 15.8244 42.8142 18.1415 42.0435 19.9726C41.2876 21.8038 40.1537 23.194 38.6418 24.1435V24.2791C40.213 24.8895 41.4951 26.1442 42.4882 28.0431C43.4961 29.9194 44 32.5191 44 35.8423C44 40.4765 43.0366 44.1614 41.1097 46.8967C39.1828 49.6321 36.3889 50.9998 32.7279 50.9998C29.2595 50.9998 26.5175 49.6999 24.5017 47.1002C22.5007 44.4778 21.4706 40.9287 21.4113 36.4526Z"
                        fill="var(--red-600)"
                      ></path>
                      {'\n                  '}
                    </svg>
                    {'\n                '}
                  </span>
                  {'\n                '}
                  <div className="about-game__benefit-content">
                    {'\n                  '}
                    <h3 className="about-game__benefit-title">{'Подходит для детей и взрослых'}</h3>
                    {'\n                  '}
                    <p className="about-game__benefit-description about-game__benefit-description--lit">
                      {
                        '\n                    Развлечение для всей семьи. Подходит для детей от 6 лет\n                    и взрослых любого возраста\n                  '
                      }
                    </p>
                    {'\n                '}
                  </div>
                  {'\n              '}
                </li>
                {'\n              '}
                <li
                  className="about-game__benefit about-game__benefit--four"
                  data-about-benefit="events"
                >
                  {'\n                '}
                  <span className="about-game__number">
                    {'\n                  '}
                    <svg
                      width="44"
                      height="51"
                      viewBox="0 0 44 51"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {'\n                    '}
                      <path
                        d="M0 33.0278V18.0059C0 12.3769 0.939299 7.96871 2.8179 4.78123C4.71129 1.59374 7.37386 0 10.8056 0C14.267 0 16.937 1.58244 18.8156 4.74732C20.7089 7.88959 21.6556 12.3091 21.6556 18.0059V33.0278C21.6556 38.7245 20.6868 43.1554 18.749 46.3203C16.8112 49.4625 14.1634 51.0224 10.8056 50.9998C7.34428 50.9998 4.6743 49.4286 2.79571 46.2863C0.931903 43.1441 0 38.7245 0 33.0278ZM8.67557 34.7911C8.67557 37.0065 8.84568 38.7245 9.1859 39.9453C9.52612 41.1434 10.0734 41.7425 10.8278 41.7425C11.597 41.7425 12.1517 41.1434 12.4919 39.9453C12.8322 38.7245 13.0023 37.0065 13.0023 34.7911V16.4122C13.0023 14.1515 12.8248 12.4221 12.4697 11.224C12.1295 10.0033 11.5822 9.39291 10.8278 9.39291C10.0734 9.39291 9.52612 10.0033 9.1859 11.224C8.84568 12.4221 8.67557 14.1515 8.67557 16.4122V34.7911Z"
                        fill="var(--red-600)"
                      ></path>
                      {'\n                    '}
                      <path
                        d="M32.9947 50.1859V36.9273L33.15 35.8423V18.3111H32.9503L28.6902 30.5863H35.5685L36.5892 30.2811H44V40.4878H21.235V31.2984L33.6603 0.813826H41.4262V50.1859H32.9947Z"
                        fill="var(--red-600)"
                      ></path>
                      {'\n                  '}
                    </svg>
                    {'\n                '}
                  </span>
                  {'\n                '}
                  <div className="about-game__benefit-content">
                    {'\n                  '}
                    <h3 className="about-game__benefit-title">{'Проведение мероприятий'}</h3>
                    {'\n                  '}
                    <p className="about-game__benefit-description">
                      {
                        '\n                    Дни рождения, выпускные и корпоративы, которые запомнятся каждому гостю\n                  '
                      }
                    </p>
                    {'\n                '}
                  </div>
                  {'\n              '}
                </li>
                {'\n            '}
              </ol>
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
