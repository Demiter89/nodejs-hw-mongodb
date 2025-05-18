import dotenv from 'dotenv';
dotenv.config();

import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const startApp = async () => {
  await initMongoConnection(); // з'єднання з MongoDB
  const app = setupServer();   // створення інстансу сервера

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startApp();