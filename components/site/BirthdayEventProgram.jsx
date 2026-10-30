import { siteFields } from '../../lib/site-fields';

export default function BirthdayEventProgram({ site }) {
  const fields = siteFields(site);
  return (
    <>
      <section
        className="event-program"
        aria-labelledby="event-program-title"
        data-header-theme="brand"
      >
        {'\n  '}
        <div className="container">
          {'\n    '}
          <div className="event-program__head section-head section-head--center" data-reveal="">
            {'\n      '}
            <h2 className="section-head__title" id="event-program-title">
              {'\n        Программа '}
              <br />
              <span>{'мероприятия'}</span>
              {'\n      '}
            </h2>
            {'\n      '}
            <p className="section-head__lead">
              {'\n        Примерный сценарий на 2 часа.'}
              <br />
              {'Подстроим его под возраст и количество гостей\n      '}
            </p>
            {'\n    '}
          </div>
          {'\n\n    '}
          <ol className="event-program__steps">
            {'\n      '}
            <li className="event-program__step" data-reveal="">
              {'\n        '}
              <span className="event-program__time">{'10 минут'}</span>
              {'\n        '}
              <h3 className="event-program__step-title">
                {'Встреча'}
                <br />
                {'и инструктаж'}
              </h3>
              {'\n        '}
              <p className="event-program__step-text">
                {
                  '\n          Инструктор знакомится с гостями, помогает надеть очки и объясняет правила игры\n        '
                }
              </p>
              {'\n      '}
            </li>
            {'\n      '}
            <li className="event-program__step" data-reveal="">
              {'\n        '}
              <span className="event-program__time">{'60 минут'}</span>
              {'\n        '}
              <h3 className="event-program__step-title">
                {'Игры'}
                <br />
                {'в VR'}
              </h3>
              {'\n        '}
              <p className="event-program__step-text">
                {
                  '\n          Командные миссии на арене: дети бегают, соревнуются и болеют друг за друга\n        '
                }
              </p>
              {'\n      '}
            </li>
            {'\n      '}
            <li className="event-program__step" data-reveal="">
              {'\n        '}
              <span className="event-program__time">{'15 минут'}</span>
              {'\n        '}
              <h3 className="event-program__step-title">
                {'Шоу-'}
                <br />
                {'программа'}
              </h3>
              {'\n        '}
              <p className="event-program__step-text">
                {
                  '\n          Дымовая пушка, музыка и конфетти — яркая кульминация праздника\n        '
                }
              </p>
              {'\n      '}
            </li>
            {'\n      '}
            <li className="event-program__step" data-reveal="">
              {'\n        '}
              <span className="event-program__time">{'30 минут'}</span>
              {'\n        '}
              <h3 className="event-program__step-title">
                {'Торт'}
                <br />
                {'и подарки'}
              </h3>
              {'\n        '}
              <p className="event-program__step-text">
                {'\n          В лаунж-зоне: свечи, поздравления и время для угощений\n        '}
              </p>
              {'\n      '}
            </li>
            {'\n      '}
            <li className="event-program__step" data-reveal="">
              {'\n        '}
              <span className="event-program__time">{'5 минут'}</span>
              {'\n        '}
              <h3 className="event-program__step-title">
                {'Фото'}
                <br />
                {'на память'}
              </h3>
              {'\n        '}
              <p className="event-program__step-text">
                {
                  '\n          Общий кадр с именинником и друзьями, который останется в семейном альбоме\n        '
                }
              </p>
              {'\n      '}
            </li>
            {'\n    '}
          </ol>
          {'\n\n    '}
          <div className="event-program__details">
            {'\n      '}
            <div className="event-program__details-intro" data-reveal="">
              {'\n        '}
              <h3 className="event-program__details-title">
                {'А что в это'}
                <br />
                {'время делают'}
                <br />
                {'взрослые?'}
              </h3>
              {'\n        '}
              <p className="event-program__details-text">
                {
                  '\n          Праздник интересен не только детям. Выбирайте, как провести время\n        '
                }
              </p>
              {'\n      '}
            </div>
            {'\n      '}
            <ul className="event-program__details-list">
              {'\n        '}
              <li className="event-program__details-card" data-reveal="">
                {'\n          '}
                <div className="event-program__icon-container" aria-hidden="true">
                  {'\n            '}
                  <svg className="event-program__icon" aria-hidden="true">
                    {'\n              '}
                    <use href="/img/sprite.svg#icon-monitorplay"></use>
                    {'\n            '}
                  </svg>
                  {'\n          '}
                </div>
                {'\n          '}
                <h4 className="event-program__details-card-title">{'Смотрят игру на экранах'}</h4>
                {'\n          '}
                <p className="event-program__details-card-text">
                  {
                    '\n            Трансляция из виртуального мира выводится на мониторы — видно, что делает каждый игрок\n          '
                  }
                </p>
                {'\n        '}
              </li>
              {'\n        '}
              <li className="event-program__details-card" data-reveal="">
                {'\n          '}
                <div className="event-program__icon-container" aria-hidden="true">
                  {'\n            '}
                  <svg className="event-program__icon" aria-hidden="true">
                    {'\n              '}
                    <use href="/img/sprite.svg#icon-coffee"></use>
                    {'\n            '}
                  </svg>
                  {'\n          '}
                </div>
                {'\n          '}
                <h4 className="event-program__details-card-title">{'Отдыхают в лаунже'}</h4>
                {'\n          '}
                <p className="event-program__details-card-text">
                  {
                    '\n            Ждут с кофе в уютной зоне рядом с ареной и не теряют детей из виду\n          '
                  }
                </p>
                {'\n        '}
              </li>
              {'\n        '}
              <li className="event-program__details-card" data-reveal="">
                {'\n          '}
                <div className="event-program__icon-container" aria-hidden="true">
                  {'\n            '}
                  <svg className="event-program__icon" aria-hidden="true">
                    {'\n              '}
                    <use href="/img/sprite.svg#icon-users"></use>
                    {'\n            '}
                  </svg>
                  {'\n          '}
                </div>
                {'\n          '}
                <h4 className="event-program__details-card-title">{'Играют вместе с детьми'}</h4>
                {'\n          '}
                <p className="event-program__details-card-text">
                  {
                    '\n            Присоединяются к команде именинника или устраивают матч «дети против родителей»\n          '
                  }
                </p>
                {'\n        '}
              </li>
              {'\n      '}
            </ul>
            {'\n    '}
          </div>
          {'\n  '}
        </div>
        {'\n'}
      </section>
    </>
  );
}
