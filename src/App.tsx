import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const onDragEnd = () => {};

  return <DragDropContext onDragEnd={onDragEnd}></DragDropContext>;
}

export default App;
