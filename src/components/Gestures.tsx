import styled from "styled-components";
import { Wrapper as BoxWrapper, Box as DefaultBox } from "../style";

const Wrapper = styled(BoxWrapper)`
  background: linear-gradient(135deg, #8c66da, #341f97);
`;

const Box = styled(DefaultBox)``;

const boxVariants = {
  hover: { scale: 1.5, rotateZ: 90 },
  tap: { scale: 1, borderRadius: "50%" },
};

function Gestures() {
  return (
    <Wrapper>
      <Box variants={boxVariants} whileHover={"hover"} whileTap={"tap"} />
    </Wrapper>
  );
}

export default Gestures;
