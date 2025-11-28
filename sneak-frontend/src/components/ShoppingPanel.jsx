import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart } from '../features/cart/cartSlice';
import { toggleWishlist } from '../features/wishlist/wishlistSlice';
import { getMyOrders } from '../features/orders/orderSlice'; // Import action to fetch orders
import { closeShoppingPanel } from '../features/ui/uiSlice';
import { FiX, FiShoppingCart, FiHeart, FiClock } from 'react-icons/fi';
import './ShoppingPanel.css';
import Loader from './animation/Loader';

export default function ShoppingPanel() {
  const [activeTab, setActiveTab] = useState('cart'); // cart, wishlist, or history
  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.ui.isShoppingPanelOpen);
  const { items: cartItems } = useSelector((state) => state.cart);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  // Get order data from the Redux store
  const { orders, isLoading: isOrderLoading } = useSelector((state) => state.orders);

  // --- BUG FIX: Parse $ (dollar) not ₹ (rupee) ---
  const subtotal = cartItems.reduce((sum, item) => {
    if (item.product?.price) {
      const price = parseFloat(item.product.price.replace('$', '').replace(',', ''));
      return sum + (price * item.quantity);
    }
    return sum;
  }, 0);

  // --- NEW: Fetch orders only when history tab is clicked ---
  useEffect(() => {
    if (activeTab === 'history' && orders.length === 0) {
      dispatch(getMyOrders());
    }
  }, [activeTab, orders, dispatch]);

  const handleClose = () => dispatch(closeShoppingPanel());
  const handleCheckoutClick = () => dispatch(closeShoppingPanel());
  const handleRemoveWishlist = (id) => dispatch(toggleWishlist(id));

  return (
    <>
      {isOpen && <div className="overlay" onClick={handleClose}></div>}
      <aside className={`shopping-panel ${isOpen ? "open" : ""}`}>
        <div className="shopping-panel-header">
          {/* --- UPDATED: 3-Tab Toggle --- */}
          <div className="panel-toggle">
            <button 
              className={`toggle-btn ${activeTab === 'cart' ? 'active' : ''}`}
              onClick={() => setActiveTab('cart')}
              title="Cart"
            >
              <FiShoppingCart /> <span>Cart ({cartItems.length})</span>
            </button>
            <button 
              className={`toggle-btn ${activeTab === 'wishlist' ? 'active' : ''}`}
              onClick={() => setActiveTab('wishlist')}
              title="Wishlist"
            >
              <FiHeart /> <span>Wishlist ({wishlistItems.length})</span>
            </button>
            <button 
              className={`toggle-btn ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
              title="History"
            >
              <FiClock /> <span>History</span>
            </button>
          </div>
          <button className="close-btn" onClick={handleClose}>
            <FiX size={24} />
          </button>
        </div>
        
        <div className="shopping-panel-body">
          {/* --- Cart Content --- */}
          {activeTab === 'cart' && (
            cartItems.length === 0 ? (
              <div className="panel-empty"><p>Your cart is empty.</p></div>
            ) : (
              <div className="panel-list">
                {cartItems.map((item) => (
                  item.product ? (
                    <div key={item.product._id + item.size} className="panel-item-card">
                      {/* --- BUG FIX: Image path is relative --- */}
                      <img src={item.product.image} alt={item.product.name} className="item-card-img" />
                      <div className="item-card-info">
                        <span className="item-name">{item.product.name}</span>
                        <span className="item-size">Size: {item.size}</span>
                        <span className="item-price">{item.quantity} x {item.product.price}</span>
                      </div>
                      <button className="remove-btn" onClick={() => dispatch(removeFromCart(item.product.id))}>
                        <FiX />
                      </button>
                    </div>
                  ) : null
                ))}
              </div>
            )
          )}

          {/* --- Wishlist Content --- */}
          {activeTab === 'wishlist' && (
            wishlistItems.length === 0 ? (
              <div className="panel-empty"><p>Your wishlist is empty.</p></div>
            ) : (
              <div className="panel-list">
                {wishlistItems.map((item) => (
                  <Link 
                    to={`/${item.category}`} 
                    state={{ selectedProductId: item.id }} 
                    className="panel-item-card" 
                    key={item._id}
                    onClick={handleClose}
                  >
                    {/* --- BUG FIX: Image path is relative --- */}
                    <img src={item.image} alt={item.name} className="item-card-img" />
                    <div className="item-card-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-price">{item.price}</span>
                    </div>
                    <button className="remove-btn" onClick={(e) => {
                      e.preventDefault();
                      handleRemoveWishlist(item.id);
                    }}>
                      <FiX />
                    </button>
                  </Link>
                ))}
              </div>
            )
          )}

          {/* --- NEW: Purchase History Content --- */}
          {activeTab === 'history' && (
            isOrderLoading ? <Loader /> : orders.length === 0 ? (
              <div className="panel-empty"><p>You have no past orders.</p></div>
            ) : (
              <div className="panel-list">
                {orders.slice().reverse().map((order) => (
                  <div key={order._id} className="panel-item-card history">
                    <div className="item-card-info">
                      <span className="item-name">Order on {new Date(order.createdAt).toLocaleDateString()}</span>
                      <span className="item-price">{order.totalPrice.toFixed(2)}</span>
                    </div>
                    {/* You could add a button to view order details later */}
                  </div>
                ))}
              </div>
            )
          )}
        </div>
        
        {/* Footer: Only shows for Cart tab */}
        {activeTab === 'cart' && (
          <div className="shopping-panel-footer">
            <div className="subtotal-line">
              <span>Subtotal:</span>
              {/* --- BUG FIX: Use $ --- */}
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <Link to="/dashboard" className="checkout-btn-drawer" onClick={handleCheckoutClick}>
              Proceed to Checkout
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}