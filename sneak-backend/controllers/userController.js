// backend/controllers/userController.js
import User from '../models/User.js';
import Product from '../models/Product.js';

// @desc    Get user's wishlist
// @route   GET /api/user/wishlist
export const getWishlist = async (req, res) => {
  const user = await User.findById(req.user._id).populate('wishlist');
  res.json(user.wishlist);
};

// @desc    Add/remove item from wishlist
// @route   POST /api/user/wishlist
export const toggleWishlist = async (req, res) => {
  const { productId } = req.body;
  const user = await User.findById(req.user._id);
  const product = await Product.findOne({ id: productId }); // Find by custom 'id' field

  if (!product) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }

  const productObjectId = product._id;
  const index = user.wishlist.indexOf(productObjectId);

  if (index === -1) {
    // Add to wishlist
    user.wishlist.push(productObjectId);
  } else {
    // Remove from wishlist
    user.wishlist.splice(index, 1);
  }

  await user.save();
  const updatedUser = await User.findById(req.user._id).populate('wishlist');
  res.json(updatedUser.wishlist);
};

// @desc    Get user's cart
// @route   GET /api/user/cart
export const getCart = async (req, res) => {
    const user = await User.findById(req.user._id).populate('cart.product');
    res.json(user.cart);
};

// @desc    Add/update item in cart
// @route   POST /api/user/cart
export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const user = await User.findById(req.user._id);
    const product = await Product.findOne({ id: productId });

    if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
    }

    const productObjectId = product._id;
    const cartItemIndex = user.cart.findIndex(item => item.product.equals(productObjectId));

    if (cartItemIndex > -1) {
        // Update quantity
        user.cart[cartItemIndex].quantity = quantity;
    } else {
        // Add new item
        user.cart.push({ product: productObjectId, quantity });
    }

    await user.save();
    const updatedUser = await User.findById(req.user._id).populate('cart.product');
    res.json(updatedUser.cart);
};

// @desc    Remove item from cart
// @route   DELETE /api/user/cart/:productId
export const removeFromCart = async (req, res) => {
    const { productId } = req.params;
    const user = await User.findById(req.user._id);
    const product = await Product.findOne({ id: productId });

    if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
    }

    user.cart = user.cart.filter(item => !item.product.equals(product._id));

    await user.save();
    const updatedUser = await User.findById(req.user._id).populate('cart.product');
    res.json(updatedUser.cart);
};