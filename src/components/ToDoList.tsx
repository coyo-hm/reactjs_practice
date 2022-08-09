import { useRecoilValue } from "recoil";
import { toDoListState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDoList = useRecoilValue(toDoListState);

  return (
    <div>
      <h1>TODOs</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDoList.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
