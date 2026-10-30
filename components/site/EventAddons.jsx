'use client';

import { useState } from 'react';

const commonSlides = [
  { title: 'Шоу-программы', description: 'Зрелищные шоу, которые удивляют и создают вау-эффект', image: '/img/events/1.jpg', alt: 'Девочка на празднике в Warpoint' },
  { title: 'Праздничный торт', description: 'Яркое угощение для главного момента праздника', image: '/img/events_modal/1.jpg', alt: 'Ребёнок с праздничным тортом' },
  { title: 'DJ и ведущий', description: 'Музыка и программа, которые задают настроение вечеру', image: '/img/events_modal/2.jpg', alt: 'Гости празднуют вместе' },
  { title: 'Фотограф', description: 'Сохраните счастливые моменты и эмоции гостей', image: '/img/events_modal/3.jpg', alt: 'Гости позируют для общей фотографии' },
  { title: 'VR-игры', description: 'Добавьте к празднику ещё больше виртуальных приключений', image: '/img/events_modal/4.jpg', alt: 'Дети играют в виртуальной реальности' },
  { title: 'Сторисмейкер', description: 'Живые кадры с друзьями останутся с вами после праздника', image: '/img/events/2.jpg', alt: 'Компания друзей на празднике' },
  { title: 'Украшение шарами', description: 'Праздничная атмосфера с первых минут встречи гостей', image: '/img/events/3.jpg', alt: 'Гости на празднике с воздушными шарами' },
  { title: 'VR-станция', description: 'Новые впечатления для каждого участника праздника', image: '/img/gallery/6.jpg', alt: 'Гости играют в шлемах виртуальной реальности' },
];

const corporateSlides = [
  { ...commonSlides[0], image: '/img/show.jpg', alt: 'Шоу-программа на празднике в Warpoint' },
  { title: 'Кейтеринг', description: 'Угощения и напитки для гостей вашего мероприятия', image: '/img/event-addons/catering.webp', alt: 'Гости корпоратива празднуют за столом' },
  { title: 'Ведущий', description: 'Проведёт программу и создаст настроение для всей команды', image: '/img/event-addons/host.webp', alt: 'Ведущий с микрофоном на мероприятии' },
  { title: 'Видеосъёмка', description: 'Сохраните лучшие моменты мероприятия на видео', image: '/img/event-addons/camera-operator.webp', alt: 'Видеооператор снимает мероприятие' },
  { title: 'Киберспортивный турнир', description: 'Командное соревнование с награждением победителей', image: '/img/event-addons/tournament.webp', alt: 'Победители турнира в Warpoint' },
  commonSlides[5],
  { ...commonSlides[6], image: '/img/event-addons/catering.webp', alt: 'Гости празднуют среди воздушных шаров' },
  { ...commonSlides[7], image: '/img/events/adult-birthday.jpg', alt: 'Взрослые гости играют в виртуальной реальности' },
];

const iconByEvent = {
  birthday: '/img/svg/cake.svg',
  corporate: '/img/svg/martini.svg',
  graduation: '/img/svg/graduationcap.svg',
};

export default function EventAddons({ eventType = 'birthday' }) {
  const slides = eventType === 'corporate' ? corporateSlides : commonSlides;
  const [activeIndex, setActiveIndex] = useState(0);
  const show = (index) => setActiveIndex(Math.max(0, Math.min(index, slides.length - 1)));
  const onKeyDown = (event) => {
    if (!event.target.closest('[data-event-addons-step], [data-event-addons-prev], [data-event-addons-next]')) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(activeIndex + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  };

  return (
    <section className="event-addons" aria-labelledby="event-addons-title" data-header-theme="brand" data-event-addons="" onKeyDown={onKeyDown}>
      <div className="event-addons__layout container">
        <div className="event-addons__intro">
          <div className="event-addons__head section-head" data-reveal="">
            <h2 className="section-head__title" id="event-addons-title">
              Чем можно<br />дополнить<br /><span>праздник?</span>
            </h2>
          </div>
          <p className="event-addons__lead" data-reveal="">
            Добавьте шоу, угощения и памятные кадры — поможем организовать мероприятие с учётом всех пожеланий и количества гостей
          </p>
          <button className="event-addons__request btn btn--red" data-reveal="" type="button" aria-haspopup="dialog" aria-controls="event-request-modal" data-event-request-open="">
            <img className="event-addons__request-icon" src={iconByEvent[eventType]} width="30" height="30" alt="" aria-hidden="true" />
            Оставить заявку
          </button>
        </div>

        <div className="event-addons__showcase" data-reveal-image="">
          <div className="event-addons__slides" aria-live="polite">
            {slides.map((slide, index) => (
              <article
                className={`event-addons__slide${index === activeIndex ? ' is-active' : ''}`}
                data-event-addons-slide=""
                aria-hidden={index === activeIndex ? undefined : 'true'}
                inert={index === activeIndex ? undefined : true}
                key={`${slide.title}-${index}`}
              >
                <div className="event-addons__visual">
                  <img className="event-addons__image" src={slide.image} alt={slide.alt} width="472" height="682" loading="lazy" decoding="async" />
                </div>
                <div className="event-addons__details">
                  <span className="event-addons__count">
                    {String(index + 1).padStart(2, '0')}<span>/{String(slides.length).padStart(2, '0')}</span>
                  </span>
                  <h3 className="event-addons__slide-title">{slide.title}</h3>
                  <p className="event-addons__description">{slide.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="event-addons__progress" role="group" aria-label="Выбор дополнения к празднику">
            {slides.map((slide, index) => (
              <button
                className={`event-addons__progress-step button-reset${index === activeIndex ? ' is-active' : ''}`}
                type="button"
                aria-label={`${slide.title}, ${index + 1} из ${slides.length}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                data-event-addons-step={index}
                onClick={() => show(index)}
                key={`${slide.title}-${index}`}
              />
            ))}
          </div>

          <div className="event-addons__controls">
            <button className="event-addons__arrow button-reset" type="button" aria-label="Предыдущее дополнение" data-event-addons-prev="" disabled={activeIndex === 0} onClick={() => show(activeIndex - 1)}>
              <span aria-hidden="true" />
            </button>
            <button className="event-addons__arrow button-reset" type="button" aria-label="Следующее дополнение" data-event-addons-next="" disabled={activeIndex === slides.length - 1} onClick={() => show(activeIndex + 1)}>
              <span aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
