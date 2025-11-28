import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../redux/wishlistSlice";
import { addToCart } from "../../features/cart/cartSlice";
import { Link } from "react-router-dom";
import { FiTrash2, FiShoppingCart } from "react-icons/fi";
import "./Wishlist.css";

export default function Wishlist() {
  const { items: wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const handleMoveToCart = (product) => {
    // Move to cart = Add to Cart + Remove from Wishlist
    dispatch(addToCart({ ...product, quantity: 1, size: product.sizes?.[0] || "US 9" }));
    dispatch(removeFromWishlist(product.id));
  };

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-empty">
        <h2>Your Wishlist is Empty</h2>
        <p>Save your favorite kicks here and buy them later.</p>
        <Link to="/collection" className="btn-explore">Explore Collection</Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <header className="wishlist-header">
        <h1>My Wishlist</h1>
        <span>{wishlist.length} Items</span>
      </header>

      <div className="wishlist-grid">
        {wishlist.map((product) => (
          <div key={product.id} className="wishlist-card">
            <Link to={`/${product.category}`} state={{ selectedProductId: product.id }} className="wish-img-wrapper">
              <img src={product.image} alt={product.name} />
            </Link>
            
            <div className="wish-content">
              <div className="wish-info">
                <h3>{product.name}</h3>
                <p className="wish-price">{product.price}</p>
              </div>
              
              <div className="wish-actions">
                <button 
                  className="btn-move-cart" 
                  onClick={() => handleMoveToCart(product)}
                  title="Move to Cart"
                >
                  <FiShoppingCart /> Add to Cart
                </button>
                <button 
                  className="btn-remove" 
                  onClick={() => dispatch(removeFromWishlist(product.id))}
                  title="Remove"
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