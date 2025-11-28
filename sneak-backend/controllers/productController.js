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

// --- ADD THIS NEW FUNCTION ---
// @desc    Fetch products by category
// @route   GET /api/products/category/:category
const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  const products = await Product.find({ category: category });
  
  if (products) {
    res.json(products);
  } else {
    res.status(404).json({ message: 'No products found for this category' });
  }
};

// @desc    Fetch a single product by its custom id
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
  // Find a product where the 'id' field matches the id from the URL parameters
  const product = await Product.findOne({ id: req.params.id });
  
  if (product) {
    res.json(product);
  } else {
    // If no product is found, send a 404 error
    res.status(404).json({ message: 'Product not found' });
  }
};

export { getProducts, getTrendingProducts, getProductsByCategory, getProductById};