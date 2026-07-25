import React from 'react';
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
import { GlassDebrisProvider } from './context/GlassDebrisContext';
import { useScrollBroker } from './hooks/useScrollBroker';
import { useReducedMotion } from './hooks/useReducedMotion';

function App() {
  const { progress, activeId } = useScrollBroker();
  useReducedMotion();

  return (
    <GlassDebrisProvider>
      <div className="min-h-screen bg-ink-base story-film" data-active-chapter={activeId}>
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

export default App;
