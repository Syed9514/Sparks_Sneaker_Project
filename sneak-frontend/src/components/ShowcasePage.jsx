import { useState, useEffect } from "react";
import "./ShowcasePage.css";
import { FiHeart, FiShoppingCart,FiX, FiStar, FiArrowRight } from 'react-icons/fi';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";
import { Link } from "react-router-dom";

const StarRating = ({ rating = 4.5, numReviews = 0 }) => (
  <div className="star-rating">
    <div className="stars">
      {[...Array(5)].map((_, i) => (
        <FiStar key={i} className={i < Math.round(rating) ? 'star-filled' : 'star-empty'} />
      ))}
      <span className="rating-value">{rating.toFixed(1)}</span>
    </div>
    <span className="review-count">({numReviews} reviews)</span>
  </div>
);

export default function ShowcasePage({ products, selectedProductId, title }) {
  const findInitialIndex = () => {
    if (selectedProductId) {
      const index = products.findIndex(p => p.id === selectedProductId);
      return index !== -1 ? index : 0;
    }
    return 0;
  };

  const [selectedIndex, setSelectedIndex] = useState(findInitialIndex);
  const [selectedSize, setSelectedSize] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const globalProducts = useSelector((state) => state.products.products);
  const product = globalProducts.find(p => p.id === products[selectedIndex]?.id) || products[selectedIndex];

  useEffect(() => {
    const newIndex = products.findIndex(p => p.id === product?.id);
    setSelectedIndex(newIndex !== -1 ? newIndex : 0);
  }, [globalProducts, products, product?.id]);

  useEffect(() => {
    setSelectedSize(product?.sizes?.length > 0 ? product.sizes[0] : null);
  }, [product]);

  const [showAddedModal, setShowAddedModal] = useState(false);

  const handleAddToCart = () => {
    if (!user) return alert("Please log in to add items.");
    if (product.stock <= 0) return alert("This item is out of stock.");
    
    if (selectedSize) {
      dispatch(addToCart({ ...product, quantity: 1, size: selectedSize }));
      
      // Show Modal instead of Alert
      setShowAddedModal(true);
      
      // Auto-hide after 4 seconds if user does nothing
      setTimeout(() => setShowAddedModal(false), 4000);
    } else {
      alert("Please select a size.");
    }
  };

  const handleToggleWishlist = () => {
    if (!user) return alert("Please log in.");
    dispatch(toggleWishlist(product.id));
  };

  if (!product) return <div className="loading-state">Loading Showcase...</div>;

  const isOutOfStock = product.stock <= 0;
  const pageTitle = title || product?.category;

  return (
    <div className="showcase-page" style={{'--theme-color': product.themeColor || '#e0e0e0'}}>

      {showAddedModal && (
        <div className="added-modal-overlay">
          <div className="added-modal">
            <div className="modal-header">
              <span>Successfully Added!</span>
              <button onClick={() => setShowAddedModal(false)}><FiX /></button>
            </div>
            
            <div className="modal-body">
              <img src={product.image} alt={product.name} className="modal-img" />
              <div className="modal-info">
                <h4>{product.name}</h4>
                <p>Size: {selectedSize}</p>
                <span className="modal-price">{product.price}</span>
              </div>
            </div>

            <Link to="/dashboard" className="modal-checkout-btn">
              Go to Cart <FiArrowRight />
            </Link>
          </div>
        </div>
      )}
      
      {/* Background Ambient Glow */}
      <div className="ambient-glow" />

      {/* --- Main Content Area --- */}
      <div className="showcase-container">
        
        {/* Left: Immersive Image */}
        <div className="showcase-visuals">
          <div className="header-badge">{pageTitle}</div>
          <div className="hero-image-wrapper">
             <img src={product.image} alt={product.name} className="sneaker-hero" />
             {/* Decorative Elements */}
             <div className="hero-shadow" />
          </div>
        </div>

        {/* Right: Modern Details Panel */}
        <div className="showcase-details">
          <div className="details-header">
            <h1 className="product-title">{product.name}</h1>
            <div className="price-block">
               <span className="current-price">{product.price}</span>
               {product.offers?.[0] && <span className="discount-pill">{product.offers[0]}</span>}
            </div>
            <div className="meta-row">
              <StarRating rating={product.rating} numReviews={product.numReviews} />
              
              {/* --- NEW: Occasion Tags --- */}
              <div className="occasion-tags">
                {product.occasion?.map((tag, i) => (
                  <span key={i} className="occasion-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="details-body">
            <div className="selector-group">
              <span className="label">Select Size</span>
              <div className="size-grid">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-pill ${selectedSize === size ? "active" : ""}`}
                    onClick={() => setSelectedSize(size)}
                    disabled={isOutOfStock}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="action-group">
              <button 
                className="btn-wishlist" 
                onClick={handleToggleWishlist}
                title="Add to Wishlist"
              >
                <FiHeart size={20}/>
              </button>
              <button 
                className="btn-add-cart" 
                onClick={handleAddToCart}
                disabled={isOutOfStock}
              >
                <span>{isOutOfStock ? "Out of Stock" : "Add to Cart"}</span>
                <FiArrowRight />
              </button>
            </div>
            
            {isOutOfStock && <p className="stock-warning">Restocking soon. Join the waitlist.</p>}
          </div>
        </div>
      </div>

      {/* --- Floating Thumbnail Dock --- */}
      {products.length > 1 && (
        <div className="dock-wrapper">
          <div className="glass-dock">
            {products.map((p, idx) => {
              const isActive = idx === selectedIndex;
              return (
                <div
                  key={p.id}
                  className={`dock-item ${isActive ? "active" : ""}`}
                  onClick={() => setSelectedIndex(idx)}
                >
                  <img src={p.image} alt={p.name} />
                  {isActive && <div className="active-dot" />}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}