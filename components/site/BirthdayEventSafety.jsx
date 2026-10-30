import { siteFields } from '../../lib/site-fields';

export default function BirthdayEventSafety({ site }) {
  const fields = siteFields(site);
  return (
    <>
      <section
        className="event-safety"
        aria-labelledby="event-safety-title"
        data-header-theme="brand"
      >
        {'\n  '}
        <div className="container">
          {'\n    '}
          <div className="event-safety__head section-head" data-reveal="">
            {'\n      '}
            <h2 className="section-head__title" id="event-safety-title">
              {'\n        Безопасность '}
              <br />
              <span>{'на первом месте'}</span>
              {'\n      '}
            </h2>
            {'\n      '}
            <p className="section-head__lead section-head__lead--big-width">
              {
                '\n        Знаем, что для родителей это главный вопрос. Поэтому продумали каждую мелочь — чтобы вы\n        могли спокойно наблюдать за праздником\n      '
              }
            </p>
            {'\n    '}
          </div>
          {'\n\n    '}
          <div className="event-safety__body">
            {'\n      '}
            <figure className="event-safety__visual" data-reveal-image="">
              {'\n        '}
              <img
                className="event-safety__image"
                src="/img/gallery/5.jpg"
                width="1920"
                height="1275"
                alt="Дети играют на VR-арене под присмотром операторов"
                loading="lazy"
                decoding="async"
              />
              {'\n        '}
              <figcaption className="event-safety__caption">
                {'\n          '}
                <svg className="event-safety__caption-icon" aria-hidden="true">
                  {'\n            '}
                  <use href="/img/sprite.svg#icon-shield"></use>
                  {'\n          '}
                </svg>
                {'\n          '}
                <span>{'Все игры проходят под присмотром опытных операторов'}</span>
                {'\n        '}
              </figcaption>
              {'\n      '}
            </figure>
            {'\n\n      '}
            <ul className="event-safety__features">
              {'\n        '}
              <li className="event-safety__feature" data-reveal="">
                {'\n          '}
                <div className="event-safety__icon-container" aria-hidden="true">
                  {'\n            '}
                  <svg className="event-safety__icon" aria-hidden="true">
                    {'\n              '}
                    <use href="/img/sprite.svg#icon-handheart"></use>
                    {'\n            '}
                  </svg>
                  {'\n          '}
                </div>
                {'\n          '}
                <h3 className="event-safety__feature-title">
                  {'Инструктор'}
                  <br />
                  {'всегда рядом'}
                </h3>
                {'\n          '}
                <p className="event-safety__feature-text">
                  {
                    '\n            Следит за игрой от начала до конца и сразу помогает, если ребёнку что-то непонятно\n          '
                  }
                </p>
                {'\n        '}
              </li>
              {'\n        '}
              <li className="event-safety__feature" data-reveal="">
                {'\n          '}
                <div className="event-safety__icon-container" aria-hidden="true">
                  {'\n            '}
                  <svg className="event-safety__icon" aria-hidden="true">
                    {'\n              '}
                    <use href="/img/sprite.svg#icon-spraybottle"></use>
                    {'\n            '}
                  </svg>
                  {'\n          '}
                </div>
                {'\n          '}
                <h3 className="event-safety__feature-title">
                  {'Чистое'}
                  <br />
                  {'оборудование'}
                </h3>
                {'\n          '}
                <p className="event-safety__feature-text">
                  {
                    '\n            Обрабатываем VR-очки и контроллеры после каждой игры, под очки выдаём одноразовые маски\n          '
                  }
                </p>
                {'\n        '}
              </li>
              {'\n        '}
              <li className="event-safety__feature" data-reveal="">
                {'\n          '}
                <div className="event-safety__icon-container" aria-hidden="true">
                  {'\n            '}
                  <svg className="event-safety__icon" aria-hidden="true">
                    {'\n              '}
                    <use href="/img/sprite.svg#icon-strategy"></use>
                    {'\n            '}
                  </svg>
                  {'\n          '}
                </div>
                {'\n          '}
                <h3 className="event-safety__feature-title">
                  {'Игры'}
                  <br />
                  {'по возрасту'}
                </h3>
                {'\n          '}
                <p className="event-safety__feature-text">
                  {
                    '\n            Подбираем сценарии и сложность под гостей: для младших — без страшных и жёстких моментов\n          '
                  }
                </p>
                {'\n        '}
              </li>
              {'\n        '}
              <li className="event-safety__feature" data-reveal="">
                {'\n          '}
                <div className="event-safety__icon-container" aria-hidden="true">
                  {'\n            '}
                  <svg className="event-safety__icon" aria-hidden="true">
                    {'\n              '}
                    <use href="/img/sprite.svg#icon-rectangledashed"></use>
                    {'\n            '}
                  </svg>
                  {'\n          '}
                </div>
                {'\n          '}
                <h3 className="event-safety__feature-title">
                  {'Безопасная'}
                  <br />
                  {'арена'}
                </h3>
                {'\n          '}
                <p className="event-safety__feature-text">
                  {
                    '\n            Просторная площадка без препятствий, а виртуальные границы заранее предупреждают о краях\n            зоны\n          '
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
