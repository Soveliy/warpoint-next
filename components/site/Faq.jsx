import FaqAccordion from "./FaqAccordion";
import { siteFields } from '../../lib/site-fields';

export default function Faq({ site }) {
  const fields = siteFields(site);
  return (
    <>
      <section className="faq" id="faq" data-header-theme="dark" aria-labelledby="faq-title">
        {'\n  '}
        <div className="faq__container container">
          {'\n    '}
          <div className="faq__aside">
            {'\n      '}
            <h2 className="faq__title" id="faq-title">
              {'Часто задаваемые вопросы'}
            </h2>
            {'\n\n      '}
            <div className="faq__callback faq__callback--desk">
              {'\n        '}
              <form className="faq__form" data-callback-form="" noValidate={true}>
                {'\n          '}
                <p className="faq__form-title">{'Остались вопросы? Задайте их менеджеру'}</p>
                {'\n\n          '}
                <div className="faq__fields">
                  {'\n            '}
                  <label className="visually-hidden" htmlFor="callback-name">
                    {'Ваше имя'}
                  </label>
                  {'\n            '}
                  <input
                    className="faq__input"
                    id="callback-name"
                    name="name"
                    type="text"
                    placeholder="Ваше Имя"
                    autoComplete="name"
                    minLength="2"
                    data-validate=""
                    required={true}
                  />
                  {'\n\n            '}
                  <label className="visually-hidden" htmlFor="callback-phone">
                    {'Телефон'}
                  </label>
                  {'\n            '}
                  <input
                    className="faq__input"
                    id="callback-phone"
                    name="phone"
                    type="tel"
                    placeholder="+7 (000) 000-00-00"
                    autoComplete="tel"
                    inputMode="tel"
                    maxLength="18"
                    data-phone-mask=""
                    data-validate=""
                    required={true}
                  />
                  {'\n\n            '}
                  <label className="visually-hidden" htmlFor="callback-email">
                    {'Email'}
                  </label>
                  {'\n            '}
                  <input
                    className="faq__input"
                    id="callback-email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    data-validate=""
                    required={true}
                  />
                  {'\n          '}
                </div>
                {'\n\n          '}
                <label className="faq__agreement">
                  {'\n            '}
                  <input
                    className="faq__agreement-input"
                    name="agreement"
                    type="checkbox"
                    data-validate=""
                    required={true}
                  />
                  {'\n            '}
                  <span className="faq__agreement-box" aria-hidden="true"></span>
                  {'\n            '}
                  <span>
                    {' Принимаю условия '}
                    <a href="#">{'политики конфиденциальности'}</a>
                    {' и даю согласие на '}
                    <a href="#">{'обработку\n                персональных данных'}</a>
                  </span>
                  {'\n          '}
                </label>
                {'\n\n          '}
                <button className="faq__submit btn btn--red button-reset" type="submit">
                  {'\n            '}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {'\n              '}
                    <path
                      d="M14.0942 1.63218C14.126 1.51321 14.1809 1.40166 14.2559 1.30393C14.3308 1.2062 14.4243 1.12419 14.5309 1.0626C14.6376 1.001 14.7553 0.961021 14.8774 0.944945C14.9996 0.928869 15.1236 0.93701 15.2426 0.968904C16.9806 1.42236 18.5662 2.33091 19.8363 3.60098C21.1064 4.87105 22.0149 6.45672 22.4684 8.19468C22.5003 8.31364 22.5084 8.43772 22.4923 8.55983C22.4763 8.68194 22.4363 8.79968 22.3747 8.90633C22.3131 9.01298 22.2311 9.10645 22.1333 9.1814C22.0356 9.25634 21.9241 9.3113 21.8051 9.34312C21.7259 9.36392 21.6444 9.37456 21.5625 9.37476C21.3561 9.37483 21.1554 9.30675 20.9916 9.1811C20.8278 9.05545 20.7101 8.87925 20.6567 8.67984C20.287 7.26086 19.5456 5.96615 18.5088 4.92919C17.4721 3.89223 16.1775 3.15055 14.7586 2.78062C14.6395 2.74892 14.5279 2.69406 14.43 2.61917C14.3321 2.54428 14.25 2.45082 14.1883 2.34416C14.1266 2.2375 14.0865 2.11971 14.0703 1.99754C14.0542 1.87538 14.0623 1.75122 14.0942 1.63218ZM13.8211 6.53062C15.4371 6.96187 16.4754 8.00133 16.9067 9.61734C16.9601 9.81675 17.0778 9.99295 17.2416 10.1186C17.4054 10.2443 17.6061 10.3123 17.8125 10.3123C17.8944 10.3121 17.9759 10.3014 18.0551 10.2806C18.1741 10.2488 18.2856 10.1938 18.3833 10.1189C18.4811 10.044 18.5631 9.95048 18.6247 9.84383C18.6863 9.73718 18.7263 9.61944 18.7423 9.49733C18.7584 9.37522 18.7503 9.25114 18.7184 9.13218C18.1184 6.88687 16.5504 5.3189 14.3051 4.7189C14.0648 4.65472 13.8089 4.68861 13.5937 4.81311C13.3784 4.93761 13.2214 5.14252 13.1572 5.38277C13.0931 5.62302 13.1269 5.87892 13.2514 6.09419C13.3759 6.30945 13.5809 6.46644 13.8211 6.53062ZM22.309 15.7568L16.7883 13.283L16.7731 13.2759C16.4865 13.1534 16.1738 13.1042 15.8634 13.1328C15.553 13.1615 15.2547 13.267 14.9953 13.44C14.9648 13.4602 14.9354 13.4821 14.9074 13.5056L12.0551 15.9373C10.2481 15.0595 8.38243 13.208 7.5047 11.4244L9.93985 8.52867C9.96329 8.49937 9.98556 8.47008 10.0067 8.43844C10.1759 8.1798 10.2786 7.88334 10.3056 7.57543C10.3326 7.26753 10.283 6.95772 10.1613 6.67359V6.65953L7.68048 1.12945C7.51963 0.758276 7.24305 0.449078 6.89203 0.248011C6.541 0.046945 6.13437 -0.0352048 5.73282 0.0138253C4.1449 0.222779 2.68733 1.00262 1.63235 2.20769C0.577378 3.41276 -0.00286047 4.96065 1.06039e-05 6.56226C1.06039e-05 15.867 7.57032 23.4373 16.875 23.4373C18.4766 23.4401 20.0245 22.8599 21.2296 21.8049C22.4347 20.7499 23.2145 19.2924 23.4234 17.7045C23.4726 17.303 23.3906 16.8965 23.1897 16.5455C22.9889 16.1945 22.6799 15.9178 22.309 15.7568Z"
                      fill="white"
                    ></path>
                    {'\n            '}
                  </svg>
                  {'\n            Заказать звонок\n          '}
                </button>
                {'\n        '}
              </form>
              {'\n\n        '}
              <img
                className="faq__image"
                src="/img/form.png"
                width="378"
                height="438"
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
              />
              {'\n      '}
            </div>
            {'\n    '}
          </div>
          {'\n\n    '}
          <FaqAccordion />
          <div className="faq__callback faq__callback--mobile">
            {'\n      '}
            <form className="faq__form" data-callback-form="" noValidate={true}>
              {'\n        '}
              <p className="faq__form-title">
                {'Остались вопросы?'}
                <br />
                {'Задайте их менеджеру'}
              </p>
              {'\n\n        '}
              <div className="faq__fields">
                {'\n          '}
                <label className="visually-hidden" htmlFor="callback-mobile-name">
                  {'Ваше имя'}
                </label>
                {'\n          '}
                <input
                  className="faq__input"
                  id="callback-mobile-name"
                  name="name"
                  type="text"
                  placeholder="Ваше Имя"
                  autoComplete="name"
                  minLength="2"
                  data-validate=""
                  required={true}
                />
                {'\n\n          '}
                <label className="visually-hidden" htmlFor="callback-mobile-phone">
                  {'Телефон'}
                </label>
                {'\n          '}
                <input
                  className="faq__input"
                  id="callback-mobile-phone"
                  name="phone"
                  type="tel"
                  placeholder="+7 (000) 000-00-00"
                  autoComplete="tel"
                  inputMode="tel"
                  maxLength="18"
                  data-phone-mask=""
                  data-validate=""
                  required={true}
                />
                {'\n\n          '}
                <label className="visually-hidden" htmlFor="callback-mobile-email">
                  {'Email'}
                </label>
                {'\n          '}
                <input
                  className="faq__input"
                  id="callback-mobile-email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  data-validate=""
                  required={true}
                />
                {'\n        '}
              </div>
              {'\n\n        '}
              <label className="faq__agreement">
                {'\n          '}
                <input
                  className="faq__agreement-input"
                  name="agreement"
                  type="checkbox"
                  data-validate=""
                  required={true}
                />
                {'\n          '}
                <span className="faq__agreement-box" aria-hidden="true"></span>
                {'\n          '}
                <span>
                  {
                    'Принимаю условия политики конфиденциальности и даю согласие на обработку персональных\n            данных'
                  }
                </span>
                {'\n        '}
              </label>
              {'\n\n        '}
              <button className="faq__submit button-reset" type="submit">
                {'Заказать звонок'}
              </button>
              {'\n      '}
            </form>
            {'\n\n      '}
            <img
              className="faq__image"
              src="/img/form.png"
              width="378"
              height="438"
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />
            {'\n    '}
          </div>
          {'\n  '}
        </div>
        {'\n'}
      </section>
    </>
  );
}
