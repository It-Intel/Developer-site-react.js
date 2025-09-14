import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Theme = 'green' | 'red' | 'blue' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    backgroundSolid: string;
    text: string;
    card: string;
    border: string;
    hover: string;
    shadow: string;
  };
}

const themeColors = {
  green: {
    primary: '#00ff88',
    secondary: '#0088ff',
    accent: '#00ff88',
    background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(0, 136, 255, 0.05) 50%, rgba(0, 255, 136, 0.1) 100%)',
    backgroundSolid: '#0a1a0f',
    text: '#ffffff',
    card: 'rgba(0, 0, 0, 0.4)',
    border: 'rgba(0, 255, 136, 0.3)',
    hover: 'rgba(0, 255, 136, 0.1)',
    shadow: 'rgba(0, 255, 136, 0.2)'
  },
  red: {
    primary: '#ff4444',
    secondary: '#ff6666',
    accent: '#ff4444',
    background: 'linear-gradient(135deg, rgba(255, 68, 68, 0.1) 0%, rgba(255, 102, 102, 0.05) 50%, rgba(255, 68, 68, 0.1) 100%)',
    backgroundSolid: '#1a0a0a',
    text: '#ffffff',
    card: 'rgba(0, 0, 0, 0.4)',
    border: 'rgba(255, 68, 68, 0.3)',
    hover: 'rgba(255, 68, 68, 0.1)',
    shadow: 'rgba(255, 68, 68, 0.2)'
  },
  blue: {
    primary: '#4488ff',
    secondary: '#66aaff',
    accent: '#4488ff',
    background: 'linear-gradient(135deg, rgba(68, 136, 255, 0.1) 0%, rgba(102, 170, 255, 0.05) 50%, rgba(68, 136, 255, 0.1) 100%)',
    backgroundSolid: '#0a0f1a',
    text: '#ffffff',
    card: 'rgba(0, 0, 0, 0.4)',
    border: 'rgba(68, 136, 255, 0.3)',
    hover: 'rgba(68, 136, 255, 0.1)',
    shadow: 'rgba(68, 136, 255, 0.2)'
  },
  dark: {
    primary: '#ffffff',
    secondary: '#cccccc',
    accent: '#ffffff',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(204, 204, 204, 0.01) 50%, rgba(255, 255, 255, 0.02) 100%)',
    backgroundSolid: '#000000',
    text: '#ffffff',
    card: 'rgba(0, 0, 0, 0.6)',
    border: 'rgba(255, 255, 255, 0.2)',
    hover: 'rgba(255, 255, 255, 0.05)',
    shadow: 'rgba(255, 255, 255, 0.1)'
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('green');

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme;
    if (savedTheme && themeColors[savedTheme]) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
    
    // Apply theme to CSS variables
    const colors = themeColors[theme];
    const root = document.documentElement;
    
    root.style.setProperty('--theme-primary', colors.primary);
    root.style.setProperty('--theme-secondary', colors.secondary);
    root.style.setProperty('--theme-accent', colors.accent);
    root.style.setProperty('--theme-background', colors.background);
    root.style.setProperty('--theme-background-solid', colors.backgroundSolid);
    root.style.setProperty('--theme-text', colors.text);
    root.style.setProperty('--theme-card', colors.card);
    root.style.setProperty('--theme-border', colors.border);
    root.style.setProperty('--theme-hover', colors.hover);
    root.style.setProperty('--theme-shadow', colors.shadow);
    
    // Apply background to body
    document.body.style.background = colors.backgroundSolid;
  }, [theme]);

  const colors = themeColors[theme];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};
