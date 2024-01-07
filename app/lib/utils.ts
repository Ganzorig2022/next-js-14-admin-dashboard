import mongoose from 'mongoose';

type a = {
  isConnected: number;
};
const connection = {} as a;

export const connectToDB = async () => {
  try {
    if (connection.hasOwnProperty('isConnected')) return;
    const db = await mongoose.connect(process.env.MONGO as string);
    console.log(
      'MongoDB connection is successfull!',
      db.connections[0].readyState,
    );
    connection.isConnected = db.connections[0].readyState;
  } catch (error: any) {
    console.log('MongoDB connection error', error);
    // throw new Error(error);
  }
};
