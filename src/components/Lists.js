import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import List from "./List";

export default function Lists({ todoData, setTodoData }) {
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
                    <List
                      key={todo.id}
                      id={todo.id}
                      title={todo.title}
                      completed={todo.completed}
                      todoData={todoData}
                      setTodoData={setTodoData}
                      provided={provided}
                      snapshot={snapshot}
                    />
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
