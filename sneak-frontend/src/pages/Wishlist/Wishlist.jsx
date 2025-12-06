import { useSelector, useDispatch } from "react-redux";
import { toggleWishlist } from "../../features/wishlist/wishlistSlice";
import { addToCart } from "../../features/cart/cartSlice";
import { Link } from "react-router-dom";
import { FiTrash2, FiShoppingCart, FiArrowRight, FiHeart } from "react-icons/fi";
import "./Wishlist.css";

export default function Wishlist() {
  const { items: wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const handleMoveToCart = (product) => {
    // Move to cart = Add to Cart + Remove from Wishlist
    // Note: We use toggleWishlist to remove because the backend handles the toggle logic
    dispatch(addToCart({ ...product, quantity: 1, size: product.sizes?.[0] || "US 9" }));
    dispatch(toggleWishlist(product.id));
  };

  const handleRemove = (id) => {
    dispatch(toggleWishlist(id));
  };

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-empty-container">
        <div className="wishlist-empty-content">
          <div className="empty-icon-wrapper">
            <FiHeart />
          </div>
          <h2>Your Wishlist is Empty</h2>
          <p>Save your favorite kicks here and buy them later.</p>
          <Link to="/collection" className="btn-explore-modern">
            Explore Collection <FiArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <header className="wishlist-header">
        <div className="header-content">
          <h1>My Wishlist</h1>
          <span className="wish-count">{wishlist.length} Saved Items</span>
        </div>
      </header>

      <div className="wishlist-grid">
        {wishlist.map((product) => (
          <div key={product.id} className="wishlist-card-modern">
            <Link to={`/${product.category}`} state={{ selectedProductId: product.id }} className="wish-img-modern">
              <img src={product.image} alt={product.name} />
              <div className="wish-overlay">
                <span>View Details</span>
              </div>
            </Link>

            <div className="wish-content-modern">
              <div className="wish-info-modern">
                <h3>{product.name}</h3>
                <p className="wish-price">{product.price}</p>
              </div>

              <div className="wish-actions-modern">
                <button
                  className="btn-action-cart"
                  onClick={() => handleMoveToCart(product)}
                  title="Move to Cart"
                >
                  Add to Cart
                </button>
                <button
                  className="btn-action-remove"
                  onClick={() => handleRemove(product.id)}
                  title="Remove from Wishlist"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}