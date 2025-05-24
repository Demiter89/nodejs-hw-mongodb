import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const startApp = async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (err) {
    console.error('Не вдалося запустити додаток:', err);
    process.exit(1);
  }
};

startApp();