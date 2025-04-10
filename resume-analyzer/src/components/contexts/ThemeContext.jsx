import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

// Create context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check for system preference or saved preference
  const getInitialTheme = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedPreference = window.localStorage.getItem('theme');
      if (typeof storedPreference === 'string') {
        return storedPreference;
      }

      const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
      if (userMedia.matches) {
        return 'dark';
      }
    }

    // Default theme if no preference found
    return 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Update HTML class and localStorage when theme changes
  const rawSetTheme = (rawTheme) => {
    const root = window.document.documentElement;
    const isDark = rawTheme === 'dark';

    // Remove both classes and add the correct one
    root.classList.remove('light', 'dark');
    root.classList.add(rawTheme);

    // Set data attribute for non-class-based styling
    root.setAttribute('data-theme', rawTheme);
    
    // Save preference to localStorage
    localStorage.setItem('theme', rawTheme);
  };

  // Set theme state and apply it
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    rawSetTheme(newTheme);
  };

  // Apply theme on mount and when theme changes
  useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeContext;