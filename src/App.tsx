import { useEffect } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { IToDoState, toDoState } from "./atoms";
import Board from "./Components/Board";
import { Container, Boards } from "./style";

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  useEffect(() => {
    let savedTodo: IToDoState = JSON.parse(localStorage.getItem("TODOS") || "");
    setToDos(savedTodo);
  }, []);

  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(toDos));
  }, [toDos]);

  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      //같은 보드 내에서 움직일때
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];

        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    } else if (destination.droppableId !== source.droppableId) {
      //보드를 건너서 움직일때
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinationBoard = [...allBoards[destination.droppableId]];
        const taskObj = sourceBoard[source.index];

        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board key={boardId} toDos={toDos[boardId]} boardId={boardId} />
          ))}
        </Boards>
      </Container>
    </DragDropContext>
  );
}

export default App;
