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
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">ADDO.NET</span>
            </div>
            <div className="space-x-4">
              <Link 
                to="/login" 
                className="text-slate-300 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            Boost Your Social Media
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500"> Presence</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            The most reliable SMM panel with high-quality services for Instagram, TikTok, YouTube, and Facebook. 
            Grow your social media engagement with our premium services.
          </p>
          <Link 
            to="/register" 
            className="inline-flex items-center bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
          >
            Start Growing Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Supported Platforms
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.map((platform) => (
              <div 
                key={platform.name} 
                className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-6 border border-slate-600 hover:border-orange-500 transition-all hover:transform hover:scale-105 group"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${platform.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <platform.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{platform.name}</h3>
                <p className="text-slate-400">{platform.services} Services Available</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Why Choose ADDO.NET?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Grow Your Social Media?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of satisfied customers who trust ADDO.NET for their social media growth.
          </p>
          <Link 
            to="/register" 
            className="inline-flex items-center bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
          >
            Create Free Account
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-white">ADDO.NET</span>
          </div>
          <p className="text-slate-400">
            2024 ADDO.NET. All rights reserved. The fastest SMM panel for social media growth.
          </p>
        </div>
      </footer>
    </div>
  );
}