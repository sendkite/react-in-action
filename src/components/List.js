import React from "react";

export default function List({ todoData, setTodoData }) {
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
        <div key={todo.id}>
          <div className="flex justify-between items-center px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded">
            <div>
              <input
                type="checkbox"
                defaultChecked={todo.completed}
                onChange={() => {
                  handleCompleteChange(todo.id);
                }}
              />
            </div>
            <span className={todo.completed ? "line-through" : undefined}>
              {todo.title}
            </span>
            <div className="items-center">
              <button
                onClick={() => {
                  handleClick(todo.id);
                }}
              >
                x
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
