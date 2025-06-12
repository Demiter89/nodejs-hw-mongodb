import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; 
import authRouter from './routes/authRouter.js';

dotenv.config();

export const setupServer = () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());
  app.use(cookieParser());
  app.use('/auth', authRouter);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};