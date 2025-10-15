import { useEffect, useState } from "react";
import "./ShowcaseHero.css";

export default function ShowcaseHero({ product }) {
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    setAnimKey((prev) => prev + 1); // triggers animation
  }, [product.id]);

  if (!product) return null;

  return (
    <section className="showcase-hero fade-slide" key={animKey}>
      <div className="hero-text">
        <p className="product-tagline">{product.tagline}</p>
        <h1 className="product-name">{product.name}</h1>
        <p className="product-occasion">Perfect for: {product.occasion}</p>
        <p className="product-trend">🔥 Trend Rating: {product.trend}</p>
        <button className="buy-btn">Buy Now</button>
      </div>

      <div className="hero-image">
        <img src={product.image} alt={product.name} />
      </div>
    </section>
  );
}
