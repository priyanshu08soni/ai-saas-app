

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

  cachedConnection.promise = 
    cachedConnection.promise || 
    mongoose.connect("mongodb+srv://MM:834@cluster0.yjk8m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { 
      dbName: 'MegaMinds', bufferCommands: false 
    });

  cachedConnection.conn = await cachedConnection.promise;

  return cachedConnection.conn;
};