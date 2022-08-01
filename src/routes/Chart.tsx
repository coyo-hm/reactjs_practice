import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";

function Chart() {
  const { coinId } = useParams();

  const { isLoading, data } = useQuery(["price", coinId], () =>
    fetchCoinHistory(coinId)
  );

  return <h1>Chart</h1>;
}
export default Chart;
