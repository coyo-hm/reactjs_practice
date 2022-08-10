import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  Categories,
  categoryState,
  toDoListState,
  toDoSelector,
} from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Container = styled.div`
  max-width: 400px;
  margin: 50px auto;
  font-size: 24px !important;
`;

const ToDoListContainer = styled.ul`
  margin: 10px 0;
`;

const CategoryTitle = styled.h2`
  margin: 10px 0;
`;

const CategorySelector = styled.select`
  margin: 10px 0;
  font-size: 20px;
  padding: 5px 10px;
  border-radius: 5px;
  width: 50%;
  text-align: left;
`;

const CategoryOption = styled.option``;

function ToDoList() {
  const toDoList = useRecoilValue(toDoSelector);
  // const [toDoList, doings, dones] = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <Container>
      <h1>TODO</h1>
      <hr />
      <CreateToDo />
      <CategorySelector value={category} onInput={onInput}>
        <CategoryOption value={Categories.TO_DO}>To Do</CategoryOption>
        <CategoryOption value={Categories.DOING}>Doing</CategoryOption>
        <CategoryOption value={Categories.DONE}>Done</CategoryOption>
      </CategorySelector>
      <hr />
      <ToDoListContainer>
        {toDoList?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ToDoListContainer>
    </Container>
  );
}

export default ToDoList;
