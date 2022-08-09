import React from "react";
import { IToDo } from "../atoms";

function ToDo({ text, id, category }: IToDo) {
  const onClickCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget: name } = event;
  };

  return (
    <li>
      <span>{text}</span>
      {category !== "TO_DO" && (
        <button name="TO_DO" onClick={onClickCategory}>
          To Do
        </button>
      )}
      {category !== "DOING" && (
        <button name="DOING" onClick={onClickCategory}>
          Doing
        </button>
      )}
      {category !== "DONE" && (
        <button name="DONE" onClick={onClickCategory}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
