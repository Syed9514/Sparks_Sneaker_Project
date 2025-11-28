import "./ProductScrollRow.css";
import ProductMiniCard from "./ProductMiniCard";

export default function ProductScrollRow({ products, selectedId, onSelect }) {
  return (
    <div className="product-scroll-row">
      {products.map((product) => (
        <ProductMiniCard
          key={product.id}
          product={product}
          isSelected={product.id === selectedId}
          onClick={onSelect}
        />
      ))}
    </div>
  );
}
