const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/.netlify/functions' 
  : 'http://localhost:8888/.netlify/functions';

// Get auth token from localStorage
const getAuthToken = () => {
  const user = localStorage.getItem('addonet_user');
  if (user) {
    const userData = JSON.parse(user);
    return userData.token;
  }
  return null;
};

// API request helper
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API request failed');
  }

  return response.json();
};

// Auth API calls
export const authAPI = {
  register: async (userData: { username: string; email: string; password: string }) => {
    return apiRequest('/auth-register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials: { email: string; password: string }) => {
    return apiRequest('/auth-login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
};

// Orders API calls
export const ordersAPI = {
  getOrders: async () => {
    return apiRequest('/orders');
  },

  createOrder: async (orderData: {
    service: string;
    platform: string;
    quantity: number;
    amount: number;
    link: string;
  }) => {
    return apiRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  updateOrder: async (orderId: string, status: string) => {
    return apiRequest('/orders', {
      method: 'PUT',
      body: JSON.stringify({ orderId, status }),
    });
  },
};

// Transactions API calls
export const transactionsAPI = {
  getTransactions: async () => {
    return apiRequest('/transactions');
  },

  createTransaction: async (transactionData: {
    amount: number;
    method: string;
    reference?: string;
  }) => {
    return apiRequest('/transactions', {
      method: 'POST',
      body: JSON.stringify(transactionData),
    });
  },

  updateTransaction: async (transactionId: string, status: string) => {
    return apiRequest('/transactions', {
      method: 'PUT',
      body: JSON.stringify({ transactionId, status }),
    });
  },
};

// Users API calls (admin only)
export const usersAPI = {
  getUsers: async () => {
    return apiRequest('/users');
  },

  updateUser: async (userId: string, status: string) => {
    return apiRequest('/users', {
      method: 'PUT',
      body: JSON.stringify({ userId, status }),
    });
  },
};
