import React, { useState } from "react";
import { darkTheme } from "../style/theme";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

const toDoListState = atom<IToDo[]>({
  key: "toDoList",
  default: [],
});

interface IToDo {
  text: string;
  id: number;
  category: "TODO" | "DOING" | "DONE";
}

interface IForm {
  toDo: string;
}

function ToDoList() {
  const [toDoList, setToDoList] = useRecoilState(toDoListState);

  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onSubmit = (data: IForm) => {
    console.log("Add To Do", data.toDo);
    setToDoList((prev) => [
      { id: Date.now(), text: data.toDo, category: "TODO" },
      ...prev,
    ]);
    setValue("toDo", "");
  };

  return (
    <div>
      <h1>TODOs</h1>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("toDo", { required: "Please fill in the blank" })}
          placeholder="Write a To do"
        />
        <button>ADD</button>
      </form>
      <ul>
        {toDoList.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
