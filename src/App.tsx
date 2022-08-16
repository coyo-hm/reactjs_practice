import React from "react";
import { useRecoilState } from "recoil";
import { minuteState } from "./atoms";

function App() {
  const [minutes, setMinutess] = useRecoilState(minuteState);

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
      <input type="number" placeholder="Hours" />
    </div>
  );
}

export default App;
