export default function MobileActions() {
  return (
    <>
      <nav className="mobile-actions" aria-label="Быстрые действия">
        {'\n  '}
        <button
          className="mobile-actions__booking button-reset"
          type="button"
          data-booking-open=""
        >
          {'\n    Забронировать\n  '}
        </button>
        {'\n  '}
        <div className="mobile-actions__messengers messenger-menu" data-messenger-menu="">
          {'\n    '}
          <button
            className="mobile-actions__button mobile-actions__button--message button-reset"
            type="button"
            aria-label="Мессенджеры"
            aria-expanded="false"
            aria-controls="mobile-messengers"
            data-messenger-toggle=""
          >
            {'\n      '}
            <svg className="mobile-actions__icon" aria-hidden="true">
              {'\n        '}
              <use href="/img/sprite.svg#icon-mess"></use>
              {'\n      '}
            </svg>
            {'\n    '}
          </button>
          {'\n    '}
          <ul
            className="messenger-menu__dropdown"
            id="mobile-messengers"
            aria-label="Мессенджеры Warpoint"
            data-messenger-dropdown=""
            hidden={true}
          >
            {'\n      '}
            <li>
              {'\n        '}
              <a className="messenger-menu__link" href="#" data-messenger-link="vk">
                {'\n          '}
                <svg className="messenger-menu__icon" aria-hidden="true">
                  {'\n            '}
                  <use href="/img/sprite.svg#icon-vk"></use>
                  {'\n          '}
                </svg>
                {'\n          '}
                <span>{'Написать во ВКонтакте'}</span>
                {'\n        '}
              </a>
              {'\n      '}
            </li>
            {'\n      '}
            <li>
              {'\n        '}
              <a className="messenger-menu__link" href="#" data-messenger-link="max">
                {'\n          '}
                <svg className="messenger-menu__icon" aria-hidden="true">
                  {'\n            '}
                  <use href="/img/sprite.svg#icon-max"></use>
                  {'\n          '}
                </svg>
                {'\n          '}
                <span>{'Написать в Макс'}</span>
                {'\n        '}
              </a>
              {'\n      '}
            </li>
            {'\n      '}
            <li>
              {'\n        '}
              <a className="messenger-menu__link" href="#" data-messenger-link="telegram">
                {'\n          '}
                <svg className="messenger-menu__icon" aria-hidden="true">
                  {'\n            '}
                  <use href="/img/sprite.svg#icon-tg"></use>
                  {'\n          '}
                </svg>
                {'\n          '}
                <span>{'Написать в Telegram'}</span>
                {'\n        '}
              </a>
              {'\n      '}
            </li>
            {'\n      '}
            <li>
              {'\n        '}
              <a className="messenger-menu__link" href="#" data-messenger-link="whatsapp">
                {'\n          '}
                <svg className="messenger-menu__icon" aria-hidden="true">
                  {'\n            '}
                  <use href="/img/sprite.svg#icon-whatsapp"></use>
                  {'\n          '}
                </svg>
                {'\n          '}
                <span>{'Написать в WhatsApp'}</span>
                {'\n        '}
              </a>
              {'\n      '}
            </li>
            {'\n    '}
          </ul>
          {'\n  '}
        </div>
        {'\n  '}
        <a
          className="mobile-actions__button mobile-actions__button--phone"
          href="tel:+73433000000"
          aria-label="Позвонить в Warpoint"
          title="Позвонить"
        >
          {'\n    '}
          <svg className="mobile-actions__icon" aria-hidden="true">
            {'\n      '}
            <use href="/img/sprite.svg#icon-phone"></use>
            {'\n    '}
          </svg>
          {'\n  '}
        </a>
        {'\n'}
      </nav>
    </>
  );
}
