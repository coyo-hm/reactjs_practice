// 모든 코인들이 보여지는 화면

/*
/ -> All coins
/:id -> /btc -> Coin detail

/btc/information
/btc/chart
*/

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coints";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:coinid" element={<Coin />} />
        <Route path="/*" element={<Coins />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
