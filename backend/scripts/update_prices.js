import mongoose from 'mongoose';
import Product from '../models/Product.js';
import connectDB from '../config/db.js';
import dotenv from 'dotenv';
import path from 'path';

const __dirname = path.resolve();
dotenv.config({ path: path.resolve(__dirname, 'backend/.env') });

const updatePrices = async () => {
  try {
    await connectDB();
    const products = await Product.find();

    for (const product of products) {
      if (typeof product.price !== 'number' || isNaN(product.price) || product.price === 0) {
        const newPrice = Math.floor(Math.random() * (2500 - 800 + 1)) + 800;
        product.price = newPrice;
        await product.save();
      }
    }

    console.log('Finished updating prices.');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error updating prices:', error);
    mongoose.connection.close();
  }
};

updatePrices();
