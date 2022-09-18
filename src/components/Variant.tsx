import styled from "styled-components";
import { Wrapper as BoxWrapper, Box } from "../style";

const Wrapper = styled(BoxWrapper)`
  background: linear-gradient(135deg, #651d83, #b468d2);
`;

const myVars = {
  start: { scale: 0 },
  end: { scale: 1, rotateZ: 270, transition: { type: "spring", delay: 1 } },
};

function Variant() {
  return (
    <Wrapper>
      <Box variants={myVars} initial="start" animate="end" />
    </Wrapper>
  );
}

export default Variant;
