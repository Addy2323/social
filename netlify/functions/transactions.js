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
    const transactions = db.collection('transactions');
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
      // Get transactions for user or all transactions for admin
      let query = {};
      if (decoded.role !== 'admin') {
        query = { userId: decoded.userId };
      }

      const userTransactions = await transactions.find(query).sort({ date: -1 }).toArray();
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ transactions: userTransactions }),
      };
    }

    if (event.httpMethod === 'POST') {
      // Create new transaction (fund request)
      const { amount, method, reference } = JSON.parse(event.body);

      if (!amount || !method) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Amount and payment method are required' }),
        };
      }

      // Get user info
      const user = await users.findOne({ _id: new ObjectId(decoded.userId) });
      if (!user) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'User not found' }),
        };
      }

      // Create transaction
      const newTransaction = {
        userId: decoded.userId,
        username: user.name,
        amount: parseFloat(amount),
        method,
        reference: reference || '',
        status: 'pending',
        date: new Date().toISOString()
      };

      const result = await transactions.insertOne(newTransaction);

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Fund request submitted successfully',
          transactionId: result.insertedId
        }),
      };
    }

    if (event.httpMethod === 'PUT') {
      // Update transaction status (admin only)
      if (decoded.role !== 'admin') {
        return {
          statusCode: 403,
          headers,
          body: JSON.stringify({ error: 'Admin access required' }),
        };
      }

      const { transactionId, status } = JSON.parse(event.body);
      
      if (!transactionId || !status) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Transaction ID and status are required' }),
        };
      }

      // Get transaction details
      const transaction = await transactions.findOne({ _id: new ObjectId(transactionId) });
      if (!transaction) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Transaction not found' }),
        };
      }

      // Update transaction status
      await transactions.updateOne(
        { _id: new ObjectId(transactionId) },
        { $set: { status, updatedAt: new Date().toISOString() } }
      );

      // If approved, add balance to user
      if (status === 'completed') {
        await users.updateOne(
          { _id: new ObjectId(transaction.userId) },
          { 
            $inc: { balance: transaction.amount },
            $set: { lastActivity: new Date().toISOString() }
          }
        );
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'Transaction updated' }),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };

  } catch (error) {
    console.error('Transactions API error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
