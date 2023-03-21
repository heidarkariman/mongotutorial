const { connectToDatabase } = require('./db');

async function testDatabaseConnection() {
  try {
    await connectToDatabase();
    console.log('Database connection successful');
  } catch (error) {
    console.error('Error connecting to database:', error.message);
  }
}

testDatabaseConnection();
