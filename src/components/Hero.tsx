import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import './Hero.css';

gsap.registerPlugin(TextPlugin);

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current || !ctaRef.current) return;

    // Fallback: показываем элементы сразу, если GSAP не сработает
    const fallbackTimeout = setTimeout(() => {
      if (titleRef.current) titleRef.current.style.opacity = '1';
      if (subtitleRef.current) subtitleRef.current.style.opacity = '1';
      if (ctaRef.current) ctaRef.current.style.opacity = '1';
    }, 1000);

    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(titleRef.current, 
      { 
        opacity: 0, 
        y: 100,
        scale: 0.5,
        rotation: 10
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 2,
        ease: 'back.out(1.7)'
      }
    )
    .fromTo(subtitleRef.current,
      {
        opacity: 0,
        x: -100
      },
      {
        opacity: 1,
        x: 0,
        duration: 1.5,
        ease: 'power2.out'
      },
      '-=1'
    )
    .fromTo(ctaRef.current,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
      },
      '-=0.5'
    );

    return () => {
      clearTimeout(fallbackTimeout);
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (!titleRef.current) return;

    const textAnimation = gsap.timeline({ repeat: -1, repeatDelay: 3 });
    textAnimation.to(titleRef.current, {
      duration: 2,
      text: t('hero.title'),
      ease: "none"
    })
    .to(titleRef.current, {
      duration: 2,
      text: "CODE WIZARD",
      ease: "none"
    })
    .to(titleRef.current, {
      duration: 2,
      text: "TECH VISIONARY",
      ease: "none"
    });

    return () => {
      textAnimation.kill();
    };
  }, [t]);

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="hero-background">
        <div className="cyber-grid" />
        <div className="neural-network" />
        <div className="quantum-orb" />
        <div className="data-stream" style={{ left: '10%', animationDelay: '0s' }} />
        <div className="data-stream" style={{ left: '30%', animationDelay: '1s' }} />
        <div className="data-stream" style={{ left: '50%', animationDelay: '2s' }} />
        <div className="data-stream" style={{ left: '70%', animationDelay: '0.5s' }} />
        <div className="data-stream" style={{ left: '90%', animationDelay: '1.5s' }} />
      </div>

      <div className="hero-content">
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <span className="badge-text">{t('hero.badge')}</span>
          <div className="badge-pulse" />
        </motion.div>

        <motion.h1
          ref={titleRef}
          className="hero-title glitch"
          data-text={t('hero.title')}
          initial={{ opacity: 0, y: 100, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p
          ref={subtitleRef}
          className="hero-subtitle"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          className="hero-description"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <p>
            {t('hero.description')}
          </p>
        </motion.div>

        <motion.div
          ref={ctaRef}
          className="hero-cta"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <motion.button
            className="cta-primary"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(0, 255, 136, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>{t('hero.cta.work')}</span>
            <div className="button-glow" />
          </motion.button>

          <motion.button
            className="cta-secondary"
            whileHover={{ 
              scale: 1.05,
              borderColor: '#00ff88'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>{t('hero.cta.contact')}</span>
          </motion.button>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">{t('hero.stats.projects')}</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">3+</div>
            <div className="stat-label">{t('hero.stats.years')}</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">{t('hero.stats.passion')}</div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
      >
        <motion.div
          className="scroll-arrow"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span>{t('hero.scroll')}</span>
      </motion.div>
    </section>
  );
};

export default Hero;
