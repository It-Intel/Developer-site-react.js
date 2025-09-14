import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);
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

    tl.fromTo('.project-card',
      { y: 100, opacity: 0, rotation: 5 },
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

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Полнофункциональная платформа электронной коммерции с современным дизайном и интуитивным интерфейсом. Включает систему управления товарами, корзину покупок, обработку платежей и админ-панель.',
      image: '/project-placeholder.jpg',
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe'],
      category: t('projects.filter.web'),
      status: 'Live',
      features: [
        'Адаптивный дизайн для всех устройств',
        'Система аутентификации и авторизации',
        'Интеграция с платежными системами',
        'Админ-панель для управления',
        'Система отзывов и рейтингов'
      ],
      github: 'https://github.com',
      live: 'https://ecommerce-demo.com',
      color: '#00ff88'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Современное приложение для управления задачами и проектами с возможностью командной работы. Включает канбан-доски, временные трекеры и систему уведомлений.',
      image: '/project-placeholder.jpg',
      technologies: ['React', 'Redux', 'Express.js', 'MongoDB', 'Socket.io'],
      category: t('projects.filter.web'),
      status: 'Live',
      features: [
        'Канбан-доски для визуализации задач',
        'Временной трекер для учета времени',
        'Система уведомлений в реальном времени',
        'Командная работа и совместное редактирование',
        'Аналитика и отчеты по продуктивности'
      ],
      github: 'https://github.com',
      live: 'https://taskmanager-demo.com',
      color: '#0088ff'
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'Информативная панель погоды с прогнозами на несколько дней, интерактивными картами и персонализированными рекомендациями. Поддерживает множество городов и языков.',
      image: '/project-placeholder.jpg',
      technologies: ['Vue.js', 'Chart.js', 'OpenWeather API', 'PWA', 'Service Workers'],
      category: t('projects.filter.web'),
      status: 'Live',
      features: [
        'Прогноз погоды на 7 дней',
        'Интерактивные карты с погодными данными',
        'Персонализированные рекомендации',
        'PWA с офлайн-режимом',
        'Многоязычная поддержка'
      ],
      github: 'https://github.com',
      live: 'https://weather-demo.com',
      color: '#ff0088'
    },
    {
      id: 4,
      title: 'Portfolio Website',
      description: 'Персональный портфолио-сайт с анимациями, интерактивными элементами и адаптивным дизайном. Включает галерею проектов, контактную форму и блог.',
      image: '/project-placeholder.jpg',
      technologies: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'Sanity CMS', 'Vercel'],
      category: t('projects.filter.web'),
      status: 'Live',
      features: [
        'Современные анимации и переходы',
        'Адаптивный дизайн для всех устройств',
        'CMS для управления контентом',
        'SEO оптимизация',
        'Быстрая загрузка и производительность'
      ],
      github: 'https://github.com',
      live: 'https://portfolio-demo.com',
      color: '#ff8800'
    },
    {
      id: 5,
      title: 'Recipe Sharing Platform',
      description: 'Социальная платформа для обмена рецептами с возможностью поиска, фильтрации и создания собственных коллекций. Включает систему рейтингов и комментариев.',
      image: '/project-placeholder.jpg',
      technologies: ['React', 'Firebase', 'Material-UI', 'Image Upload', 'Search API'],
      category: t('projects.filter.web'),
      status: 'Live',
      features: [
        'Поиск и фильтрация рецептов',
        'Система рейтингов и комментариев',
        'Создание персональных коллекций',
        'Загрузка и обработка изображений',
        'Социальные функции и подписки'
      ],
      github: 'https://github.com',
      live: 'https://recipes-demo.com',
      color: '#8800ff'
    },
    {
      id: 6,
      title: 'Expense Tracker',
      description: 'Приложение для учета личных расходов с категоризацией, аналитикой и визуализацией данных. Помогает контролировать бюджет и планировать финансы.',
      image: '/project-placeholder.jpg',
      technologies: ['React Native', 'AsyncStorage', 'Chart.js', 'Expo', 'Push Notifications'],
      category: t('projects.filter.mobile'),
      status: 'Live',
      features: [
        'Учет доходов и расходов',
        'Категоризация трат',
        'Визуализация данных в графиках',
        'Уведомления о превышении бюджета',
        'Экспорт данных в различные форматы'
      ],
      github: 'https://github.com',
      live: 'https://expense-demo.com',
      color: '#00ffff'
    }
  ];

  const categories = [
    t('projects.filter.all'), 
    t('projects.filter.web'), 
    t('projects.filter.mobile'), 
    t('projects.filter.design'), 
    t('projects.filter.tools')
  ];
  const [selectedCategory, setSelectedCategory] = useState(t('projects.filter.all'));

  const filteredProjects = selectedCategory === t('projects.filter.all')
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section id="projects" className="projects section" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="projects-header"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            {t('projects.title').split(' ').map((word, index) => 
              word === 'ПРОЕКТЫ' || word === 'PROJECTS' ? (
                <span key={index} className="accent">{word}</span>
              ) : (
                <span key={index}>{word} </span>
              )
            )}
          </h2>
          <p className="section-subtitle">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        <motion.div
          className="category-filter"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="projects-grid"
          layout
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card"
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  z: 50
                }}
                onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}
              >
                <div className="project-image">
                  <div 
                    className="image-placeholder"
                    style={{ backgroundColor: project.color + '20' }}
                  >
                    <div className="project-icon" style={{ color: project.color }}>
                      {project.id === 1 && '🛒'}
                      {project.id === 2 && '📋'}
                      {project.id === 3 && '🌤️'}
                      {project.id === 4 && '💼'}
                      {project.id === 5 && '🍳'}
                      {project.id === 6 && '💰'}
                    </div>
                  </div>
                  <div className="project-overlay">
                    <div className="project-status" style={{ backgroundColor: project.color }}>
                      {project.status}
                    </div>
                    <div className="project-actions">
                      {project.github && (
                        <motion.button
                          className="action-btn"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          📁
                        </motion.button>
                      )}
                      {project.live && (
                        <motion.button
                          className="action-btn"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          🔗
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="project-content">
                  <div className="project-header">
                    <h3 className="project-title">{project.title}</h3>
                    <span className="project-category">{project.category}</span>
                  </div>
                  
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-tech">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <AnimatePresence>
                  {activeProject === project.id && (
                    <motion.div
                      className="project-details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4>Key Features:</h4>
                      <ul className="features-list">
                        {project.features.map((feature, featureIndex) => (
                          <li key={featureIndex}>{feature}</li>
                        ))}
                      </ul>
                      
                      <div className="project-links">
                        {project.github && (
                          <motion.a
                            href={project.github}
                            className="project-link"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            View Code
                          </motion.a>
                        )}
                        {project.live && (
                          <motion.a
                            href={project.live}
                            className="project-link primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Live Demo
                          </motion.a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
