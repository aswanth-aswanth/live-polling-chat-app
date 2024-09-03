import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
configDotenv();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.DB_URL || 'mongodb://localhost:27017/polling_chat_app'
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
