import React from "react";

const List = React.memo(
  ({ id, title, completed, todoData, setTodoData, provided, snapshot }) => {
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
      <div
        key={id}
        {...provided.draggableProps}
        ref={provided.innerRef}
        {...provided.dragHandleProps}
        className={`${
          snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"
        } flex justify-between items-center px-4 py-1 my-2 text-gray-60 border rounded`}
      >
        <div>
          <input
            type="checkbox"
            defaultChecked={completed}
            onChange={() => {
              handleCompleteChange(id);
            }}
          />
        </div>
        <span className={completed ? "line-through" : undefined}>{title}</span>
        <div className="items-center">
          <button
            onClick={() => {
              handleClick(id);
            }}
          >
            x
          </button>
        </div>
      </div>
    );
  }
);

export default List;
