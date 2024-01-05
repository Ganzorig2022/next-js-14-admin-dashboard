import mongoose from 'mongoose';

type a = {
  isConnected: string;
};
const connection = {} as a;

export const connectToDB = async () => {
  try {
    if (connection.hasOwnProperty('isConnected')) return;
    const db = await mongoose.connect(process.env.MONGO as string);
    connection.isConnected = db.connections[0].readyState;
  } catch (error: any) {
    console.log('MongoDB connection error', error);
    throw new Error(error);
  }
};
