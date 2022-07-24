import styled from "styled-components";

const Parent = styled.div`
  display: flex;
`;

const BoxTeal = styled.div`
  background-color: teal;
  width: 100px;
  height: 100px;
`;

const BoxTomato = styled.div`
  background-color: tomato;
  width: 100px;
  height: 100px;
`;

const Text = styled.span``;

function App() {
  return (
    <Parent>
      <BoxTeal>
        <Text>Hello</Text>
      </BoxTeal>
      <BoxTomato></BoxTomato>
    </Parent>
  );
}

export default App;
