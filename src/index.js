import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";

const darkTheme = {
  //theme애 어떤 색을 사용할 건지 구체적으로 결정된다.
  textColor: "whitesmoke",
  backgroundColor: "#111",
};

const lightTheme = {
  //theme애 어떤 색을 사용할 건지 구체적으로 결정된다.
  textColor: "#111",
  backgroundColor: "whitesmoke",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
