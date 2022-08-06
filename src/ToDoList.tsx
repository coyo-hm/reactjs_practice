import React, { useState } from "react";
import { darkTheme } from "./style/theme";

function ToDoList() {
  const [toDo, setToDo] = useState("");
  const [toDoError, setToDoError] = useState("");

  const onChangeValue = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setToDoError("");
    setToDo(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (toDo.length < 10) {
      return setToDoError("To do should be longer");
    }
    console.log(toDo);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChangeValue}
          value={toDo}
          placeholder={"Write a to do"}
        />
        <button>Add</button>
        {toDoError !== "" ? (
          <span style={{ color: `${darkTheme.textColor}` }}>{toDoError}</span>
        ) : null}
      </form>
    </div>
  );
}
export default ToDoList;
