import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Home from "./routes/Home";
import Search from "./routes/Search";
import TV from "./routes/TV";

const SITE_URL = {
  HOME: "/",
  TV: "/tv",
  SEARCH: "/search",
};

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={SITE_URL.HOME} element={<Home />} />
        <Route path={SITE_URL.TV} element={<TV />} />
        <Route path={SITE_URL.SEARCH} element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
