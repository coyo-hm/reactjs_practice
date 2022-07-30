import { useState } from "react";
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
