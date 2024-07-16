import mongoose from 'mongoose';
import { MONGO_DB_HOST, MONGO_DB_name } from './config/config';

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://${MONGO_DB_HOST}/${MONGO_DB_name}`);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
