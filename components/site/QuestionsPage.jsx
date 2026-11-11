'use client';

import { useState } from 'react';
import QuestionItem from './QuestionItem';

export default function QuestionsPage({ groups }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="questions-page__content container">
      {groups.map((group, groupIndex) => (
        <section
          className="questions-page__group"
          key={group.title}
          aria-labelledby={`questions-group-${groupIndex}`}
        >
          <h2 className="questions-page__group-title" id={`questions-group-${groupIndex}`}>
            <span className="questions-page__group-number">{groupIndex + 1}</span>
            {group.title}
          </h2>
          <div className="questions-page__list">
            {group.questions.map(({ question, answer }, index) => {
              const key = `${groupIndex}-${index}`;
              const expanded = open === key;
              return (
                <QuestionItem
                  key={question}
                  question={question}
                  answer={answer}
                  itemId={key}
                  expanded={expanded}
                  onToggle={() => setOpen(expanded ? null : key)}
                />
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
