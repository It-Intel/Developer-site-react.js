import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LanguageProvider } from './contexts/LanguageContext.tsx';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import Hero from './components/Hero.tsx';
import About from './components/About.tsx';
import Skills from './components/Skills.tsx';
import Projects from './components/Projects.tsx';
import Contact from './components/Contact.tsx';
import Navbar from './components/Navbar.tsx';
import ParticleBackground from './components/ParticleBackground.tsx';
import CustomCursor from './components/CustomCursor.tsx';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Убираем # из URL при загрузке
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    const tl = gsap.timeline();
    
    tl.from('.hero-content', {
      duration: 2,
      y: 100,
      opacity: 0,
      ease: 'power3.out'
    })
    .from('.hero-title', {
      duration: 1.5,
      scale: 0.5,
      rotation: 10,
      ease: 'back.out(1.7)'
    }, '-=1')
    .from('.hero-subtitle', {
      duration: 1,
      x: -100,
      opacity: 0,
      ease: 'power2.out'
    }, '-=0.5');

    gsap.utils.toArray('.section').forEach((section: any) => {
      gsap.fromTo(section, 
        { 
          y: 100, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <div ref={appRef} className="app">
          <CustomCursor />
          <ParticleBackground />
          <Navbar />
          
          <AnimatePresence mode="wait">
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Contact />
            </motion.main>
          </AnimatePresence>
        </div>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;
