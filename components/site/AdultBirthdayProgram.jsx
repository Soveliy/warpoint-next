const steps = [
  { time: '10 минут', title: <>Встреча<br />и инструктаж</>, text: 'Администратор знакомит гостей с ареной, помогает с очками и объясняет правила' },
  { time: '60 минут', title: 'Игры и турнир', text: 'Командные миссии и бои команда на команду: болеют даже те, кто сейчас не играет' },
  { time: '15 минут', title: 'Награждение', text: 'Итоги турнира и поздравление именинника' },
  { time: '30 минут', title: <>Праздничный<br />стол</>, text: 'В лаунж-зоне: угощения, торт, настольные игры и приставка' },
  { time: '5 минут', title: <>Общее<br />фото</>, text: 'Кадр всей компанией — на память о празднике' },
];
const companies = [
  { title: 'С друзьями', icon: 'users', text: 'Командные сражения и турнир на звание лучшего игрока вечера' },
  { title: 'С коллегами', icon: 'strategy', text: 'Отметить день рождения сотрудника всем отделом' },
  { title: 'С семьёй', icon: 'handheart', text: 'Играют все поколения: VR понятен и детям, и родителям' },
];

export default function AdultBirthdayProgram() {
  return <section className="event-program" aria-labelledby="event-program-title" data-header-theme="brand">
    <div className="container">
      <div className="event-program__head section-head section-head--center" data-reveal="">
        <h2 className="section-head__title" id="event-program-title">Программа<br /><span>мероприятия</span></h2>
        <p className="section-head__lead">Примерный сценарий на 2 часа.<br />Подстроим его под возраст и количество гостей</p>
      </div>
      <ol className="event-program__steps">{steps.map((step) => <li className="event-program__step" data-reveal="" key={step.time}>
        <span className="event-program__time">{step.time}</span><h3 className="event-program__step-title">{step.title}</h3><p className="event-program__step-text">{step.text}</p>
      </li>)}</ol>
      <div className="event-program__details">
        <div className="event-program__details-intro" data-reveal=""><h3 className="event-program__details-title">С кем<br />празднуете?</h3><p className="event-program__details-text">Подберём игры и сценарий<br />под ваших гостей</p></div>
        <ul className="event-program__details-list">{companies.map((company) => <li className="event-program__details-card" data-reveal="" key={company.title}>
          <div className="event-program__icon-container" aria-hidden="true"><svg><use href={`/img/sprite.svg#icon-${company.icon}`} /></svg></div>
          <h4 className="event-program__details-card-title">{company.title}</h4><p className="event-program__details-card-text">{company.text}</p>
        </li>)}</ul>
      </div>
    </div>
  </section>;
}
