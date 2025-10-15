import ShowcasePage from "../components/ShowcasePage";
import sneakerData from "../data/sneakerData";

export default function Women() {
  const WomenSneakers = sneakerData.filter((p) => p.category === "women");

  return <ShowcasePage products={WomenSneakers} />;
}
