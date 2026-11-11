export default function PrivacyPolicy({ policy }) {
  return (
    <div className="privacy-page__content container">
      {policy.sections.map((section) => (
        <section
          className="privacy-page__section"
          key={section.number}
          aria-labelledby={`policy-section-${section.number}`}
        >
          <h2 className="privacy-page__heading" id={`policy-section-${section.number}`}>
            <span className="privacy-page__section-number">{section.number}</span>
            {section.title}
          </h2>
          <div className="privacy-page__clauses">
            {section.paragraphs.map((paragraph, index) => {
              const match = paragraph.match(/^(\d+(?:\.\d+)+)\.\s+(.+)$/);
              return (
                <p className="privacy-page__clause" key={`${section.number}-${index}`}>
                  {match ? (
                    <>
                      <span className="privacy-page__clause-number">{match[1]}.</span>
                      <span>{match[2]}</span>
                    </>
                  ) : (
                    <span className="privacy-page__clause-text">{paragraph}</span>
                  )}
                </p>
              );
            })}
          </div>
        </section>
      ))}

    </div>
  );
}
