function policyText(value) {
  return value.split(/(https?:\/\/[^\s]+)/g).map((part, index) => {
    if (!/^https?:\/\//.test(part)) return part;
    const href = part.replace(/[.,;:)»]+$/, '');
    const suffix = part.slice(href.length);
    return (
      <span key={index}>
        <a
          className="privacy-page__text-link"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {href}
        </a>
        {suffix}
      </span>
    );
  });
}
export default function PrivacyPolicy({ policy }) {
  return (
    <div className="privacy-page__content container">
      {policy.intro?.length > 0 && (
        <div className="privacy-page__intro">
          {policy.intro.map((paragraph) => (
            <p className="privacy-page__lead" key={paragraph}>
              {policyText(paragraph)}
            </p>
          ))}
        </div>
      )}
      {policy.sections.map((section, sectionIndex) => {
        const Heading = section.headingLevel === 3 ? 'h3' : 'h2';
        return (
          <section
            className={
              'privacy-page__section' +
              (section.paragraphs.length ? '' : ' privacy-page__section--heading')
            }
            key={section.number || section.title}
            aria-labelledby={'policy-section-' + (sectionIndex + 1)}
          >
            <Heading
              className={
                'privacy-page__heading' +
                (section.headingLevel === 3 ? ' privacy-page__heading--subsection' : '')
              }
              id={'policy-section-' + (sectionIndex + 1)}
            >
              {section.number != null && (
                <span className="privacy-page__section-number">{section.number}</span>
              )}
              {section.title}
            </Heading>
            <div className="privacy-page__clauses">
              {section.paragraphs.map((paragraph, index) => {
                const content = paragraph.replace(/[\u200b\ufeff]/g, '');
                if (section.subheadings?.includes(content)) {
                  return (
                    <h3 className="privacy-page__subheading" key={content}>
                      {content}
                    </h3>
                  );
                }
                const match = content.match(/^(\d+(?:\.\d+)+\.?)\s*([\s\S]+)$/);
                return (
                  <p
                    className={
                      'privacy-page__clause' + (match ? '' : ' privacy-page__clause--unnumbered')
                    }
                    key={String(section.number || section.title) + '-' + index}
                  >
                    {match ? (
                      <>
                        <span className="privacy-page__clause-number">{match[1]}</span>
                        <span>{policyText(match[2])}</span>
                      </>
                    ) : (
                      <span className="privacy-page__clause-text">{policyText(content)}</span>
                    )}
                  </p>
                );
              })}
            </div>
          </section>
        );
      })}
      {policy.ending?.length > 0 && (
        <div className="privacy-page__ending">
          {policy.ending.map((paragraph) => (
            <p className="privacy-page__lead" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
