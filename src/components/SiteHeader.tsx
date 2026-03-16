import { useEffect, useMemo, useState } from 'react';
import mdLogo from '../../img/MD_logo.png';
import RevealText from './RevealText';

type SiteHeaderProps = {
  onNavigate?: (url: string) => void;
  isHome?: boolean;
};

export default function SiteHeader({ onNavigate, isHome = true }: SiteHeaderProps) {
  const formatter = useMemo(
    () =>
      new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Taipei',
      }),
    [],
  );
  const [time, setTime] = useState(() => formatter.format(new Date()));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTime(formatter.format(new Date()));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [formatter]);

  const handleScrollTo = (id?: string) => {
    if (onNavigate) {
      const targetUrl = id ? `/homepage#${id}` : '/homepage';
      onNavigate(targetUrl);
      return;
    }

    if (!id) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <button type="button" className="site-logo" onClick={() => handleScrollTo()}>
          <img src={mdLogo} alt="MD" />
        </button>
        <button type="button" className="site-nav-button" onClick={() => handleScrollTo('work')}>
          <RevealText as="span">作品</RevealText>
        </button>
        <button type="button" className="site-nav-button" onClick={() => handleScrollTo('about')}>
          <RevealText as="span">關於我</RevealText>
        </button>
        <div className="site-contact">
          <RevealText as="span" block>
            alexwang0017@gmail.com
          </RevealText>
          <RevealText as="span" block>
            (+886) 953908170
          </RevealText>
        </div>
        <div className="site-time">
          <RevealText as="span">
            {time}
            (GMT+8)
          </RevealText>
        </div>
      </div>
    </header>
  );
}
