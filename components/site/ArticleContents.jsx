'use client';

import { useEffect, useRef, useState } from 'react';

export default function ArticleContents({ items, title, url }) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const [shareUrl, setShareUrl] = useState(url);
  const [shareStatus, setShareStatus] = useState('');
  const feedbackTimer = useRef(null);

  useEffect(() => {
    // Share the open page, without its contents anchor or tracking parameters.
    setShareUrl(`${window.location.origin}${window.location.pathname}`);

    const sections = items.map(({ id }) => document.getElementById(id)).filter(Boolean);
    let frame = null;
    const update = () => {
      frame = null;
      const readingLine =
        (Number.parseFloat(getComputedStyle(sections[0]).scrollMarginTop) || 120) + 2;
      let current = sections[0].id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top > readingLine) break;
        current = section.id;
      }
      setActiveId(current);
    };
    const schedule = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };
    if (!sections.length) return;

    const resize = new ResizeObserver(schedule);
    sections.forEach((section) => resize.observe(section));
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('hashchange', schedule);
    window.addEventListener('popstate', schedule);
    schedule();

    return () => {
      resize.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('hashchange', schedule);
      window.removeEventListener('popstate', schedule);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [items]);

  useEffect(() => () => window.clearTimeout(feedbackTimer.current), []);

  const showFeedback = (message) => {
    window.clearTimeout(feedbackTimer.current);
    setShareStatus(message);
    feedbackTimer.current = window.setTimeout(() => setShareStatus(''), 4000);
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl });
        return;
      } catch (error) {
        if (error.name === 'AbortError') return;
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      showFeedback('Ссылка скопирована');
    } catch {
      showFeedback('Скопируйте ссылку из адресной строки');
    }
  };

  return (
    <div className="article-contents">
      <nav aria-label="Содержание статьи">
        <p className="article-contents__title">Содержание</p>
        <ol className="article-contents__list">
          {items.map(({ id, label }, index) => (
            <li key={id}>
              <a
                className={
                  activeId === id
                    ? 'article-contents__link article-contents__link--active'
                    : 'article-contents__link'
                }
                href={`#${id}`}
                aria-current={activeId === id ? 'location' : undefined}
              >
                <span>{index + 1}.</span> {label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <div className="article-contents__share" role="group" aria-label="Поделиться статьёй">
        <a
          className="article-contents__social"
          href={`https://vk.com/share.php?${new URLSearchParams({ url: shareUrl, title })}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Поделиться во ВКонтакте"
          title="Поделиться во ВКонтакте"
        >
          <svg className="article-contents__social-icon" width="20" height="20" aria-hidden="true">
            <use href="/img/sprite.svg#icon-vk" />
          </svg>
        </a>
        <a
          className="article-contents__social"
          href={`https://max.ru/:share?${new URLSearchParams({ text: `${title}\n${shareUrl}` })}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Поделиться в MAX"
          title="Поделиться в MAX"
        >
          <svg className="article-contents__social-icon" width="20" height="20" aria-hidden="true">
            <use href="/img/sprite.svg#icon-max" />
          </svg>
        </a>
        <button
          className="article-contents__social"
          type="button"
          onClick={share}
          aria-label="Поделиться ссылкой"
          title="Поделиться ссылкой"
        >
          <svg className="article-contents__social-icon" width="20" height="20" aria-hidden="true">
            <use href="/img/sprite.svg#icon-dzen" />
          </svg>
        </button>
      </div>
      <p className="article-contents__feedback" role="status">
        {shareStatus}
      </p>
    </div>
  );
}
