// ProductSlider.jsx
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
// <-- Import new icons -->
import { FiHeart, FiArrowRight } from "react-icons/fi";
import sneakerData from "../data/sneakerData";
import "./ProductSlider.css";

export default function ProductSlider() {
  const [showButton, setShowButton] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [selected, setSelected] = useState([]);
  const lastCardRef = useRef();

  const getRandomItems = (arr, n) => {
    const copy = [...arr];
    const result = [];
    const limit = Math.min(n, copy.length);
    for (let i = 0; i < limit; i++) {
      const idx = Math.floor(Math.random() * copy.length);
      result.push(copy.splice(idx, 1)[0]);
    }
    return result;
  };

  useEffect(() => {
    const picks = getRandomItems(sneakerData, 3);
    setSelected(picks);
  }, []);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(stored);
    const event = new CustomEvent("wishlistUpdated", { detail: stored });
    window.dispatchEvent(event);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowButton(entry.isIntersecting),
      { root: null, threshold: 0.9 }
    );
    if (lastCardRef.current) observer.observe(lastCardRef.current);
    return () => observer.disconnect();
  }, [selected]);

  const toggleWishlist = (productId) => {
    let updated;
    if (wishlist.includes(productId)) {
      updated = wishlist.filter((id) => id !== productId);
    } else {
      updated = [...wishlist, productId];
    }
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    const event = new CustomEvent("wishlistUpdated", { detail: updated });
    window.dispatchEvent(event);
  };

  return (
    <section className="slider-container">
      <h2 className="slider-title">Trending Now</h2>

      <div className="slider-wrapper">
        <div className="slider-track">
          {selected.map((sneaker, index) => (
            // <-- The entire card is now a link to the product's category page -->
            <Link 
              to={`/${sneaker.category}`} 
              className="slider-card"
              key={sneaker.id}
              ref={index === selected.length - 1 ? lastCardRef : null}
            >
              <div className="card-image-container">
                <img src={sneaker.image} alt={sneaker.name} />
              </div>

              <div className="card-info-container">
                <div className="card-actions">
                  <button 
                    className="action-btn" 
                    onClick={(e) => {
                      e.preventDefault(); // Prevent link navigation
                      toggleWishlist(sneaker.id);
                    }}
                    title="Add to Wishlist"
                  >
                    <FiHeart className={wishlist.includes(sneaker.id) ? "heart-icon active" : "heart-icon"} size={22}/>
                  </button>
                  {/* The "Explore" button is now handled by the main card link */}
                </div>
                <div className="card-text">
                  <h4>{sneaker.name}</h4>
                  <p>{sneaker.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {showButton && (
          <Link to="/collection" className="floating-view-btn" title="View All">
            <FiArrowRight />
          </Link>
        )}
      </div>
    </section>
  );
}