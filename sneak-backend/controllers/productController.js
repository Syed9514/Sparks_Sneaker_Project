// backend/controllers/productController.js
import Product from '../models/Product.js';

// @desc    Fetch all products
// @route   GET /api/products
const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

// @desc    Fetch 3 random trending products
// @route   GET /api/products/trending
const getTrendingProducts = async (req, res) => {
    // Mongoose's aggregate function is perfect for random sampling
    const products = await Product.aggregate([{ $sample: { size: 3 } }]);
    res.json(products);
};

export { getProducts, getTrendingProducts };