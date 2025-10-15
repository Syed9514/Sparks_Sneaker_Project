import "./HomeHero.css";
import SplitText from "../components/textanimations/SplitText";
import { FiSearch,FiShoppingBag } from 'react-icons/fi';
// You can change this image to the purple shoe from your design
const productImage = "assets/shoe6-nobg.png"; 

export default function HomeHero() {
  return (
    <div className="hero-container">
      {/* --- Left Column: Contains all text and buttons --- */}
      <div className="hero-text-column">
        <div className="hero-logo">@Syed's</div>
        <div className="hero-title">
          <SplitText
            text="STEP INTO STYLE!"
            // Props for the animation component
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
          />
        </div>
        <div className="hero-subtitle">
          Sneakers built for the moment, designed for culture.
        </div>
        <div className="hero-buttons">
          <button className="hero-btn primary-btn"><FiShoppingBag size={22}/>  Shop Now</button>
          <button className="hero-btn secondary-btn"><FiSearch size={22}/>  Explore</button>
        </div>
      </div>

      {/* --- Right Column: Contains the product image --- */}
      <div className="hero-image-column">
        <div className="image-wrapper">
          <img src={productImage} alt="Featured sneaker" className="hero-shoe-image" />
        </div>
      </div>
    </div>
  );
}