import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart, reset as resetCart } from "../../features/cart/cartSlice";
import { createOrder, reset as resetOrders } from "../../features/orders/orderSlice";
import { getProducts } from "../../features/products/productSlice";
import { FiPlus, FiMinus, FiTrash2, FiArrowLeft, FiShoppingBag } from 'react-icons/fi';
import Loader from '../../components/animation/Loader';
import { useToast } from "../../context/ToastContext";
import { COUPONS } from "../../constants/coupons";
import "./Dashboard.css";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  const { items: cartItems, isLoading: isCartLoading } = useSelector((state) => state.cart);
  const { isLoading: isOrderLoading, isSuccess: isOrderSuccess, isError, message } = useSelector((state) => state.orders);

  useEffect(() => {
    if (isOrderSuccess) {
      showToast('Order placed successfully!', 'success');
      setCoupon(""); setDiscount(0); setCouponMessage("");
      dispatch(resetCart());
      dispatch(resetOrders());
      dispatch(getProducts());
    }
    if (isError) {
      showToast(`Order Failed: ${message}`, 'error');
      dispatch(resetOrders());
    }
  }, [isOrderSuccess, isError, message, dispatch, showToast]);

  const subtotal = cartItems.reduce((sum, item) => {
    if (item.product && item.product.price) {
      const price = parseFloat(item.product.price.toString().replace('$', '').replace(',', ''));
      return sum + (price * item.quantity);
    }
    return sum;
  }, 0);

  const tax = subtotal * 0.08;
  const total = subtotal + tax - discount;

  const applyCoupon = () => {
    const foundCoupon = COUPONS.find(c => c.code === coupon.toUpperCase());

    if (foundCoupon && foundCoupon.discountType === 'percent') {
      setDiscount(subtotal * foundCoupon.value);
      setCouponMessage(`${foundCoupon.description} Applied!`);
      showToast(`${foundCoupon.description} Applied!`, "success");
    } else if (foundCoupon) {
      // Handle other types if needed (e.g. shipping)
      setDiscount(0);
      setCouponMessage("Coupon condition not met.");
      showToast("Coupon condition not met.", "error");
    } else {
      setDiscount(0);
      setCouponMessage("Invalid Coupon Code");
      showToast("Invalid Coupon Code", "error");
    }
  };

  const handleUpdateQuantity = (item, newQuantity) => {
    if (!item?.product) return;
    if (newQuantity > item.product.stock) {
      showToast(`Only ${item.product.stock} left in stock.`, 'error');
      return;
    }
    if (newQuantity < 1) return;

    dispatch(addToCart({
      id: item.product.id,
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

  if (isCartLoading) return <Loader />;

  return (
    <div className="cart-page">
      <div className="cart-container">

        <div className="cart-content-grid">

          {/* Left Column: Cart Items */}
          <section className="cart-items-column">
            <h1 className="page-title">Your Cart</h1>

            {cartItems.length === 0 ? (
              <div className="empty-cart-state">
                <div className="empty-cart-icon-wrapper">
                  <FiShoppingBag />
                </div>
                <p>Your cart is currently empty.</p>
                <button onClick={() => navigate("/collection")}>Start Shopping</button>
              </div>
            ) : (
              <div className="cart-list">
                {cartItems.map((item) => (
                  item.product && (
                    <div key={`${item.product.id}-${item.size}`} className="cart-item-card">
                      <div className="item-image">
                        <img src={item.product.image} alt={item.product.name} />
                      </div>

                      <div className="item-info">
                        <h3>{item.product.name}</h3>
                        <p className="item-size">Size: {item.size}</p>

                        <div className="item-actions">
                          <div className="qty-selector">
                            <button onClick={() => handleUpdateQuantity(item, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => handleUpdateQuantity(item, item.quantity + 1)}>+</button>
                          </div>
                        </div>
                      </div>

                      <div className="item-pricing">
                        <span className="price-tag">{item.product.price}</span>
                        <button className="remove-icon" onClick={() => handleRemoveItem(item.product.id)}>
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  )
                ))}
              </div>
            )}

            {cartItems.length > 0 && (
              <button className="continue-shopping-link" onClick={() => navigate("/collection")}>
                <FiArrowLeft /> Continue Shopping
              </button>
            )}
          </section>

          {/* Right Column: Order Summary */}
          {cartItems.length > 0 && (
            <aside className="order-summary-column">
              <div className="summary-card">
                <h2>Order Summary</h2>

                <div className="summary-line">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-line">
                  <span>Estimated Shipping</span>
                  <span>Free</span>
                </div>
                <div className="summary-line">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="summary-line discount">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="divider"></div>

                <div className="summary-total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button className="checkout-btn" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>

                {/* Optional Promo Code Input */}
                <div className="promo-section">
                  <input
                    type="text"
                    placeholder="Promo Code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <button onClick={applyCoupon}>Apply</button>
                </div>
                {couponMessage && <p className="promo-message">{couponMessage}</p>}

              </div>
            </aside>
          )}

        </div>
      </div>
    </div>
  );
}