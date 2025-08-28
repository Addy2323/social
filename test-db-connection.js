import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

async function testConnection() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    console.log('🔄 Connecting to MongoDB Atlas...');
    await client.connect();
    
    console.log('✅ Connected successfully!');
    
    // Test database operations
    const db = client.db('addonet');
    
    // Test creating a collection and inserting a document
    const testCollection = db.collection('test');
    const result = await testCollection.insertOne({ 
      message: 'Hello from ADDO.NET!', 
      timestamp: new Date() 
    });
    
    console.log('✅ Test document inserted:', result.insertedId);
    
    // Clean up test document
    await testCollection.deleteOne({ _id: result.insertedId });
    console.log('✅ Test document cleaned up');
    
    console.log('🎉 MongoDB Atlas is ready for your social media platform!');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.log('💡 Check your username and password in the connection string');
    }
    if (error.message.includes('IP address')) {
      console.log('💡 Make sure your IP address is whitelisted in MongoDB Atlas Network Access');
    }
  } finally {
    await client.close();
    console.log('🔌 Connection closed');
  }
}

testConnection();
