import { useEffect, useRef } from "react";
import "./ProductMiniCard.css";

export default function ProductMiniCard({ product, isSelected, onClick }) {
  const cardRef = useRef();

  useEffect(() => {
    if (isSelected && cardRef.current) {
      cardRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [isSelected]);

  return (
    <div
      ref={cardRef}
      className={`mini-card ${isSelected ? "selected" : ""}`}
      onClick={() => onClick(product)}
    >
      <img src={product.image} alt={product.name} />
      <p>{product.name}</p>
    </div>
  );
}
