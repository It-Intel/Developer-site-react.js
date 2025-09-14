import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
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

    tl.fromTo(textRef.current, 
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.5, ease: 'power2.out' }
    )
    .fromTo(imageRef.current,
      { x: 100, opacity: 0, rotation: 10 },
      { x: 0, opacity: 1, rotation: 0, duration: 1.5, ease: 'power2.out' },
      '-=1'
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const skills = [
    { name: 'React/Next.js', level: 95, color: '#00ff88' },
    { name: 'TypeScript', level: 90, color: '#0088ff' },
    { name: 'Node.js', level: 85, color: '#ff0088' },
    { name: 'Python', level: 80, color: '#ff8800' },
    { name: 'AWS/Cloud', level: 75, color: '#8800ff' },
    { name: 'AI/ML', level: 70, color: '#00ffff' }
  ];

  return (
    <section id="about" className="about section" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="about-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="about-text" ref={textRef}>
            <motion.h2
              className="section-title"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {t('about.title').split(' ').map((word, index) => 
                word === 'ME' ? (
                  <span key={index} className="accent">{word}</span>
                ) : (
                  <span key={index}>{word} </span>
                )
              )}
            </motion.h2>

            <motion.p
              className="about-description"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {t('about.description1')}
            </motion.p>

            <motion.p
              className="about-description"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {t('about.description2')}
            </motion.p>

            <motion.div
              className="about-stats"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="stat">
                <div className="stat-number">3+</div>
                <div className="stat-label">{t('about.stats.experience')}</div>
              </div>
              <div className="stat">
                <div className="stat-number">50+</div>
                <div className="stat-label">{t('about.stats.projects')}</div>
              </div>
              <div className="stat">
                <div className="stat-number">100%</div>
                <div className="stat-label">{t('about.stats.satisfaction')}</div>
              </div>
            </motion.div>
          </div>

          <div className="about-visual" ref={imageRef}>
            <div className="hologram-container">
              <div className="hologram-effect">
                <div className="profile-card">
                  <div className="profile-image">
                    <div className="image-placeholder">
                      <div className="avatar">
                        <img src="/avatar.jpg" alt="It-Intel" />
                      </div>
                    </div>
                    <div className="image-glow" />
                  </div>
                  <div className="profile-info">
                    <h3>{t('about.profile.name')}</h3>
                    <p>{t('about.profile.title')}</p>
                    <div className="status-indicator">
                      <div className="status-dot" />
                      <span>{t('about.profile.status')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="skills-section"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="skills-title">{t('about.skills.title')}</h3>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="skill-item"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <motion.div
                    className="skill-progress"
                    style={{ backgroundColor: skill.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
