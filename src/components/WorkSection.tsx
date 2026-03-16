import { useEffect, useRef } from 'react';

const WORK_ITEMS = [
  {
    id: '01',
    title: 'Scouties',
    image: '/img/scouties.png',
    slug: 'scouties',
  },
  {
    id: '02',
    title: 'Petpro',
    image: '/img/petpro.png',
    slug: 'petpro',
  },
  {
    id: '03',
    title: 'PawFinder',
    image: '/img/pawfinder_work.png',
    slug: 'pawfinder',
  },
];

type WorkSectionProps = {
  onNavigate?: (url: string) => void;
};

export default function WorkSection({ onNavigate }: WorkSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const rafId = useRef<number | null>(null);
  const metricsRef = useRef({ start: 0, length: 0, maxTranslate: 0 });
  const aspectRatioRef = useRef<number | null>(null);

  const updateLayoutSizing = () => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section || !sticky) {
      return 0;
    }

    const header = document.querySelector('.site-header') as HTMLElement | null;
    const footer = document.querySelector('.site-footer') as HTMLElement | null;
    const headerInner = document.querySelector('.site-header__inner') as HTMLElement | null;
    const headerHeight = header?.getBoundingClientRect().height ?? 0;
    const footerHeight = footer?.getBoundingClientRect().height ?? 0;
    const layoutWidth = headerInner?.getBoundingClientRect().width ?? Math.max(0, sticky.clientWidth - 64);
    const gap = 20;
    const availableHeight = Math.max(0, window.innerHeight - headerHeight - footerHeight - gap * 2);

    if (!aspectRatioRef.current && layoutWidth > 0) {
      aspectRatioRef.current = availableHeight / layoutWidth;
    }

    const ratio = aspectRatioRef.current ?? (layoutWidth > 0 ? availableHeight / layoutWidth : 1);
    const scaledHeight = Math.min(availableHeight, layoutWidth * ratio);

    section.style.paddingTop = `${headerHeight + gap}px`;
    section.style.paddingBottom = `${footerHeight + gap}px`;
    sticky.style.top = `${headerHeight + gap}px`;
    sticky.style.height = `${scaledHeight}px`;
    section.style.setProperty('--work-viewport-height', `${scaledHeight}px`);

    return scaledHeight;
  };

  const updateMetrics = () => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!section || !track || !sticky) {
      return;
    }

    const stickyHeight = updateLayoutSizing();

    const headerInner = document.querySelector('.site-header__inner') as HTMLElement | null;
    const fallbackWidth = Math.max(0, sticky.clientWidth - 64);
    const visibleWidth = headerInner?.getBoundingClientRect().width ?? fallbackWidth;
    const maxTranslate = Math.max(0, track.scrollWidth - visibleWidth);
    const sectionHeight = Math.max(window.innerHeight, maxTranslate + window.innerHeight);
    section.style.height = `${sectionHeight}px`;
    const start = section.getBoundingClientRect().top + window.scrollY;
    metricsRef.current = {
      start,
      length: maxTranslate,
      maxTranslate,
    };
  };

  const updatePosition = () => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const { start, length, maxTranslate } = metricsRef.current;
    if (length <= 0) {
      track.style.transform = 'translate3d(0, 0, 0)';
      return;
    }

    const progress = Math.min(1, Math.max(0, (window.scrollY - start) / length));
    const translateX = -maxTranslate * progress;
    track.style.transform = `translate3d(${translateX}px, 0, 0)`;
  };

  useEffect(() => {
    const onScroll = () => {
      if (rafId.current !== null) {
        return;
      }
      rafId.current = window.requestAnimationFrame(() => {
        rafId.current = null;
        updatePosition();
      });
    };

    const onResize = () => {
      updateMetrics();
      updatePosition();
    };

    updateMetrics();
    updatePosition();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafId.current !== null) {
        window.cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <section className="work-section" id="work" ref={sectionRef}>
      <div className="work-sticky" ref={stickyRef}>
        <div className="work-track" ref={trackRef}>
          {WORK_ITEMS.map((item) => (
            <div className="work-panel" key={item.id}>
              <div className="work-frame">
                <div className="work-media">
                  <img className="work-image" src={item.image} alt={item.title} />
                </div>
                <div className="work-card">
                  <a
                    className="work-card__link"
                    href={`/works-${item.slug}`}
                    onClick={(event) => {
                      if (!onNavigate) {
                        return;
                      }
                      event.preventDefault();
                      onNavigate(`/works-${item.slug}`);
                    }}
                  >
                    <span className="work-card__index">({item.id})</span>
                    <span className="work-card__title">{item.title}</span>
                    <span className="work-card__arrow">↗</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
