'use client';

import { useState } from 'react';

export default function ListingLead({ site, title, accent }) {
  const [prepared, setPrepared] = useState(false);
  const submit = (event) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Заявка WARPOINT — ${site.city}`);
    const body = encodeURIComponent(`Имя: ${values.get('name')}\nТелефон: ${values.get('phone')}\nГород: ${site.city}\nРаздел: ${title} ${accent}`);
    window.location.href = `mailto:feedback@warpoint.ru?subject=${subject}&body=${body}`;
    setPrepared(true);
  };
  return <section className="listing-lead container" id="contacts" aria-labelledby="listing-lead-title">
    <div className="listing-lead__copy">
      <h2 id="listing-lead-title">{title}<br /><span>{accent}</span></h2>
      <p>Оставьте заявку — менеджер подберёт игры под возраст и количество гостей</p>
    </div>
    <form className="listing-lead__form" onSubmit={submit}>
      <div className="listing-lead__fields">
        <label><span className="visually-hidden">Ваше имя</span><input name="name" autoComplete="name" placeholder="Ваше имя" required /></label>
        <label><span className="visually-hidden">Телефон</span><input name="phone" type="tel" autoComplete="tel" placeholder="Телефон" required minLength="10" /></label>
        <button className="listing-button listing-button--solid" type="submit">Оставить заявку</button>
      </div>
      <label className="listing-lead__consent"><input type="checkbox" required /> <span>Принимаю условия <a href="/legal/privacy/">Политики конфиденциальности</a> и даю согласие на <a href="/legal/consent/">обработку персональных данных</a></span></label>
      {prepared && <p className="listing-lead__message" role="status">Отправьте подготовленное письмо из почтовой программы. Если она не открылась, напишите на feedback@warpoint.ru.</p>}
    </form>
  </section>;
}
