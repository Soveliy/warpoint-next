'use client';

import { siteFields } from '../../lib/site-fields';
import { usePromoVideo } from './usePromoVideo';

export default function HomeVideoSection({ site }) {
  const fields = siteFields(site);
  const promo = usePromoVideo();
  return (
    <>
      <section
        className={promo.className}
        data-header-theme="brand"
        aria-labelledby="promo-video-title"
        data-promo-video-section=""
        ref={promo.sectionRef}
        style={promo.originStyle}
      >
        {'\n      '}
        <img
          className="video-section__background"
          src="/img/promo-video.jpg"
          width="1512"
          height="982"
          alt=""
        />
        {'\n      '}
        <div
          className="video-section__player"
          id="promo-video-player"
          aria-hidden={promo.state === 'closed'}
          data-promo-video-player=""
        >
          {'\n        '}
          <svg className="video-section__player-icon play-button__icon" aria-hidden="true">
            {'\n          '}
            <use href="/img/sprite.svg#icon-play"></use>
            {'\n        '}
          </svg>
          {'\n        '}
          <video
            className="video-section__video"
            playsInline={true}
            preload="metadata"
            src="/video/video_preview.mp4"
            controls={promo.state === 'open' || promo.playFailed}
            ref={promo.videoRef}
            poster="/img/promo-video.jpg"
            data-promo-video-media=""
          ></video>
          {'\n        '}
          <button
            className="video-section__close button-reset"
            type="button"
            aria-label="Закрыть видео"
            tabIndex={promo.state === 'open' ? 0 : -1}
            data-promo-video-close=""
            ref={promo.closeRef}
            onClick={promo.close}
          ></button>
          {'\n      '}
        </div>
        {'\n      '}
        <div className="video-section__content">
          {'\n        '}
          <h2 className="video-section__title" id="promo-video-title">
            {'\n          '}
            <span>{'Превратите'}</span>
            {'\n          '}
            <span>{'обычную встречу'}</span>
            {'\n          '}
            <span className="video-section__title-accent">{'в событие'}</span>
            {'\n        '}
          </h2>
          {'\n        '}
          <p className="video-section__description">
            {'\n          '}
            <span>{'От встречи с друзьями до дня рождения или корпоратива'}</span>
            {'\n          '}
            <span>{'— WARPOINT подходит для тех случаев, когда хочется'}</span>
            {'\n          '}
            <span>{'чего-то интереснее обычных развлечений.'}</span>
            {'\n        '}
          </p>
          {'\n        '}
          <div className="video-section__control">
            {'\n          '}
            <button
              className="video-section__play play-button"
              type="button"
              aria-label="Открыть видео"
              aria-controls="promo-video-player"
              aria-expanded={promo.state !== 'closed'}
              data-promo-video=""
              disabled={promo.state !== 'closed'}
              ref={promo.playRef}
              onClick={promo.open}
            >
              {'\n            '}
              <svg className="play-button__icon" aria-hidden="true">
                {'\n              '}
                <use href="/img/sprite.svg#icon-play"></use>
                {'\n            '}
              </svg>
              {'\n          '}
            </button>
            {'\n          '}
            <span className="video-section__duration">{'Смотреть видео'}</span>
            {'\n        '}
          </div>
          {'\n      '}
        </div>
        {'\n    '}
      </section>
    </>
  );
}
