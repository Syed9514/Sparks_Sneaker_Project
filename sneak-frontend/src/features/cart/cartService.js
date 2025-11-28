import api from '../../utils/api'; // Import the new central API

const ENDPOINT = '/user/cart'; // Only relative path needed

const getCart = async () => {
  // No token passed! API handles it automatically.
  const response = await api.get(ENDPOINT);
  return response.data;
};

const addToCart = async (itemData) => {
  const response = await api.post(ENDPOINT, { 
    productId: itemData.id, // Ensure ID is correct
    quantity: itemData.quantity,
    size: itemData.size 
  });
  return response.data;
};

const removeFromCart = async (productId) => {
  const response = await api.delete(`${ENDPOINT}/${productId}`);
  return response.data;
};

const cartService = {
  getCart,
  addToCart,
  removeFromCart,
};

export default cartService;