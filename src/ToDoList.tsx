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

interface IForm {
  email: string;
  username?: string;
  password: string;
  passwordCheck: string;
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({ defaultValues: { email: "@gmail.com" } });

  const onVaild = (data: IForm) => {
    if (data.password !== data.passwordCheck) {
      setError(
        "passwordCheck",
        { message: "비밀번호가 일치하지 않습니다." },
        { shouldFocus: true }
      );
    }

    setError("extraError", { message: "에러가 발생했습니다." }); // form 전체에 해당되는 에러이다.

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
            validate: {
              noHello: (value) => {
                return value.includes("hello")
                  ? "hello는 포함할 수 없습니다."
                  : true;
              },
              no1234: (value) => {
                return value.includes("1234")
                  ? "1234는 포함할 수 없습니다."
                  : true;
              },
            },
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
