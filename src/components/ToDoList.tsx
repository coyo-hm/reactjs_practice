import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoListState, toDoSelector } from "../atoms";
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

function ToDoList() {
  const toDoList = useRecoilValue(toDoListState);
  const [toDos, doings, dones] = useRecoilValue(toDoSelector);

  return (
    <Container>
      <h1>TODO</h1>
      <hr />
      <CreateToDo />
      <CategoryTitle>To Do</CategoryTitle>
      <ToDoListContainer>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ToDoListContainer>
      <hr />
      <CategoryTitle>Doing</CategoryTitle>
      <ToDoListContainer>
        {doings.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ToDoListContainer>
      <hr />
      <CategoryTitle>Done</CategoryTitle>
      <ToDoListContainer>
        {dones.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ToDoListContainer>
    </Container>
  );
}

export default ToDoList;
