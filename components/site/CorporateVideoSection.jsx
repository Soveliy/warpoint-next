'use client';

import { siteFields } from '../../lib/site-fields';
import { usePromoVideo } from './usePromoVideo';

export default function CorporateVideoSection({ site }) {
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
          src="/img/posters/2.jpg"
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
            poster="/img/posters/2.jpg"
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
            <span>{'Праздник,'}</span>
            {'\n          '}
            <span>{'который точно'}</span>
            {'\n          '}
            <span className="video-section__title-accent">{'запомнится!'}</span>
            {'\n        '}
          </h2>
          {'\n        '}
          <p className="video-section__description">
            {'\n          '}
            <span>{'Эпичные командные игры, живые эмоции,'}</span>
            {'\n          '}
            <span>{'соревновательный азарт и общая победа вместо привычного банкета.'}</span>
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
