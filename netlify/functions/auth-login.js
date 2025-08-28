import { connectToDatabase } from './utils/database.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

// Simple password hashing function (must match registration)
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password + 'addonet_salt').digest('hex');
};

export const handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { email, password } = JSON.parse(event.body);

    if (!email || !password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Email and password are required' }),
      };
    }

    // Check for admin credentials
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const adminUser = {
        id: 'admin-1',
        email,
        name: 'Administrator',
        phone: '+255123456789',
        balance: 0,
        orders: 0,
        active: 0,
        joinDate: '2024-01-01',
        role: 'admin'
      };

      const token = jwt.sign(
        { userId: 'admin-1', email, role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Admin login successful',
          user: adminUser,
          token
        }),
      };
    }

    const { db } = await connectToDatabase();
    const users = db.collection('users');

    // Find user by email
    const user = await users.findOne({ email });
    if (!user) {
      console.log('User not found for email:', email);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Email not registered' }),
      };
    }

    console.log('User found:', { email: user.email, username: user.username, hasPassword: !!user.password });

    // Hash the input password and compare with stored hash
    const inputPasswordHash = hashPassword(password);
    const isValidPassword = inputPasswordHash === user.password;
    
    console.log('Password comparison result:', isValidPassword);
    
    if (!isValidPassword) {
      console.log('Password verification failed for user:', email);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid password' }),
      };
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role || 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user data without password
    const userResponse = {
      id: user._id,
      name: user.username,
      email: user.email,
      phone: user.phone || '',
      balance: user.balance || 0,
      orders: user.orders || 0,
      active: user.active || 0,
      joinDate: user.joinDate || new Date().toISOString(),
      role: user.role || 'user'
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Login successful',
        user: userResponse,
        token
      }),
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
