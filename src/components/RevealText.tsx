import { useEffect, useRef } from 'react';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

type RevealTextProps<E extends ElementType> = {
  as?: E;
  block?: boolean;
  className?: string;
  forceVisible?: boolean;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<E>, 'as' | 'className' | 'children'>;

export default function RevealText<E extends ElementType = 'span'>(
  props: RevealTextProps<E>
) {
  const { as, block = false, className, forceVisible = false, children, ...rest } = props;
  const Component = (as || 'span') as ElementType;
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    if (forceVisible) {
      const raf = window.requestAnimationFrame(() => {
        node.classList.add('is-visible');
      });
      return () => window.cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible');
          observer.unobserve(node);
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const classes = ['reveal', block ? 'reveal--block' : '', className || '']
    .filter(Boolean)
    .join(' ');

  return (
    <Component ref={ref} className={classes} {...rest}>
      <span className="reveal__inner">{children}</span>
    </Component>
  );
}
