import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoListState } from "../atoms";
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

function ToDoList() {
  const toDoList = useRecoilValue(toDoListState);

  return (
    <Container>
      <h1>TODO</h1>
      <hr />
      <CreateToDo />
      <ToDoListContainer>
        {toDoList.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ToDoListContainer>
    </Container>
  );
}

export default ToDoList;
