import ShowcasePage from "../components/ShowcasePage";
import sneakerData from "../data/sneakerData";
import "../index.css"

export default function Men() {
  const menSneakers = sneakerData.filter((p) => p.category === "men");

  return (
    <div className="men-area">
      <ShowcasePage products={menSneakers} />
      
    </div>
  );
}
