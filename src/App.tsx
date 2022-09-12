import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { hourSelector, minuteState } from "./atoms";

const Container = styled.div`
  width: fit-content;
  margin: 100px auto;
  padding: 30px;
  background-color: #f6e58d;
  border-radius: 10px;
`;

const TimeInput = styled.div`
  margin-bottom: 15px;
  box-sizing: border-box;
  &:last-child {
    margin-bottom: 0;
  }
  h1 {
    display: inline-block;
    width: 100px;
    font-size: 24px;
    margin: 0 !important;
  }
  input {
    box-sizing: border-box;
    outline: none;
    border: 1px solid white;
    padding: 10px;
    padding-left: 20px;
    font-size: 24px;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &:focus {
      border: 1px solid #22a6b3;
      background-color: #7ed6df;
    }
  }
`;

function App() {
  const [minutes, setMinutess] = useRecoilState(minuteState);
  const [hours, setHours] = useRecoilState(hourSelector);

  const onChangeMinutes = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutess(+event.currentTarget.value);
  };

  const onChangeHours = (event: React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value);
  };

  return (
    <Container>
      <TimeInput>
        <h1>MIN</h1>
        <input
          type="number"
          placeholder="Minutes"
          value={minutes}
          onChange={onChangeMinutes}
        />
      </TimeInput>
      <TimeInput>
        <h1>HOUR</h1>
        <input
          type="number"
          placeholder="Hours"
          value={hours}
          onChange={onChangeHours}
        />
      </TimeInput>
    </Container>
  );
}

export default App;
