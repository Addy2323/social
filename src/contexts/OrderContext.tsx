import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Order {
  id: string;
  service: string;
  platform: string;
  link: string;
  quantity: number;
  price: number; // Always stored in USD
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  startCount: number;
  remains: number;
  createdAt: string;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status' | 'startCount' | 'remains'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  getOrderTotal: (order: Order) => number;
  formatOrderPrice: (price: number) => string;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = useCallback((orderData: Omit<Order, 'id' | 'createdAt' | 'status' | 'startCount' | 'remains'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      startCount: 0,
      remains: orderData.quantity,
      createdAt: new Date().toISOString()
    };
    setOrders(prev => [newOrder, ...prev]);
  }, []);

  const updateOrderStatus = useCallback((id: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === id ? { ...order, status } : order
    ));
  }, []);

  // Calculate order total based on quantity and price
  const getOrderTotal = useCallback((order: Order): number => {
    return order.price * order.quantity;
  }, []);

  // Format price for display (delegates to ThemeContext)
  const formatOrderPrice = useCallback((price: number): string => {
    // This is a fallback in case ThemeContext is not available
    // The actual formatting should be done in the component using useTheme()
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  }, []);

  const value = {
    orders,
    addOrder,
    updateOrderStatus,
    getOrderTotal,
    formatOrderPrice,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}