import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
// import { addToCart } from "../app/cartSlice";
import { addToCart } from '../features/cart/cartSlice';
import { FiHeart } from "react-icons/fi";
import { toggleWishlist } from '../features/wishlist/wishlistSlice';
import { useToast } from "../context/ToastContext";
import "./ProductCard.css";

export default function ProductCard({ sneaker }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [tilt, setTilt] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const isOutOfStock = sneaker.stock <= 0;

  // Check if the current sneaker is in the wishlist
  const isWishlisted = wishlistItems.some(item => item._id === sneaker._id);

  const handleToggleWishlist = () => {
    if (!user) {
      showToast('Please log in to add items to your wishlist.', 'error', {
        label: 'Login',
        onClick: () => navigate('/login')
      });
      return;
    }
    // Dispatch the async thunk with the sneaker's unique 'id' field
    dispatch(toggleWishlist(sneaker.id));
  };

  const handleAddToCart = () => {
    if (!user) {
      showToast('Please log in to add items to your cart.', 'error', {
        label: 'Login',
        onClick: () => navigate('/login')
      });
      return;
    }
    // Dispatch the async thunk with the product and default quantity
    dispatch(addToCart({ ...sneaker, quantity: 1 }));
  };

  const handleCardClick = () => {
    setTilt(true);
    setTimeout(() => setTilt(false), 350);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    setWishlisted((prev) => !prev);
  };

  return (
    // The Link now navigates to the category page AND passes the sneaker's ID in the state
    <Link
      to={`/${sneaker.category}`}
      state={{ selectedProductId: sneaker.id }}
      // Add 'out-of-stock' class if needed
      className={`product-card ${isOutOfStock ? 'out-of-stock' : ''}`}
      // Prevent navigation if out of stock
      onClick={(e) => isOutOfStock && e.preventDefault()}
    >
      <div className="product-image-container">
        {isOutOfStock && (
          <div className="card-stock-overlay">
            <span>Restocks in 24 hours</span>
          </div>
        )}
        <img src={sneaker.image} alt={sneaker.name} className="product-image" />
        <button className="wishlist-btn" onClick={(e) => {
          e.preventDefault(); // Prevent navigation when only clicking the heart
          handleToggleWishlist();
        }}
          // Disable wishlist button if out of stock
          disabled={isOutOfStock}
        >
          <FiHeart className={isWishlisted ? 'heart-icon active' : 'heart-icon'} />
        </button>
      </div>
      <div className="product-info">
        <span className="product-category">{sneaker.category}</span>
        <h3 className="product-name">{sneaker.name}</h3>
        <div className="product-footer">
          <span className="product-price">{sneaker.price}</span>
        </div>
      </div>
    </Link>
  );
}

