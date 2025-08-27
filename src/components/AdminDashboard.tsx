import React, { useState } from 'react';
import Layout from './Layout';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useData } from '../contexts/DataContext';
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Shield,
  ShoppingBag,
  Database,
  Upload
} from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const { formatPrice } = useTheme();
  const { 
    transactions, 
    orders, 
    users, 
    supportTickets,
    approveTransaction, 
    rejectTransaction, 
    updateOrder, 
    updateUser, 
    respondToSupportTicket,
    updateSupportTicket,
    getStats 
  } = useData();
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'orders' | 'users' | 'support'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [responseForm, setResponseForm] = useState<{[key: string]: string}>({});

  const stats = getStats();

  const handleTransactionAction = (id: string, action: 'approve' | 'reject') => {
    if (action === 'approve') {
      approveTransaction(id);
    } else {
      rejectTransaction(id);
    }
  };

  const handleUserAction = (id: string, action: 'suspend' | 'activate') => {
    const newStatus = action === 'suspend' ? 'suspended' : 'active';
    updateUser(id, { status: newStatus });
  };

  const handleOrderAction = (id: string, action: 'approve' | 'complete' | 'cancel') => {
    let newStatus: 'pending' | 'processing' | 'completed' | 'cancelled';
    switch (action) {
      case 'approve':
        newStatus = 'processing';
        break;
      case 'complete':
        newStatus = 'completed';
        break;
      case 'cancel':
        newStatus = 'cancelled';
        break;
      default:
        return;
    }
    updateOrder(id, { status: newStatus });
  };

  const handleSupportTicketResponse = (ticketId: string) => {
    const response = responseForm[ticketId];
    if (!response?.trim()) {
      alert('Please enter a response');
      return;
    }

    respondToSupportTicket(ticketId, response, 'Admin');
    updateSupportTicket(ticketId, { status: 'resolved' });
    setResponseForm(prev => ({ ...prev, [ticketId]: '' }));
  };

  const handleTicketStatusChange = (ticketId: string, status: 'open' | 'in_progress' | 'resolved') => {
    updateSupportTicket(ticketId, { status });
  };

  // Filter data based on search term
  const filteredTransactions = transactions.filter(t => 
    t.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.phone.includes(searchTerm) ||
    t.method.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOrders = orders.filter(o => 
    o.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.platform.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSupportTickets = supportTickets.filter(t => 
    t.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="pt-6 px-4 lg:px-6 dark:bg-slate-900 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <Shield className="w-8 h-8 mr-3 text-blue-500" />
              <h1 className="text-3xl font-bold dark:text-white text-gray-900">Admin Dashboard</h1>
            </div>
            <p className="dark:text-slate-400 text-gray-600">
              Manage transactions, orders, users, and system operations
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold dark:text-white text-gray-900">Total Users</h3>
                  <div className="text-3xl font-bold dark:text-white text-gray-900">
                    {stats.totalUsers}
                  </div>
                  <p className="text-sm text-blue-400 mt-1">{stats.activeUsers} active</p>
                </div>
                <Users className="w-12 h-12 text-blue-500" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold dark:text-white text-gray-900">Total Revenue</h3>
                  <div className="text-3xl font-bold dark:text-white text-gray-900">
                    {formatPrice(stats.totalRevenue)}
                  </div>
                  <p className="text-sm text-green-400 mt-1">{stats.totalTransactions} transactions</p>
                </div>
                <TrendingUp className="w-12 h-12 text-green-500" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold dark:text-white text-gray-900">Active Orders</h3>
                  <div className="text-3xl font-bold dark:text-white text-gray-900">
                    {stats.activeOrders}
                  </div>
                  <p className="text-sm text-orange-400 mt-1">{stats.totalOrders} total</p>
                </div>
                <ShoppingBag className="w-12 h-12 text-orange-500" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold dark:text-white text-gray-900">Pending</h3>
                  <div className="text-3xl font-bold dark:text-white text-gray-900">
                    {stats.pendingTransactions}
                  </div>
                  <p className="text-sm text-purple-400 mt-1">Need approval</p>
                </div>
                <Clock className="w-12 h-12 text-purple-500" />
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-6">
            <div className="border-b dark:border-slate-700 border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: 'overview' as const, label: 'Overview' },
                  { id: 'transactions' as const, label: 'Transactions' },
                  { id: 'orders' as const, label: 'Orders' },
                  { id: 'users' as const, label: 'Users' },
                  { id: 'support' as const, label: 'Support Tickets' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-slate-400 dark:hover:text-slate-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="mb-6">
            <div className="dark:bg-slate-800/50 bg-white rounded-xl border dark:border-slate-700 border-gray-200 p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 dark:text-slate-400 text-gray-400" />
                    <input
                      type="text"
                      placeholder={`Search ${activeTab}...`}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full px-4 py-2 dark:bg-slate-700/50 bg-gray-50 border dark:border-slate-600 border-gray-300 rounded-lg dark:text-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </button>
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="dark:bg-slate-800/50 bg-white rounded-xl border dark:border-slate-700 border-gray-200 p-6">
                <h3 className="text-xl font-semibold dark:text-white text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {transactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 dark:bg-slate-700/30 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${
                          transaction.status === 'completed' ? 'bg-green-500' :
                          transaction.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                        <div>
                          <p className="font-medium dark:text-white text-gray-900">{transaction.username}</p>
                          <p className="text-sm dark:text-slate-400 text-gray-600">{transaction.method} • {transaction.phone}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold dark:text-white text-gray-900">{formatPrice(transaction.amount)}</p>
                        <p className="text-sm dark:text-slate-400 text-gray-600 capitalize">{transaction.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="space-y-6">
              {/* Transactions Table */}
              <div className="dark:bg-slate-800/50 bg-white rounded-xl border dark:border-slate-700 border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="dark:bg-slate-700/50 bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium dark:text-slate-300 text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium dark:text-slate-300 text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium dark:text-slate-300 text-gray-500 uppercase tracking-wider">Method</th>
                        <th className="px-6 py-3 text-left text-xs font-medium dark:text-slate-300 text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium dark:text-slate-300 text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium dark:text-slate-300 text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-slate-700 divide-gray-200">
                      {filteredTransactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:dark:bg-slate-700/30 hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium dark:text-white text-gray-900">{transaction.username}</div>
                              <div className="text-sm dark:text-slate-400 text-gray-600">{transaction.phone}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-white text-gray-900">
                            {formatPrice(transaction.amount)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-slate-300 text-gray-500">
                            {transaction.method}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              transaction.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                              transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                            }`}>
                              {transaction.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-slate-300 text-gray-500">
                            {new Date(transaction.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                                <Eye className="w-4 h-4" />
                              </button>
                              {transaction.status === 'pending' && (
                                <>
                                  <button 
                                    onClick={() => handleTransactionAction(transaction.id, 'approve')}
                                    className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </button>
                                  <button 
                                    onClick={() => handleTransactionAction(transaction.id, 'reject')}
                                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              {/* Orders Table */}
              <div className="dark:bg-slate-800/50 bg-white rounded-xl border dark:border-slate-700 border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="dark:bg-slate-700/50 bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium dark:text-slate-300 text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium dark:text-slate-300 text-gray-500 uppercase tracking-wider">Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium dark:text-slate-300 text-gray-500 uppercase tracking-wider">Platform</th>
                        <th className="px-6 py-3 text-left text-xs font-medium dark:text-slate-300 text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium dark:text-slate-300 text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium dark:text-slate-300 text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium dark:text-slate-300 text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-slate-700 divide-gray-200">
                      {filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:dark:bg-slate-700/30 hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium dark:text-white text-gray-900">{order.username}</div>
                              <div className="text-sm dark:text-slate-400 text-gray-600">{order.quantity} items</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-slate-300 text-gray-500">
                            {order.service}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-slate-300 text-gray-500">
                            {order.platform}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-white text-gray-900">
                            {formatPrice(order.amount)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                              order.status === 'processing' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                              order.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-slate-300 text-gray-500">
                            {new Date(order.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                                <Eye className="w-4 h-4" />
                              </button>
                              {order.status === 'pending' && (
                                <>
                                  <button 
                                    onClick={() => handleOrderAction(order.id, 'approve')}
                                    className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                                    title="Approve Order"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </button>
                                  <button 
                                    onClick={() => handleOrderAction(order.id, 'cancel')}
                                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                    title="Cancel Order"
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                              {order.status === 'processing' && (
                                <>
                                  <button 
                                    onClick={() => handleOrderAction(order.id, 'complete')}
                                    className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                                    title="Mark Complete"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </button>
                                  <button 
                                    onClick={() => handleOrderAction(order.id, 'cancel')}
                                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                    title="Cancel Order"
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              {/* Users Table */}
              <div className="dark:bg-slate-800/50 bg-white rounded-xl border dark:border-slate-700 border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="dark:bg-slate-700/50 bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium dark:text-slate-300 text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium dark:text-slate-300 text-gray-500 uppercase tracking-wider">Balance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium dark:text-slate-300 text-gray-500 uppercase tracking-wider">Orders</th>
                        <th className="px-6 py-3 text-left text-xs font-medium dark:text-slate-300 text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium dark:text-slate-300 text-gray-500 uppercase tracking-wider">Join Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium dark:text-slate-300 text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-slate-700 divide-gray-200">
                      {filteredUsers.filter(u => u.role === 'user').map((user) => (
                        <tr key={user.id} className="hover:dark:bg-slate-700/30 hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium dark:text-white text-gray-900">{user.username}</div>
                              <div className="text-sm dark:text-slate-400 text-gray-600">{user.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-white text-gray-900">
                            {formatPrice(user.balance)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-slate-300 text-gray-500">
                            <div>
                              <div>Total: {user.totalOrders}</div>
                              <div className="text-xs text-orange-400">Active: {user.activeOrders}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-slate-300 text-gray-500">
                            {new Date(user.joinDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleUserAction(user.id, user.status === 'active' ? 'suspend' : 'activate')}
                                className={`${user.status === 'active' ? 'text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300' : 'text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300'}`}
                                title={user.status === 'active' ? 'Suspend User' : 'Activate User'}
                              >
                                {user.status === 'active' ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'support' && (
            <div className="space-y-6">
              {/* Support Tickets */}
              <div className="dark:bg-slate-800/50 bg-white rounded-xl border dark:border-slate-700 border-gray-200 p-6 shadow-lg">
                <h2 className="text-xl font-semibold dark:text-white text-gray-900 mb-6">Support Tickets</h2>
                <div className="space-y-4">
                  {filteredSupportTickets.map((ticket) => (
                    <div key={ticket.id} className="border dark:border-slate-600 border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold dark:text-white text-gray-900">{ticket.subject}</h3>
                          <p className="text-sm dark:text-slate-400 text-gray-600">
                            From: {ticket.username} • {new Date(ticket.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            ticket.status === 'open' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            ticket.status === 'in_progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                            'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          }`}>
                            {ticket.status.replace('_', ' ')}
                          </span>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            ticket.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                            ticket.priority === 'medium' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' :
                            'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                          }`}>
                            {ticket.priority}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="dark:text-slate-300 text-gray-700">{ticket.message}</p>
                      </div>

                      {ticket.adminResponse && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-3 mb-4">
                          <p className="text-sm font-medium dark:text-blue-300 text-blue-800">Admin Response:</p>
                          <p className="dark:text-blue-200 text-blue-700">{ticket.adminResponse}</p>
                          <p className="text-xs dark:text-blue-400 text-blue-600 mt-1">
                            Responded by {ticket.respondedBy} on {ticket.responseDate ? new Date(ticket.responseDate).toLocaleDateString() : ''}
                          </p>
                        </div>
                      )}

                      <div className="flex flex-col space-y-3">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleTicketStatusChange(ticket.id, 'in_progress')}
                            disabled={ticket.status === 'in_progress'}
                            className="px-3 py-1 text-xs bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded transition-all"
                          >
                            Mark In Progress
                          </button>
                          <button
                            onClick={() => handleTicketStatusChange(ticket.id, 'resolved')}
                            disabled={ticket.status === 'resolved'}
                            className="px-3 py-1 text-xs bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded transition-all"
                          >
                            Mark Resolved
                          </button>
                        </div>
                        
                        {ticket.status !== 'resolved' && (
                          <div className="space-y-2">
                            <textarea
                              value={responseForm[ticket.id] || ''}
                              onChange={(e) => setResponseForm(prev => ({ ...prev, [ticket.id]: e.target.value }))}
                              placeholder="Type your response to the user..."
                              rows={3}
                              className="w-full px-3 py-2 dark:bg-slate-700/50 bg-gray-50 border dark:border-slate-600 border-gray-300 rounded-lg dark:text-white text-gray-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                              onClick={() => handleSupportTicketResponse(ticket.id)}
                              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-medium rounded-lg transition-all"
                            >
                              Send Response
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {filteredSupportTickets.length === 0 && (
                    <div className="text-center py-8">
                      <p className="dark:text-slate-400 text-gray-600">No support tickets found.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
