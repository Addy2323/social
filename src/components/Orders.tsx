import React, { useState } from 'react';
import Layout from './Layout';
import { useOrders, Order } from '../contexts/OrderContext';
import { useTheme } from '../contexts/ThemeContext';
import { Search, Filter, ExternalLink, Calendar, DollarSign, Package, CheckCircle, Clock, XCircle } from 'lucide-react';

export default function Orders() {
  const { orders, getOrderTotal } = useOrders();
  const { formatPrice } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const statuses = ['all', 'pending', 'processing', 'completed', 'cancelled'];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 mr-1" />;
      case 'processing': return <Clock className="w-4 h-4 mr-1 animate-pulse" />;
      case 'pending': return <Clock className="w-4 h-4 mr-1" />;
      case 'cancelled': return <XCircle className="w-4 h-4 mr-1" />;
      default: return <Package className="w-4 h-4 mr-1" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.platform.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500';
      case 'processing': return 'bg-blue-500/20 text-blue-400 border-blue-500';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  const getProgressPercentage = (order: Order) => {
    if (order.status === 'completed') return 100;
    if (order.status === 'cancelled') return 0;
    if (order.status === 'pending') return 0;
    
    const delivered = order.quantity - order.remains;
    return Math.round((delivered / order.quantity) * 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Layout>
      <div className="p-4 md:p-6">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Order History</h1>
          <p className="text-slate-400">
            Track and manage your social media service orders
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-8"
            >
              {statuses.map(status => (
                <option key={status} value={status} className="bg-slate-800">
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
            <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6 hover:border-orange-500 transition-all">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">{order.service}</h3>
                        <p className="text-slate-400 text-sm">{order.platform} • Order #{order.id.toUpperCase()}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-slate-400 mb-1">Quantity</p>
                        <p className="text-white font-medium">{order.quantity.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 mb-1">Start Count</p>
                        <p className="text-white font-medium">{order.startCount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 mb-1">Remains</p>
                        <p className="text-white font-medium">{order.remains.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 mb-1">Price</p>
                        <p className="text-green-400 font-medium">{formatPrice(order.price)}</p>
                      </div>
                    </div>

                    {order.status === 'processing' && (
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-slate-400 mb-2">
                          <span>Progress</span>
                          <span>{getProgressPercentage(order)}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${getProgressPercentage(order)}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700">
                      <div className="flex items-center text-sm text-slate-400">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(order.createdAt)}
                      </div>
                      <div className="flex items-center space-x-3">
                        <a
                          href={order.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-orange-500 hover:text-orange-400 text-sm font-medium"
                        >
                          View Link
                          <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No orders found</h3>
            <p className="text-slate-400 mb-4">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria' 
                : 'You haven\'t placed any orders yet'}
            </p>
            {(searchTerm || statusFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
                className="text-orange-500 hover:text-orange-400 font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}