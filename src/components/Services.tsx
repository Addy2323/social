import React, { useState } from 'react';
import Layout from './Layout';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useData } from '../contexts/DataContext';
import { Instagram, Youtube, Hash, Facebook, Plus, Search, Filter } from 'lucide-react';
import FlashMessage from './FlashMessage';

interface Service {
  id: string;
  name: string;
  platform: string;
  description: string;
  price: number;
  minOrder: number;
  maxOrder: number;
  icon: React.ComponentType<any>;
  category: string;
}

const services: Service[] = [
  {
    id: '1',
    name: 'Instagram Followers',
    platform: 'Instagram',
    description: 'High-quality followers from real accounts',
    price: 20, // 20000 TZS per 1k = 20 TZS per follower
    minOrder: 100,
    maxOrder: 10000,
    icon: Instagram,
    category: 'followers'
  },
  {
    id: '2',
    name: 'Instagram Likes',
    platform: 'Instagram',
    description: 'Instant likes on your posts',
    price: 10, // 5, // 5000 TZS per 1k = 5 TZS per like
    minOrder: 50,
    maxOrder: 5000,
    icon: Instagram,
    category: 'likes'
  },
  {
    id: '3',
    name: 'YouTube Views',
    platform: 'YouTube',
    description: 'Real views from active users',
    price: 15, // 2000 TZS per 1k views
    minOrder: 1000,
    maxOrder: 100000,
    icon: Youtube,
    category: 'views'
  },
  {
    id: '4',
    name: 'TikTok Likes',
    platform: 'TikTok',
    description: 'Boost your TikTok engagement',
    price: 10, // 6000 TZS per 1k = 6 TZS per like
    minOrder: 100,
    maxOrder: 10000,
    icon: Hash,
    category: 'likes'
  },
  {
    id: '5',
    name: 'TikTok Followers',
    platform: 'TikTok',
    description: 'Grow your TikTok audience',
    price: 20, // 18000 TZS per 1k = 18 TZS per follower
    minOrder: 100,
    maxOrder: 10000,
    icon: Hash,
    category: 'followers'
  },
  {
    id: '6',
    name: 'TikTok Views',
    platform: 'TikTok',
    description: 'Increase your video visibility',
    price: 15, // 1500 TZS per 1k = 1.5 TZS per view
    minOrder: 1000,
    maxOrder: 100000,
    icon: Hash,
    category: 'views'
  },
  {
    id: '7',
    name: 'Facebook Page Likes',
    platform: 'Facebook',
    description: 'Grow your Facebook page audience',
    price: 10, // 15000 TZS per 1k = 15 TZS per like
    minOrder: 50,
    maxOrder: 5000,
    icon: Facebook,
    category: 'likes'
  }
];

export default function Services() {
  const { user, flashMessage, clearFlashMessage, setFlashMessage } = useAuth();
  const { formatPrice } = useTheme();
  const { addOrder, updateUser, getUserById } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [orderData, setOrderData] = useState<{[key: string]: {quantity: number, link: string}}>({});

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.platform.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesPlatform = selectedPlatform === 'all' || service.platform.toLowerCase() === selectedPlatform;
    
    return matchesSearch && matchesCategory && matchesPlatform;
  });

  const handleQuantityChange = (serviceId: string, quantity: number) => {
    setOrderData(prev => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        quantity: Math.max(0, quantity)
      }
    }));
  };

  const handleLinkChange = (serviceId: string, link: string) => {
    setOrderData(prev => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        link
      }
    }));
  };

  const handleOrder = async (service: Service) => {
    const data = orderData[service.id];
    if (!data || !data.quantity || !data.link) {
      setFlashMessage({ type: 'error', message: 'Please enter quantity and link before ordering.' });
      return;
    }

    if (data.quantity < service.minOrder || data.quantity > service.maxOrder) {
      setFlashMessage({ 
        type: 'error', 
        message: `Quantity must be between ${service.minOrder} and ${service.maxOrder}.` 
      });
      return;
    }

    const totalCost = service.price * data.quantity;
    if (!user || user.balance < totalCost) {
      setFlashMessage({ type: 'error', message: 'Insufficient balance. Please add funds to your account.' });
      return;
    }

    // Get current user data from DataContext for accurate balance
    const currentUser = getUserById(user.id);
    if (!currentUser || currentUser.balance < totalCost) {
      setFlashMessage({ type: 'error', message: 'Insufficient balance. Please add funds to your account.' });
      return;
    }

    // Deduct balance immediately
    updateUser(user.id, { balance: currentUser.balance - totalCost });

    // Create order with pending status for admin approval
    addOrder({
      userId: user.id,
      username: user.name,
      service: service.name,
      platform: service.platform,
      quantity: data.quantity,
      amount: totalCost,
      status: 'pending',
      link: data.link
    });
    
    setFlashMessage({ 
      type: 'success', 
      message: `Order submitted for approval! ${data.quantity} ${service.name} for ${formatPrice(totalCost)}. Admin will review your order.` 
    });

    // Clear the order data for this service
    setOrderData(prev => ({
      ...prev,
      [service.id]: { quantity: 0, link: '' }
    }));
  };

  return (
    <Layout>
      <div className="pt-6 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold dark:text-white text-gray-900 mb-2">
              Social Media Services
            </h1>
            <p className="dark:text-slate-400 text-gray-600">
              Boost your social media presence with our premium services
            </p>
          </div>

          {flashMessage && (
            <FlashMessage
              type={flashMessage.type}
              message={flashMessage.message}
              onClose={clearFlashMessage}
            />
          )}

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search services..."
                className="pl-10 w-full px-4 py-3 dark:bg-slate-800/50 bg-white border dark:border-slate-700 border-gray-200 rounded-lg dark:text-white text-gray-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="px-4 py-3 dark:bg-slate-800/50 bg-white border dark:border-slate-700 border-gray-200 rounded-lg dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="followers">Followers</option>
              <option value="likes">Likes</option>
              <option value="views">Views</option>
            </select>

            <select
              className="px-4 py-3 dark:bg-slate-800/50 bg-white border dark:border-slate-700 border-gray-200 rounded-lg dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
            >
              <option value="all">All Platforms</option>
              <option value="instagram">Instagram</option>
              <option value="youtube">YouTube</option>
              <option value="tiktok">TikTok</option>
              <option value="facebook">Facebook</option>
            </select>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => {
              const data = orderData[service.id] || { quantity: 0, link: '' };
              const totalCost = service.price * data.quantity;

              return (
                <div key={service.id} className="dark:bg-slate-800/50 bg-white rounded-xl border dark:border-slate-700 border-gray-200 p-6 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-4">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold dark:text-white text-gray-900">{service.name}</h3>
                      <p className="text-sm dark:text-slate-400 text-gray-600">{service.platform}</p>
                    </div>
                  </div>

                  <p className="dark:text-slate-300 text-gray-700 text-sm mb-4">{service.description}</p>

                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="dark:text-slate-400 text-gray-600">Price per unit:</span>
                      <span className="dark:text-white text-gray-900 font-medium">{formatPrice(service.price)}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="dark:text-slate-400 text-gray-600">Min/Max order:</span>
                      <span className="dark:text-white text-gray-900">{service.minOrder.toLocaleString()} - {service.maxOrder.toLocaleString()}</span>
                    </div>

                    <input
                      type="url"
                      placeholder="Enter your profile/post URL"
                      className="w-full px-3 py-2 dark:bg-slate-700/50 bg-gray-50 border dark:border-slate-600 border-gray-200 rounded-lg dark:text-white text-gray-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                      value={data.link}
                      onChange={(e) => handleLinkChange(service.id, e.target.value)}
                    />

                    <div className="flex space-x-2">
                      <input
                        type="number"
                        placeholder="Quantity"
                        min={service.minOrder}
                        max={service.maxOrder}
                        className="flex-1 px-3 py-2 dark:bg-slate-700/50 bg-gray-50 border dark:border-slate-600 border-gray-200 rounded-lg dark:text-white text-gray-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                        value={data.quantity || ''}
                        onChange={(e) => handleQuantityChange(service.id, parseInt(e.target.value) || 0)}
                      />
                    </div>

                    {data.quantity > 0 && (
                      <div className="flex justify-between items-center p-3 dark:bg-slate-700/30 bg-gray-50 rounded-lg">
                        <span className="text-sm dark:text-slate-300 text-gray-700">Total:</span>
                        <span className="font-bold dark:text-white text-gray-900">{formatPrice(totalCost)}</span>
                      </div>
                    )}

                    <button
                      onClick={() => handleOrder(service)}
                      disabled={!data.quantity || !data.link}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-2 px-4 rounded-lg transition-all disabled:cursor-not-allowed"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <div className="dark:text-slate-400 text-gray-600 mb-4">
                <Filter className="w-12 h-12 mx-auto mb-3" />
                <p>No services found matching your criteria.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}