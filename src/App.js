import styled from "styled-components";

const Parent = styled.div`
  display: flex;
`;

const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;

const Circle = styled(Box)`
  border-radius: 50px;
`;

function App() {
  return (
    <Parent>
      <Box bgColor="teal"></Box>
      <Circle bgColor="tomato"></Circle>
    </Parent>
  );
}

export default App;
