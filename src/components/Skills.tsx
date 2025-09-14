import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const Skills: React.FC = () => {
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

    tl.fromTo('.skill-category',
      { y: 100, opacity: 0, rotation: 10 },
      { 
        y: 0, 
        opacity: 1, 
        rotation: 0,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.2
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const skills = [
    { name: 'React/Next.js', level: 95, color: '#00ff88', icon: '⚛️' },
    { name: 'TypeScript', level: 90, color: '#0088ff', icon: '🔷' },
    { name: 'Node.js', level: 85, color: '#ff0088', icon: '🟢' },
    { name: 'Python', level: 80, color: '#ff8800', icon: '🐍' },
    { name: 'AWS/Cloud', level: 75, color: '#8800ff', icon: '☁️' },
    { name: 'Git/GitHub', level: 90, color: '#00ffff', icon: '📝' },
    { name: 'Docker', level: 70, color: '#0066cc', icon: '🐳' },
    { name: 'PostgreSQL', level: 75, color: '#336791', icon: '🐘' }
  ];

  return (
    <section id="skills" className="skills section" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="skills-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="skills-text">
            <motion.h2
              className="section-title"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {t('skills.title').split(' ').map((word, index) => 
                word === 'СТЕК' || word === 'STACK' ? (
                  <span key={index} className="accent">{word}</span>
                ) : (
                  <span key={index}>{word} </span>
                )
              )}
            </motion.h2>

            <motion.p
              className="skills-description"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {t('skills.subtitle')}
            </motion.p>

            <motion.div
              className="skills-stats"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="stat">
                <div className="stat-number">8+</div>
                <div className="stat-label">Технологий</div>
              </div>
              <div className="stat">
                <div className="stat-number">5+</div>
                <div className="stat-label">Лет опыта</div>
              </div>
              <div className="stat">
                <div className="stat-number">100%</div>
                <div className="stat-label">Качество</div>
              </div>
            </motion.div>
          </div>

          <div className="skills-visual">
            <div className="hologram-container">
              <div className="hologram-effect">
                <div className="profile-card">
                  <div className="profile-image">
                    <div className="image-placeholder">
                      <div className="avatar">
                        <div className="tech-icon">💻</div>
                      </div>
                    </div>
                    <div className="image-glow" />
                  </div>
                  <div className="profile-info">
                    <h3>Мой Тех Стек</h3>
                    <p>Современные технологии</p>
                    <div className="status-indicator">
                      <div className="status-dot" />
                      <span>Активно развиваюсь</span>
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
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="skills-title">Мои Навыки</h3>
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
                  <div className="skill-icon-name">
                    <span className="skill-icon">{skill.icon}</span>
                    <span className="skill-name">{skill.name}</span>
                  </div>
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

export default Skills;
