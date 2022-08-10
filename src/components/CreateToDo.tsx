import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoListState } from "../atoms";

const Container = styled.form`
  display: flex;
`;

const ToDoInput = styled.input`
  font-size: 20px;
  width: calc(100% - 57px);
  height: 37px;
  border-radius: 4px;
  padding: 5px 10px;
`;

const CreateBtn = styled.button`
  font-size: 20px;
  padding: 5px;
  border-radius: 4px;
`;

interface IForm {
  toDo: string;
}

function CreateToDo({}) {
  const setToDoList = useSetRecoilState(toDoListState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onSubmit = (data: IForm) => {
    setToDoList((prev) => [
      { id: Date.now(), text: data.toDo, category },
      ...prev,
    ]);
    setValue("toDo", "");
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <ToDoInput
        {...register("toDo", { required: "Please fill in the blank" })}
        placeholder="Write a To do"
      />
      <CreateBtn>ADD</CreateBtn>
    </Container>
  );
}

export default CreateToDo;
