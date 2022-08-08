import React, { useState } from "react";
import { darkTheme } from "./style/theme";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface IForm {
  toDo: string;
}

function ToDoList() {
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onSubmit = (data: IForm) => {
    console.log("Add To Do", data.toDo);
    setValue("toDo", "");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("toDo", { required: "Please fill in the blank" })}
          placeholder="Write a To do"
        />
        <button>ADD</button>
      </form>
    </div>
  );
}

export default ToDoList;
