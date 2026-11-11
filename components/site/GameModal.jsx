'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Swiper from 'swiper';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import { games } from '../../lib/games';
import { availableGames } from '../../lib/site-content';
import { useSiteLocation } from './SiteLocationProvider';
import { toggleScrollLock } from '../../interactions/_functions';

const asset = (path) => (path.startsWith('/') ? path : `/${path}`);

function trailerEmbed(url) {
  if (!url) return null;
  try {
    const link = new URL(url);
    const id = link.searchParams.get('v') || link.pathname.split('/').filter(Boolean).at(-1);
    if (!id) return null;
    if (link.hostname === 'rutube.ru' || link.hostname.endsWith('.rutube.ru'))
      return `https://rutube.ru/play/embed/${encodeURIComponent(id)}?autoplay=1`;
    if (
      link.hostname === 'youtube.com' ||
      link.hostname === 'www.youtube.com' ||
      link.hostname === 'youtu.be'
    )
      return `https://www.youtube.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;
  } catch {
    /* Ignore an invalid trailer URL. */
  }
  return null;
}

export default function GameModal() {
  const { site, location, locationId } = useSiteLocation();
  const pool = useMemo(() => availableGames(site, location, games), [site, location]);
  const dialog = useRef(null);
  const gallery = useRef(null);
  const pagination = useRef(null);
  const slidePrev = useRef(null);
  const slideNext = useRef(null);
  const description = useRef(null);
  const slider = useRef(null);
  const trigger = useRef(null);
  const wasLocked = useRef(false);
  const backdropDown = useRef(false);
  const [index, setIndex] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const game = index === null ? null : pool[index];

  useEffect(() => {
    const open = (event) => {
      const button = event.target.closest('[data-game-open]');
      const gameIndex = pool.findIndex((item) => item.id === button?.dataset.gameOpen);
      if (gameIndex < 0) return;
      event.preventDefault();
      trigger.current = button;
      wasLocked.current = document.documentElement.classList.contains('is-scroll-locked');
      setIndex(gameIndex);
      setPlaying(false);
      setExpanded(false);
      dialog.current?.showModal();
      toggleScrollLock(true);
    };
    document.addEventListener('click', open);
    return () => document.removeEventListener('click', open);
  }, [pool]);

  useEffect(() => {
    if (dialog.current?.open) dialog.current.close();
    setIndex(null);
    setPlaying(false);
    setExpanded(false);
  }, [locationId]);

  useEffect(() => {
    if (index === null || !gallery.current) return;
    slider.current?.destroy(true, true);
    slider.current = new Swiper(gallery.current, {
      modules: [A11y, Navigation, Pagination],
      slidesPerView: 1,
      speed: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 350,
      watchOverflow: true,
      navigation: { prevEl: slidePrev.current, nextEl: slideNext.current },
      pagination: { el: pagination.current, clickable: true },
      a11y: {
        prevSlideMessage: 'Предыдущее изображение',
        nextSlideMessage: 'Следующее изображение',
        paginationBulletMessage: 'Изображение {{index}}',
      },
      on: { slideChange: () => setPlaying(false) },
    });
    dialog.current.scrollTop = 0;
    return () => {
      slider.current?.destroy(true, true);
      slider.current = null;
    };
  }, [index]);

  useEffect(() => {
    if (!game || !description.current) return;
    const update = () => {
      const element = description.current;
      if (!element) return;
      const wasExpanded = element.classList.contains('is-expanded');
      element.classList.remove('is-expanded');
      setOverflowing(element.scrollHeight > element.clientHeight + 1);
      element.classList.toggle('is-expanded', wasExpanded);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(description.current);
    document.fonts?.ready.then(update);
    return () => observer.disconnect();
  }, [game]);

  const close = () => dialog.current?.close();
  const onClose = () => {
    setPlaying(false);
    setIndex(null);
    toggleScrollLock(wasLocked.current);
    if (trigger.current?.isConnected) trigger.current.focus({ preventScroll: true });
  };
  const isBackdrop = (event) => {
    const rect = dialog.current.getBoundingClientRect();
    return (
      event.target === dialog.current &&
      (event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom)
    );
  };
  const changeGame = (offset) => {
    setPlaying(false);
    setExpanded(false);
    setIndex((value) => Math.max(0, Math.min(pool.length - 1, value + offset)));
  };
  const embed = trailerEmbed(game?.trailer);

  return (
    <dialog
      ref={dialog}
      className="game-modal"
      id="game-modal"
      aria-labelledby="game-modal-title"
      onClose={onClose}
      onPointerDown={(event) => {
        backdropDown.current = isBackdrop(event);
      }}
      onClick={(event) => {
        if (backdropDown.current && isBackdrop(event)) close();
        backdropDown.current = false;
      }}
      onKeyDown={(event) => {
        event.stopPropagation();
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          event.key === 'ArrowLeft' ? slider.current?.slidePrev() : slider.current?.slideNext();
        }
      }}
    >
      <div className="game-modal__close-wrap">
        <button
          className="game-modal__close button-reset"
          type="button"
          aria-label="Закрыть описание игры"
          onClick={close}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
      <div ref={gallery} className="game-modal__gallery swiper" aria-label="Галерея игры">
        <div className="swiper-wrapper">
          {game &&
            [game.cover, ...game.images].map((src, slideIndex) => (
              <div className="game-modal__slide swiper-slide" key={`${game.id}-${slideIndex}`}>
                <img
                  src={asset(src)}
                  alt={`${game.title} — ${slideIndex ? `изображение ${slideIndex}` : 'обложка'}`}
                  className={`game-modal__image${slideIndex === 0 ? ' game-modal__image--cover' : ''}`}
                  decoding="async"
                />
                {slideIndex === 0 && game.trailer && (
                  <div className="game-modal__play" hidden={playing}>
                    <button
                      className="play-button"
                      type="button"
                      aria-label="Смотреть трейлер игры"
                      onClick={() => setPlaying(true)}
                    >
                      <svg className="play-button__icon" aria-hidden="true">
                        <use href="/img/sprite.svg#icon-play" />
                      </svg>
                    </button>
                    <span>Смотреть геймплей</span>
                  </div>
                )}
                {slideIndex === 0 && playing && embed && (
                  <iframe
                    className="game-modal__video"
                    src={embed}
                    title={`Трейлер: ${game.title}`}
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                )}
              </div>
            ))}
        </div>
        <button
          ref={slidePrev}
          className="game-modal__arrow game-modal__arrow--prev button-reset"
          type="button"
          aria-label="Предыдущее изображение"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m15 5-7 7 7 7" />
          </svg>
        </button>
        <button
          ref={slideNext}
          className="game-modal__arrow game-modal__arrow--next button-reset"
          type="button"
          aria-label="Следующее изображение"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 5 7 7-7 7" />
          </svg>
        </button>
        <div ref={pagination} className="game-modal__pagination" />
      </div>
      <div className="game-modal__content">
        <ul className="game-modal__tags" aria-label="Характеристики игры">
          {game?.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <h2 className="game-modal__title" id="game-modal-title">
          {game?.title}
        </h2>
        <div
          ref={description}
          className={`game-modal__description${expanded ? ' is-expanded' : ''}`}
          id="game-modal-description"
        >
          {game?.description.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
        <button
          className="game-modal__expand button-reset"
          type="button"
          aria-expanded={expanded}
          aria-controls="game-modal-description"
          hidden={!overflowing}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? 'Свернуть' : 'Читать полностью'}
        </button>
        <nav className="game-modal__navigation" aria-label="Выбор игры">
          <button
            className="game-modal__game button-reset"
            type="button"
            disabled={index === 0 || index === null}
            onClick={() => changeGame(-1)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m15 5-7 7 7 7" />
            </svg>
            <span>Предыдущая игра</span>
          </button>
          <button
            className="game-modal__game button-reset"
            type="button"
            disabled={index === pool.length - 1 || index === null}
            onClick={() => changeGame(1)}
          >
            <span>Следующая игра</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m9 5 7 7-7 7" />
            </svg>
          </button>
        </nav>
      </div>
    </dialog>
  );
}
