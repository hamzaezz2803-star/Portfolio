import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Services from './components/Services';
import Certificates from './components/Certificates';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Location from './components/Location';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import PerspectiveTunnelHero from './components/ui/perspective-tunnel-hero';

import { Toaster } from 'react-hot-toast';
import Chatbot from './components/Chatbot';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [introKey, setIntroKey] = useState(0);
  const [introStart, setIntroStart] = useState(0);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // Initialize dark mode from localStorage
  useEffect(() => {
    // Already initialized in useState
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Scroll up at the very top of the home page -> go back into the tunnel
  useEffect(() => {
    if (showIntro) return;
    const reenter = () => {
      setIntroStart(0.96);
      setIntroKey((k) => k + 1);
      setRevealed(true);
      setShowIntro(true);
    };
    const onWheel = (e) => {
      if (e.deltaY < 0 && window.scrollY <= 0) reenter();
    };
    let startY = null;
    const onTouchStart = (e) => { startY = e.touches[0].clientY; };
    const onTouchMove = (e) => {
      if (startY !== null && window.scrollY <= 0 && e.touches[0].clientY - startY > 40) {
        startY = null;
        reenter();
      }
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [showIntro]);

  // Lock page scroll while the intro tunnel is active
  useEffect(() => {
    document.body.style.overflow = showIntro ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showIntro]);

  return (
    <>
    {showIntro && (
      <PerspectiveTunnelHero
        key={introKey}
        initialProgress={introStart}
        onReveal={() => setRevealed(true)}
        onComplete={() => { window.scrollTo(0, 0); setShowIntro(false); }}
      />
    )}
    <div
      className="relative min-h-screen bg-white dark:bg-black overflow-x-hidden w-full transition-[opacity,transform] duration-[1400ms] ease-out"
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'scale(1)' : 'scale(1.06)',
        height: showIntro ? '100svh' : undefined,
        overflow: showIntro ? 'hidden' : undefined,
      }}
    >
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          className: 'dark:bg-zinc-900 dark:text-white bg-white text-black border border-zinc-200 dark:border-zinc-800 rounded-2xl font-semibold',
          style: {
            borderRadius: '1rem',
            background: darkMode ? '#18181b' : '#ffffff',
            color: darkMode ? '#ffffff' : '#000000',
            border: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e4e4e7',
          }
        }} 
      />
      
      <ScrollToTop />
      <Chatbot />
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Hero darkMode={darkMode} />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Certificates />
        <Faq />
        <Contact />
        <Location />
      </main>
      <Footer />
    </div>
    </>
  );
}

export default App;
