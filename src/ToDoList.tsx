import React, { useState } from "react";
import { darkTheme } from "./style/theme";
import { useForm } from "react-hook-form";

// function ToDoList() {
//   const [toDo, setToDo] = useState("");
//   const [toDoError, setToDoError] = useState("");

//   const onChangeValue = (e: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = e;
//     setToDoError("");
//     setToDo(value);
//   };

//   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (toDo.length < 10) {
//       return setToDoError("To do should be longer");
//     }
//     console.log(toDo);
//   };

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input
//           onChange={onChangeValue}
//           value={toDo}
//           placeholder={"Write a to do"}
//         />
//         <button>Add</button>
//         {toDoError !== "" ? (
//           <span style={{ color: `${darkTheme.textColor}` }}>{toDoError}</span>
//         ) : null}
//       </form>
//     </div>
//   );
// }

function ToDoList() {
  const { register, watch } = useForm();

  return (
    <div>
      <form>
        <input {...register("email")} placeholder={"Email"} />
        <input {...register("name")} placeholder={"User Name"} />
        <input {...register("password")} placeholder={"Password"} />
        <input {...register("paaswordCheck")} placeholder={"Password"} />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
