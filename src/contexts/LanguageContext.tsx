import React, { createContext, useContext, useState, useEffect } from 'react';

export interface LanguageContextType {
  language: 'ru' | 'en';
  setLanguage: (lang: 'ru' | 'en') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Переводы
const translations = {
  ru: {
    // Navigation
    'nav.home': 'Главная',
    'nav.about': 'Обо мне',
    'nav.skills': 'Навыки',
    'nav.projects': 'Проекты',
    'nav.contact': 'Контакты',
    
    // Hero
    'hero.badge': 'ДОСТУПЕН ДЛЯ РАБОТЫ',
    'hero.title': 'IT-INTEL',
    'hero.subtitle': 'СОЗДАЮ БУДУЩЕЕ ВЕБ-РАЗРАБОТКИ',
    'hero.description': 'Специализируюсь на создании современных веб-приложений с использованием передовых технологий. От концепции до реализации - каждый проект это шаг к цифровому будущему.',
    'hero.cta.work': 'СМОТРЕТЬ РАБОТЫ',
    'hero.cta.contact': 'СВЯЗАТЬСЯ',
    'hero.stats.projects': 'ПРОЕКТОВ',
    'hero.stats.years': 'ЛЕТ',
    'hero.stats.passion': 'СТРАСТИ',
    'hero.scroll': 'ПРОКРУТИТЕ ВНИЗ',
    
    // About
    'about.title': 'ОБО МНЕ',
    'about.description1': 'Я страстный full-stack разработчик с глубокой любовью к созданию инновационных цифровых решений. С экспертизой в современных веб-технологиях и острым взглядом на дизайн, я воплощаю идеи в жизнь через чистый, эффективный код.',
    'about.description2': 'Мой путь в технологиях начался с любопытства и эволюционировал в миссию по расширению границ возможного в веб-разработке. Я специализируюсь на React, TypeScript и современных практиках разработки.',
    'about.stats.experience': 'Лет Опыта',
    'about.stats.projects': 'Завершенных Проектов',
    'about.stats.satisfaction': 'Удовлетворенности Клиентов',
    'about.skills.title': 'ТЕХНИЧЕСКИЕ НАВЫКИ',
    'about.profile.name': 'It-Intel',
    'about.profile.title': 'Full-Stack Developer',
    'about.profile.status': 'Доступен для работы',
    
    // Skills
    'skills.title': 'ТЕХ СТЕК',
    'skills.subtitle': 'Технологии, с которыми я работаю каждый день',
    'skills.categories.frontend': 'Frontend',
    'skills.categories.tools': 'Инструменты',
    'skills.categories.design': 'Дизайн',
    'skills.categories.mobile': 'Мобильная разработка',
    'skills.highlights.learning': 'Постоянно изучаю',
    'skills.highlights.learning.desc': 'Новые технологии и подходы',
    'skills.highlights.performance': 'Быстро и качественно',
    'skills.highlights.performance.desc': 'Оптимизированный код и хорошая производительность',
    'skills.highlights.security': 'Безопасность',
    'skills.highlights.security.desc': 'Слежу за безопасностью кода',
    
    // Projects
    'projects.title': 'МОИ ПРОЕКТЫ',
    'projects.subtitle': 'Работы, которыми я горжусь',
    'projects.filter.all': 'Все',
    'projects.filter.web': 'Веб-приложения',
    'projects.filter.mobile': 'Мобильные приложения',
    'projects.filter.design': 'Дизайн',
    'projects.filter.tools': 'Инструменты',
    'projects.features.title': 'Ключевые Особенности:',
    'projects.links.code': 'Посмотреть Код',
    'projects.links.demo': 'Живое Демо',
    
    // Contact
    'contact.title': 'СВЯЗАТЬСЯ',
    'contact.subtitle': 'Есть идея? Давайте обсудим!',
    'contact.info.title': 'Свяжитесь со мной',
    'contact.info.description': 'Есть проект или просто хотите поболтать? Пишите в соцсетях!',
    'contact.info.follow': 'Мои соцсети',
    
    // Themes
    'theme.green': 'Зеленый',
    'theme.red': 'Красный',
    'theme.blue': 'Синий',
    'theme.dark': 'Темный'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.badge': 'AVAILABLE FOR WORK',
    'hero.title': 'IT-INTEL',
    'hero.subtitle': 'CREATING THE FUTURE OF WEB DEVELOPMENT',
    'hero.description': 'I specialize in creating modern web applications using cutting-edge technologies. From concept to implementation - every project is a step towards the digital future.',
    'hero.cta.work': 'VIEW MY WORK',
    'hero.cta.contact': 'GET IN TOUCH',
    'hero.stats.projects': 'PROJECTS',
    'hero.stats.years': 'YEARS',
    'hero.stats.passion': 'PASSION',
    'hero.scroll': 'SCROLL DOWN',
    
    // About
    'about.title': 'ABOUT ME',
    'about.description1': 'I\'m a passionate full-stack developer with a deep love for creating innovative digital experiences. With expertise in modern web technologies and a keen eye for design, I bring ideas to life through clean, efficient code.',
    'about.description2': 'My journey in tech started with curiosity and has evolved into a mission to push the boundaries of what\'s possible on the web. I specialize in React, TypeScript, and modern development practices.',
    'about.stats.experience': 'Years Experience',
    'about.stats.projects': 'Projects Completed',
    'about.stats.satisfaction': 'Client Satisfaction',
    'about.skills.title': 'TECHNICAL SKILLS',
    'about.profile.name': 'It-Intel',
    'about.profile.title': 'Full-Stack Developer',
    'about.profile.status': 'Available for work',
    
    // Skills
    'skills.title': 'TECH STACK',
    'skills.subtitle': 'Technologies I work with every day',
    'skills.categories.frontend': 'Frontend',
    'skills.categories.tools': 'Tools',
    'skills.categories.design': 'Design',
    'skills.categories.mobile': 'Mobile Development',
    'skills.highlights.learning': 'Always learning',
    'skills.highlights.learning.desc': 'New technologies and approaches',
    'skills.highlights.performance': 'Fast and quality',
    'skills.highlights.performance.desc': 'Optimized code and good performance',
    'skills.highlights.security': 'Security',
    'skills.highlights.security.desc': 'Keeping code secure',
    
    // Projects
    'projects.title': 'MY PROJECTS',
    'projects.subtitle': 'Work I\'m proud of',
    'projects.filter.all': 'All',
    'projects.filter.web': 'Web Applications',
    'projects.filter.mobile': 'Mobile Applications',
    'projects.filter.design': 'Design',
    'projects.filter.tools': 'Tools',
    'projects.features.title': 'Key Features:',
    'projects.links.code': 'View Code',
    'projects.links.demo': 'Live Demo',
    
    // Contact
    'contact.title': 'CONNECT',
    'contact.subtitle': 'Got an idea? Let\'s discuss!',
    'contact.info.title': 'Get in touch',
    'contact.info.description': 'Have a project or just want to chat? Hit me up on social media!',
    'contact.info.follow': 'My socials',
    
    // Themes
    'theme.green': 'Green',
    'theme.red': 'Red',
    'theme.blue': 'Blue',
    'theme.dark': 'Dark'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'ru' | 'en'>('en');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Загружаем сохраненный язык из localStorage
    const savedLanguage = localStorage.getItem('language') as 'ru' | 'en';
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
    setIsLoaded(true);
  }, []);

  const handleSetLanguage = (lang: 'ru' | 'en') => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  if (!isLoaded) {
    return <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      background: '#0a0a0a',
      color: '#fff'
    }}>Loading...</div>;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
