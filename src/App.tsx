import React, { useState } from "react";

function App() {
  const [username, setUserName] = useState("");
  const onChangeName = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setUserName(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("hello" + username);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={username}
          onChange={onChangeName}
          type="text"
          placeholder="username"
        />
        <button>LOGIN</button>
      </form>
    </div>
  );
}

export default App;
