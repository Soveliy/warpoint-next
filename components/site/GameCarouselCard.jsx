import { games } from '../../lib/games';

const carouselGameIds = [
  'warpoint-arena',
  'snow-battle',
  'farm',
  'diamonds',
  'paint-battle',
  'flying-saucers',
  'kids-arena',
  'beat-saber',
];

const carouselGames = carouselGameIds
  .map((id) => games.find((game) => game.id === id))
  .filter(Boolean);

export function GameCarouselCards({ items = carouselGames }) {
  return items.map((game) => <GameCarouselCard key={game.id} game={game} />);
}

export default function GameCarouselCard({ game }) {
  return (
    <article className="game-card swiper-slide">
      <img
        className="game-card__image"
        src={`/${game.catalogCover}`}
        width={game.catalogWidth}
        height={game.catalogHeight}
        alt={game.title}
        loading="lazy"
        decoding="async"
      />
      <div className="game-card__meta">
        <span className="game-card__tag game-card__tag--accent">{game.zone}</span>
        <span className="game-card__tag">{game.genres.join(', ')}</span>
        <span className="game-card__tag">{game.players}</span>
        <span className="game-card__tag game-card__tag--age">{game.age}</span>
      </div>
      <div className="game-card__content">
        <h3 className="game-card__title">{game.title}</h3>
        <p className="game-card__description">{game.summary}</p>
        <button
          className="game-card__more button-reset"
          type="button"
          data-game-open={game.id}
          aria-haspopup="dialog"
          aria-controls="game-modal"
        >
          Подробнее
        </button>
      </div>
    </article>
  );
}
