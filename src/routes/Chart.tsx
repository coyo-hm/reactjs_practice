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

interface IChartProps {
  isDark: boolean;
}

function Chart({ isDark }: IChartProps) {
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
          type="candlestick"
          series={[
            {
              name: "Price",
              data:
                data?.map((price) => {
                  return {
                    x: price.time_open,
                    y: [price.open, price.high, price.low, price.close],
                  };
                }) ?? [],
            },
          ]} // data 작성
          options={{
            theme: { mode: isDark ? "dark" : "light" },
            chart: {
              type: "candlestick",
              height: 500,
              width: 500,
              background: "none",
              toolbar: { show: false },
            },
            grid: { show: false },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisTicks: { show: false },
              type: "datetime",
            },
          }}
        />
      )}
    </div>
  );
}
export default Chart;
