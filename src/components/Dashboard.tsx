import React from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useData } from '../contexts/DataContext';
import { TrendingUp, ShoppingCart, DollarSign, Clock, Plus, BarChart3, Package } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const { formatPrice } = useTheme();
  const { getOrdersByUserId, getTransactionsByUserId, getUserById } = useData();

  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </Layout>
    );
  }

  // Get current user data from DataContext for accurate balance
  const currentUser = getUserById(user.id);
  const currentBalance = currentUser?.balance || user.balance || 0;

  // Get real data for the current user
  const userOrders = getOrdersByUserId(user.id);
  const userTransactions = getTransactionsByUserId(user.id);
  const activeOrders = userOrders.filter(order => order.status === 'pending' || order.status === 'processing').length;
  const completedTransactions = userTransactions.filter(txn => txn.status === 'completed').length;

  const stats = [
    {
      title: 'Account Balance',
      value: formatPrice(currentBalance),
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      change: `+${completedTransactions}`
    },
    {
      title: 'Total Orders',
      value: userOrders.length.toString(),
      icon: ShoppingCart,
      color: 'from-blue-500 to-blue-600',
      change: `${userOrders.length > 0 ? '+' + userOrders.length : '0'}`
    },
    {
      title: 'Active Orders',
      value: activeOrders.toString(),
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      change: activeOrders.toString()
    },
    {
      title: 'Growth Rate',
      value: userTransactions.length > 0 ? '24.5%' : '0%',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      change: userTransactions.length > 0 ? '+5.2%' : '0%'
    }
  ];

  return (
    <Layout>
      <div className="pt-6 px-4 lg:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold dark:text-white text-gray-900 mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="dark:text-slate-400 text-gray-600">
            Here's what's happening with your social media growth today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.title} className="dark:bg-slate-800/50 bg-white backdrop-blur-sm rounded-xl border dark:border-slate-700 border-gray-200 p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-green-400 text-sm">
                  {stat.change}
                </div>
              </div>
              <h3 className="text-2xl font-bold dark:text-white text-gray-900 mb-1">{stat.value}</h3>
              <p className="dark:text-slate-400 text-gray-600 text-sm">{stat.title}</p>
            </div>
          ))}
        </div>

        {(userOrders.length > 0 || userTransactions.length > 0) && (
          <div className="mb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {/* Show pending transactions first */}
                {userTransactions.filter(t => t.status === 'pending').slice(0, 2).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center mr-3">
                        <Clock className="w-4 h-4 text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Fund Request Pending</p>
                        <p className="text-xs text-yellow-400">
                          {formatPrice(transaction.amount)} via {transaction.method} - Awaiting admin approval
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-yellow-400 bg-yellow-500/20 px-2 py-1 rounded-full">
                      Pending
                    </span>
                  </div>
                ))}
                
                {/* Show pending orders */}
                {userOrders.filter(o => o.status === 'pending').slice(0, 2).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mr-3">
                        <Clock className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Order Pending Approval</p>
                        <p className="text-xs text-blue-400">
                          {order.service} - {order.quantity.toLocaleString()} units - {formatPrice(order.amount)}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-blue-400 bg-blue-500/20 px-2 py-1 rounded-full">
                      Pending
                    </span>
                  </div>
                ))}
                
                {/* Show completed transactions */}
                {userTransactions.filter(t => t.status === 'completed').slice(0, 2).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mr-3">
                        <Plus className="w-4 h-4 text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Funds Added</p>
                        <p className="text-xs text-slate-400">
                          {formatPrice(transaction.amount)} via {transaction.method}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-green-400">
                      {new Date(transaction.date).toLocaleDateString()}
                    </span>
                  </div>
                ))}
                
                {/* Show active/completed orders */}
                {userOrders.filter(o => o.status !== 'pending').slice(0, 2).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        order.status === 'completed' ? 'bg-green-500/20' : 'bg-orange-500/20'
                      }`}>
                        <Package className={`w-4 h-4 ${
                          order.status === 'completed' ? 'text-green-400' : 'text-orange-400'
                        }`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{order.service}</p>
                        <p className="text-xs text-slate-400">
                          {order.quantity.toLocaleString()} units - {formatPrice(order.amount)}
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'completed' 
                        ? 'text-green-400 bg-green-500/20' 
                        : 'text-orange-400 bg-orange-500/20'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                ))}
                
                {userTransactions.length === 0 && userOrders.length === 0 && (
                  <p className="text-slate-400 text-center py-4">No recent activity</p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Link 
            to="/services" 
            className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white hover:from-orange-600 hover:to-red-600 transition-all"
          >
            <h3 className="text-xl font-semibold mb-2">Browse Services</h3>
            <p className="text-orange-100">Discover services to boost your social media presence</p>
          </Link>

          <Link 
            to="/add-funds" 
            className="dark:bg-slate-800/50 bg-white rounded-xl border dark:border-slate-700 border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center mb-2">
              <Plus className="w-5 h-5 mr-2 text-green-500" />
              <h3 className="text-xl font-semibold dark:text-white text-gray-900">Add Funds</h3>
            </div>
            <p className="dark:text-slate-400 text-gray-600">Top up your account balance</p>
          </Link>

          <Link 
            to="/statistics" 
            className="dark:bg-slate-800/50 bg-white rounded-xl border dark:border-slate-700 border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center mb-2">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-500" />
              <h3 className="text-xl font-semibold dark:text-white text-gray-900">Statistics</h3>
            </div>
            <p className="dark:text-slate-400 text-gray-600">View detailed analytics and reports</p>
          </Link>
        </div>
      </div>
    </Layout>
  );
}