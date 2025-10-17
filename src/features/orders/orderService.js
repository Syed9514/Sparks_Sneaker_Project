import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders/';

// Create a new order
const createOrder = async (orderData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, orderData, config);
  return response.data;
};

// Get user's order history
const getMyOrders = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(API_URL + 'myorders', config);
    return response.data;
  };

const orderService = {
  createOrder,
  getMyOrders,
};

export default orderService;