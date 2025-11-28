import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearNotification } from "../../app/cartSlice";
import "./Toast.css";

export default function Toast() {
  const message = useSelector(state => state.cart.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearNotification());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  if (!message) return null;

  return <div className="toast">{message}</div>;
}
