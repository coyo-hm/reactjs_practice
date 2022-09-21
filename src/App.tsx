import styled from "styled-components";

import Animations from "./components/Animations";
import BoundDrag from "./components/BoundDrag";
import Drag from "./components/Drag";
import Gestures from "./components/Gestures";
import Path from "./components/Path";
import RollingDrag from "./components/RollingDrag";
import Scroll from "./components/Scroll";
import Variant from "./components/Variant";

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
      <Variant />
      <Gestures />
      <Drag />
      <BoundDrag />
      <RollingDrag />
      <Scroll />
      <Path />
    </Container>
  );
}

export default App;
