import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, Youtube, Hash, Facebook, Zap, Shield, Clock, DollarSign } from 'lucide-react';

const platforms = [
  { name: 'Instagram', icon: Instagram, color: 'from-pink-500 to-purple-600', services: 12 },
  { name: 'TikTok', icon: Hash, color: 'from-black to-gray-800', services: 8 },
  { name: 'YouTube', icon: Youtube, color: 'from-red-500 to-red-700', services: 15 },
  { name: 'Facebook', icon: Facebook, color: 'from-blue-500 to-blue-700', services: 10 }
];

const features = [
  { icon: Zap, title: 'Lightning Fast', description: 'Orders start processing within minutes' },
  { icon: Shield, title: 'Secure & Safe', description: 'Your accounts are 100% protected' },
  { icon: Clock, title: '24/7 Support', description: 'Round-the-clock customer assistance' },
  { icon: DollarSign, title: 'Best Prices', description: 'Cheapest rates in the market' }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 sm:py-6">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-lg sm:text-2xl font-bold text-white">ADDO.NET</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link 
                to="/login" 
                className="text-slate-300 hover:text-white transition-colors text-sm sm:text-base"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 sm:px-6 sm:py-2 rounded-lg transition-colors text-sm sm:text-base"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Boost Your Social Media
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 block sm:inline"> Presence</span>
          </h1>
          <p className="text-base sm:text-xl text-slate-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
            The most reliable SMM panel with high-quality services for Instagram, TikTok, YouTube, and Facebook. 
            Grow your social media engagement with our premium services.
          </p>
          <Link 
            to="/register" 
            className="inline-flex items-center bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-all transform hover:scale-105"
          >
            Start Growing Now
            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8 sm:mb-12">
            Supported Platforms
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {platforms.map((platform) => (
              <div 
                key={platform.name} 
                className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-slate-600 hover:border-orange-500 transition-all hover:transform hover:scale-105 group"
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${platform.color} rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform mx-auto sm:mx-0`}>
                  <platform.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2 text-center sm:text-left">{platform.name}</h3>
                <p className="text-slate-400 text-sm sm:text-base text-center sm:text-left">{platform.services} Services</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8 sm:mb-12">
            Why Choose ADDO.NET?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm sm:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Grow Your Social Media?
          </h2>
          <p className="text-base sm:text-xl text-slate-300 mb-6 sm:mb-8">
            Join thousands of satisfied customers who trust ADDO.NET for their social media growth.
          </p>
          <Link 
            to="/register" 
            className="inline-flex items-center bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-all transform hover:scale-105"
          >
            Create Free Account
            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-3 sm:mb-4">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded flex items-center justify-center">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-white">ADDO.NET</span>
          </div>
          <p className="text-slate-400 text-sm sm:text-base">
            2024 ADDO.NET. All rights reserved. The fastest SMM panel for social media growth.
          </p>
        </div>
      </footer>
    </div>
  );
}