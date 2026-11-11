import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initAboutGameSequence } from './components/about-game-sequence.js';
import { initAnimations } from './components/animations.js';
import { initCardAnimations } from './components/card-animations.js';
import { initEventHero } from './components/event-hero.js';
import { initEventsSequence } from './components/events-sequence.js';
import { initFancybox } from './components/fancybox.js';
import { initGamesSequence } from './components/games-sequence.js';
import { initPhoneMasks } from './components/phone-mask.js';
import { initPixelTransitions } from './components/pixel-transition.js';
import { initPreloader } from './components/preloader.js';
import { initReviews } from './components/reviews.js';
import { initSliders } from './components/sliders.js';
import { initVideoParallax } from './components/video-parallax.js';
import { initYandexMaps } from './components/yandex-map.js';

export function initPageInteractions() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  initEventHero();
  initPreloader();
  initPhoneMasks();
  initFancybox();
  initAnimations();
  initVideoParallax();
  initAboutGameSequence();
  initEventsSequence();
  initReviews();
  initPixelTransitions();
  initSliders();
  initGamesSequence();
  initCardAnimations();
  initYandexMaps();

  let refreshFrame = null;

  const refreshScrollAnimations = () => {
    if (refreshFrame !== null) {
      window.cancelAnimationFrame(refreshFrame);
    }

    refreshFrame = window.requestAnimationFrame(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
      refreshFrame = null;
    });
  };

  refreshScrollAnimations();
  document.fonts?.ready.then(refreshScrollAnimations);

  if (document.readyState !== 'complete') {
    window.addEventListener('load', refreshScrollAnimations, { once: true });
  }
}
