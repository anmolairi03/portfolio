import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import BuildProcess from './components/BuildProcess';
import Journey from './components/Journey';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import { useActiveSection } from './hooks/useActiveSection';

function App() {
  const activeSection = useActiveSection();

  return (
    <div className="min-h-screen bg-ink-base">
      <Header activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <BuildProcess />
        <Journey />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <ScrollProgress />
    </div>
  );
}

export default App;
