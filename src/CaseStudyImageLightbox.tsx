"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type CaseStudyLightboxImage = {
  src: string;
  alt: string;
  caption?: string;
};

type CaseStudyImageLightboxProps = {
  images: CaseStudyLightboxImage[];
  activeIndex: number | null;
  onSelect: (index: number) => void;
  onClose: () => void;
};

/** Shared, full-viewport viewer for case-study artifacts, including iframe-hosted images. */
export function CaseStudyImageLightbox({ images, activeIndex, onSelect, onClose }: CaseStudyImageLightboxProps) {
  const [zoom, setZoom] = useState(1);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const isOpen = activeIndex !== null && !!images[activeIndex];

  // Restore keyboard focus to the element that opened the lightbox.
  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    return () => { opener?.focus(); };
  }, [isOpen]);

  useEffect(() => { const frame = window.requestAnimationFrame(() => setZoom(1)); return () => window.cancelAnimationFrame(frame); }, [activeIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onClose(); return; }
      if (event.key === "ArrowLeft" && images.length > 1) {
        event.preventDefault(); onSelect(((activeIndex ?? 0) - 1 + images.length) % images.length);
        return;
      }
      if (event.key === "ArrowRight" && images.length > 1) {
        event.preventDefault(); onSelect(((activeIndex ?? 0) + 1) % images.length);
        return;
      }
      if (event.key !== "Tab") return;
      const controls = Array.from(panelRef.current?.querySelectorAll<HTMLButtonElement>("button:not(:disabled)") ?? []);
      if (!controls.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      else if (!panelRef.current?.contains(document.activeElement)) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, images.length, isOpen, onClose, onSelect]);

  if (!isOpen || activeIndex === null) return null;
  const current = images[activeIndex];
  return createPortal(
    <div className="csImageLightbox" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <div className="csImageLightboxPanel" ref={panelRef} role="dialog" aria-modal="true" aria-label={`Enlarged image: ${current.alt}`}>
        <div className="csImageLightboxToolbar">
          <div className="csImageLightboxTitle">
            <span>{current.caption || current.alt}</span>
            <small>{activeIndex + 1} / {images.length}</small>
          </div>
          <div className="csImageLightboxButtons">
            <button type="button" onClick={() => onSelect((activeIndex - 1 + images.length) % images.length)} disabled={images.length < 2} aria-label="Previous image" title="Previous image (←)">←</button>
            <button type="button" onClick={() => onSelect((activeIndex + 1) % images.length)} disabled={images.length < 2} aria-label="Next image" title="Next image (→)">→</button>
            <span className="csImageLightboxDivider" aria-hidden="true" />
            <button type="button" onClick={() => setZoom(value => Math.max(1, Number((value - 0.25).toFixed(2))))} disabled={zoom <= 1} aria-label="Zoom out" title="Zoom out">−</button>
            <button type="button" onClick={() => setZoom(1)} aria-label={`Reset zoom to ${Math.round(zoom * 100)}%`} title="Reset zoom">{Math.round(zoom * 100)}%</button>
            <button type="button" onClick={() => setZoom(value => Math.min(3, Number((value + 0.25).toFixed(2))))} disabled={zoom >= 3} aria-label="Zoom in" title="Zoom in">+</button>
            <button type="button" className="csImageLightboxClose" ref={closeRef} onClick={onClose} aria-label="Close enlarged image" title="Close (Esc)">×</button>
          </div>
        </div>
        <div className="csImageLightboxCanvas" key={current.src}>
          <img src={current.src} alt={current.alt} style={{ width: zoom === 1 ? "100%" : `${zoom * 100}%`, height: zoom === 1 ? "100%" : "auto", maxWidth: "none", maxHeight: zoom === 1 ? "100%" : "none", objectFit: "contain" }} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
