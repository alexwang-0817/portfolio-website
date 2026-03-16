import { useEffect, useRef } from 'react';

const EASE = 0.12;
const EPSILON = 0.5;

export default function useSmoothScroll() {
  const target = useRef(0);
  const current = useRef(0);
  const rafId = useRef<number | null>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    target.current = window.scrollY;
    current.current = window.scrollY;

    const update = () => {
      isAnimating.current = true;
      const diff = target.current - current.current;
      current.current += diff * EASE;

      if (Math.abs(diff) < EPSILON) {
        current.current = target.current;
      }

      window.scrollTo(0, current.current);

      if (Math.abs(diff) >= EPSILON) {
        rafId.current = window.requestAnimationFrame(update);
      } else {
        rafId.current = null;
        isAnimating.current = false;
      }
    };

    const onWheel = (event: WheelEvent) => {
      const eventTarget = event.target as HTMLElement | null;
      if (eventTarget?.closest('[data-skip-smooth]')) {
        return;
      }

      event.preventDefault();
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      target.current = Math.min(maxScroll, Math.max(0, target.current + event.deltaY));

      if (!rafId.current) {
        rafId.current = window.requestAnimationFrame(update);
      }
    };

    const onScroll = () => {
      if (!isAnimating.current && !rafId.current) {
        target.current = window.scrollY;
        current.current = window.scrollY;
      }
    };

    const onResize = () => {
      target.current = window.scrollY;
      current.current = window.scrollY;
    };

    const onReset = () => {
      target.current = window.scrollY;
      current.current = window.scrollY;
      if (rafId.current) {
        window.cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      isAnimating.current = false;
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    window.addEventListener('smoothscroll:reset', onReset as EventListener);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('smoothscroll:reset', onReset as EventListener);
      if (rafId.current) {
        window.cancelAnimationFrame(rafId.current);
      }
    };
  }, []);
}
