import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from './utils/database.js';

// Simple password hashing function
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password + 'addonet_salt').digest('hex');
};

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { email, password, username } = JSON.parse(event.body);

    if (!email || !password || !username) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email, password, and username are required' }),
      };
    }

    const { db } = await connectToDatabase();
    const users = db.collection('users');

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return {
        statusCode: 409,
        body: JSON.stringify({ error: 'User already exists' }),
      };
    }

    const hashedPassword = hashPassword(password);

    const newUser = {
      email,
      password: hashedPassword,
      username,
      balance: 0,
      orders: 0,
      active: 0,
      joinDate: new Date().toISOString(),
      role: 'user',
      createdAt: new Date(),
    };

    const result = await users.insertOne(newUser);

    const token = jwt.sign({ userId: result.insertedId, role: 'user' }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // Return user data without password
    const userResponse = {
      id: result.insertedId,
      name: username,
      email,
      phone: '',
      balance: 0,
      orders: 0,
      active: 0,
      joinDate: new Date().toISOString(),
      role: 'user'
    };

    return {
      statusCode: 201,
      body: JSON.stringify({ 
        success: true,
        message: 'User registered successfully', 
        user: userResponse,
        token 
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', details: error.message }),
    };
  }
};
