import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRouter from './routes/authRouter.js';
import contactsRouter from './routes/contactsRouter.js'; // ✅ правильний файл

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

dotenv.config();

export const setupServer = () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());
  app.use(cookieParser());

  // Роути
  app.use('/auth', authRouter);
  app.use('/contacts', contactsRouter); // ✅ підключення маршруту для контактів

  // Обробка помилки 404
  app.use(notFoundHandler);

  // Централізована обробка помилок
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};