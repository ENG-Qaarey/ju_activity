import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme as useNativeColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  refreshTheme: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
  refreshTheme: async () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemScheme = useNativeColorScheme();
  const [theme, setThemeState] = useState<Theme>(systemScheme === 'dark' ? 'dark' : 'light');

  const getStorageKey = async () => {
    const userId = await AsyncStorage.getItem('current-user');
    return userId ? `theme-${userId}` : 'user-theme';
  };

    const loadTheme = async () => {
      const key = await getStorageKey();
      const savedTheme = await AsyncStorage.getItem(key);
      if (savedTheme) {
        setThemeState(savedTheme as Theme);
      } else if (systemScheme) {
        setThemeState(systemScheme);
      }
    };

    useEffect(() => {
        loadTheme();
    }, []);

    const setTheme = async (newTheme: Theme) => {
        setThemeState(newTheme);
        const key = await getStorageKey();
        await AsyncStorage.setItem(key, newTheme);
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    const refreshTheme = async () => {
        await loadTheme();
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, refreshTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
