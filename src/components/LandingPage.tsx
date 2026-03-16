import { useEffect, useRef, useState } from 'react';
import RevealText from './RevealText';

type EyeOffset = { x: number; y: number };

export default function LandingPage() {
  const leftEyeRef = useRef<HTMLSpanElement>(null);
  const rightEyeRef = useRef<HTMLSpanElement>(null);
  const [offsets, setOffsets] = useState<{ left: EyeOffset; right: EyeOffset }>({
    left: { x: 0, y: 0 },
    right: { x: 0, y: 0 },
  });

  useEffect(() => {
    const clampOffset = (ref: HTMLSpanElement | null, x: number, y: number) => {
      if (!ref) {
        return { x: 0, y: 0 };
      }
      const rect = ref.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = x - centerX;
      const dy = y - centerY;
      const max = rect.width * 0.18;
      const distance = Math.hypot(dx, dy) || 1;
      const scale = Math.min(1, max / distance);
      return { x: dx * scale, y: dy * scale };
    };

    const handleMove = (event: MouseEvent) => {
      setOffsets({
        left: clampOffset(leftEyeRef.current, event.clientX, event.clientY),
        right: clampOffset(rightEyeRef.current, event.clientX, event.clientY),
      });
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <section className="landing">
      <div className="landing__content">
        <h1 className="landing__title" aria-label="MOOD">
          <RevealText as="span" className="landing__letter">
            M
          </RevealText>
          <span className="landing__eye" ref={leftEyeRef}>
            <span
              className="landing__pupil"
              style={{ transform: `translate(${offsets.left.x}px, ${offsets.left.y}px)` }}
            />
          </span>
          <span className="landing__eye" ref={rightEyeRef}>
            <span
              className="landing__pupil"
              style={{ transform: `translate(${offsets.right.x}px, ${offsets.right.y}px)` }}
            />
          </span>
          <RevealText as="span" className="landing__letter">
            D
          </RevealText>
        </h1>
        <RevealText as="p" className="landing__subtitle" block>
          The creator
        </RevealText>
      </div>
    </section>
  );
}
