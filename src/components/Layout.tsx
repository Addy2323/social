import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Zap, 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  User, 
  LogOut, 
  Menu, 
  X,
  Wallet,
  Sun,
  Moon,
  ChevronDown,
  Plus,
  BarChart3,
  Shield,
  MessageCircle
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, currency, toggleTheme, setCurrency, formatPrice } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Services', href: '/services', icon: Package },
    { name: 'Orders', href: '/orders', icon: ShoppingCart },
    { name: 'Add Funds', href: '/add-funds', icon: Plus },
    { name: 'Statistics', href: '/statistics', icon: BarChart3 },
    { name: 'Support', href: '/support', icon: MessageCircle },
    { name: 'Profile', href: '/profile', icon: User }
  ];

  // Admin navigation items
  const adminNavigation = [
    { name: 'Admin Dashboard', href: '/admin', icon: Shield }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!mounted) {
    return null; // or return a loading spinner
  }

  return (
    <div className={`min-h-screen flex ${theme === 'dark' 
      ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100' 
      : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900'
    }`}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-50 lg:hidden bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-64 lg:flex-shrink-0`}>
        <div className={`flex flex-col h-full ${theme === 'dark' 
          ? 'bg-slate-800 border-r border-slate-700' 
          : 'bg-white border-r border-gray-200 shadow-lg'
        }`}>
          <div className={`flex items-center justify-between h-16 px-4 ${theme === 'dark' 
            ? 'border-b border-slate-700' 
            : 'border-b border-gray-200'
          }`}>
            <div className="flex items-center">
              <Zap className="w-8 h-8 text-orange-500" />
              <span className={`ml-2 text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                ADDO.NET
              </span>
            </div>
            <button
              className={`p-1 rounded-md lg:hidden focus:outline-none ${theme === 'dark' 
                ? 'text-slate-400 hover:text-white' 
                : 'text-gray-400 hover:text-gray-900'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* User Profile */}
          <div className={`px-4 py-6 ${theme === 'dark' 
            ? 'border-b border-slate-700' 
            : 'border-b border-gray-200'
          }`}>
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-semibold text-orange-500 ${theme === 'dark' 
                ? 'bg-slate-700' 
                : 'bg-gray-100'
              }`}>
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {user?.name || 'User'}
                </p>
                <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center">
                <Wallet className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-sm font-medium">{formatPrice(user?.balance || 0)}</span>
              </div>
              <button
                onClick={handleLogout}
                className={`text-sm flex items-center hover:text-red-400 transition-colors ${theme === 'dark' 
                  ? 'text-slate-400 hover:text-white' 
                  : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === item.href
                    ? theme === 'dark'
                      ? 'bg-slate-700 text-white'
                      : 'bg-orange-100 text-orange-900 border-r-2 border-orange-500'
                    : theme === 'dark'
                      ? 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            ))}
            
            {/* Admin Navigation - Only show for admin users */}
            {user?.role === 'admin' && (
              <>
                <div className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider ${
                  theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
                }`}>
                  Administration
                </div>
                {adminNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                      location.pathname === item.href
                        ? theme === 'dark'
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-100 text-blue-900 border-r-2 border-blue-500'
                        : theme === 'dark'
                          ? 'text-blue-300 hover:bg-blue-600/20 hover:text-white'
                          : 'text-blue-600 hover:bg-blue-50 hover:text-blue-900'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                ))}
              </>
            )}
          </nav>

          {/* Theme and Currency Switcher */}
          <div className={`p-4 ${theme === 'dark' 
            ? 'border-t border-slate-700' 
            : 'border-t border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="relative">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as 'USD' | 'TZS')}
                  className={`appearance-none pl-3 pr-8 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer w-full ${theme === 'dark' 
                    ? 'bg-slate-700 text-white border border-slate-600' 
                    : 'bg-gray-100 text-gray-900 border border-gray-300'
                  }`}
                >
                  <option value="USD">USD</option>
                  <option value="TZS">TZS</option>
                </select>
                <ChevronDown className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none ${theme === 'dark' 
                  ? 'text-slate-400' 
                  : 'text-gray-600'
                }`} />
              </div>
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${theme === 'dark' 
                  ? 'hover:bg-slate-700' 
                  : 'hover:bg-gray-200'
                }`}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
        <header className={`lg:hidden flex items-center justify-between h-16 px-4 flex-shrink-0 ${theme === 'dark' 
          ? 'bg-slate-800 border-b border-slate-700' 
          : 'bg-white border-b border-gray-200 shadow-sm'
        }`}>
          <button
            className={`p-2 rounded-md focus:outline-none ${theme === 'dark' 
              ? 'text-slate-400 hover:text-white hover:bg-slate-700' 
              : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'
            }`}
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center">
            <Zap className="w-6 h-6 text-orange-500" />
            <span className={`ml-2 text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              ADDO.NET
            </span>
          </div>
          <div className="w-6"></div> {/* Spacer for flex alignment */}
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}