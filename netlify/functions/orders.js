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
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { db } = await connectToDatabase();
    const orders = db.collection('orders');
    const users = db.collection('users');

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
    if (!decoded) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid token' }),
      };
    }

    if (event.httpMethod === 'GET') {
      // Get orders for user or all orders for admin
      let query = {};
      if (decoded.role !== 'admin') {
        query = { userId: decoded.userId };
      }

      const userOrders = await orders.find(query).sort({ date: -1 }).toArray();
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ orders: userOrders }),
      };
    }

    if (event.httpMethod === 'POST') {
      // Create new order
      const { service, platform, quantity, amount, link } = JSON.parse(event.body);

      if (!service || !platform || !quantity || !amount || !link) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'All order fields are required' }),
        };
      }

      // Get user to check balance
      const user = await users.findOne({ _id: new ObjectId(decoded.userId) });
      if (!user || user.balance < amount) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Insufficient balance' }),
        };
      }

      // Deduct balance from user
      await users.updateOne(
        { _id: new ObjectId(decoded.userId) },
        { 
          $inc: { balance: -amount, orders: 1 },
          $set: { lastActivity: new Date().toISOString() }
        }
      );

      // Create order
      const newOrder = {
        userId: decoded.userId,
        username: user.name,
        service,
        platform,
        quantity,
        amount,
        status: 'pending',
        link,
        date: new Date().toISOString()
      };

      const result = await orders.insertOne(newOrder);

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Order created successfully',
          orderId: result.insertedId
        }),
      };
    }

    if (event.httpMethod === 'PUT') {
      // Update order status (admin only)
      if (decoded.role !== 'admin') {
        return {
          statusCode: 403,
          headers,
          body: JSON.stringify({ error: 'Admin access required' }),
        };
      }

      const { orderId, status } = JSON.parse(event.body);
      
      if (!orderId || !status) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Order ID and status are required' }),
        };
      }

      await orders.updateOne(
        { _id: new ObjectId(orderId) },
        { $set: { status, updatedAt: new Date().toISOString() } }
      );

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'Order updated' }),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };

  } catch (error) {
    console.error('Orders API error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
