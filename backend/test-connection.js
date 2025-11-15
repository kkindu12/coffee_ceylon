// Quick test script to check MongoDB connection
require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    console.log('Connection string:', process.env.MONGODB_URI ? 'Set' : 'Not set');
    
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI is not set in .env file');
      process.exit(1);
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log('✅ Connection successful!');
    console.log('   Host:', conn.connection.host);
    console.log('   Database:', conn.connection.name);
    console.log('   Ready State:', conn.connection.readyState === 1 ? 'Connected' : 'Not Connected');
    
    // Test a simple query
    const collections = await conn.connection.db.listCollections().toArray();
    console.log('   Collections:', collections.length > 0 ? collections.map(c => c.name).join(', ') : 'None (database is empty)');
    
    await mongoose.connection.close();
    console.log('✅ Test completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed!');
    console.error('Error:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Make sure MongoDB is running');
    console.error('2. Check your MONGODB_URI in .env file');
    console.error('3. For local MongoDB: mongodb://localhost:27017/coffee_ceylon');
    console.error('4. For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/coffee_ceylon');
    process.exit(1);
  }
}

testConnection();

