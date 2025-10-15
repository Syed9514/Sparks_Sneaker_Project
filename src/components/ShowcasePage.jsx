import { useState } from "react";
import "./ShowcasePage.css";
import { FiHeart,FiShoppingCart } from 'react-icons/fi';
import { useDispatch } from "react-redux";
import { addToCart } from "../app/cartSlice";
import { toggleWishlist } from "../redux/wishlistSlice";

export default function ShowcasePage({ products }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);

  const product = products[selectedIndex];
  const dispatch = useDispatch();

  if (!product) return <div>No product found</div>;

  const handleAddToCart = () => {
    if (selectedSize) {
      dispatch(addToCart({ ...product, size: selectedSize, quantity: 1 }));
      alert(`${product.name} added to cart!`);
    } else {
      alert("Please select a size first.");
    }
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product));
    // Optional: Add a toast/alert for wishlist feedback
  };

  return (
    <div className="showcase-page">
      {/* -------- Top Section (70vh) -------- */}
      <div className="showcase-top">
        {/* Left Column: Image and Action Buttons */}
        <div className="showcase-left">
          <div className="image-container" >
          <div className="circle-bg" style={{ borderColor: product.themeColor }} />
            <img
              src={product.image}
              alt={product.name}
              className="sneaker-img"
            />
          </div>
          <div className="action-buttons">
            <button className="action-btn" onClick={handleToggleWishlist}><FiHeart size={24}/></button>
            <button className="action-btn" onClick={handleAddToCart}><FiShoppingCart size={24}/></button>
          </div>
        </div>

        {/* Right Column: Product Details and Options */}
        <div className="showcase-right">
          <h2 className="product-name-title">{product.name}</h2>
          
          <div className="category-tags">
            {/* Using product.occasion and adding static tags for demo */}
            <span className="tag">{product.occasion[0]}</span>
            <span className="tag">{product.occasion[1]}</span>
            <span className="tag">{product.occasion[2]}</span>
          </div>

          <div className="info-box trend-offers-box">
            <div className="info-line">
              <span>Trend Rate</span>
              <div className="trend-bar">
                <div className="trend-fill" style={{ width: `${product.trendValue}%`,backgroundColor: product.themeColor }} />
              </div>
            </div>
            <div className="info-line offers-line">
              <span>Offers</span>
              <p>{product.offers[0]}</p> {/* Displaying first offer */}
            </div>
          </div>

          <div className="info-box size-box">
            <h3>Select Size</h3>
            <div className="size-selector">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? "active" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* -------- Bottom Section (30vh) -------- */}
      <div className="showcase-bottom">
        {products.map((p, idx) => (
          <div
            key={p.id}
            className={`thumb ${idx === selectedIndex ? "active" : ""}`}
            onClick={() => {
              setSelectedIndex(idx);
              setSelectedSize(null); // Reset size on product change
            }}
          >
            <img src={p.image} alt={p.name} />
          </div>
        ))}
      </div>
    </div>
  );
}