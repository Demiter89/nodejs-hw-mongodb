import mongoose from 'mongoose';

export const initMongoConnection = async () => {
  try {
    const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } = process.env;

    const connectionString = `mongodb+srv://${MONGODB_USER}:${encodeURIComponent(MONGODB_PASSWORD)}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority&appName=Cluster0`;

    await mongoose.connect(connectionString);

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};