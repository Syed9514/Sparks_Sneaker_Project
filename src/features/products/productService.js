import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products/';

// Get all products
const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get trending products
const getTrendingProducts = async () => {
    const response = await axios.get(API_URL + 'trending');
    return response.data;
};

const productService = {
  getProducts,
  getTrendingProducts,
};

export default productService;