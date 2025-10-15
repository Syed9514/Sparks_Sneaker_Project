import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { removeFromCart, increaseQty, decreaseQty } from "../../app/cartSlice";
import { removeFromWishlist } from "../../redux/wishlistSlice";
import "./Dashboard.css";

const API_BASE_URL = 'http://localhost:5000';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const wishlist = useSelector((state) => state.wishlist.items);
  const cart = useSelector((state) => state.cart.items);

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const subtotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return sum + (price * item.quantity);
  }, 0);
  const total = subtotal - discount;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "SAVE10") {
      setDiscount(subtotal * 0.1); // 10% off
      setCouponMessage("10% discount applied!");
    } else {
      setDiscount(0);
      setCouponMessage("Invalid coupon code");
    }
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleRemoveFromWishlist = (itemId) => {
    dispatch(removeFromWishlist(itemId));
  };

  const handleIncreaseQty = (itemId) => {
    dispatch(increaseQty(itemId));
  };

  const handleDecreaseQty = (itemId) => {
    dispatch(decreaseQty(itemId));
  };

  const showToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage("");
      setToastType("");
    }, 3000);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      showToast("Your cart is empty!", "error");
      return;
    }
    const purchase = {
      id: Date.now(),
      items: [...cart],
      total: total,
      date: new Date().toLocaleDateString(),
    };
    setPurchaseHistory(prev => [purchase, ...prev]);
    cart.forEach(item => {
      dispatch(removeFromCart(item.id));
    });
    setCoupon("");
    setDiscount(0);
    setCouponMessage("");
    showToast("Purchase completed successfully!", "success");
  };

  return (
    <div className="dashboard-page">
      {/* COLUMN 1: Wishlist Sidebar (25vw) */}
      <div className="wishlist-column">
        {/* --- UPDATE THIS SECTION --- */}
        <div className="profile-section">
          {user ? (
            <img src={`${API_BASE_URL}${user.avatar}`} alt="User Avatar" className="profile-avatar-img"/>
          ) : (
            <div className="profile-avatar"></div>
          )}
          <span className="profile-label">{user ? user.name : 'USER'}</span>
        </div>
        <h2 className="wishlist-header">WishList</h2>
        {wishlist.length === 0 ? (
          <p className="empty-msg">No wishlist items</p>
        ) : (
          <div className="items-list wishlist-list">
            {wishlist.map((item) => (
              <div key={item.id} className="dash-item wishlist-card">
                <img src={item.image} alt={item.name} className="item-img" />
                <div className="item-details">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">{item.price}</span>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveFromWishlist(item.id)}
                  title="Remove from wishlist"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* COLUMN 2: Main Dashboard Area (65vw) */}
      <div className="main-content-column">
        <div className="main-content-header">
          <h1>Cart</h1>
        </div>
        <div className="main-content-body">
          {/* Left Box: Cart Panel (~65%) */}
          <div className="cart-panel">
            {cart.length === 0 ? (
              <p className="empty-msg">Your cart is empty.</p>
            ) : (
              <div className="items-list cart-list">
                {cart.map((item) => (
                  <div key={item.id} className="dash-item cart-card">
                    <img src={item.image} alt={item.name} className="item-img" />
                    <div className="item-details-main">
                      <span className="item-name">{item.name}</span>
                      {/* Size is added as per the wireframe */}
                      <span className="item-size">SIZE: {item.size}</span>
                    </div>
                    <div className="quantity-controls">
                      <button onClick={() => handleIncreaseQty(item.id)} className="qty-btn">+</button>
                      <span className="quantity">{item.quantity}</span>
                      <button onClick={() => handleDecreaseQty(item.id)} className="qty-btn">-</button>
                    </div>
                    <button className="remove-btn" onClick={() => handleRemoveFromCart(item.id)} title="Remove from cart">✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Box: History + Summary Panel (~35%) */}
          <div className="history-summary-column">
            <div className="purchase-history-panel">
              <h3>Purchase History</h3>
              <div className="purchase-history-list">
                 {purchaseHistory.length === 0 ? (
                    <p className="empty-msg">No purchase history.</p>
                ) : (
                    purchaseHistory.slice(0, 3).map((purchase) => ( // Show recent 3
                        <div key={purchase.id} className="purchase-history-item">
                            <span>Order on {purchase.date}</span>
                            <span>${purchase.total.toFixed(2)}</span>
                        </div>
                    ))
                )}
              </div>
            </div>
            <div className="summary-panel">
              <div className="summary-line">
                <span>SubTotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-line">
                <span>Tax:</span>
                <span>${(subtotal * 0.08).toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="summary-line discount">
                  <span>Discount:</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
               <div className="coupon-section">
                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="coupon-input"
                />
                <button onClick={applyCoupon} className="apply-coupon-btn">Apply</button>
              </div>
              <div className="summary-line total">
                <span>Total:</span>
                <span>${(total + subtotal * 0.08).toFixed(2)}</span>
              </div>
              <button
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={cart.length === 0}
              >
                CheckOut
              </button>
              {couponMessage && (
                  <p className={`coupon-message ${discount > 0 ? 'success' : 'error'}`}>{couponMessage}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Toast Message */}
      {toastMessage && (
        <div className={`toast ${toastType}`}>{toastMessage}</div>
      )}
    </div>
  );
}