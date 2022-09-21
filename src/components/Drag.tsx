import styled from "styled-components";
import { Wrapper as BoxWrapper, Box as DefaultBox } from "../style";

const Wrapper = styled(BoxWrapper)`
  background: linear-gradient(135deg, #464abf, #301bb7);
`;

const Box = styled(DefaultBox)``;

const boxVariants = {
  hover: { scale: 1.5, rotateZ: 90 },
  tap: { scale: 1, borderRadius: "50%" },
  drag: {
    backgroundColor: "rgb(24, 13, 97)",
    transition: { duration: 2 },
  },
};

function Drag() {
  return (
    <Wrapper>
      <Box
        drag
        variants={boxVariants}
        whileHover="hover"
        whileDrag="drag"
        whileTap="tap"
      />
    </Wrapper>
  );
}

export default Drag;
