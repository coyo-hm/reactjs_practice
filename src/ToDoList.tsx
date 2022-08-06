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

const ErrorMsg = styled.span`
  margin: 10px 0;
  color: red;
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
interface IForm {
  email: string;
  username?: string;
  password: string;
  passwordCheck: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({ defaultValues: { email: "@gmail.com" } });

  const onVaild = (data: any) => {
    console.log(data);
  };

  console.log(errors);

  return (
    <div>
      <SignupForm onSubmit={handleSubmit(onVaild)}>
        <input
          {...register("email", {
            required: "Email은 필수 항목입니다.",
            pattern: {
              value: /^[A-Za-z0-9._ %+-]+@gmail\.com$/,
              message: "gmail만 주소만 허용됩니다.",
            },
          })}
          placeholder={"Email"}
        />
        {errors.email && errors.email?.message !== "" && (
          <ErrorMsg>{errors?.email?.message}</ErrorMsg>
        )}
        <input {...register("username")} placeholder={"User Name"} />
        {errors.username && errors.username?.message !== "" && (
          <ErrorMsg>{errors?.username?.message}</ErrorMsg>
        )}
        <input
          {...register("password", {
            required: "필수 항목입니다.",
            minLength: {
              value: 8,
              message: "Password는 8자 이상이어야 합니다.",
            },
          })}
          placeholder={"Password"}
        />
        {errors.password && errors.password?.message !== "" && (
          <ErrorMsg>{errors?.password?.message}</ErrorMsg>
        )}
        <input
          {...register("passwordCheck", {
            required: "필수 항목입니다.",
            minLength: 8,
          })}
          placeholder={"Password"}
        />
        {errors.passwordCheck && errors.passwordCheck?.message !== "" && (
          <ErrorMsg>{errors?.passwordCheck?.message}</ErrorMsg>
        )}
        <button>Add</button>
      </SignupForm>
    </div>
  );
}

export default ToDoList;
