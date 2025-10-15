import { useDispatch } from "react-redux";
import { useState } from "react";
import { addToCart } from "../app/cartSlice";
import { FiHeart } from "react-icons/fi";
import "./ProductCard.css";

export default function ProductCard({ sneaker }) {
  const dispatch = useDispatch();
  const [tilt, setTilt] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const handleCardClick = () => {
    setTilt(true);
    setTimeout(() => setTilt(false), 350);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    setWishlisted((prev) => !prev);
  };

  return (
    <div
      className={`card${tilt ? " tilt" : ""}`}
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      style={{ outline: "none" }}
    >
      <div className="card-img-wrapper">
        <img
          src={sneaker.image}
          alt={sneaker.name}
          className={`card-img${tilt ? " tilt-img" : ""}`}
        />
        <div className="wishlist-icon" onClick={handleWishlist}>
          <FiHeart className={wishlisted ? "heart-icon active" : "heart-icon"} />
        </div>
        {sneaker.trending && <span className="badge">🔥 Trending</span>}
      </div>
      <div className="card-info">
        <h3>{sneaker.name}</h3>
        <p>{sneaker.price}</p>
        <button
          className="buy-btn"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(addToCart(sneaker));
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

