// backend/controllers/uploadController.js
import User from '../models/User.js';

export const uploadAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      // Construct the web-accessible path
      const avatarUrl = `/uploads/avatars/${req.file.filename}`;
      user.avatar = avatarUrl;

      const updatedUser = await user.save();

      res.json({
        message: 'Avatar uploaded successfully',
        avatar: updatedUser.avatar,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};