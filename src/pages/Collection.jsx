import sneakerData from "../data/sneakerData";
import ProductCard from "../components/ProductCard";
import "./Collection.css";

export default function Collection() {
  return (
    <section className="collection">
      <h2>Our Collections</h2>
      <div className="grid">
        {sneakerData.map((sneaker) => (
          <ProductCard key={sneaker.id} sneaker={sneaker} />
        ))}
      </div>
    </section>
  );
}
