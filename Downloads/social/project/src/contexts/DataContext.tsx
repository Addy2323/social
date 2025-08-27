import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Transaction {
  id: string;
  userId: string;
  username: string;
  amount: number;
  method: string;
  status: 'pending' | 'completed' | 'failed';
  date: string;
  phone: string;
  reference?: string;
}

export interface Order {
  id: string;
  userId: string;
  username: string;
  service: string;
  platform: string;
  quantity: number;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  date: string;
  link?: string;
}

export interface SystemUser {
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

export interface SupportTicket {
  id: string;
  userId: string;
  username: string;
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'resolved';
  date: string;
  adminResponse?: string;
  responseDate?: string;
  respondedBy?: string;
}

interface DataContextType {
  transactions: Transaction[];
  orders: Order[];
  users: SystemUser[];
  supportTickets: SupportTicket[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  approveTransaction: (id: string) => void;
  rejectTransaction: (id: string) => void;
  addOrder: (order: Omit<Order, 'id' | 'date'>) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  addUser: (user: Omit<SystemUser, 'id' | 'joinDate' | 'totalTransactions' | 'totalOrders' | 'activeOrders'>) => void;
  updateUser: (id: string, updates: Partial<SystemUser>) => void;
  getUserById: (id: string) => SystemUser | undefined;
  getTransactionsByUserId: (userId: string) => Transaction[];
  getOrdersByUserId: (userId: string) => Order[];
  addSupportTicket: (ticket: Omit<SupportTicket, 'id' | 'date'>) => void;
  updateSupportTicket: (id: string, updates: Partial<SupportTicket>) => void;
  respondToSupportTicket: (id: string, response: string, respondedBy: string) => void;
  getSupportTicketsByUserId: (userId: string) => SupportTicket[];
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

  // Sync with registered users from AuthContext
  const syncRegisteredUsers = () => {
    const registeredUsers = localStorage.getItem('addonet_registered_users');
    if (registeredUsers) {
      const authUsers = JSON.parse(registeredUsers);
      const currentUsers = users.filter(u => u.role === 'admin'); // Keep admin users
      
      const syncedUsers = authUsers.map((authUser: any) => {
        const existingUser = users.find(u => u.id === authUser.id);
        if (existingUser) {
          return { ...existingUser, ...authUser, username: authUser.name };
        }
        return {
          id: authUser.id,
          username: authUser.name,
          email: authUser.email,
          phone: authUser.phone,
          balance: authUser.balance,
          status: 'active' as const,
          joinDate: authUser.joinDate,
          totalTransactions: 0,
          totalOrders: 0,
          activeOrders: 0,
          role: authUser.role || 'user' as const
        };
      });
      
      setUsers([...currentUsers, ...syncedUsers]);
    }
  };

  // Load data from localStorage on mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem('addonet_transactions');
    const savedOrders = localStorage.getItem('addonet_orders');
    const savedUsers = localStorage.getItem('addonet_users');
    const savedSupportTickets = localStorage.getItem('addonet_support_tickets');

    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      // Initialize with sample admin user
      const adminUser: SystemUser = {
        id: 'admin-1',
        username: 'admin',
        email: 'admin@addonet.com',
        phone: '+255123456789',
        balance: 0,
        status: 'active',
        joinDate: new Date().toISOString(),
        totalTransactions: 0,
        totalOrders: 0,
        activeOrders: 0,
        role: 'admin'
      };
      setUsers([adminUser]);
      localStorage.setItem('addonet_users', JSON.stringify([adminUser]));
    }

    if (savedSupportTickets) {
      setSupportTickets(JSON.parse(savedSupportTickets));
    }

    // Sync with registered users
    syncRegisteredUsers();
  }, []);

  // Sync registered users periodically
  useEffect(() => {
    const interval = setInterval(syncRegisteredUsers, 2000);
    return () => clearInterval(interval);
  }, [users]);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('addonet_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('addonet_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('addonet_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('addonet_support_tickets', JSON.stringify(supportTickets));
  }, [supportTickets]);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toISOString()
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions(prev => 
      prev.map(txn => txn.id === id ? { ...txn, ...updates } : txn)
    );
  };

  const approveTransaction = (id: string) => {
    const transaction = transactions.find(t => t.id === id);
    if (!transaction) return;

    // Update transaction status
    updateTransaction(id, { status: 'completed' });

    // Update user balance
    const user = users.find(u => u.id === transaction.userId);
    if (user) {
      updateUser(user.id, { 
        balance: user.balance + transaction.amount,
        totalTransactions: user.totalTransactions + 1
      });
    }
  };

  const rejectTransaction = (id: string) => {
    updateTransaction(id, { status: 'failed' });
  };

  const addOrder = (order: Omit<Order, 'id' | 'date'>) => {
    const newOrder: Order = {
      ...order,
      id: `ord_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toISOString()
    };
    setOrders(prev => [newOrder, ...prev]);

    // Update user stats
    const user = users.find(u => u.id === order.userId);
    if (user) {
      updateUser(user.id, {
        totalOrders: user.totalOrders + 1,
        activeOrders: user.activeOrders + 1
      });
    }
  };

  const updateOrder = (id: string, updates: Partial<Order>) => {
    const order = orders.find(o => o.id === id);
    if (!order) return;

    setOrders(prev => 
      prev.map(ord => ord.id === id ? { ...ord, ...updates } : ord)
    );

    // Update user active orders count if status changes
    if (updates.status && order.status === 'pending' && updates.status !== 'pending') {
      const user = users.find(u => u.id === order.userId);
      if (user && user.activeOrders > 0) {
        updateUser(user.id, { activeOrders: user.activeOrders - 1 });
      }
    }
  };

  const addUser = (user: Omit<SystemUser, 'id' | 'joinDate' | 'totalTransactions' | 'totalOrders' | 'activeOrders'>) => {
    const newUser: SystemUser = {
      ...user,
      id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      joinDate: new Date().toISOString(),
      totalTransactions: 0,
      totalOrders: 0,
      activeOrders: 0
    };
    setUsers(prev => [...prev, newUser]);
  };

  const updateUser = (id: string, updates: Partial<SystemUser>) => {
    setUsers(prev => 
      prev.map(user => user.id === id ? { ...user, ...updates } : user)
    );
  };

  const getUserById = (id: string) => {
    return users.find(user => user.id === id);
  };

  const getTransactionsByUserId = (userId: string) => {
    return transactions.filter(txn => txn.userId === userId);
  };

  const getOrdersByUserId = (userId: string) => {
    return orders.filter(order => order.userId === userId);
  };

  const addSupportTicket = (ticket: Omit<SupportTicket, 'id' | 'date'>) => {
    const newTicket: SupportTicket = {
      ...ticket,
      id: `stk_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
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
      adminResponse: response, 
      responseDate: new Date().toISOString(), 
      respondedBy 
    });
  };

  const getSupportTicketsByUserId = (userId: string) => {
    return supportTickets.filter(ticket => ticket.userId === userId);
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
      addTransaction,
      updateTransaction,
      approveTransaction,
      rejectTransaction,
      addOrder,
      updateOrder,
      addUser,
      updateUser,
      getUserById,
      getTransactionsByUserId,
      getOrdersByUserId,
      addSupportTicket,
      updateSupportTicket,
      respondToSupportTicket,
      getSupportTicketsByUserId,
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
