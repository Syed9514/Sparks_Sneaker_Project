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
    const productsWithStock = sneakerData.map((product, index) => ({
      ...product,
      stock: 3 ,// Set default stock for all items
      rating: product.rating || (4.0 + (index % 10) / 10), // Mock rating between 4.0 and 4.9
      numReviews: product.numReviews || (Math.floor(Math.random() * 100) + 20) // Mock reviews between 20 and 119
    }));
    await Product.insertMany(productsWithStock);

    console.log('Data Imported with Stock & Reviews!');
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