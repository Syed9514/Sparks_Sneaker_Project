import { useSelector, useDispatch } from 'react-redux';
import { toggleShoppingPanel } from '../features/ui/uiSlice';
import { FiShoppingBag } from 'react-icons/fi';
import './FloatingBagIcon.css';

export default function FloatingBagIcon() {
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state) => state.cart);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <button className="floating-bag-btn" onClick={() => dispatch(toggleShoppingPanel())}>
      {cartCount > 0 && (
        <span className="floating-bag-badge">{cartCount}</span>
      )}
      <FiShoppingBag size={24} />
    </button>
  );
}