export default function ContactIcon({ name, className }) {
  if (name === 'email') {
    return (
      <svg
        className={className}
        viewBox="0 0 32 32"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      >
        <path d="M3 7h26v19H3Zm0 0 13 12L29 7M3 26l9-10m17 10-9-10" />
      </svg>
    );
  }

  if (name === 'route') {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      >
        <path d="m21 3-7 18-3-8-8-3 18-7Z" />
      </svg>
    );
  }

  return (
    <svg className={className} aria-hidden="true">
      <use href={`/img/sprite.svg#icon-${name}`} />
    </svg>
  );
}
