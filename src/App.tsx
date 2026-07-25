import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import BuildProcess from './components/BuildProcess';
import Journey from './components/Journey';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Now from './components/Now';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import StorySpine from './components/StorySpine';
import ScrollOrbs from './components/ScrollOrbs';
import ScrollFlyText from './components/ScrollFlyText';
import ScrollDriftBands from './components/ScrollDriftBands';
import GlassDebrisLayer from './components/GlassDebrisLayer';
import LoadingScreen from './components/LoadingScreen';
import NotFound from './components/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import { GlassDebrisProvider } from './context/GlassDebrisContext';
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
    <GlassDebrisProvider>
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
        <StorySpine progress={progress} activeId={activeId} />
        <ScrollOrbs />
        <ScrollFlyText />
        <ScrollDriftBands />
        <GlassDebrisLayer />
        <main className="relative story-main">
          <Hero />
          <About />
          <BuildProcess />
          <Journey />
          <Skills />
          <Projects />
          <Experience />
          <Now />
          <Contact />
        </main>
        <Footer />
        <ScrollProgress progress={progress} activeId={activeId} />
      </div>
    </GlassDebrisProvider>
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