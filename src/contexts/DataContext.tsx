import React, { createContext, useContext, useState, useEffect } from 'react';
import { ordersAPI, transactionsAPI, usersAPI } from '../utils/api';

interface Transaction {
  id: string;
  userId: string;
  username: string;
  amount: number;
  method: string;
  reference?: string;
  status: 'pending' | 'completed' | 'failed';
  date: string;
}

interface Order {
  id: string;
  userId: string;
  username: string;
  service: string;
  platform: string;
  quantity: number;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  link: string;
  date: string;
}

interface SystemUser {
  id: string;
  username: string;
  email: string;
  phone: string;
  balance: number;
  status: 'active' | 'suspended';
  joinDate: string;
  totalTransactions: number;
  totalOrders: number;
  activeOrders: number;
  role: 'user' | 'admin';
}

interface SupportTicket {
  id: string;
  userId: string;
  username: string;
  subject: string;
  message: string;
  status: 'open' | 'closed';
  priority: 'low' | 'medium' | 'high';
  date: string;
  response?: string;
  respondedBy?: string;
  responseDate?: string;
}

interface DataContextType {
  transactions: Transaction[];
  orders: Order[];
  users: SystemUser[];
  supportTickets: SupportTicket[];
  loading: boolean;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => Promise<void>;
  updateTransaction: (id: string, updates: Partial<Transaction>) => Promise<void>;
  approveTransaction: (id: string) => Promise<void>;
  rejectTransaction: (id: string) => Promise<void>;
  addOrder: (order: Omit<Order, 'id' | 'date'>) => Promise<void>;
  updateOrder: (id: string, updates: Partial<Order>) => Promise<void>;
  addUser: (user: Omit<SystemUser, 'id' | 'joinDate' | 'totalTransactions' | 'totalOrders' | 'activeOrders'>) => void;
  updateUser: (id: string, updates: Partial<SystemUser>) => Promise<void>;
  getUserById: (id: string) => SystemUser | undefined;
  getOrdersByUserId: (userId: string) => Order[];
  getTransactionsByUserId: (userId: string) => Transaction[];
  addSupportTicket: (ticket: Omit<SupportTicket, 'id' | 'date'>) => void;
  updateSupportTicket: (id: string, updates: Partial<SupportTicket>) => void;
  respondToSupportTicket: (id: string, response: string, respondedBy: string) => void;
  getSupportTicketsByUserId: (userId: string) => SupportTicket[];
  refreshData: () => Promise<void>;
  getStats: () => {
    totalUsers: number;
    activeUsers: number;
    totalTransactions: number;
    pendingTransactions: number;
    totalOrders: number;
    activeOrders: number;
    totalRevenue: number;
    totalSupportTickets: number;
    openSupportTickets: number;
  };
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<SystemUser[]>([]);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(false);

  // Load data from API
  const refreshData = async () => {
    setLoading(true);
    try {
      const [ordersResponse, transactionsResponse, usersResponse] = await Promise.all([
        ordersAPI.getOrders().catch(() => ({ orders: [] })),
        transactionsAPI.getTransactions().catch(() => ({ transactions: [] })),
        usersAPI.getUsers().catch(() => ({ users: [], stats: {} }))
      ]);

      setOrders(ordersResponse.orders || []);
      setTransactions(transactionsResponse.transactions || []);
      setUsers(usersResponse.users || []);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const addTransaction = async (transaction: Omit<Transaction, 'id' | 'date'>) => {
    try {
      await transactionsAPI.createTransaction({
        amount: transaction.amount,
        method: transaction.method,
        reference: transaction.reference
      });
      await refreshData(); // Refresh to get updated data
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  };

  const updateTransaction = async (id: string, updates: Partial<Transaction>) => {
    if (updates.status) {
      try {
        await transactionsAPI.updateTransaction(id, updates.status);
        await refreshData();
      } catch (error) {
        console.error('Error updating transaction:', error);
        throw error;
      }
    }
  };

  const approveTransaction = async (id: string) => {
    await updateTransaction(id, { status: 'completed' });
  };

  const rejectTransaction = async (id: string) => {
    await updateTransaction(id, { status: 'failed' });
  };

  const addOrder = async (order: Omit<Order, 'id' | 'date'>) => {
    try {
      await ordersAPI.createOrder({
        service: order.service,
        platform: order.platform,
        quantity: order.quantity,
        amount: order.amount,
        link: order.link
      });
      await refreshData();
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const updateOrder = async (id: string, updates: Partial<Order>) => {
    if (updates.status) {
      try {
        await ordersAPI.updateOrder(id, updates.status);
        await refreshData();
      } catch (error) {
        console.error('Error updating order:', error);
        throw error;
      }
    }
  };

  const updateUser = async (id: string, updates: Partial<SystemUser>) => {
    if (updates.status) {
      try {
        await usersAPI.updateUser(id, updates.status);
        await refreshData();
      } catch (error) {
        console.error('Error updating user:', error);
        throw error;
      }
    }
  };

  const getUserById = (id: string) => {
    return users.find(user => user.id === id);
  };

  const getOrdersByUserId = (userId: string) => {
    return orders.filter(order => order.userId === userId);
  };

  const getTransactionsByUserId = (userId: string) => {
    return transactions.filter(txn => txn.userId === userId);
  };

  // Support tickets still use localStorage (can be moved to API later)
  const addSupportTicket = (ticket: Omit<SupportTicket, 'id' | 'date'>) => {
    const newTicket: SupportTicket = {
      ...ticket,
      id: `ticket_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toISOString()
    };
    setSupportTickets(prev => [newTicket, ...prev]);
  };

  const updateSupportTicket = (id: string, updates: Partial<SupportTicket>) => {
    setSupportTickets(prev => 
      prev.map(ticket => ticket.id === id ? { ...ticket, ...updates } : ticket)
    );
  };

  const respondToSupportTicket = (id: string, response: string, respondedBy: string) => {
    updateSupportTicket(id, {
      response,
      respondedBy,
      responseDate: new Date().toISOString(),
      status: 'closed'
    });
  };

  const getSupportTicketsByUserId = (userId: string) => {
    return supportTickets.filter(ticket => ticket.userId === userId);
  };

  const addUser = (user: Omit<SystemUser, 'id' | 'joinDate' | 'totalTransactions' | 'totalOrders' | 'activeOrders'>) => {
    // This is handled by the registration API now
    console.log('addUser called - handled by registration API');
  };

  const getStats = () => {
    return {
      totalUsers: users.filter(u => u.role === 'user').length,
      activeUsers: users.filter(u => u.status === 'active' && u.role === 'user').length,
      totalTransactions: transactions.length,
      pendingTransactions: transactions.filter(t => t.status === 'pending').length,
      totalOrders: orders.length,
      activeOrders: orders.filter(o => o.status === 'pending' || o.status === 'processing').length,
      totalRevenue: transactions.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.amount, 0),
      totalSupportTickets: supportTickets.length,
      openSupportTickets: supportTickets.filter(t => t.status === 'open').length
    };
  };

  return (
    <DataContext.Provider value={{
      transactions,
      orders,
      users,
      supportTickets,
      loading,
      addTransaction,
      updateTransaction,
      approveTransaction,
      rejectTransaction,
      addOrder,
      updateOrder,
      addUser,
      updateUser,
      getUserById,
      getOrdersByUserId,
      getTransactionsByUserId,
      addSupportTicket,
      updateSupportTicket,
      respondToSupportTicket,
      getSupportTicketsByUserId,
      refreshData,
      getStats
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
