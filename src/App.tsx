import styled from "styled-components";

import Animations from "./components/Animations";

const Container = styled.div`
  /* height: 100vh; */
  /* width: 100vw; */
  width: fit-content;
  margin: 100px auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <Container>
      <Animations />
    </Container>
  );
}

export default App;
