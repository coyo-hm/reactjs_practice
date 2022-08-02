import { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import { Container, Header, Loader, Title } from "../style";
import { ICoin, IPriceData } from "../interface";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinInfo, fetchCoinTicker } from "../api";
import { Helmet } from "react-helmet";

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

const BackBtn = styled(Link)`
  border: 1px solid ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.textColor};
  background-color: transparent;
  border-radius: 4px;
  font-size: 24px;
  position: absolute;
  left: calc(50% - 215px);
  text-align: center;
  box-sizing: border-box;
  padding: 5px;

  &:hover {
    background-color: #1e2129;
  }
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
    () => fetchCoinTicker(coinId),
    {
      refetchInterval: 5000, // 이 query를 5초마다 refetch한다.
    }
  );

  const loading = infoLoading && priceLoading;

  return (
    <Container>
      <Helmet>
        <title>
          {coin?.name ? coin?.name : loading ? "Loading" : info?.name}
        </title>
      </Helmet>

      <Header>
        <BackBtn to={"/"}>←</BackBtn>
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
              PRICE: <br />
              <h1>{priceInfo?.quotes.USD.price.toFixed(3)}</h1>
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
              state={priceInfo}
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
