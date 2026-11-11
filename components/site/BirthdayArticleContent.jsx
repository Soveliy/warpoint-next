function ArticleSection({ section, children }) {
  return (
    <section id={section.id} tabIndex={-1}>
      <h2>{section.title}</h2>
      {children}
    </section>
  );
}

export default function BirthdayArticleContent({ content }) {
  const { formats, age, experience, cost, preparation } = content;
  return (
    <>
      <ArticleSection section={formats}>
        <p>{formats.description}</p>
        <ul>
          {formats.items.map((item) => (
            <li key={item.label}>
              <strong>{item.label}</strong>
              {item.text}
            </li>
          ))}
        </ul>
      </ArticleSection>
      <ArticleSection section={age}>
        <div className="article-detail__table">
          <table>
            <thead>
              <tr>
                {age.headers.map((label) => (
                  <th key={label}>{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {age.rows.map(([range, description]) => (
                <tr key={range}>
                  <td>{range}</td>
                  <td>{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ArticleSection>
      <ArticleSection section={experience}>
        <p>{experience.description}</p>
        <figure>
          <img src={experience.image} alt={experience.imageAlt} loading="lazy" />
          <figcaption>{experience.caption}</figcaption>
        </figure>
        <blockquote>
          {experience.quote}
          <small>{experience.quoteAuthor}</small>
        </blockquote>
      </ArticleSection>
      <ArticleSection section={cost}>
        <p>
          {cost.introduction}
          <br />
          {cost.description}
          <a href={cost.link.href}>{cost.link.label}</a>.
        </p>
        <div className="article-detail__cta">
          <div>
            <h3 className="article-detail__cta-title">
              {cost.cta.title[0]}
              <br />
              {cost.cta.title[1]}
            </h3>
            <p className="article-detail__cta-description">{cost.cta.description}</p>
          </div>
          <button
            className="listing-button listing-button--solid article-detail__cta-action"
            type="button"
            data-booking-open=""
          >
            {cost.cta.action}
          </button>
        </div>
      </ArticleSection>
      <ArticleSection section={preparation}>
        <ol>
          {preparation.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </ArticleSection>
    </>
  );
}
