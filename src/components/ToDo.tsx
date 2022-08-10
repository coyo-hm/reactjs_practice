import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoListState, Categories } from "../atoms";

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
    const {
      currentTarget: { name },
    } = event;

    setToDoList((prev) => {
      const targetIndex = prev.findIndex((toDo) => toDo.id === id);
      const prevToDo = prev[targetIndex];
      const newToDo = {
        ...prevToDo,
        category: name as any,
      };
      return [
        ...prev.slice(0, targetIndex),
        newToDo,
        ...prev.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <ToDoContainer>
      <span>{text}</span>
      <div>
        {category !== Categories.TO_DO && (
          <TODOBtn name={Categories.TO_DO} onClick={onClickCategory}>
            To Do
          </TODOBtn>
        )}
        {category !== Categories.DOING && (
          <DOINGBtn name={Categories.DOING} onClick={onClickCategory}>
            Doing
          </DOINGBtn>
        )}
        {category !== Categories.DONE && (
          <DONEBtn name={Categories.DONE} onClick={onClickCategory}>
            Done
          </DONEBtn>
        )}
      </div>
    </ToDoContainer>
  );
}

export default ToDo;
