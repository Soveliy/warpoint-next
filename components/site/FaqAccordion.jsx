'use client';

import { useState } from 'react';

const questions = [
  ['В чём отличие WARPOINT от других клубов виртуальной реальности?', 'В WARPOINT можно свободно перемещаться по большой игровой площадке, видеть участников своей команды и взаимодействовать с ними внутри виртуального мира.'],
  ['Сколько человек могут играть одновременно?', 'Количество участников зависит от выбранной зоны и игры. На арене одновременно могут играть до 10 человек.'],
  ['С какого возраста можно играть в WARPOINT?', 'Большинство игр подходит детям от 6 лет. Возрастные ограничения указаны в карточках игр.'],
  ['Можно ли играть, если у человека плохое зрение или он носит очки?', 'Гарнитуру можно настроить под особенности зрения. Возможность играть в очках зависит от их формы и размера, поэтому лучше заранее уточнить это у менеджера.'],
  ['Дезинфицируют ли оборудование перед игрой?', 'Да, оборудование обрабатывается после каждого игрового сеанса.'],
  ['Можно ли у вас провести день рождения или корпоратив?', 'Да, в клубе можно провести день рождения, корпоратив, выпускной и другое групповое мероприятие.'],
  ['Можно ли у вас купить подарочный сертификат?', 'Да, подарочный сертификат можно оформить через администратора клуба.'],
  ['Можно ли прийти без записи?', 'Можно, если в это время есть свободные места. Чтобы гарантированно попасть на игру, рекомендуем забронировать сеанс заранее.'],
  ['Если я опоздаю, то оплата будет за полную сессию или только за время в игре?', 'Если опаздываете, сообщите об этом администратору клуба. Он подскажет, можно ли перенести начало игры и как будет рассчитана оплата.'],
];

const schema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: questions.map(([question, answer]) => ({
    '@type': 'Question', name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
}).replaceAll('<', '\\u003c');

export default function FaqAccordion() {
  const [open, setOpen] = useState(null);
  return (
    <>
      <script id="faq-schema" type="application/ld+json">{schema}</script>
      <div className="faq__content" id="faq-list">
        {questions.map(([question, answer], index) => {
          const expanded = open === index;
          return (
            <div className={`faq__item${expanded ? ' is-open' : ''}`} key={question}>
              <h3 className="faq__question-heading">
                <button className="faq__question button-reset" id={`faq-question-${index + 1}`} type="button"
                  aria-expanded={expanded} aria-controls={`faq-answer-${index + 1}`}
                  onClick={() => setOpen(expanded ? null : index)}>{question}</button>
              </h3>
              <div className="faq__answer" id={`faq-answer-${index + 1}`} role="region"
                aria-labelledby={`faq-question-${index + 1}`} aria-hidden={!expanded} inert={!expanded}>
                <p className="faq__answer-text">{answer}</p>
              </div>
            </div>
          );
        })}
        <a href="#" className="faq__more">Смотреть все вопросы</a>
      </div>
    </>
  );
}
