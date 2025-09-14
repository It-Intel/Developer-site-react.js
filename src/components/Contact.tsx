import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo('.contact-header',
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
    )
    .fromTo('.contact-info',
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      '-=0.5'
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const socialLinks = [
    { name: 'GitHub', icon: '🐙', url: 'https://github.com/it-intel' },
    { name: 'Discord', icon: '💬', url: 'https://discordapp.com/users/874811573590437948' },
    { name: 'VK', icon: '🔵', url: 'https://vk.com/useroutput' },
    { name: 'Telegram', icon: '✈️', url: 'https://t.me/WhyLelouch' }
  ];

  return (
    <section id="contact" className="contact section" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="contact-content"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="contact-header">
            <h2 className="section-title">
              {t('contact.title').split(' ').map((word, index) => 
                word === 'СВЯЖЕМСЯ' || word === 'CONNECT' ? (
                  <span key={index} className="accent">{word}</span>
                ) : (
                  <span key={index}>{word} </span>
                )
              )}
            </h2>
            <p className="section-subtitle">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="contact-info">
            <div className="info-card">
              <h3>{t('contact.info.title')}</h3>
              <p>
                {t('contact.info.description')}
              </p>

              <div className="social-links">
                <h4>{t('contact.info.follow')}</h4>
                <div className="social-grid">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <span className="social-icon">{social.icon}</span>
                      <span className="social-name">{social.name}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;