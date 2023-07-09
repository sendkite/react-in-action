import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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

  const handleEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(todoData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodoData(items);
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="to-dos">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {todoData.map((todo, index) => (
                <Draggable
                  key={todo.id}
                  draggableId={todo.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      key={todo.id}
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
                          defaultChecked={todo.completed}
                          onChange={() => {
                            handleCompleteChange(todo.id);
                          }}
                        />
                      </div>
                      <span
                        className={todo.completed ? "line-through" : undefined}
                      >
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
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
