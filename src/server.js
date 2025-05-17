import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import contactsRouter from './routes/contactsRouter.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());

  app.use('/api/contacts', contactsRouter);

  return app;  // Повертаємо сам app, але не запускаємо сервер тут
};