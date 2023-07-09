import React, { useState } from "react";

const List = React.memo(
  ({ id, title, completed, todoData, setTodoData, provided, snapshot }) => {
    const handleClick = (id) => {
      let newTodoData = todoData.filter((todo) => todo.id !== id);
      setTodoData(newTodoData);
    };

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);

    const handleCompleteChange = (id) => {
      let newTodoData = todoData.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
      setTodoData(newTodoData);
    };

    const handleEditChange = (e) => {
      setEditedTitle(e.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      let newTodoData = todoData.map((todo) => {
        if (todo.id === id) {
          todo.title = editedTitle;
        }
        return todo;
      });
      setTodoData(newTodoData);
      setIsEditing(false);
    };

    if (isEditing) {
      return (
        <div className="bg-gray-100 flex justify-between items-center px-4 py-1 my-2 text-gray-60 border rounded">
          <form onSubmit={handleSubmit}>
            <input
              value={editedTitle}
              onChange={handleEditChange}
              className="w-full px-3 py-2 mr-4 text-gray-500 rounded"
            />
          </form>
          <div className="items-center">
            <button
              className="px-4 py-2 float-right"
              onClick={() => {
                setIsEditing(false);
              }}
            >
              x
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 float-right"
              type="submit"
            >
              save
            </button>
          </div>
        </div>
      );
    } else {
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
          <span className={completed ? "line-through" : undefined}>
            {title}
          </span>
          <div className="items-center">
            <button
              className="px-4 py-2 float-right"
              onClick={() => {
                handleClick(id);
              }}
            >
              x
            </button>
            <button
              className="px-4 py-2 float-right"
              onClick={() => {
                setIsEditing(true);
              }}
            >
              edit
            </button>
          </div>
        </div>
      );
    }
  }
);

export default List;
