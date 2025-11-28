import api from '../../utils/api';

const ENDPOINT = '/orders';

const createOrder = async (orderData) => {
  const response = await api.post(ENDPOINT, orderData);
  return response.data;
};

const getMyOrders = async () => {
  const response = await api.get(`${ENDPOINT}/myorders`);
  return response.data;
};

const orderService = {
  createOrder,
  getMyOrders,
};

export default orderService;