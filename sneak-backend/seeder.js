// backend/seeder.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import sneakerData from '../src/data/sneakerData.js';
import Product from './models/Product.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Product.deleteMany(); // Clear existing products
    await Product.insertMany(sneakerData);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
    try {
      await Product.deleteMany();
      console.log('Data Destroyed!');
      process.exit();
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  };

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}