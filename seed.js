import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import fs from 'fs';
import Contact from './src/models/contactModel.js';

dotenv.config();

// Сформуй рядок підключення, використовуючи всі необхідні змінні
const MONGO_URI = `mongodb+srv://${process.env.MONGODB_USER}:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

const contacts = JSON.parse(fs.readFileSync('./contacts.json', 'utf-8'));

const seedContacts = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await Contact.deleteMany(); // Очистити попередні контакти
    await Contact.insertMany(contacts);
    console.log('Contacts imported successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding contacts:', error);
    process.exit(1);
  }
};

seedContacts();