import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import connectDB from './config/db.js';

// Route imports
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// Load environment variables
dotenv.config();

connectDB();

// Initialize Express app
const app = express();

// --- 1. PRODUCTION CORS SETUP ---
// We only allow requests from YOUR frontend, not the whole world.
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if the origin matches your Frontend URL or Localhost
    const allowedOrigins = [
      'http://localhost:3000', // Local Frontend
      'http://localhost:5173', // Vite Local Frontend
      process.env.FRONTEND_URL // Your Deployed Frontend (Set this in Render later)
    ];

    if (allowedOrigins.indexOf(origin) !== -1 || !process.env.NODE_ENV === 'production') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies/headers
};

app.use(cors(corsOptions)); 
// --------------------------------

app.use(express.json()); // To parse JSON bodies

// --- ROUTES ---
app.get('/', (req, res) => {
  res.send('Sneaker Store API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/uploads', uploadRoutes);

// --- Make Uploads Folder Static ---
// This allows the frontend to access images at /uploads/filename.jpg
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// --- SERVER STARTUP ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});