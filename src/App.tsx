import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: grid;
  justify-items: center;
  align-items: center;
  column-gap: 50px;
  grid-template-columns: repeat(2, 1fr);
`;

const Box = styled(motion.div)`
  width: 400px;
  height: 400px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  display: flex;
  font-size: 28px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  background-color: #00a6ff;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => {
    setClicked((prev) => !prev);
  };

  return (
    <Wrapper onClick={toggleClicked}>
      <Box>{!clicked && <Circle layoutId="circle" />}</Box>
      <Box>{clicked && <Circle layoutId="circle" />}</Box>
    </Wrapper>
  );
}

export default App;
