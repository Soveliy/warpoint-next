export default function QuestionItem({ question, answer, itemId, expanded, onToggle }) {
  return (
    <div className={`questions-page__item${expanded ? ' questions-page__item--open' : ''}`}>
      <h3 className="questions-page__question-title">
        <button
          className="questions-page__question"
          type="button"
          id={`question-${itemId}`}
          aria-expanded={expanded}
          aria-controls={`question-answer-${itemId}`}
          onClick={onToggle}
        >
          {question}
          <span className="questions-page__toggle" aria-hidden="true" />
        </button>
      </h3>
      <div
        className="questions-page__answer"
        id={`question-answer-${itemId}`}
        aria-hidden={!expanded}
        inert={!expanded}
        role="region"
        aria-labelledby={`question-${itemId}`}
      >
        <div className="questions-page__answer-content">
          {answer.map((paragraph) => (
            <p className="questions-page__paragraph" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
