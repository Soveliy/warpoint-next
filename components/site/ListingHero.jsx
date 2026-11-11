export default function ListingHero({
  title,
  accent,
  description,
  crumb,
  className = '',
  parents = [],
  image,
  meta,
}) {
  return (
    <section
      className={`listing-hero${image ? ' listing-hero--image' : ''} ${className}`}
      data-header-theme="brand"
    >
      <div
        className="listing-hero__wrap"
        style={image ? { '--listing-hero-image': `url("${image}")` } : undefined}
      >
        <div className="container listing-hero__content">
          <nav className="listing-hero__breadcrumbs" aria-label="Навигационная цепочка">
            <a className="listing-hero__breadcrumb-link" href="/indexpage/">
              Главная
            </a>
            {parents.map((item) => (
              <span className="listing-hero__parent" key={item.title}>
                <span aria-hidden="true">/</span>
                <a className="listing-hero__breadcrumb-link" href={item.href}>
                  {item.title}
                </a>
              </span>
            ))}
            <span aria-hidden="true">/</span>
            <span aria-current="page">{crumb}</span>
          </nav>
          {meta && <div className="listing-hero__meta">{meta}</div>}
          <h1 className="listing-hero__title">
            {title} <span className="listing-hero__accent">{accent}</span>
          </h1>
          <p className="listing-hero__description">{description}</p>
        </div>
      </div>
    </section>
  );
}
