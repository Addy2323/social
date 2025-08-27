import React, { useState } from 'react';
import Layout from './Layout';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  User, 
  Mail, 
  Calendar, 
  Settings,
  Shield,
  Bell,
  Sun,
  Moon
} from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
          <p className="text-slate-400">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Info */}
          <div className="space-y-6">
            {/* Account Details */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Account Details
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl font-bold">
                      {user?.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">{user?.name}</h3>
                    <p className="text-slate-400">Member since {user?.joinDate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center text-slate-400 mb-2">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </div>
                    <p className="text-white">{user?.email}</p>
                  </div>
                  
                  <div className="p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center text-slate-400 mb-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      Join Date
                    </div>
                    <p className="text-white">{user?.joinDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Settings
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center">
                    <Bell className="w-5 h-5 text-slate-400 mr-3" />
                    <div>
                      <p className="text-white font-medium">Email Notifications</p>
                      <p className="text-slate-400 text-sm">Receive updates about your orders</p>
                    </div>
                  </div>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors">
                    Enabled
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-slate-400 mr-3" />
                    <div>
                      <p className="text-white font-medium">Two-Factor Authentication</p>
                      <p className="text-slate-400 text-sm">Secure your account with 2FA</p>
                    </div>
                  </div>
                  <button className="bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-lg transition-colors">
                    Setup
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Theme Settings</h2>
            <div className="space-y-4">
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg border border-slate-600"
              >
                <span className="text-slate-300">Dark Mode</span>
                <div className="flex items-center">
                  {theme === 'dark' ? (
                    <>
                      <Moon className="w-5 h-5 text-yellow-400 mr-2" />
                      <span className="text-slate-400">On</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-5 h-5 text-slate-400 mr-2" />
                      <span className="text-slate-400">Off</span>
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}