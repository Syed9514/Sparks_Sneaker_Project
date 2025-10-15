import HomeHero from "../components/HomeHero.jsx";
import ProductSlider from "../components/ProductSlider";
import CategorySection from "../components/CategorySection";
import Newsletter from "../components/news/Newsletter.jsx";
import WhyUs from "../components/whyus/WhyUs.jsx";
import Footer from "../components/footer/Footer.jsx";
// import "./Home.css";

export default function Home() {
  return (
    <div className="front-look">
      <div className="section-wrapper"><HomeHero /></div>
      <div className="section-wrapper"><ProductSlider /></div>
      <div className="section-wrapper"><CategorySection /></div>
      <div className="section-wrapper"><Newsletter /></div>
      <div className="section-wrapper"><WhyUs /></div>
      <div className="section-wrapper"><Footer /></div>
    </div>
  );
}
