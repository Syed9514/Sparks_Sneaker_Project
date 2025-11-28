// backend/models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true, enum: ['men', 'women', 'kids'] },
  sizes: [{ type: String }],
  occasion: [{ type: String }],
  themeColor: { type: String },
  trend: { type: String },
  trendValue: { type: Number },
  offers: [{ type: String }],
  stock: { type: Number, required: true, default: 3 },
  rating: { type: Number, default: 4.5 },
  numReviews: { type: Number, default: 0 },
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;