import React, { useState } from "react";
import { darkTheme } from "./style/theme";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 50px auto;
`;

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
  const { register, handleSubmit, formState } = useForm();

  const onVaild = (data: any) => {
    console.log(data);
  };

  console.log(formState.errors);
  /*
  password: {type: 'minLength', message: 'Password는 8자 이상이어야 합니다.', ref: input}
  passwordCheck: {type: 'minLength', message: '', ref: input}
  username: {type: 'required', message: '', ref: input}
  */

  return (
    <div>
      <SignupForm onSubmit={handleSubmit(onVaild)}>
        <input
          {...register("email", {
            required: true,
            pattern: {
              value: /^ [A - Za - z0 -9._ % +-] +@gmail.com$/,
              message: "gmail만 주소만 허용됩니다.",
            },
          })}
          placeholder={"Email"}
        />
        <input
          {...register("username", { required: true })}
          placeholder={"User Name"}
        />
        <input
          {...register("password", {
            required: true,
            minLength: {
              value: 8,
              message: "Password는 8자 이상이어야 합니다.",
            },
          })}
          placeholder={"Password"}
        />
        <input
          {...register("passwordCheck", { required: true, minLength: 8 })}
          placeholder={"Password"}
        />
        <button>Add</button>
      </SignupForm>
    </div>
  );
}

export default ToDoList;
