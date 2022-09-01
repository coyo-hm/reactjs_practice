import styled from "styled-components";

export const Container = styled.div`
  background-color: ${(prop) => prop.theme.bgColor};
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

export const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) =>
    props.isDragging ? "#3c6382" : props.theme.cardColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 5px;
  border-radius: 5px;
  padding: 10px 15px;
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.5)" : "none"};

  &:last-child {
    margin: 0;
  }
`;
