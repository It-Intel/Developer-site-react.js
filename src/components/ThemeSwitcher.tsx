import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext.tsx';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import './ThemeSwitcher.css';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { id: 'green', name: t('theme.green'), icon: '🟢', color: '#00ff88' },
    { id: 'red', name: t('theme.red'), icon: '🔴', color: '#ff4444' },
    { id: 'blue', name: t('theme.blue'), icon: '🔵', color: '#4488ff' },
    { id: 'dark', name: t('theme.dark'), icon: '⚫', color: '#ffffff' }
  ] as const;

  const currentTheme = themes.find(t => t.id === theme);

  return (
    <div className="theme-switcher">
      <motion.button
        className="theme-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="theme-icon">{currentTheme?.icon}</span>
        <span className="theme-name">{currentTheme?.name}</span>
        <motion.span
          className="dropdown-arrow"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ▼
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="theme-dropdown"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {themes.map((themeOption) => (
              <motion.button
                key={themeOption.id}
                className={`theme-option ${theme === themeOption.id ? 'active' : ''}`}
                onClick={() => {
                  setTheme(themeOption.id);
                  setIsOpen(false);
                }}
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  '--theme-color': themeOption.color
                } as React.CSSProperties}
              >
                <span className="theme-icon">{themeOption.icon}</span>
                <span className="theme-name">{themeOption.name}</span>
                {theme === themeOption.id && <span className="check">✓</span>}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
