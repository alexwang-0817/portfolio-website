import { useEffect, useRef } from 'react';
import type { FC } from 'react';
import RevealText from './RevealText';
import { WORK_DETAILS, type WorkDetail } from '../data/workDetails';

type WorkDetailSectionProps = {
  detail: WorkDetail;
  onNavigate?: (url: string) => void;
};

const MARQUEE_SPEED = 50;

type WorkMarqueeProps = {
  images: string[];
  detailId: string;
};

const WorkMarquee: FC<WorkMarqueeProps> = ({ images, detailId }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const loopWidth = useRef(0);
  const position = useRef(0);
  const speed = useRef(MARQUEE_SPEED);
  const targetSpeed = useRef(MARQUEE_SPEED);
  const lastTime = useRef<number | null>(null);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!trackRef.current) {
      return;
    }

    const updateWidth = () => {
      if (!trackRef.current) {
        return;
      }
      loopWidth.current = trackRef.current.scrollWidth / 2;
    };

    const observer = new ResizeObserver(() => updateWidth());
    observer.observe(trackRef.current);
    updateWidth();

    return () => observer.disconnect();
  }, [images.length]);

  useEffect(() => {
    const animate = (time: number) => {
      if (lastTime.current === null) {
        lastTime.current = time;
      }

      const delta = (time - lastTime.current) / 1000;
      lastTime.current = time;

      const easing = 1 - Math.exp(-delta * 4);
      speed.current += (targetSpeed.current - speed.current) * easing;
      position.current -= speed.current * delta;

      if (loopWidth.current > 0 && Math.abs(position.current) >= loopWidth.current) {
        position.current += loopWidth.current;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${position.current}px, 0, 0)`;
      }

      frame.current = window.requestAnimationFrame(animate);
    };

    frame.current = window.requestAnimationFrame(animate);
    return () => {
      if (frame.current) {
        window.cancelAnimationFrame(frame.current);
      }
    };
  }, []);

  return (
    <div
      className="work-detail__gallery work-detail__gallery--marquee"
      onMouseEnter={() => {
        targetSpeed.current = 0;
      }}
      onMouseLeave={() => {
        targetSpeed.current = MARQUEE_SPEED;
      }}
    >
      <div className="work-detail__marquee">
        <div className="work-detail__marquee-track" ref={trackRef}>
          {[...images, ...images].map((image, index) => (
            <img
              key={`${detailId}-marquee-${index}`}
              className="work-detail__preview work-detail__preview--marquee"
              src={image}
              alt={`${detailId} preview ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const WorkDetailSection: FC<WorkDetailSectionProps> = ({ detail, onNavigate }) => {
  const detailIndex = WORK_DETAILS.findIndex((item) => item.slug === detail.slug);
  const prevDetail = detailIndex > 0 ? WORK_DETAILS[detailIndex - 1] : null;
  const nextDetail = detailIndex >= 0 && detailIndex < WORK_DETAILS.length - 1 ? WORK_DETAILS[detailIndex + 1] : null;
  const onlyNext = Boolean(nextDetail && !prevDetail);
  const onlyPrev = Boolean(prevDetail && !nextDetail);

  return (
    <section className="work-detail" id={detail.detailId}>
      <div className="work-detail__content">
        <div className="work-detail__line work-detail__line--top" />
        <div className="work-detail__title">
          <RevealText as="span" className="work-detail__index">
            ({detail.id})
          </RevealText>
          <RevealText as="span" className="work-detail__name">
            {detail.title}
          </RevealText>
        </div>
        <div className="work-detail__cover">
          <img src={detail.cover} alt={`${detail.title} cover`} />
        </div>
        <div className="work-detail__line work-detail__line--after-cover" />
        <div className="work-detail__info">
          <RevealText as="p" className="work-detail__type" block>
            {detail.typeLabel}
          </RevealText>
          <div className="work-detail__tags">
            {detail.tags.map((tag) => (
              <RevealText as="span" className="work-detail__tag" key={tag}>
                {tag}
              </RevealText>
            ))}
          </div>
          <RevealText as="p" className="work-detail__date" block>
            {detail.date}
          </RevealText>
        </div>
        <div className="work-detail__icon">
          <img src={detail.icon} alt={`${detail.title} icon`} />
        </div>
        <div className="work-detail__intro">
          <RevealText as="span" className="work-detail__intro-title">
            介紹
          </RevealText>
          <RevealText as="p" className="work-detail__description" block>
            {detail.description}
          </RevealText>
        </div>
        {detail.gallery.type === 'marquee' ? (
          <WorkMarquee images={detail.gallery.images} detailId={detail.id} />
        ) : (
          <div className="work-detail__gallery work-detail__gallery--static">
            {detail.gallery.images.map((image, index) => (
              <img
                key={`${detail.id}-static-${index}`}
                className="work-detail__preview work-detail__preview--static"
                src={image}
                alt={`${detail.title} preview ${index + 1}`}
              />
            ))}
          </div>
        )}
        <div className="work-detail__line work-detail__line--bottom" />
        <div className="work-detail__concept-block">
          <RevealText as="span" className="work-detail__concept-title">
            設計核心
          </RevealText>
          <RevealText as="p" className="work-detail__concept" block>
            {detail.concept}
          </RevealText>
        </div>
        {(prevDetail || nextDetail) && (
          <div className="work-detail__others">
            <div
              className={`work-detail__others-links${onlyNext ? ' is-right' : ''}${onlyPrev ? ' is-left' : ''}`}
            >
              {prevDetail && (
                <a
                  className="work-detail__other-link work-detail__other-link--left"
                  href={`/works-${prevDetail.slug}`}
                  onClick={(event) => {
                    if (!onNavigate) {
                      return;
                    }
                    event.preventDefault();
                    onNavigate(`/works-${prevDetail.slug}`);
                  }}
                >
                  （{prevDetail.id}）{prevDetail.title} ←
                </a>
              )}
              {nextDetail && (
                <a
                  className="work-detail__other-link work-detail__other-link--right"
                  href={`/works-${nextDetail.slug}`}
                  onClick={(event) => {
                    if (!onNavigate) {
                      return;
                    }
                    event.preventDefault();
                    onNavigate(`/works-${nextDetail.slug}`);
                  }}
                >
                  （{nextDetail.id}）{nextDetail.title} →
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default function WorkDetails() {
  return (
    <>
      {WORK_DETAILS.map((detail) => (
        <WorkDetailSection key={detail.id} detail={detail} />
      ))}
    </>
  );
}
