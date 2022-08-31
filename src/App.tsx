import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { toDoState } from "./atoms";
import Board from "./Components/Board";
import { Container, Boards } from "./style";

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      //같은 보드 내에서 움직일때
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, draggableId);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    } else if (destination.droppableId !== source.droppableId) {
      //보드를 건너서 움직일때
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const targetBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        targetBoard.splice(destination?.index, 0, draggableId);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: targetBoard,
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
