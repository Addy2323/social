const { connectToDatabase } = require('./utils/database');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

// Verify JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { db } = await connectToDatabase();
    const users = db.collection('users');
    const orders = db.collection('orders');
    const transactions = db.collection('transactions');

    // Extract token from Authorization header
    const authHeader = event.headers.authorization || event.headers.Authorization;
    if (!authHeader) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Authorization token required' }),
      };
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'admin') {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({ error: 'Admin access required' }),
      };
    }

    if (event.httpMethod === 'GET') {
      // Get all users with stats
      const allUsers = await users.find({}).toArray();
      
      // Get stats for each user
      const usersWithStats = await Promise.all(
        allUsers.map(async (user) => {
          const userOrders = await orders.find({ userId: user._id.toString() }).toArray();
          const userTransactions = await transactions.find({ userId: user._id.toString() }).toArray();
          
          return {
            id: user._id,
            username: user.name,
            email: user.email,
            phone: user.phone,
            balance: user.balance,
            status: user.status || 'active',
            joinDate: user.joinDate,
            totalOrders: userOrders.length,
            activeOrders: userOrders.filter(o => o.status === 'pending' || o.status === 'processing').length,
            totalTransactions: userTransactions.length,
            role: user.role || 'user'
          };
        })
      );

      // Get overall stats
      const totalUsers = allUsers.length;
      const activeUsers = allUsers.filter(u => u.status !== 'suspended').length;
      const totalOrders = await orders.countDocuments();
      const activeOrders = await orders.countDocuments({ 
        status: { $in: ['pending', 'processing'] } 
      });
      const totalTransactions = await transactions.countDocuments();
      const pendingTransactions = await transactions.countDocuments({ status: 'pending' });
      const completedTransactions = await transactions.find({ status: 'completed' }).toArray();
      const totalRevenue = completedTransactions.reduce((sum, t) => sum + t.amount, 0);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          users: usersWithStats,
          stats: {
            totalUsers,
            activeUsers,
            totalOrders,
            activeOrders,
            totalTransactions,
            pendingTransactions,
            totalRevenue
          }
        }),
      };
    }

    if (event.httpMethod === 'PUT') {
      // Update user status
      const { userId, status } = JSON.parse(event.body);
      
      if (!userId || !status) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'User ID and status are required' }),
        };
      }

      await users.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { status, updatedAt: new Date().toISOString() } }
      );

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'User status updated' }),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };

  } catch (error) {
    console.error('Users API error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
