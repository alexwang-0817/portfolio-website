import { useEffect, useMemo, useState } from 'react';
import mdLogo from '../../img/MD_logo.png';

type SiteFooterProps = {
  onNavigate?: (url: string) => void;
};

export default function SiteFooter({ onNavigate }: SiteFooterProps) {
  const formatter = useMemo(
    () =>
      new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Taipei',
      }),
    []
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
    <footer className="site-footer">
      <div className="site-header__inner">
        <button type="button" className="site-logo" onClick={() => handleScrollTo()}>
          <img src={mdLogo} alt="MD" />
        </button>
        <button type="button" className="site-nav-button" onClick={() => handleScrollTo('work')}>
          <span>作品</span>
        </button>
        <button type="button" className="site-nav-button" onClick={() => handleScrollTo('about')}>
          <span>關於我</span>
        </button>
        <div className="site-contact">
          <span>alexwang0017@gmail.com</span>
          <span>(+886) 953908170</span>
        </div>
        <div className="site-time">
          <span>
            {time}
            (GMT+8)
          </span>
        </div>
      </div>
    </footer>
  );
}
