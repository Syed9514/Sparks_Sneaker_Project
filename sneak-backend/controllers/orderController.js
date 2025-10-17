// backend/controllers/orderController.js
import Order from '../models/Order.js';
import User from '../models/User.js';

// @desc    Create new order
// @route   POST /api/orders
export const addOrderItems = async (req, res) => {
  const { orderItems, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: 'No order items' });
    return;
  } else {
    const order = new Order({
      // orderItems: orderItems.map(item => ({
      //   ...item,
      //   product: item.product._id, 
      // })),
      orderItems: orderItems,
      user: req.user._id,
      totalPrice,
    });

    const createdOrder = await order.save();

    // After creating the order, clear the user's cart
    const user = await User.findById(req.user._id);
    if (user) {
        user.cart = [];
        await user.save();
    }

    res.status(201).json(createdOrder);
  }
};

// @desc    Get logged in user's orders
// @route   GET /api/orders/myorders
export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};