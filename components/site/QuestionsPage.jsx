'use client';

import { useState } from 'react';
import { questionGroups } from '../../lib/questions';

export default function QuestionsPage() {
  const [open, setOpen] = useState(null);
  return <div className="questions-page__content container">
    {questionGroups.map((group, groupIndex) => <section className="questions-page__group" key={group.title} aria-labelledby={`questions-group-${groupIndex}`}>
      <h2 id={`questions-group-${groupIndex}`}><span>{groupIndex + 1}</span>{group.title}</h2>
      <div className="questions-page__list">{group.questions.map(({ question, answer }, index) => {
        const key = `${groupIndex}-${index}`;
        const expanded = open === key;
        return <div className={`questions-page__item${expanded ? ' is-open' : ''}`} key={question}>
          <h3><button type="button" id={`question-${key}`} aria-expanded={expanded} aria-controls={`question-answer-${key}`} onClick={() => setOpen(expanded ? null : key)}>
            {question}<span aria-hidden="true">{expanded ? '−' : '+'}</span>
          </button></h3>
          <div className="questions-page__answer" id={`question-answer-${key}`} hidden={!expanded} role="region" aria-labelledby={`question-${key}`}>{answer.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        </div>;
      })}</div>
    </section>)}
  </div>;
}
