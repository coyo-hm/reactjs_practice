import React, { useRef } from "react";
import styled from "styled-components";
import { Wrapper as BoxWrapper, Box as DefaultBox } from "../style";

const Wrapper = styled(BoxWrapper)`
  background: linear-gradient(135deg, #464abf, #301bb7);
`;

const BiggerBox = styled.div`
  width: 150px;
  height: 150px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(DefaultBox)`
  width: 50px;
  height: 50px;
`;

const boxVariants = {
  hover: { rotateZ: 90 },
  tap: { borderRadius: "50%" },
  drag: {
    backgroundColor: "rgb(24, 13, 97)",
    transition: { duration: 2 },
  },
};

function BoundDrag() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);

  return (
    <Wrapper>
      <BiggerBox ref={biggerBoxRef}>
        <Box
          drag
          dragSnapToOrigin
          dragElastic={0}
          dragConstraints={biggerBoxRef}
          variants={boxVariants}
          whileHover="hover"
          whileDrag="drag"
          whileTap="tap"
        />
      </BiggerBox>
    </Wrapper>
  );
}

export default BoundDrag;
