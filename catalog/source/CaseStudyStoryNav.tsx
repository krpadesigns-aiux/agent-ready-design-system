"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export type CaseStudyStoryNavItem = {
  id: string;
  label: string;
  headingSelector?: string;
};

export type CaseStudyStoryNavProps = {
  items: CaseStudyStoryNavItem[];
  projectSlug: string;
  projectName?: string;
  presentationHref?: string | null;
  presentationLabel?: string;
  presentationSoonLabel?: string;
  ariaLabel?: string;
  resolveSectionTop?: (id: string) => number | null;
};

export function CaseStudyStoryNav({
  items,
  projectSlug,
  projectName,
  presentationHref,
  presentationLabel = "Presentation",
  presentationSoonLabel = "Presentation · Soon",
  ariaLabel = "Case study format and sections",
  resolveSectionTop,
}: CaseStudyStoryNavProps) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const [pinned, setPinned] = useState(false);
  const [tabsOverlapSwitch, setTabsOverlapSwitch] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const switchRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const updateFromScroll = useCallback(() => {
    const nav = navRef.current;
    if (!nav || !items.length) return;

    const stickyElement = nav;
    const stickyTop = Number.parseFloat(window.getComputedStyle(stickyElement).top) || 0;
    const navRect = stickyElement.getBoundingClientRect();
    const isPinned = Math.abs(navRect.top - stickyTop) <= 2 && window.scrollY > 0;
    setPinned(isPinned);
    document.body.classList.toggle("caseFilterPinned", isPinned);

    const threshold = Math.min(260, window.innerHeight * 0.3);
    let current = items[0].id;
    for (const item of items) {
      const section = document.getElementById(item.id);
      const top = resolveSectionTop ? resolveSectionTop(item.id) : section?.getBoundingClientRect().top;
      if (top != null && top <= threshold) current = item.id;
    }
    setActive(current);
  }, [items, resolveSectionTop]);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        updateFromScroll();
      });
    };

    updateFromScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      document.body.classList.remove("caseFilterPinned");
    };
  }, [updateFromScroll]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const activeLink = scroller?.querySelector<HTMLAnchorElement>(`a[data-section="${active}"]`);
    if (!scroller || !activeLink) return;

    const left = activeLink.offsetLeft - (scroller.clientWidth - activeLink.clientWidth) / 2;
    scroller.scrollTo({
      left: Math.max(0, left),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }, [active]);

  useEffect(() => {
    const nav = navRef.current;
    const formatSwitch = switchRef.current;
    const tabs = scrollerRef.current;
    if (!nav || !formatSwitch || !tabs) return;

    const measure = () => {
      if (window.innerWidth < 1200) {
        setTabsOverlapSwitch(false);
        return;
      }
      const navRect = nav.getBoundingClientRect();
      const switchRect = formatSwitch.getBoundingClientRect();
      const tabsWidth = tabs.scrollWidth;
      const centeredLeft = navRect.left + (navRect.width - tabsWidth) / 2;
      const minimumLeft = switchRect.right + 16;
      setTabsOverlapSwitch(centeredLeft < minimumLeft);
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(nav);
    resizeObserver.observe(formatSwitch);
    resizeObserver.observe(tabs);
    window.addEventListener("resize", measure);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [items.length, presentationHref]);

  const alignChapter = (item: CaseStudyStoryNavItem) => {
    const section = document.getElementById(item.id);
    const nav = navRef.current;
    if ((!section && !resolveSectionTop) || !nav) return;
    if (resolveSectionTop) {
      const alignEmbedded = () => {
        const top = resolveSectionTop(item.id);
        if (top === null) return;
        const delta = top - (nav.getBoundingClientRect().bottom + 12);
        if (Math.abs(delta) > 2) window.scrollBy({ top: delta, left: 0, behavior: "instant" });
      };
      alignEmbedded();
      requestAnimationFrame(alignEmbedded);
      window.setTimeout(alignEmbedded, 140);
      return;
    }
    if (!section) return;

    const heading = item.headingSelector
      ? section.querySelector<HTMLElement>(item.headingSelector) ?? section
      : section.querySelector<HTMLElement>("header,h1,h2,[data-chapter-heading]") ?? section;

    const align = () => {
      // Slingshot chapter anchors are zero-height spans before padded sections.
      // Align the visible chapter label, not the span or section's outer edge.
      let chapter: HTMLElement | null = section;
      while (chapter?.classList.contains("slingshotSectionAnchor")) {
        chapter = chapter.nextElementSibling as HTMLElement | null;
      }
      const slingshotLabel = chapter?.querySelector<HTMLElement>(
        ".slingshotDiscoveryEyebrow, .slingshotBeforeAfterSectionLabel, .eyebrow, .slingshotNarrativeSubLabel"
      );
      const target = projectSlug === "slingshot" ? (slingshotLabel ?? chapter ?? section) : heading;
      const gap = projectSlug === "slingshot" ? 12 : 22;
      const delta = target.getBoundingClientRect().top - (nav.getBoundingClientRect().bottom + gap);
      if (Math.abs(delta) > 2) {
        window.scrollBy({ top: delta, left: 0, behavior: "instant" as ScrollBehavior });
      }
    };

    align();
    requestAnimationFrame(align);
    window.setTimeout(align, 140);
  };

  return (
    <nav
      ref={navRef}
      id="storyNav"
      className={`pds-story-nav storyNav inlineStoryNav${pinned ? " is-pinned isPinned" : ""}${tabsOverlapSwitch ? " has-tab-overlap" : ""}`}
      aria-label={ariaLabel}
    >
      <div ref={switchRef} className="pds-story-format-switch baFormatSwitch" role="group" aria-label="Case study format">
        <Link
          className="pds-story-format-option baFormatOption is-current isCurrent"
          href={`/work/${projectSlug}`}
          aria-current="page"
        >
          Long Format
        </Link>
        {presentationHref === null ? (
          <span className="pds-story-format-option baFormatOption is-unavailable" aria-disabled="true">
            {presentationSoonLabel}
          </span>
        ) : presentationHref ? (
          <Link className="pds-story-format-option baFormatOption" href={presentationHref}>
            {presentationLabel}
          </Link>
        ) : null}
      </div>

      <div className="pds-story-nav-inner storyNavInner" ref={scrollerRef}>
        {items.map(item => (
          <a
            key={item.id}
            href={`#${item.id}`}
            data-section={item.id}
            className={active === item.id ? "is-active isActive" : undefined}
            aria-current={active === item.id ? "location" : undefined}
            onClick={(event) => {
              if (!document.getElementById(item.id) && resolveSectionTop?.(item.id) == null) return;
              event.preventDefault();
              setActive(item.id);
              history.pushState(null, "", `#${item.id}`);
              alignChapter(item);
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
