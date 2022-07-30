import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Container, Header, Loader, Title } from "../style";
import { CoinInterface } from "../interface";
import styled from "styled-components";

const InfoContainer = styled.div`
  div {
    font-size: 14px;
  }

  h1 {
    font-size: 20px;
    margin-top: 10px;
  }

  p {
    margin: 20px 0;
    font-size: 16px;
    line-height: 24px;
  }
`;

const BlackBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  background-color: #1e2129;
  padding: 20px;
`;

interface ILocation {
  state: CoinInterface;
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      percent_from_price_ath: number;
      ath_price: number;
      ath_date: string;
    };
  };
}

function Coin() {
  const { coinId } = useParams();
  const { state: coin } = useLocation() as ILocation;

  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<IInfoData>();
  const [priceInfo, setPriceInfo] = useState<IPriceData>();

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
  }, [coinId]);

  return (
    <Container>
      <Header>
        <Title>{coin?.name || "Loading"}</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <InfoContainer>
          <BlackBox>
            <div>
              RANK: <br />
              <h1>{info?.rank}</h1>
            </div>
            <div>
              SYMBOL: <br />
              <h1>{info?.symbol}</h1>
            </div>
            <div>
              OPEN SOURCE: <br />
              <h1>{info?.open_source ? "YES" : "NO"}</h1>
            </div>
          </BlackBox>
          <p>{info?.description}</p>
          <BlackBox>
            <div>
              TOTAL SUPLY: <br />
              <h1>{priceInfo?.total_supply}</h1>
            </div>
            <div>
              MAX SUPLY: <br />
              <h1>{priceInfo?.max_supply}</h1>
            </div>
          </BlackBox>
        </InfoContainer>
      )}
    </Container>
  );
}

export default Coin;
