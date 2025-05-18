import mongoose from 'mongoose';

export const initMongoConnection = async () => {
  try {
    const MONGO_URL = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}?retryWrites=true&w=majority&appName=Cluster0`;

    await mongoose.connect(MONGO_URL);
    console.log('✅ Successfully connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};