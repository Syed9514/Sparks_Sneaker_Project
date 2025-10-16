import axios from 'axios';

const API_URL = 'http://localhost:5000/api/user/wishlist';

// Get user wishlist
const getWishlist = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Toggle item in wishlist
const toggleWishlist = async (productId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, { productId }, config);
  return response.data;
};

const wishlistService = {
  getWishlist,
  toggleWishlist,
};

export default wishlistService;