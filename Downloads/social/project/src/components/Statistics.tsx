import React from 'react';
import Layout from './Layout';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

export default function Statistics() {
  const { user } = useAuth();
  const { formatPrice } = useTheme();

  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </Layout>
    );
  }

  // Use user data for statistics
  const totalOrders = user.orders || 0;
  const activeOrders = user.active || 0;
  const completedOrders = Math.max(0, totalOrders - activeOrders);
  const totalSpent = user.balance ? (1000 - user.balance) : 0; // Assuming starting balance was 1000
  const avgOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;
  const completionRate = totalOrders > 0 ? (completedOrders / totalOrders) * 100 : 0;

  // Mock data for charts
  const monthlyData = [
    { month: 'Jan', orders: Math.floor(totalOrders * 0.1), spent: totalSpent * 0.1 },
    { month: 'Feb', orders: Math.floor(totalOrders * 0.15), spent: totalSpent * 0.15 },
    { month: 'Mar', orders: Math.floor(totalOrders * 0.12), spent: totalSpent * 0.12 },
    { month: 'Apr', orders: Math.floor(totalOrders * 0.18), spent: totalSpent * 0.18 },
    { month: 'May', orders: Math.floor(totalOrders * 0.22), spent: totalSpent * 0.22 },
    { month: 'Jun', orders: Math.floor(totalOrders * 0.23), spent: totalSpent * 0.23 }
  ];

  const platformData = [
    { platform: 'Instagram', orders: Math.floor(totalOrders * 0.42), percentage: 42 },
    { platform: 'YouTube', orders: Math.floor(totalOrders * 0.26), percentage: 26 },
    { platform: 'TikTok', orders: Math.floor(totalOrders * 0.19), percentage: 19 },
    { platform: 'Twitter', orders: Math.floor(totalOrders * 0.13), percentage: 13 }
  ];

  const stats = [
    {
      title: 'Total Spent',
      value: formatPrice(totalSpent),
      change: '+23.1%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Total Orders',
      value: totalOrders.toString(),
      change: '+12.5%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Completion Rate',
      value: `${completionRate.toFixed(1)}%`,
      change: '+5.2%',
      trend: 'up',
      icon: CheckCircle,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Avg Order Value',
      value: formatPrice(avgOrderValue),
      change: '-2.1%',
      trend: 'down',
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <Layout>
      <div className="pt-6 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold dark:text-white text-gray-900 mb-2 flex items-center">
              <BarChart3 className="w-8 h-8 mr-3 text-orange-500" />
              Statistics & Analytics
            </h1>
            <p className="dark:text-slate-400 text-gray-600">
              Track your social media growth and spending patterns
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <div key={stat.title} className="dark:bg-slate-800/50 bg-white backdrop-blur-sm rounded-xl border dark:border-slate-700 border-gray-200 p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center space-x-1 text-sm ${
                    stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    <span>{stat.change}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold dark:text-white text-gray-900 mb-1">{stat.value}</h3>
                <p className="dark:text-slate-400 text-gray-600 text-sm">{stat.title}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Monthly Trends Chart */}
            <div className="dark:bg-slate-800/50 bg-white rounded-xl border dark:border-slate-700 border-gray-200 p-6 shadow-lg">
              <h3 className="text-xl font-semibold dark:text-white text-gray-900 mb-6">Monthly Trends</h3>
              
              <div className="space-y-4">
                {monthlyData.map((data, index) => (
                  <div key={data.month} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 text-sm dark:text-slate-400 text-gray-600 font-medium">
                        {data.month}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm dark:text-white text-gray-900 font-medium">
                            {data.orders} orders
                          </span>
                        </div>
                        <div className="w-full bg-slate-700/20 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min((data.orders / Math.max(totalOrders, 1)) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="text-sm dark:text-slate-400 text-gray-600 font-medium">
                      {formatPrice(data.spent)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Distribution */}
            <div className="dark:bg-slate-800/50 bg-white rounded-xl border dark:border-slate-700 border-gray-200 p-6 shadow-lg">
              <h3 className="text-xl font-semibold dark:text-white text-gray-900 mb-6">Platform Distribution</h3>
              
              {totalOrders > 0 ? (
                <>
                  {/* Pie Chart Representation */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative w-40 h-40">
                      <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="8"
                          className="dark:text-slate-700 text-gray-200"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#f97316"
                          strokeWidth="8"
                          strokeDasharray={`${42 * 2.51} ${(100 - 42) * 2.51}`}
                          strokeDashoffset="0"
                          className="transition-all duration-500"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="8"
                          strokeDasharray={`${26 * 2.51} ${(100 - 26) * 2.51}`}
                          strokeDashoffset={`-${42 * 2.51}`}
                          className="transition-all duration-500"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="8"
                          strokeDasharray={`${19 * 2.51} ${(100 - 19) * 2.51}`}
                          strokeDashoffset={`-${(42 + 26) * 2.51}`}
                          className="transition-all duration-500"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#8b5cf6"
                          strokeWidth="8"
                          strokeDasharray={`${13 * 2.51} ${(100 - 13) * 2.51}`}
                          strokeDashoffset={`-${(42 + 26 + 19) * 2.51}`}
                          className="transition-all duration-500"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold dark:text-white text-gray-900">{totalOrders}</div>
                          <div className="text-sm dark:text-slate-400 text-gray-600">Total</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {platformData.map((platform, index) => {
                      const colors = ['bg-orange-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500'];
                      return (
                        <div key={platform.platform} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${colors[index]}`} />
                            <span className="dark:text-white text-gray-900 font-medium">{platform.platform}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="dark:text-slate-400 text-gray-600 text-sm">{platform.orders} orders</span>
                            <span className="dark:text-white text-gray-900 font-medium">{platform.percentage}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <BarChart3 className="w-12 h-12 dark:text-slate-600 text-gray-400 mx-auto mb-3" />
                  <p className="dark:text-slate-400 text-gray-600">No orders yet to show platform distribution</p>
                </div>
              )}
            </div>
          </div>

          {/* Order Status Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Status Breakdown */}
            <div className="dark:bg-slate-800/50 bg-white rounded-xl border dark:border-slate-700 border-gray-200 p-6 shadow-lg">
              <h3 className="text-xl font-semibold dark:text-white text-gray-900 mb-6">Order Status Breakdown</h3>
              
              <div className="space-y-4">
                {[
                  { status: 'completed', count: completedOrders, label: 'Completed', icon: CheckCircle, color: 'text-green-400', bgColor: 'bg-green-500' },
                  { status: 'processing', count: 0, label: 'Processing', icon: Clock, color: 'text-blue-400', bgColor: 'bg-blue-500' },
                  { status: 'pending', count: activeOrders, label: 'Pending', icon: AlertCircle, color: 'text-yellow-400', bgColor: 'bg-yellow-500' },
                  { status: 'cancelled', count: 0, label: 'Cancelled', icon: XCircle, color: 'text-red-400', bgColor: 'bg-red-500' }
                ].map(({ status, count, label, icon: StatusIcon, color, bgColor }) => {
                  const percentage = totalOrders > 0 ? (count / totalOrders) * 100 : 0;
                  
                  return (
                    <div key={status} className="flex items-center justify-between p-4 dark:bg-slate-700/30 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <StatusIcon className={`w-5 h-5 ${color}`} />
                        <span className="dark:text-white text-gray-900 font-medium">{label}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 w-24 bg-slate-700/20 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${bgColor}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="dark:text-white text-gray-900 font-bold w-8 text-right">{count}</span>
                        <span className="dark:text-slate-400 text-gray-600 text-sm w-12 text-right">
                          {percentage.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Account Summary */}
            <div className="dark:bg-slate-800/50 bg-white rounded-xl border dark:border-slate-700 border-gray-200 p-6 shadow-lg">
              <h3 className="text-xl font-semibold dark:text-white text-gray-900 mb-6">Account Summary</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 dark:bg-slate-700/30 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-green-400" />
                    <span className="dark:text-white text-gray-900 font-medium">Current Balance</span>
                  </div>
                  <span className="dark:text-white text-gray-900 font-bold">{formatPrice(user.balance)}</span>
                </div>
                
                <div className="flex items-center justify-between p-4 dark:bg-slate-700/30 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <ShoppingCart className="w-5 h-5 text-blue-400" />
                    <span className="dark:text-white text-gray-900 font-medium">Total Orders</span>
                  </div>
                  <span className="dark:text-white text-gray-900 font-bold">{totalOrders}</span>
                </div>
                
                <div className="flex items-center justify-between p-4 dark:bg-slate-700/30 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-orange-400" />
                    <span className="dark:text-white text-gray-900 font-medium">Active Orders</span>
                  </div>
                  <span className="dark:text-white text-gray-900 font-bold">{activeOrders}</span>
                </div>
                
                <div className="flex items-center justify-between p-4 dark:bg-slate-700/30 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    <span className="dark:text-white text-gray-900 font-medium">Member Since</span>
                  </div>
                  <span className="dark:text-white text-gray-900 font-bold">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
