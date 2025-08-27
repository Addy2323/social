import React, { createContext, useContext, useState, useEffect } from 'react';

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

  // Get registered users from localStorage
  const getRegisteredUsers = (): User[] => {
    const users = localStorage.getItem('addonet_registered_users');
    return users ? JSON.parse(users) : [];
  };

  // Save registered users to localStorage
  const saveRegisteredUsers = (users: User[]) => {
    localStorage.setItem('addonet_registered_users', JSON.stringify(users));
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('addonet_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const clearFlashMessage = () => {
    setFlashMessage(null);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Check for admin credentials
    if (email === 'admin@addonet.com' && password === 'admin123') {
      const adminUser: User = {
        id: 'admin-1',
        email,
        name: 'Administrator',
        phone: '+255123456789',
        balance: 0,
        orders: 0,
        active: 0,
        joinDate: '2024-01-01',
        role: 'admin'
      };
      setUser(adminUser);
      localStorage.setItem('addonet_user', JSON.stringify(adminUser));
      setFlashMessage({ type: 'success', message: 'Admin login successful!' });
      return true;
    }
    
    // Check if email is registered
    const registeredUsers = getRegisteredUsers();
    const existingUser = registeredUsers.find(u => u.email === email);
    
    if (!existingUser) {
      setFlashMessage({ type: 'error', message: 'Email not registered. Please sign up first.' });
      return false;
    }
    
    // For demo purposes, any password works for registered users
    // In production, you'd verify the actual password hash
    if (password) {
      setUser(existingUser);
      localStorage.setItem('addonet_user', JSON.stringify(existingUser));
      setFlashMessage({ type: 'success', message: 'Login successful! Welcome back.' });
      return true;
    } else {
      setFlashMessage({ type: 'error', message: 'Invalid password.' });
      return false;
    }
  };

  const register = async (name: string, email: string, phone: string, password: string): Promise<boolean> => {
    if (!name || !email || !phone || !password) {
      setFlashMessage({ type: 'error', message: 'Registration failed. Please fill in all fields.' });
      return false;
    }

    // Check if email is already registered
    const registeredUsers = getRegisteredUsers();
    const existingUser = registeredUsers.find(u => u.email === email);
    
    if (existingUser) {
      setFlashMessage({ type: 'error', message: 'Email already registered. Please login instead.' });
      return false;
    }

    const newUser: User = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      email,
      phone,
      balance: 0,
      orders: 0,
      active: 0,
      joinDate: new Date().toISOString(),
      role: 'user'
    };

    // Save to registered users list
    const updatedUsers = [...registeredUsers, newUser];
    saveRegisteredUsers(updatedUsers);

    // Set as current user
    setUser(newUser);
    localStorage.setItem('addonet_user', JSON.stringify(newUser));
    setFlashMessage({ type: 'success', message: 'Registration successful! Welcome to ADDO.NET.' });
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('addonet_user');
    setFlashMessage({ type: 'success', message: 'Logged out successfully.' });
  };

  const updateBalance = (amount: number) => {
    if (user) {
      const updatedUser = { ...user, balance: user.balance + amount };
      setUser(updatedUser);
      localStorage.setItem('addonet_user', JSON.stringify(updatedUser));
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
      localStorage.setItem('addonet_user', JSON.stringify(updatedUser));
    }
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