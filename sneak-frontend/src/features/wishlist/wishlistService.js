import api from '../../utils/api';

const ENDPOINT = '/user/wishlist';

const getWishlist = async () => {
  const response = await api.get(ENDPOINT);
  return response.data;
};

const toggleWishlist = async (productId) => {
  // Sending productId in body as per your likely backend setup
  const response = await api.post(ENDPOINT, { productId });
  return response.data;
};

const removeFromWishlist = async (productId) => {
  const response = await api.delete(`${ENDPOINT}/${productId}`);
  return response.data;
};

const wishlistService = {
  getWishlist,
  toggleWishlist,
  removeFromWishlist,
};

export default wishlistService;