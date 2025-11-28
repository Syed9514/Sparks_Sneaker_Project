// backend/controllers/orderController.js
import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

// @desc    Create new order
// @route   POST /api/orders
export const addOrderItems = async (req, res) => {
  const { orderItems, totalPrice } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }

  try {
    // --- Step 1: Check stock for all items in the order ---
    const stockChecks = orderItems.map(item => 
      Product.findById(item.product).then(p => {
        if (!p) throw new Error(`Product ${item.name} not found`);
        if (p.stock < item.quantity) {
          throw new Error(`Not enough stock for ${item.name}. Only ${p.stock} left.`);
        }
        return p; // Return the product for the next step
      })
    );

    // Wait for all checks to complete
    await Promise.all(stockChecks);

    // --- Step 2: Create the new order ---
    const order = new Order({
      orderItems: orderItems,
      user: req.user._id,
      totalPrice,
    });
    const createdOrder = await order.save();

    // --- Step 3: Decrement stock in the database ---
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock -= item.quantity;
        await product.save();
      }
    }

    // --- Step 4: Clear the user's cart ---
    const user = await User.findById(req.user._id);
    if (user) {
        user.cart = [];
        await user.save();
    }

    res.status(201).json(createdOrder);

  } catch (error) {
    // If any stock check fails, this catch block will run
    console.error(error);
    res.status(400).json({ message: error.message || "Error creating order." });
  }
};

// @desc    Get logged in user's orders
// @route   GET /api/orders/myorders
export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};