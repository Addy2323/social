import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../utils/api';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  balance: number;
  orders: number;
  active: number;
  joinDate: string;
  role?: 'user' | 'admin';
}

interface FlashMessage {
  type: 'success' | 'error';
  message: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateBalance: (amount: number) => void;
  updateUserStats: (orders?: number, active?: number) => void;
  flashMessage: FlashMessage | null;
  setFlashMessage: (message: FlashMessage | null) => void;
  clearFlashMessage: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [flashMessage, setFlashMessage] = useState<FlashMessage | null>(null);

  useEffect(() => {
    // Check for existing user session
    const savedUser = localStorage.getItem('addonet_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData.user || userData);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('addonet_user');
      }
    }
  }, []);

  const clearFlashMessage = () => {
    setFlashMessage(null);
  };

  const updateBalance = (amount: number) => {
    if (user) {
      const updatedUser = { ...user, balance: user.balance + amount };
      setUser(updatedUser);
      localStorage.setItem('addonet_user', JSON.stringify({ user: updatedUser, token: getStoredToken() }));
    }
  };

  const updateUserStats = (orders?: number, active?: number) => {
    if (user) {
      const updatedUser = { 
        ...user, 
        orders: orders !== undefined ? orders : user.orders,
        active: active !== undefined ? active : user.active
      };
      setUser(updatedUser);
      localStorage.setItem('addonet_user', JSON.stringify({ user: updatedUser, token: getStoredToken() }));
    }
  };

  const getStoredToken = () => {
    const savedUser = localStorage.getItem('addonet_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        return userData.token;
      } catch (error) {
        return null;
      }
    }
    return null;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authAPI.login({ email, password });
      
      if (response.success) {
        setUser(response.user);
        localStorage.setItem('addonet_user', JSON.stringify({
          user: response.user,
          token: response.token
        }));
        setFlashMessage({ type: 'success', message: response.message });
        return true;
      }
      
      setFlashMessage({ type: 'error', message: 'Login failed' });
      return false;
    } catch (error) {
      console.error('Login error:', error);
      setFlashMessage({ type: 'error', message: error instanceof Error ? error.message : 'Login failed' });
      return false;
    }
  };

  const register = async (name: string, email: string, phone: string, password: string): Promise<boolean> => {
    try {
      const response = await authAPI.register({ name, email, phone, password });
      
      if (response.success) {
        setUser(response.user);
        localStorage.setItem('addonet_user', JSON.stringify({
          user: response.user,
          token: response.token
        }));
        setFlashMessage({ type: 'success', message: response.message });
        return true;
      }
      
      setFlashMessage({ type: 'error', message: 'Registration failed' });
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      setFlashMessage({ type: 'error', message: error instanceof Error ? error.message : 'Registration failed' });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('addonet_user');
    setFlashMessage({ type: 'success', message: 'Logged out successfully.' });
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateBalance,
      updateUserStats,
      flashMessage,
      setFlashMessage,
      clearFlashMessage
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}