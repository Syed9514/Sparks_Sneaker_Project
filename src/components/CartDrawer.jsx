import { useSelector, useDispatch } from "react-redux";
import {
  toggleCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "../app/cartSlice";
import Toast from "../components/toast/Toast.jsx";
import "./CartDrawer.css";

export default function CartDrawer() {
  const { isOpen, items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = items.reduce(
    (sum, item) => sum + item.quantity * parseFloat(item.price.slice(1)),
    0
  ).toFixed(2);

  return (
    <>
      <div className={`cart-overlay ${isOpen ? "show" : ""}`} onClick={() => dispatch(toggleCart())} />

      <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="back-icon" onClick={() => dispatch(toggleCart())}>
            <span>&larr;</span> Back
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">Your cart is empty.</div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>{item.price}</p>
                    <div className="qty-controls">
                      <button onClick={() => dispatch(decreaseQty(item.id))}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => dispatch(increaseQty(item.id))}>+</button>
                    </div>
                    <button className="remove-btn" onClick={() => dispatch(removeFromCart(item.id))}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">Total: ${total}</div>
              <button className="checkout-btn">Checkout</button>
            </div>
          </>
          
        )}
        {isOpen && <Toast />}

        
      </div>
    </>
  );
}
