import React from "react";
import { useRecoilState } from "recoil";
import { hourSelector, minuteState } from "./atoms";

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
    <div>
      <input
        type="number"
        placeholder="Minutes"
        value={minutes}
        onChange={onChangeMinutes}
      />
      <input
        type="number"
        placeholder="Hours"
        value={hours}
        onChange={onChangeHours}
      />
    </div>
  );
}

export default App;
