"use client";
import React from "react";
import axios from "axios";

export const Content = () => {
  const [todo, setTodo] = React.useState("");
  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [newTodoLoading, setNewTodoLoading] = React.useState(false);
  const [editId, setEditId] = React.useState("");
  const [editText, setEditText] = React.useState("");

  React.useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    setLoading(true);
    const res = await axios.get("http://localhost:3000/api/getTodo");
    setTodos(res.data);
    setLoading(false);
  };

  const addTodo = async () => {
    setNewTodoLoading(true);
    const res = await axios.post(
      "http://localhost:3000/api/addTodo",
      JSON.stringify({ todo, completed: false }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setTodos(res.data);
    setTodo("");
    setNewTodoLoading(false);
  };

  const handleDeleteTodo = async (todoId) => {
    const res = await axios.post(
      "http://localhost:3000/api/deleteTodo",
      {
        id: todoId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setTodos(res.data);
  };

  const updateTodo = async (id, todo) => {
    const res = await axios.post(
      `http://localhost:3000/api/editTodo?id=${id}`,
      JSON.stringify(todo),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setTodos(res.data);
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
          {loading ? (
            <h3>Loading...</h3>
          ) : (
            <>
              {todos?.map((todo) => {
                return (
                  <div
                    key={todo?._id}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                      border: "1px solid black",
                      padding: "2px 5px",
                    }}
                  >
                    {editId == todo?._id ? (
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                    ) : (
                      <p
                        style={{
                          color: `${todo?.completed ? "red" : "green"}`,
                          textDecoration: `${
                            todo?.completed ? "line-through" : "none"
                          }`,
                          marginRight: "10px",
                        }}
                      >
                        {todo.todo}
                      </p>
                    )}
                    {!todo?.completed && (
                      <div>
                        {editId == todo?._id ? (
                          <button
                            style={{ padding: "2px 10px" }}
                            onClick={() => {
                              updateTodo(editId, {
                                todo: editText,
                                completed: false,
                              });
                              setEditId("");
                              setEditText("");
                            }}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            style={{ padding: "2px 10px" }}
                            onClick={() => {
                              setEditId(todo?._id);
                              setEditText(todo?.todo);
                            }}
                          >
                            Edit
                          </button>
                        )}
                        <button
                          style={{ padding: "2px 10px" }}
                          onClick={() =>
                            updateTodo(todo?._id, {
                              todo: todo?.todo,
                              completed: true,
                            })
                          }
                        >
                          Done
                        </button>
                      </div>
                    )}
                    {todo?.completed && (
                      <button
                        style={{ padding: "2px 10px" }}
                        onClick={() => handleDeleteTodo(todo?._id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                );
              })}
            </>
          )}
          <>{newTodoLoading && <h3>Adding</h3>}</>
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
