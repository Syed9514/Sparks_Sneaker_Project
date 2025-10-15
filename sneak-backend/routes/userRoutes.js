// backend/routes/userRoutes.js
import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { 
    getWishlist, 
    toggleWishlist,
    getCart,
    addToCart,
    removeFromCart
} from '../controllers/userController.js';

// Wishlist Routes
router.route('/wishlist').get(protect, getWishlist).post(protect, toggleWishlist);

// Cart Routes
router.route('/cart').get(protect, getCart).post(protect, addToCart);
router.route('/cart/:productId').delete(protect, removeFromCart);

export default router;