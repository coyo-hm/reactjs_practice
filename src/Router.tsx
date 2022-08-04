// 모든 코인들이 보여지는 화면

/*
/ -> All coins
/:id -> /btc -> Coin detail

/btc/information
/btc/chart
*/

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chart from "./routes/Chart";
import Coin from "./routes/Coin";
import Coins from "./routes/Coints";
import Price from "./routes/Price";

interface IRouterProps {
  toggleTheme: () => void;
  isDark: boolean;
}

function Router({ toggleTheme, isDark }: IRouterProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:coinId/" element={<Coin />}>
          <Route path={`chart`} element={<Chart isDark={isDark} />} />
          <Route path={`price`} element={<Price />} />
        </Route>
        <Route path="/" element={<Coins toggleTheme={toggleTheme} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
