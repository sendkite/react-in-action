import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [todoData, setTodoData] = useState([]);

  const [value, setValue] = useState("");

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

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    // form 안에 submit 시 리로드 방지
    e.preventDefault();
    // data 추가
    let newTodoData = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    setTodoData((prev) => [...prev, newTodoData]);
    setValue("");
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
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>할 일 목록</h1>
        </div>

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

        <form style={{ display: "flex" }} onSubmit={handleSubmit}>
          <input
            type="text"
            name="value"
            style={{ flex: "10", padding: "5px" }}
            placeholder="할 일을 입력하세요"
            value={value}
            onChange={handleChange}
          />
          <input
            type="submit"
            value="추가"
            className="btn"
            style={{ flex: "1" }}
          />
        </form>
      </div>
    </div>
  );
}
