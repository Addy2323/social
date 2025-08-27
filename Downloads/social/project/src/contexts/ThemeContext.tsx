import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type Currency = 'USD' | 'TZS';

interface ThemeContextType {
  theme: Theme;
  currency: Currency;
  toggleTheme: () => void;
  setCurrency: (currency: Currency) => void;
  formatPrice: (price: number) => string;
  convertPrice: (usdPrice: number) => number;
  getCurrencySymbol: () => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Exchange rate: 1 USD = 2500 TZS (approximate)
const USD_TO_TZS_RATE = 2500;

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [currency, setCurrencyState] = useState<Currency>('USD');
  const [mounted, setMounted] = useState(false);

  // Initialize theme and currency from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('zamotto_theme') as Theme | null;
    const savedCurrency = localStorage.getItem('zamotto_currency') as Currency | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Default to dark theme if no preference is set
      setTheme('dark');
    }
    
    if (savedCurrency) {
      setCurrencyState(savedCurrency);
    }
    
    setMounted(true);
  }, []);

  // Apply theme class to document element
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('zamotto_theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme, mounted]);

  // Save currency preference
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('zamotto_currency', currency);
    }
  }, [currency, mounted]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
  };

  // Convert USD to selected currency
  const convertPrice = (usdPrice: number): number => {
    if (currency === 'TZS') {
      return usdPrice * USD_TO_TZS_RATE;
    }
    return usdPrice;
  };

  // Format price based on selected currency
  const formatPrice = (price: number): string => {
    const convertedPrice = currency === 'TZS' ? price * USD_TO_TZS_RATE : price;
    
    return new Intl.NumberFormat(currency === 'TZS' ? 'sw-TZ' : 'en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: currency === 'TZS' ? 0 : 2,
    }).format(convertedPrice);
  };

  // Get currency symbol
  const getCurrencySymbol = (): string => {
    return currency === 'USD' ? '$' : 'TZS';
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        currency, 
        toggleTheme, 
        setCurrency, 
        formatPrice, 
        convertPrice,
        getCurrencySymbol
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}