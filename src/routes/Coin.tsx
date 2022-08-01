import { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import { Container, Header, Loader, Title } from "../style";
import { ICoin } from "../interface";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinInfo, fetchCoinTicker } from "../api";

const InfoContainer = styled.div`
  p {
    margin: 20px 0;
    font-size: 16px;
    line-height: 24px;
  }
`;

const Overview = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  background-color: #1e2129;
  padding: 20px;

  div {
    font-size: 14px;
  }

  h1 {
    font-size: 20px;
    margin-top: 10px;
  }
`;

const Tabs = styled.div`
  margin: 30px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Tab = styled(Link)<{ isactive: string }>`
  background-color: #1e2129;
  text-align: center;
  text-transform: uppercase;
  color: ${(props) =>
    props.isactive === "true"
      ? props.theme.accentColor
      : props.theme.textColor};
  font-size: 20px;
  font-weight: 400px;
  border-radius: 20px;
  width: 47%;
  padding: 15px;
`;

interface ILocation {
  state: ICoin;
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

  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: info } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: priceLoading, data: priceInfo } = useQuery<IPriceData>(
    ["tickers", coinId],
    () => fetchCoinTicker(coinId)
  );

  const loading = infoLoading && priceLoading;

  return (
    <Container>
      <Header>
        <Title>
          {coin?.name ? coin?.name : loading ? "Loading" : info?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <InfoContainer>
          <Overview>
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
          </Overview>
          <p>{info?.description}</p>
          <Overview>
            <div>
              TOTAL SUPLY: <br />
              <h1>{priceInfo?.total_supply}</h1>
            </div>
            <div>
              MAX SUPLY: <br />
              <h1>{priceInfo?.max_supply}</h1>
            </div>
          </Overview>
          <Tabs>
            <Tab
              isactive={chartMatch !== null ? "true" : "false"}
              to={`/${coinId}/chart`}
            >
              Chart
            </Tab>
            <Tab
              isactive={priceMatch !== null ? "true" : "false"}
              to={`/${coinId}/price`}
            >
              Price
            </Tab>
          </Tabs>
          <Outlet />
        </InfoContainer>
      )}
    </Container>
  );
}

export default Coin;
