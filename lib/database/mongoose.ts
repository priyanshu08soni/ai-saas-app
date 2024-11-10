import mongoose, { Mongoose } from 'mongoose';

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Module-scoped variable to cache the connection
const cachedConnection: MongooseConnection = { conn: null, promise: null };

export const connectToDatabase = async (): Promise<Mongoose> => {
  if (cachedConnection.conn) {
    return cachedConnection.conn;
  }

  if (!process.env.MONGODB_URL) {
    throw new Error('Missing MONGODB_URL');
  }

  cachedConnection.promise = 
    cachedConnection.promise || 
    mongoose.connect(process.env.MONGODB_URL, { 
      dbName: 'MegaMinds', bufferCommands: false 
    });

  cachedConnection.conn = await cachedConnection.promise;

  return cachedConnection.conn;
};
