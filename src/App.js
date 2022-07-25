import styled from "styled-components";

const Parent = styled.div`
  display: flex;
`;

const Btn = styled.button`
  color: white;
  background-color: tomato;
  border: 0;
  border-radius: 15px;
`;

function App() {
  return (
    <Parent>
      <Btn>LOGIN</Btn>
      <Btn as={"a"}>LOGIN</Btn>
    </Parent>
  );
}

export default App;
