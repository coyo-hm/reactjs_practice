import styled from "styled-components";

const Parent = styled.div`
  display: flex;
`;

const Input = styled.input.attrs({ required: true })`
  background-color: tomato;
`;

function App() {
  return (
    <Parent as="header">
      <Input />
    </Parent>
  );
}

export default App;
