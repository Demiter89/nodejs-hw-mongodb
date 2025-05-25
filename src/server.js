import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import contactsRouter from './routes/contactsRouter.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const PORT = process.env.PORT || 3000;

export const setupServer = () => {
  const app = express();

  // Middleware JSON та CORS
  app.use(express.json());
  app.use(cors());

  // Pino-логер
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss',
          singleLine: true,
        },
      },
    }),
  );

  // Роутер контактів
  app.use('/contacts', contactsRouter);

  // Обробка неіснуючих маршрутів (404)
  app.use(notFoundHandler);

  // Глобальна обробка помилок (500)
  app.use(errorHandler);

  // Запуск сервера
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};