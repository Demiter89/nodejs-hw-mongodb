import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import contactsRouter from './routes/contactsRouter.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());

  // ✅ Додай кореневий маршрут
  app.get('/', (req, res) => {
    res.send('API is running!');
  });

  app.use('/api/contacts', contactsRouter);

  return app;
};