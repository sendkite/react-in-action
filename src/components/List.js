import React from "react";

export default function List({ todoData, setTodoData }) {
  const btnStyle = {
    color: "#FFF",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  };

  const getStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    };
  };

  const handleClick = (id) => {
    let newTodoData = todoData.filter((todo) => todo.id !== id);
    setTodoData(newTodoData);
  };

  const handleCompleteChange = (id) => {
    let newTodoData = todoData.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodoData(newTodoData);
  };

  return (
    <div>
      {todoData.map((todo) => (
        <div key={todo.id} style={getStyle(todo.completed)}>
          <input
            type="checkbox"
            defaultChecked={todo.completed}
            onChange={() => {
              handleCompleteChange(todo.id);
            }}
          />
          {todo.title}
          <button
            style={btnStyle}
            onClick={() => {
              handleClick(todo.id);
            }}
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
}