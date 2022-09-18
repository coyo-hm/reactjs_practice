import styled from "styled-components";
import { Wrapper as BoxWrapper, Box as DefaultBox } from "../style";

const Wrapper = styled(BoxWrapper)`
  background: linear-gradient(135deg, #e365f4, #9a01bc);
`;

const Box = styled(DefaultBox)`
  background-color: rgba(255, 255, 255, 0.2);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 12px;
`;

const Circle = styled(DefaultBox)`
  background-color: white;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  place-self: center;
`;

const boxVariant = {
  start: { opacity: 0, scale: 0.5 },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.5,
      delayChildren: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const circleVariant = {
  start: {
    opacity: 0,
    y: 10, // Framer Motion에만 존재하는 x, y
  },
  end: {
    opacity: 1,
    y: 0,
  },
};

function Variant() {
  return (
    <Wrapper>
      <Box variants={boxVariant} initial="start" animate="end">
        <Circle variants={circleVariant} />
        <Circle variants={circleVariant} />
        <Circle variants={circleVariant} />
        <Circle variants={circleVariant} />
      </Box>
    </Wrapper>
  );
}

export default Variant;
