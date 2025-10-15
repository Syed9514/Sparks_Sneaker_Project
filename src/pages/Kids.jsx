import ShowcasePage from "../components/ShowcasePage";
import sneakerData from "../data/sneakerData";

export default function Kids() {
  const KidsSneakers = sneakerData.filter((p) => p.category === "kids");

  return <ShowcasePage products={KidsSneakers} />;
}

