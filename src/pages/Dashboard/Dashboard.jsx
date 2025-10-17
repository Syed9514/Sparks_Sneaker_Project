import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart, reset as resetCart } from "../../features/cart/cartSlice";
import { createOrder, getMyOrders, reset as resetOrders } from "../../features/orders/orderSlice";
import "./Dashboard.css";

const API_BASE_URL = 'http://localhost:5000';

export default function Dashboard() {
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => state.auth);
  const { items: cartItems, isLoading: isCartLoading } = useSelector((state) => state.cart);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { orders, isLoading: isOrderLoading, isSuccess: isOrderSuccess } = useSelector((state) => state.orders);

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  // Fetch order history when the component mounts
  useEffect(() => {
    dispatch(getMyOrders());
    return () => {
      dispatch(resetOrders());
    }
  }, [dispatch]);

  // Alert user on successful order and reset cart
  useEffect(() => {
    if (isOrderSuccess) {
      alert('Order placed successfully!');
      dispatch(resetCart());
      dispatch(resetOrders());
      // Re-fetch orders to update the history
      dispatch(getMyOrders());
    }
  }, [isOrderSuccess, dispatch]);

  const subtotal = cartItems.reduce((sum, item) => {
    if (item.product && item.product.price) {
      const price = parseFloat(item.product.price.replace('$', ''));
      return sum + (price * item.quantity);
    }
    return sum;
  }, 0);
  
  const tax = subtotal * 0.08;
  const total = subtotal + tax - discount;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "SAVE10") {
      setDiscount(subtotal * 0.1); // 10% off
    } else {
      setDiscount(0);
    }
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (item, newQuantity) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart(item.product.id));
    } else {
      const updatedItem = { ...item.product, quantity: newQuantity };
      dispatch(addToCart(updatedItem));
    }
  };

  const handleCheckout = () => {
    const orderData = {
      orderItems: cartItems.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        image: item.product.image,
        price: item.product.price,
        product: item.product._id, // Send only the product ID
      })),
      totalPrice: total,
    };
    dispatch(createOrder(orderData));
  };

  return (
    <div className="dashboard-page">
      {/* COLUMN 1: Wishlist Sidebar */}
      <div className="wishlist-column">
        <div className="profile-section">
          <img 
            src={user ? `${API_BASE_URL}${user.avatar}` : `${API_BASE_URL}/uploads/avatars/default.png`} 
            alt="User Avatar" 
            className="profile-avatar-img"
          />
          <span className="profile-label">{user ? user.name : 'Guest'}</span>
        </div>
        <h2 className="wishlist-header">WishList</h2>
        {wishlistItems.length === 0 ? (
          <p className="empty-msg">No wishlist items</p>
        ) : (
          <div className="items-list wishlist-list">
            {wishlistItems.map((item) => (
              <div key={item._id} className="dash-item wishlist-card">
                <img src={item.image} alt={item.name} className="item-img" />
                <div className="item-details">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* COLUMN 2: Main Dashboard Area */}
      <div className="main-content-column">
        <div className="main-content-header"><h1>Cart</h1></div>
        <div className="main-content-body">
          {/* Cart Panel */}
          <div className="cart-panel">
            {isCartLoading ? <p>Loading Cart...</p> : cartItems.length === 0 ? (
              <p className="empty-msg">Your cart is empty.</p>
            ) : (
              <div className="items-list cart-list">
                {cartItems.map((item) => (
                  <div key={item.product._id} className="dash-item cart-card">
                    <img src={item.product.image} alt={item.product.name} className="item-img" />
                    <div className="item-details-main">
                      <span className="item-name">{item.product.name}</span>
                      <span className="item-info">Price: {item.product.price}</span>
                    </div>
                    <div className="quantity-controls">
                      <button onClick={() => handleUpdateQuantity(item, item.quantity - 1)} className="qty-btn">-</button>
                      <span className="quantity">{item.quantity}</span>
                      <button onClick={() => handleUpdateQuantity(item, item.quantity + 1)} className="qty-btn">+</button>
                    </div>
                    <button className="remove-btn" onClick={() => handleRemoveFromCart(item.product.id)} title="Remove from cart">✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* History & Summary Panel */}
          <div className="history-summary-column">
            <div className="purchase-history-panel">
              <h3>Purchase History</h3>
              {isOrderLoading && !orders.length ? <p>Loading history...</p> : orders.length === 0 ? (
                <p className="empty-msg">No purchase history yet.</p>
              ) : (
                <div className="purchase-history-list">
                  {orders.map(order => (
                    <div key={order._id} className="purchase-history-item">
                      <span>Order on {new Date(order.createdAt).toLocaleDateString()}</span>
                      <span>${order.totalPrice.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="summary-panel">
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
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={cartItems.length === 0 || isOrderLoading}
              >
                {isOrderLoading ? 'Placing Order...' : 'Checkout'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}