import { IToDo } from "../atoms";

interface IProps {
  toDo: IToDo;
}

function ToDo({ toDo }: IProps) {
  return <li>{toDo.text}</li>;
}

export default ToDo;
