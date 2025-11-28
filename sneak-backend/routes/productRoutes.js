// backend/routes/productRoutes.js
import express from 'express';
const router = express.Router();
import { getProducts, getTrendingProducts,getProductsByCategory,getProductById } from '../controllers/productController.js';

router.route('/').get(getProducts);
router.route('/trending').get(getTrendingProducts);
router.route('/category/:category').get(getProductsByCategory);
router.route('/:id').get(getProductById);

export default router;