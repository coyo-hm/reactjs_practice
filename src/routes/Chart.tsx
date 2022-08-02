import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart() {
  const { coinId } = useParams();

  const { isLoading, data } = useQuery<IHistorical[]>(["price", coinId], () =>
    fetchCoinHistory(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => parseFloat(price.close)) ?? [],
            },
          ]} // data 작성
          options={{
            theme: { mode: "dark" },
            chart: {
              height: 500,
              width: 500,
              background: "none",
              toolbar: { show: false },
            },
            grid: { show: false },
            colors: ["#e17055"],
            stroke: { curve: "smooth", width: 5 },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["purple"], stops: [0, 100] },
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisTicks: { show: false },
              type: "datetime",
              categories: data?.map((price) => price.time_close) ?? [],
            },

            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}
export default Chart;
