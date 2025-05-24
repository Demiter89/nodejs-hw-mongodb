import dotenv from 'dotenv';
dotenv.config(); // ВАЖЛИВО: має бути до використання process.env

import mongoose from 'mongoose';
import Contact from '../models/contactModel.js';

// 👉 Перевірка чи змінні існують
console.log('USER:', process.env.MONGODB_USER);
console.log('PASS:', process.env.MONGODB_PASSWORD);
console.log('URL:', process.env.MONGODB_URL);
console.log('DB:', process.env.MONGODB_DB);

// 🔧 Формуємо MongoDB URI
const MONGO_URI = `mongodb+srv://${process.env.MONGODB_USER}:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;
console.log('Mongo URI:', MONGO_URI);

const contacts = [
  {
    name: "Yulia Shevchenko",
    phoneNumber: "+380000000001",
    email: "oleh1@example.com",
    isFavourite: false,
    contactType: "personal",
  },
  {
    name: "Dmytro Boyko",
    phoneNumber: "+380000000002",
    email: null,
    isFavourite: false,
    contactType: "personal",
  },
  {
    name: "Andriy Pavlenko",
    phoneNumber: "+380000000003",
    email: "dmytro3@example.com",
    isFavourite: false,
    contactType: "home",
  },
  {
    name: "Yulia Shevchenko",
    phoneNumber: "+380000000004",
    email: null,
    isFavourite: false,
    contactType: "personal",
  },
  {
    name: "Kateryna Povalenko",
    phoneNumber: "+380000000005",
    email: "ivan5@example.com",
    isFavourite: false,
    contactType: "personal",
  },
  {
    name: "Anna Kovalenko",
    phoneNumber: "+380000000006",
    email: null,
    isFavourite: false,
    contactType: "home",
  },
  {
    name: "Oleh Tkachuk",
    phoneNumber: "+380000000007",
    email: "andriy7@example.com",
    isFavourite: false,
    contactType: "personal",
  },
  {
    name: "Maria Petrenko",
    phoneNumber: "+380000000008",
    email: null,
    isFavourite: false,
    contactType: "personal",
  },
  {
    name: "Ivan Ivanenko",
    phoneNumber: "+380000000009",
    email: "vasyl9@example.com",
    isFavourite: false,
    contactType: "home",
  },
  {
    name: "Kateryna Kovalchuk",
    phoneNumber: "+3800000000010",
    email: null,
    isFavourite: false,
    contactType: "personal",
  }
];

const seedContacts = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await Contact.deleteMany(); // Очистити попередні
    await Contact.insertMany(contacts);
    console.log('Contacts seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedContacts();