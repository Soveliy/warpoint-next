'use client';

import { useEffect, useRef } from 'react';

export default function SiteContentDialog({ labelledBy, className = '', onClose, children }) {
  const dialog = useRef(null);
  useEffect(() => {
    const element = dialog.current;
    const opener = document.activeElement;
    element.showModal();
    return () => {
      element.close();
      requestAnimationFrame(() => {
        if (opener?.isConnected && !document.querySelector('dialog[open], .booking-panel.is-open')) opener.focus({ preventScroll: true });
      });
    };
  }, []);

  return <dialog className={`site-content-dialog ${className}`} ref={dialog} aria-labelledby={labelledBy}
    onCancel={(event) => { event.preventDefault(); event.stopPropagation(); onClose(); }}
    onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="site-content-dialog__surface">{children}</div>
  </dialog>;
}
