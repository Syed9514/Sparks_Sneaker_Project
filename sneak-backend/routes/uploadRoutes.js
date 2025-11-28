// backend/routes/uploadRoutes.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import { protect } from '../middleware/authMiddleware.js';
import { uploadAvatar } from '../controllers/uploadController.js';

const router = express.Router();

// --- Multer Storage Configuration ---
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/avatars'); // Folder to save avatars
  },
  filename(req, file, cb) {
    // Create a unique filename to avoid conflicts
    cb(null, `avatar-${req.user._id}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// --- Routes ---
router.route('/avatar').post(protect, upload.single('avatar'), uploadAvatar);

export default router;