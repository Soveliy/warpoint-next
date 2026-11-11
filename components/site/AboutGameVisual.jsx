import { aboutGameScenes } from '../../lib/event-about-game';

export default function AboutGameVisual({ initialState }) {
  const scene = aboutGameScenes.find((item) => item.id === initialState) || aboutGameScenes[0];

  return (
    <div className="about-game__visual-wrap">
      <span className="about-game__visual-aura" aria-hidden="true" />
      <span className="about-game__visual-shadow" aria-hidden="true" />
      <div className="about-game__visual-model">
        <div className={`about-game__visual-state about-game__visual-state--${scene.id} is-active`}>
          <img
            className="about-game__visual"
            src={scene.src}
            width="1080"
            height="1440"
            alt={scene.alt}
            loading="lazy"
            decoding="async"
          />
        </div>
        <span className="about-game__visual-light" aria-hidden="true" />
      </div>
    </div>
  );
}
