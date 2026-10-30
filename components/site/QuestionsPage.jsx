'use client';

import { useState } from 'react';

const questions = [
  {
    question: 'Что такое WARPOINT?',
    answer: [
      'WARPOINT — это сеть парков виртуальной реальности, где гости могут играть в командные и одиночные VR-игры, соревноваться с друзьями или проводить праздничные мероприятия.',
      'Для наших парков мы разрабатываем собственные многопользовательские VR-игры со свободным перемещением, которые подходят для детей и взрослых.',
      'Наша визитная карточка — игра собственной разработки WARPOINT ARENA. Это PvP-шутер, в котором участники делятся на 2 команды и сражаются между собой.',
    ],
  },
  { question: 'Сколько человек могут играть одновременно?', answer: ['Количество участников зависит от выбранной зоны и игры. На арене одновременно могут играть до 10 человек.'] },
  { question: 'С какого возраста можно играть?', answer: ['Возрастные ограничения зависят от игры и указаны в каталоге. Для детей есть отдельные игровые режимы.'] },
  { question: 'Нужно ли бронировать игру заранее?', answer: ['Рекомендуем записаться заранее, чтобы выбрать удобное время и площадку.'] },
  { question: 'Можно ли провести праздник в парке?', answer: ['Да. В WARPOINT проводят дни рождения, корпоративы, выпускные и другие групповые мероприятия.'] },
  { question: 'Как обрабатывают оборудование?', answer: ['Оборудование обрабатывается после каждого игрового сеанса.'] },
];

export default function QuestionsPage() {
  const [open, setOpen] = useState(0);
  return <section className="questions-page__content container" aria-labelledby="questions-group-title">
    <h2 id="questions-group-title"><span>1</span> Общие вопросы</h2>
    <div className="questions-page__list">
      {questions.map(({ question, answer }, index) => <div className="questions-page__item" key={question}>
        <h3><button type="button" aria-expanded={open === index} aria-controls={`question-answer-${index}`} onClick={() => setOpen(open === index ? -1 : index)}>
          {question}<span aria-hidden="true">{open === index ? '−' : '+'}</span>
        </button></h3>
        {open === index && <div className="questions-page__answer" id={`question-answer-${index}`}>{answer.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>}
      </div>)}
    </div>
  </section>;
}
