import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { IToDoState, toDoState } from "./atoms";
import styled from "styled-components";

import { Container, Boards, BoardContainer } from "./style";
import DraggableBoard from "./Components/DraggableBoard";
import IconPlusWhite from "./images/Icon_plus_white.png";
import IconPlusSkyblue from "./images/Icon_plus_skyblue.png";
import IconBinClosed from "./images/Icon_bin_closed.png";
import IconBinOpened from "./images/Icon_bin_opened.png";
import { CONSTANT } from "./helpers/constant";

const CreateBoard = styled.form`
  width: 100%;
  text-align: center;

  input {
    padding: 10px;
    margin-bottom: 20px;
    border: none;
    outline: none;
  }

  button {
    background: url(${IconPlusWhite}) no-repeat center/50px;
    width: 50px;
    height: 50px;
    border: none;

    &:hover {
      background: url(${IconPlusSkyblue}) no-repeat center/50px;
    }
  }
`;

const DeleteBtn = styled.button`
  background: url(${IconBinClosed}) no-repeat center/50px;
  width: 50px;
  height: 50px;
  border: none;
  position: absolute;
  bottom: calc(50% - 250px);
  left: calc(50% - 25px);

  &:hover {
    background: url(${IconBinOpened}) no-repeat center/50px;
  }
`;

interface IForm {
  boardId: string;
}

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();

  useEffect(() => {
    let savedTodo: IToDoState[] = JSON.parse(
      localStorage.getItem("TODOS") || "[]"
    );
    setToDos(savedTodo);
  }, []);

  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(toDos));
  }, [toDos]);

  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source, type } = info;
    if (!destination) return;

    if (type === CONSTANT.DROP_TYPE.BOARD) {
      setToDos((allBoards) => {
        const newBoard = [...allBoards];
        const targetBoard = allBoards[source.index];

        newBoard.splice(source.index, 1);
        newBoard.splice(destination?.index, 0, targetBoard);

        return newBoard;
      });
    } else if (type === CONSTANT.DROP_TYPE.CARD) {
      if (destination?.droppableId === source.droppableId) {
        //같은 보드 내에서 움직일때
        setToDos((allBoards) => {
          const boardCopy = allBoards.find(
            (board) => board.id === source.droppableId
          );
          if (!boardCopy?.list) return allBoards;
          const cardList = [...boardCopy?.list];

          const targetCard = cardList[source.index];
          cardList.splice(source.index, 1);
          cardList.splice(destination?.index, 0, targetCard);

          const newBoards = allBoards.map((board) =>
            board.id === source.droppableId
              ? { id: source.droppableId, list: cardList }
              : board
          );
          return newBoards;
        });
      } else if (destination.droppableId !== source.droppableId) {
        //보드를 건너서 움직일때
        setToDos((allBoards) => {
          const sourceBoard = allBoards.find(
            (board) => board.id === source.droppableId
          );
          const destinationBoard = allBoards.find(
            (board) => board.id === destination.droppableId
          );
          if (!sourceBoard?.list || !destinationBoard?.list) return allBoards;

          const targetCard = sourceBoard.list[source.index];
          const newSourceBoard = [...sourceBoard.list];
          const newDestinationBoard = [...destinationBoard.list];
          newSourceBoard.splice(source.index, 1);
          newDestinationBoard.splice(destination?.index, 0, targetCard);

          const newBoards = allBoards.map((board) => {
            if (board.id === source.droppableId) {
              return {
                id: board.id,
                list: newSourceBoard,
              };
            } else if (board.id === destination.droppableId) {
              return {
                id: board.id,
                list: newDestinationBoard,
              };
            } else return board;
          });

          return newBoards;
        });
      }
    }
  };

  const createBoard = ({ boardId }: IForm) => {
    setToDos((prevToDos) => {
      return [
        ...prevToDos,
        {
          id: boardId,
          list: [],
        },
      ];
    });
    setValue("boardId", "");
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <Droppable droppableId={"boards"} type={CONSTANT.DROP_TYPE.BOARD}>
          {(provided) => (
            <Boards {...provided.droppableProps} ref={provided.innerRef}>
              {toDos.map((board, idx) => (
                <DraggableBoard idx={idx} key={board.id} board={board} />
              ))}
              <BoardContainer>
                <CreateBoard onSubmit={handleSubmit(createBoard)}>
                  <input {...register("boardId", { required: true })} />
                  <button type="submit" />
                </CreateBoard>
              </BoardContainer>
            </Boards>
          )}
        </Droppable>
        <DeleteBtn />
      </Container>
    </DragDropContext>
  );
}

export default App;
