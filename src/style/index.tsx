import styled from "styled-components";

export const Container = styled.div`
  background-color: ${(prop) => prop.theme.bgColor};
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

export const Card = styled.div`
  background-color: ${(prop) => prop.theme.cardColor};
  color: ${(prop) => prop.theme.textColor};
  margin-bottom: 5px;
  border-radius: 5px;
  padding: 10px 15px;

  &:last-child {
    margin: 0;
  }
`;
