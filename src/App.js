import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
  state = {
    todoData: [
      {
        id: 1,
        title: "공부하기",
        completed: false,
      },
      {
        id: 2,
        title: "운동하기",
        completed: false,
      },
      {
        id: 3,
        title: "코딩하기",
        completed: true,
      },
    ],
    value: "",
  };

  btnStyle = {
    color: "#FFF",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  };

  getStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    };
  };

  handleClick = (id) => {
    let newTodoData = this.state.todoData.filter((todo) => todo.id !== id);
    this.setState({ todoData: newTodoData });
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = (e) => {
    // form 안에 submit 시 리로드 방지
    e.preventDefault();
    // data 추가
    let newTodoData = {
      id: Date.now(),
      title: this.state.value,
      completed: false,
    };

    this.setState({
      todoData: [...this.state.todoData, newTodoData],
      value: "",
    });
  };

  handleCompleteChange = (id) => {
    let newTodoData = this.state.todoData.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    this.setState({ todoData: newTodoData });
  };

  render() {
    return (
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>할 일 목록</h1>
          </div>

          {this.state.todoData.map((todo) => (
            <div key={todo.id} style={this.getStyle(todo.completed)}>
              <input
                type="checkbox"
                defaultChecked={todo.completed}
                onChange={() => {
                  this.handleCompleteChange(todo.id);
                }}
              />
              {todo.title}
              <button
                style={this.btnStyle}
                onClick={() => {
                  this.handleClick(todo.id);
                }}
              >
                x
              </button>
            </div>
          ))}

          <form style={{ display: "flex" }} onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="value"
              style={{ flex: "10", padding: "5px" }}
              placeholder="할 일을 입력하세요"
              value={this.state.value}
              onChange={this.handleChange}
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
}
