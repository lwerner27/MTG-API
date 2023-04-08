const { MongoClient } = require('mongodb');

let dbInstance = null;
let db = null;

async function connect(url) {
  if (!dbInstance) {
    try {
      const client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      db = client.db();
      dbInstance = db;
      console.log('Connected to MongoDB successfully.');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

  return dbInstance;
}

module.exports = {
  connect,
  getDb: () => {
    if (!db) {
      throw new Error('Database not connected. Call connect() first.');
    }
    return db;
  },
};