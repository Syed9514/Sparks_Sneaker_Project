// backend/routes/productRoutes.js
import express from 'express';
const router = express.Router();
import { getProducts, getTrendingProducts } from '../controllers/productController.js';

router.route('/').get(getProducts);
router.route('/trending').get(getTrendingProducts);

export default router;