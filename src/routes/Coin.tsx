import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Container, Header, Loader, Title } from "../style";
import { CoinInterface } from "../interface";

interface LocationInterface {
  state: CoinInterface;
}

function Coin() {
  const { coinId } = useParams();
  const { state: coin } = useLocation() as LocationInterface;

  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});
  const [priceInfo, setPriceInfo] = useState({});

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();

      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();

      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>{coin?.name || "Loading"}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}

export default Coin;
