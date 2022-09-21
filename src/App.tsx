import styled from "styled-components";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Wrapper } from "./style";

import Animations from "./components/Animations";
import BoundDrag from "./components/BoundDrag";
import Drag from "./components/Drag";
import Gestures from "./components/Gestures";
import Path from "./components/Path";
import RollingDrag from "./components/RollingDrag";
import Scroll from "./components/Scroll";
import Variant from "./components/Variant";

const Container = styled.div`
  box-sizing: border-box;
  width: fit-content;
  margin: 100px auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

const Button = styled(Wrapper)`
  background: linear-gradient(135deg, #9462f2, #6214ab);
  cursor: pointer;
  svg {
    width: 100px;
    height: 100px;
    path {
      fill: white;
    }
  }
`;

const Dim = styled.div`
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
`;

const Popup = styled(motion.div)`
  width: 300px;
  height: 200px;
  border-radius: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: white;
  position: fixed;
  top: calc(50% - 150px);
  left: 0;
  right: 0;
  margin: 0 auto;

  text-align: center;
  line-height: 150px;
  font-weight: 800;
  font-size: 72px;

  header {
    background-color: #6214ab;
    height: 50px;
    border-radius: 20px 20px 0 0;
    position: relative;

    button {
      position: absolute;
      box-sizing: border-box;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      svg {
        width: 30px;
        height: 30px;
        path {
          fill: rgb(255, 255, 255);
        }
      }
    }
  }
`;

const boxVariants = {
  initial: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, rotateZ: 360 },
  leaving: { opacity: 0, scale: 0, y: 50 },
};

function App() {
  const [showing, setShowing] = useState(false);
  return (
    <>
      <Container>
        <Animations />
        <Variant />
        <Gestures />
        <Drag />
        <BoundDrag />
        <RollingDrag />
        <Scroll />
        <Path />
        <Button as={"button"} onClick={() => setShowing(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M128 40c0-22.1 17.9-40 40-40s40 17.9 40 40V188.2c8.5-7.6 19.7-12.2 32-12.2c25.3 0 46 19.5 47.9 44.3c8.5-7.7 19.8-12.3 32.1-12.3c25.3 0 46 19.5 47.9 44.3c8.5-7.7 19.8-12.3 32.1-12.3c26.5 0 48 21.5 48 48v32 64c0 70.7-57.3 128-128 128l-16 0H240l-.1 0h-5.2c-5 0-9.9-.3-14.7-1c-55.3-5.6-106.2-34-140-79L8 336c-13.3-17.7-9.7-42.7 8-56s42.7-9.7 56 8l56 74.7V40zM240 304c0-8.8-7.2-16-16-16s-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V304zm48-16c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V304c0-8.8-7.2-16-16-16zm80 16c0-8.8-7.2-16-16-16s-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V304z" />
          </svg>
        </Button>
      </Container>
      <AnimatePresence>
        {showing && (
          <>
            <Dim />
            <Popup
              variants={boxVariants}
              initial={"initial"}
              animate={"visible"}
              exit={"leaving"}
            >
              <header>
                <button onClick={() => setShowing(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
                  </svg>
                </button>
              </header>
              POP!
            </Popup>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
