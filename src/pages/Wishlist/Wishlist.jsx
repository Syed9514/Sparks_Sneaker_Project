import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../redux/wishlistSlice";
import "./Wishlist.css";

export default function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const [flippedIndex, setFlippedIndex] = useState(null);

  const handleFlip = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  const handleBuyNow = (product) => {
    alert(`Buying ${product.name}!`); // Replace with actual add-to-cart logic later
  };

  if (wishlist.length === 0) {
    return <p className="empty-msg">Your wishlist is empty.</p>;
  }

  return (
    <div className="wishlist-page">
      <h2 className="wishlist-header">Your Wishlist</h2>
      <div className="wishlist-grid">
        {wishlist.map((product, index) => (
          <div
            key={product.id}
            className={`flip-card ${flippedIndex === index ? "flipped" : ""}`}
            onClick={() => handleFlip(index)}
          >
            <div className="flip-inner">
              {/* Front Side */}
              <div className="flip-front">
                <img src={product.image} alt={product.name} />
                <h4>{product.name}</h4>
              </div>

              {/* Back Side */}
              <div className="flip-back">
                <h4>{product.name}</h4>
                <button
                  className="wish-buy-btn"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent flipping back immediately
                    handleBuyNow(product);
                  }}
                >
                  Buy Now
                </button>
                <button
                  className="wish-remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(removeFromWishlist(product.id));
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
