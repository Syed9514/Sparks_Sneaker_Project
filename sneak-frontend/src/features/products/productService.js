import api from '../../utils/api';

const ENDPOINT = '/products';

// Get all products
const getProducts = async () => {
  const response = await api.get(ENDPOINT);
  return response.data;
};

// Get trending products
const getTrendingProducts = async () => {
  const response = await api.get(`${ENDPOINT}/trending`);
  return response.data;
};

// Get products by category
const getProductsByCategory = async (category) => {
  const response = await api.get(`${ENDPOINT}/category/${category}`);
  return response.data;
};

const productService = {
  getProducts,
  getTrendingProducts,
  getProductsByCategory,
};

export default productService;