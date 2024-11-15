const mongoose = require('mongoose'); // Use require instead of import

const MONGODB_URL = "mongodb+srv://MM:834@cluster0.yjk8m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

interface MongooseConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { 
    conn: null, 
    promise: null 
  };
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL, {
      dbName: 'MegaMinds',
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
