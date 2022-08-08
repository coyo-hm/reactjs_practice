import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoListState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo({}) {
  const setToDoList = useSetRecoilState(toDoListState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onSubmit = (data: IForm) => {
    setToDoList((prev) => [
      { id: Date.now(), text: data.toDo, category: "TO_DO" },
      ...prev,
    ]);
    setValue("toDo", "");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("toDo", { required: "Please fill in the blank" })}
        placeholder="Write a To do"
      />
      <button>ADD</button>
    </form>
  );
}

export default CreateToDo;
