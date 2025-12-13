import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder, reset } from "../../features/orders/orderSlice";
import { reset as resetCart } from "../../features/cart/cartSlice";
import { FiCreditCard, FiLock, FiCheckCircle, FiAlertTriangle, FiArrowLeft } from "react-icons/fi";
import { FaCcVisa, FaCcMastercard, FaPaypal, FaApplePay } from "react-icons/fa";
import { useToast } from "../../context/ToastContext";
import "./Payment.css";

export default function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const { items: cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { isSuccess, isError, message } = useSelector((state) => state.orders);

  // SAFEGUARD: Filter out items where product is null (e.g. deleted product still in local cart)
  const validCartItems = cartItems.filter(item => item && item.product);

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Calculate Total again for display
  const subtotal = validCartItems.reduce((sum, item) => {
    if (item.product?.price) {
      const price = parseFloat(item.product.price.toString().replace('$', '').replace(',', ''));
      return sum + (price * item.quantity);
    }
    return sum;
  }, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  // Handle Order Completion
  useEffect(() => {
    if (isSuccess) {
      // Redirect to a success page or back to dashboard after delay
      setTimeout(() => {
        dispatch(resetCart());
        dispatch(reset());
        showToast("Payment Successful! Order Placed.", "success");
        navigate("/dashboard");
      }, 1000);
    }
    if (isError) {
      setIsProcessing(false);
      showToast(message, "error");
    }
  }, [isSuccess, isError, message, navigate, dispatch, showToast]);

  const handlePay = () => {
    setIsProcessing(true);

    // SIMULATE PAYMENT DELAY (2 seconds)
    setTimeout(() => {
      // After "payment" is done, actually create the order in backend
      const orderData = {
        orderItems: validCartItems.map(item => ({
          name: item.product.name,
          quantity: item.quantity,
          image: item.product.image,
          price: parseFloat(item.product.price.toString().replace('$', '')),
          product: item.product._id,
          size: item.size,
        })),
        totalPrice: total,
      };

      dispatch(createOrder(orderData));
    }, 2000);
  };

  if (validCartItems.length === 0) {
    return (
      <div className="payment-empty">
        <h2>No items to checkout.</h2>
        <button onClick={() => navigate("/")}>Go Shopping</button>
      </div>
    );
  }

  return (
    <div className="payment-page">

      {/* --- SECURITY BANNER --- */}
      <div className="demo-banner">
        <FiAlertTriangle />
        <span><strong>DEMO MODE:</strong> No real money will be charged. This is a portfolio project.</span>
      </div>

      <div className="payment-actions-top">
        <button className="btn-back-dashboard" onClick={() => navigate('/dashboard')}>
          <FiArrowLeft /> Back to Dashboard
        </button>
      </div>

      <div className="payment-container">

        {/* LEFT: Form */}
        <div className="payment-form-section">
          <div className="section-header">
            <h2>Checkout</h2>
            <div className="secure-badge"><FiLock /> Secure Encrypted</div>
          </div>

          <div className="payment-tabs">
            <button
              className={paymentMethod === "card" ? "active" : ""}
              onClick={() => setPaymentMethod("card")}
            >
              <FiCreditCard /> Card
            </button>
            <button
              className={paymentMethod === "paypal" ? "active" : ""}
              onClick={() => setPaymentMethod("paypal")}
            >
              <FaPaypal /> PayPal
            </button>
            <button
              className={paymentMethod === "apple" ? "active" : ""}
              onClick={() => setPaymentMethod("apple")}
            >
              <FaApplePay /> Apple Pay
            </button>
          </div>

          {paymentMethod === "card" && (
            <div className="card-form">
              <div className="card-preview">
                <div className="chip"></div>
                <div className="logo"><FaCcVisa size={30} /></div>
                <div className="number">4242 4242 4242 4242</div>
                <div className="name">{user?.name?.toUpperCase() || "YOUR NAME"}</div>
                <div className="expiry">12/28</div>
              </div>

              <div className="input-row">
                <div className="field full">
                  <label>Cardholder Name</label>
                  <input type="text" value={user?.name || ""} readOnly className="readonly-input" />
                </div>
              </div>
              <div className="input-row">
                <div className="field full">
                  <label>Card Number</label>
                  <input type="text" value="•••• •••• •••• 4242" readOnly className="readonly-input" />
                  <FiLock className="field-icon" />
                </div>
              </div>
              <div className="input-row">
                <div className="field">
                  <label>Expiry</label>
                  <input type="text" value="12 / 28" readOnly className="readonly-input" />
                </div>
                <div className="field">
                  <label>CVC</label>
                  <input type="text" value="•••" readOnly className="readonly-input" />
                </div>
              </div>
            </div>
          )}

          {/* Alternative Methods Message */}
          {paymentMethod !== "card" && (
            <div className="alt-method-msg">
              <p>You will be redirected to {paymentMethod === "paypal" ? "PayPal" : "Apple Pay"} to complete your purchase securely.</p>
            </div>
          )}

          <button
            className={`pay-btn ${isProcessing ? "processing" : ""}`}
            onClick={handlePay}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <span className="spinner"></span>
            ) : (
              <>Pay ${total.toFixed(2)}</>
            )}
          </button>
        </div>

        {/* RIGHT: Summary */}
        <div className="payment-summary">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {validCartItems.map(item => (
              <div key={item.product._id + item.size} className="mini-item">
                <div className="mini-img-wrapper">
                  <img src={item.product.image} alt={item.product.name} />
                  <span className="mini-qty">{item.quantity}</span>
                </div>
                <div className="mini-info">
                  <h4>{item.product.name}</h4>
                  <p>Size: {item.size}</p>
                </div>
                <span className="mini-price">{item.product.price}</span>
              </div>
            ))}
          </div>
          <div className="mini-totals">
            <div className="row"><span>Subtotal</span> <span>${subtotal.toFixed(2)}</span></div>
            <div className="row"><span>Tax</span> <span>${tax.toFixed(2)}</span></div>
            <div className="row total"><span>Total</span> <span>${total.toFixed(2)}</span></div>
          </div>
        </div>

      </div>
    </div>
  );
}