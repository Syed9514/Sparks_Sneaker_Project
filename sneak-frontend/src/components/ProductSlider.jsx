import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { getTrendingProducts } from '../features/products/productSlice';
import { toggleWishlist } from '../features/wishlist/wishlistSlice';
import Loader from './animation/Loader';
import { useToast } from '../context/ToastContext';
import './ProductSlider.css';

export default function ProductSlider() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { trendingProducts, isLoading } = useSelector((state) => state.products);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);

  // Fetch trending products on mount
  useEffect(() => {
    dispatch(getTrendingProducts());
  }, [dispatch]);

  const handleToggleWishlist = (e, id) => {
    e.preventDefault(); // Prevent navigation
    if (!user) {
      showToast("Please log in to use the wishlist.", "error", {
        label: "Login",
        onClick: () => navigate("/login")
      });
      return;
    }
    dispatch(toggleWishlist(id));
  };

  if (isLoading) {
    return <div className="slider-loading"><Loader /></div>;
  }

  return (
    <section className="slider-container">
      <div className="slider-header">
        <h2 className="slider-title">Trending Now</h2>
        <span className="slider-subtitle">picks of the week</span>
      </div>

      <div className="slider-track">
        {trendingProducts.map((sneaker) => {
          const isWishlisted = wishlistItems.some(item => item._id === sneaker.id);

          return (
            <Link
              to={`/${sneaker.category}`}
              state={{ selectedProductId: sneaker.id }}
              className="slider-card"
              key={sneaker.id}
            >
              {/* Wishlist Button */}
              <button
                className={`slider-wishlist-btn ${isWishlisted ? 'active' : ''}`}
                onClick={(e) => handleToggleWishlist(e, sneaker.id)}
              >
                <FiHeart className="heart-icon" />
              </button>

              {/* Image Area */}
              <div className="slider-image-wrapper">
                <div className="slider-circle-bg"></div>
                <img src={sneaker.image} alt={sneaker.name} className="slider-img" />
              </div>

              {/* Info Area */}
              <div className="slider-info">
                <h4 className="slider-name">{sneaker.name}</h4>
                <div className="slider-footer">
                  <p className="slider-price">{sneaker.price}</p>
                  <span className="slider-category">{sneaker.category}'s</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}