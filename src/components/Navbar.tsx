import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import ThemeSwitcher from './ThemeSwitcher.tsx';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('nav.home'), to: 'hero' },
    { name: t('nav.about'), to: 'about' },
    { name: t('nav.skills'), to: 'skills' },
    { name: t('nav.projects'), to: 'projects' },
    { name: t('nav.contact'), to: 'contact' }
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' }
  ];

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="nav-container">
        <motion.div
          className="nav-logo"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="logo-text">It </span>
          <span className="logo-accent">Intel</span>
        </motion.div>

        <div className="nav-links">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <a
                href={`#${item.to}`}
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.to)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <motion.span
                  whileHover={{ 
                    background: 'linear-gradient(45deg, #00ff88, #0088ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {item.name}
                </motion.span>
              </a>
            </motion.div>
          ))}
        </div>

        <div className="nav-controls">
          <ThemeSwitcher />
          
          <div className="language-selector">
            <button
              className="language-toggle"
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
            >
              <span className="flag">{languages.find(lang => lang.code === language)?.flag}</span>
              <span className="lang-name">{languages.find(lang => lang.code === language)?.name}</span>
              <motion.span
                className="dropdown-arrow"
                animate={{ rotate: isLanguageMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ▼
              </motion.span>
            </button>

          <AnimatePresence>
            {isLanguageMenuOpen && (
              <motion.div
                className="language-dropdown"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`language-option ${language === lang.code ? 'active' : ''}`}
                    onClick={() => {
                      setLanguage(lang.code as 'ru' | 'en');
                      setIsLanguageMenuOpen(false);
                    }}
                  >
                    <span className="flag">{lang.flag}</span>
                    <span className="lang-name">{lang.name}</span>
                    {language === lang.code && <span className="check">✓</span>}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </div>

        <motion.button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.span
            animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <a
                  href={`#${item.to}`}
                  className="mobile-nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    document.getElementById(item.to)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {item.name}
                </a>
              </motion.div>
            ))}
            <div className="mobile-controls">
              <div className="mobile-theme-switcher">
                <ThemeSwitcher />
              </div>
              <div className="mobile-language-selector">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`mobile-lang-btn ${language === lang.code ? 'active' : ''}`}
                    onClick={() => {
                      setLanguage(lang.code as 'ru' | 'en');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <span className="flag">{lang.flag}</span>
                    <span className="lang-name">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
