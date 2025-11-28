import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart, reset as resetCart } from "../../features/cart/cartSlice";
import { createOrder, reset as resetOrders } from "../../features/orders/orderSlice";
import { getProducts } from "../../features/products/productSlice";
import { FiPlus, FiMinus, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import Loader from '../../components/animation/Loader';
import "./Dashboard.css";

const API_BASE_URL = 'http://localhost:5000';

export default function Dashboard() {
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { items: cartItems, isLoading: isCartLoading } = useSelector((state) => state.cart);
  const { isLoading: isOrderLoading, isSuccess: isOrderSuccess, isError, message } = useSelector((state) => state.orders);
  const navigate = useNavigate();


  useEffect(() => {
    if (isOrderSuccess) {
      alert('Order placed successfully!');
      setCoupon(""); setDiscount(0); setCouponMessage("");
      dispatch(resetCart());
      dispatch(resetOrders());
      dispatch(getProducts());
    }
    if (isError) {
      alert(`Order Failed: ${message}`);
      dispatch(resetOrders());
    }
  }, [isOrderSuccess, isError, message, dispatch]);

  // --- Calculations ---
  const subtotal = cartItems.reduce((sum, item) => {
    if (item.product && item.product.price) {
      // Safe parsing for prices like "$129"
      const price = parseFloat(item.product.price.toString().replace('$', '').replace(',', ''));
      return sum + (price * item.quantity);
    }
    return sum;
  }, 0);

  const tax = subtotal * 0.08;
  const total = subtotal + tax - discount;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "SAVE10") {
      setDiscount(subtotal * 0.1);
      setCouponMessage("10% discount applied!");
    } else {
      setDiscount(0);
      setCouponMessage("Invalid coupon code.");
    }
  };

  // --- FIXED HANDLERS ---

  const handleUpdateQuantity = (item, newQuantity) => {
    if (!item || !item.product) return;

    // 1. Stock Validation
    if (newQuantity > item.product.stock) {
        alert(`Sorry, only ${item.product.stock} items are in stock.`);
        return;
    }

    // 2. Minimum Limit (Prevent going below 1)
    if (newQuantity < 1) return; 

    // 3. Dispatch Update
    // CRITICAL FIX: We must explicitly map '_id' to 'id' for the backend service
    dispatch(addToCart({ 
      id: item.product._id,   // <--- FIX HERE
      quantity: newQuantity, 
      size: item.size 
    }));
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };
  
  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate("/payment");
    }
  };

  return (
    <div className="dashboard-page new-layout">
      
      {/* --- Left Column: Cart --- */}
      <section className="dash-left-column">
        <div className="profile-section-new">
          <img
            src={user && user.avatar ? `${API_BASE_URL}${user.avatar}` : `${API_BASE_URL}/uploads/avatars/default.png`}
            alt="User Avatar"
            className="profile-avatar-img"
          />
          <span className="profile-label">{user ? user.name : 'USER'}</span>
        </div>
        
        <hr className="divider" />

        <div className="cart-list-container">
          <div className="faded-title"><FiShoppingBag/></div>
          
          {isCartLoading ? <Loader /> : cartItems.length === 0 ? (
            <p className="empty-msg">Your cart is empty.</p>
          ) : (
            <div className="items-list cart-list-new">
              {cartItems.map((item) => (
                item.product ? (
                  <div key={`${item.product._id}-${item.size}`} className="cart-card-new">
                    <img src={item.product.image} alt={item.product.name} className="item-img-new" />
                    
                    <div className="item-details-new">
                      <span className="item-name-new">{item.product.name}</span>
                      
                      {/* --- FIX: Display the SELECTED size --- */}
                      <span className="item-size-tag">
                        Size: <strong>{item.size || 'N/A'}</strong>
                      </span>
                      
                      <span className="item-price-new">{item.product.price}</span>
                    </div>

                    <div className="quantity-controls-new">
                      <button 
                        onClick={() => handleUpdateQuantity(item, item.quantity - 1)} 
                        className="qty-btn-new"
                        disabled={item.quantity <= 1} // Disable minus if qty is 1
                      >
                        <FiMinus />
                      </button>
                      
                      <span className="quantity-new">{item.quantity}</span>
                      
                      <button 
                        onClick={() => handleUpdateQuantity(item, item.quantity + 1)} 
                        className="qty-btn-new"
                      >
                        <FiPlus />
                      </button>
                    </div>

                    {/* --- ADDED: Trash Button --- */}
                    <button 
                      className="trash-btn-new"
                      onClick={() => handleRemoveItem(item.product._id)}
                      title="Remove Item"
                    >
                      <FiTrash2 />
                    </button>

                  </div>
                ) : null
              ))}
            </div>
          )}
        </div>
      </section>

      {/* --- Right Column: Summary --- */}
      <aside className="dash-right-column">
        <div className="summary-panel-new">
          <h2 className="summary-title">SUMMARY</h2>
          <hr className="divider" />
          <div className="summary-top">
            <div className="summary-details">
              <div className="summary-line">
                <span>SubTotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-line">
                <span>Tax (8%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="summary-line discount">
                  <span>Discount:</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
            </div>
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
            {couponMessage && (
              <p className={`coupon-message ${discount > 0 ? 'success' : 'error'}`}>{couponMessage}</p>
            )}
          </div>
          <div className="summary-bottom">
            <div className="summary-line total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={cartItems.length === 0 || isOrderLoading || isCartLoading}
            >
              {isOrderLoading ? 'Processing...' : 'CheckOut'}
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}