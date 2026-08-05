import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import LeetCode from './components/LeetCode';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import ScrollDriftBands from './components/ScrollDriftBands';
import LoadingScreen from './components/LoadingScreen';
import NotFound from './components/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import { useScrollBroker } from './hooks/useScrollBroker';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useSiteReady } from './hooks/useSiteReady';
import { isKnownPath, usePathname, useNotFoundReason } from './hooks/useRoute';

function Portfolio() {
  const { progress, activeId } = useScrollBroker();
  const { ready, progress: bootProgress } = useSiteReady();
  const [entered, setEntered] = useState(false);
  useReducedMotion();

  return (
    <>
      {!entered && (
        <LoadingScreen
          ready={ready}
          progress={bootProgress}
          onEnter={() => setEntered(true)}
        />
      )}
      <div
        className={`min-h-screen bg-ink-base story-film ${entered ? 'is-site-ready' : 'is-site-booting'}`}
        data-active-chapter={activeId}
        aria-hidden={!entered}
      >
        <Header activeSection={activeId} />
        <ScrollDriftBands />
        <main className="relative story-main">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <LeetCode />
          <Contact />
        </main>
        <Footer />
        <ScrollProgress progress={progress} activeId={activeId} />
      </div>
    </>
  );
}

function App() {
  const pathname = usePathname();
  const reason = useNotFoundReason();

  if (!isKnownPath(pathname)) {
    return <NotFound reason={pathname === '/404' ? reason : 'route'} />;
  }

  return (
    <ErrorBoundary>
      <Portfolio />
    </ErrorBoundary>
  );
}

export default App;
