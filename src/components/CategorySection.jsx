import { Link } from "react-router-dom";
import "./CategorySection.css";

const categories = [
  {
    name: "Men",
    image: "/assets/categories/men.png", // update paths accordingly
    path: "/men",
  },
  {
    name: "Women",
    image: "/assets/categories/women.png",
    path: "/women",
  },
  {
    name: "Kids",
    image: "/assets/categories/kid.png",
    path: "/kids",
  },
];

export default function CategorySection() {
  return (
    <section className="category-section">
      <h2 className="category-title">Shop by Category</h2>
      <br/>
      <div className="category-scroll">
        {categories.map((cat) => (
          <Link to={cat.path} key={cat.name} className="category-card" style={{ backgroundImage: `url(${cat.image})` }}>
            <div className="category-overlay">
              <h3>{cat.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
