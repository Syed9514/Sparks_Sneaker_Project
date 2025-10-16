import axios from 'axios';

const API_URL = 'http://localhost:5000/api/user/cart';

// Get user cart from backend
const getCart = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Add item to cart
const addToCart = async (itemData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // We send the product's unique 'id' and the desired quantity
  const response = await axios.post(API_URL, { 
    productId: itemData.id, 
    quantity: itemData.quantity 
  }, config);
  return response.data;
};

// Remove item from cart
const removeFromCart = async (productId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + `/${productId}`, config);
  return response.data;
};

const cartService = {
  getCart,
  addToCart,
  removeFromCart,
};

export default cartService;