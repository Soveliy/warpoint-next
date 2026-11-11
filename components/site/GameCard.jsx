export default function GameCard({ game }) {
  return (
    <article className="games-listing__card">
      <img
        className="games-listing__cover"
        src={`/${game.cover}`}
        width={game.catalogWidth}
        height={game.catalogHeight}
        alt=""
        loading="lazy"
        decoding="async"
      />
      <div className="games-listing__tags" aria-label="Параметры игры">
        <span className="games-listing__tag">{game.zone}</span>
        <span className="games-listing__tag">{game.genre}</span>
        <span className="games-listing__tag">{game.players}</span>
        <span className="games-listing__tag">{game.age}</span>
      </div>
      <div className="games-listing__card-copy">
        <h2 className="games-listing__card-title">{game.title}</h2>
        <p className="games-listing__card-description">{game.summary}</p>
      </div>
      <button
        className="games-listing__open"
        type="button"
        data-game-open={game.id}
        aria-label={`Подробнее об игре «${game.title}»`}
        aria-haspopup="dialog"
        aria-controls="game-modal"
      />
    </article>
  );
}
