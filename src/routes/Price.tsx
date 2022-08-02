import { useLocation } from "react-router-dom";
import { IPriceData } from "../interface";

interface ILocation {
  state: { priceInfo: IPriceData };
}

function Price() {
  const { state: priceInfo } = useLocation() as ILocation;

  console.log(priceInfo);

  return <h1>Price</h1>;
}
export default Price;
