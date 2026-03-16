/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import SiteHeader from './components/SiteHeader';
import LandingPage from './components/LandingPage';
import AboutPage1 from './components/AboutPage1';
import AboutPage2 from './components/AboutPage2';
import CustomCursor from './components/CustomCursor';
import SiteFooter from './components/SiteFooter';
import WorkSection from './components/WorkSection';
import { WorkDetailSection } from './components/WorkDetails';
import { WORK_DETAILS } from './data/workDetails';
import useSmoothScroll from './hooks/useSmoothScroll';

export default function App() {
  useSmoothScroll();

  const [path, setPath] = useState(() => `${window.location.pathname}${window.location.hash}`);

  useEffect(() => {
    const handleLocation = () => {
      setPath(`${window.location.pathname}${window.location.hash}`);
    };

    window.addEventListener('popstate', handleLocation);
    window.addEventListener('hashchange', handleLocation);
    return () => {
      window.removeEventListener('popstate', handleLocation);
      window.removeEventListener('hashchange', handleLocation);
    };
  }, []);

  const navigate = (url: string) => {
    if (`${window.location.pathname}${window.location.hash}` === url) {
      return;
    }
    window.history.pushState({}, '', url);
    setPath(url);
  };

  const { pathname, hash } = useMemo(() => {
    const [currentPath, currentHash] = path.split('#');
    return { pathname: currentPath || '/', hash: currentHash || '' };
  }, [path]);

  const workSlug = pathname.startsWith('/works-') ? pathname.replace('/works-', '') : null;
  const workDetail = workSlug ? WORK_DETAILS.find((detail) => detail.slug === workSlug) : null;
  const isHome = !workSlug && (pathname === '/' || pathname === '/homepage');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    window.dispatchEvent(new Event('smoothscroll:reset'));
  }, [pathname]);

  useEffect(() => {
    if (!isHome) {
      window.scrollTo({ top: 0, left: 0 });
      return;
    }

    if (!hash) {
      return;
    }

    const target = document.getElementById(hash);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [hash, isHome]);

  return (
    <>
      <CustomCursor />
      <SiteHeader onNavigate={navigate} isHome={isHome} />
      <main className="page">
        <AnimatePresence mode="wait">
          <motion.div
            key={path}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {isHome ? (
              <>
                <LandingPage />
                <AboutPage1 />
                <AboutPage2 />
                <WorkSection onNavigate={navigate} />
              </>
            ) : workDetail ? (
              <WorkDetailSection detail={workDetail} onNavigate={navigate} />
            ) : (
              <>
                <LandingPage />
                <AboutPage1 />
                <AboutPage2 />
                <WorkSection onNavigate={navigate} />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      <SiteFooter onNavigate={navigate} />
    </>
  );
}
