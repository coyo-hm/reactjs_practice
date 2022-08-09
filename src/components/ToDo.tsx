import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoListState } from "../atoms";

const TODOBtn = styled.button`
  font-size: 20px;
  padding: 5px;
  border-radius: 4px;
  border: none;
  margin-right: 5px;
  background-color: #ff7979;
  &:hover {
    background-color: #eb4d4b;
  }
`;

const DOINGBtn = styled(TODOBtn)`
  background-color: #f6e58d;

  &:hover {
    background-color: #f9ca24;
  }
`;

const DONEBtn = styled(TODOBtn)`
  background-color: #badc58;
  &:hover {
    background-color: #6ab04c;
  }
`;

const ToDoContainer = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;

  button {
    &:last-child {
      margin-right: 0;
    }
  }
`;

function ToDo({ text, id, category }: IToDo) {
  const setToDoList = useSetRecoilState(toDoListState);

  const onClickCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget: name } = event;
  };

  return (
    <ToDoContainer>
      <span>{text}</span>
      <div>
        {category !== "TO_DO" && (
          <TODOBtn name="TO_DO" onClick={onClickCategory}>
            To Do
          </TODOBtn>
        )}
        {category !== "DOING" && (
          <DOINGBtn name="DOING" onClick={onClickCategory}>
            Doing
          </DOINGBtn>
        )}
        {category !== "DONE" && (
          <DONEBtn name="DONE" onClick={onClickCategory}>
            Done
          </DONEBtn>
        )}
      </div>
    </ToDoContainer>
  );
}

export default ToDo;
