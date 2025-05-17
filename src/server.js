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

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};