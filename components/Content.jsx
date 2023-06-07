"use client";
import React from "react";
import axios from "axios";

export const Content = () => {
  const [todo, setTodo] = React.useState("");
  const [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    const res = await axios.get("http://localhost:3000/api/todos");
    setTodos(res.data);
  };

  const addTodo = async () => {
    const res = await axios.post(
      "http://localhost:3000/api/todos",
      JSON.stringify({ todo, completed: false }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setTodos(res.data);
    setTodo("");
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <h3>Todos</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
          }}
        >
          {todos?.map((todo) => {
            return (
              <div key={todo?.id}>
                <p
                  style={{
                    color: `${todo?.completed ? "red" : "green"}`,
                    textDecoration: `${
                      todo?.completed ? "line-through" : "none"
                    }`,
                  }}
                >
                  {todo.todo}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
        }}
      >
        <h3>Add new todo</h3>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          style={{ padding: "2px 3px", marginTop: "5px" }}
          onClick={addTodo}
        >
          Add
        </button>
      </div>
    </div>
  );
};
