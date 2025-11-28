// backend/routes/orderRoutes.js
import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { addOrderItems, getMyOrders } from '../controllers/orderController.js';

router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);

export default router;