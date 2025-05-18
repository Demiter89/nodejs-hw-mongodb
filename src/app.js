import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import contactsRouter from './routes/contactsRouter.js';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/contacts', contactsRouter);
export default app;