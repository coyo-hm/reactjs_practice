import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container, Header, Loader, Title } from "../style";
import { CoinInterface } from "../interface";
import { useQuery } from "@tanstack/react-query";
import { fetchCoins } from "../api";
const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 15px;
  transition: color 0.2s ease-in;
  cursor: pointer;

  a {
    display: flex;
    align-items: center;
  }

  img {
    height: 35px;
    margin-right: 10px;
  }
  &:last-child {
    margin-bottom: 0;
  }
  &:hover {
    background-color: #dcdde1;
    color: ${(props) => props.theme.accentColor};
  }
`;

function Coins() {
  const { isLoading, data } = useQuery<CoinInterface[]>(
    ["allCoins"],
    fetchCoins
  );

  return (
    <Container>
      <Header>
        <Title>COIN</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={coin}>
                <img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
