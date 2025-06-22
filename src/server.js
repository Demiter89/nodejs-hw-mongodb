import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

import contactsRouter from './routes/contactsRouter.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRouter.js';

import { UPLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
const PORT = process.env.PORT || 3000;

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.get('/', (req, res) => {
    res.send('API is running ✅');
  });
  app.use('/auth', authRouter);
  app.use('/contacts', contactsRouter);
  app.use('/api-docs', swaggerDocs());

  app.use(errorHandler);
  app.use(notFoundHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};