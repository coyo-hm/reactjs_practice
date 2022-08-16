import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { hourSelector, minuteState } from "./atoms";

function App() {
  const [minutes, setMinutess] = useRecoilState(minuteState);
  const hours = useRecoilValue(hourSelector);

  const onChangeMinutes = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutess(+event.currentTarget.value);
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Minutes"
        value={minutes}
        onChange={onChangeMinutes}
      />
      <input type="number" placeholder="Hours" value={hours} readOnly />
    </div>
  );
}

export default App;
