import React from "react";
import { Droppable } from "react-beautiful-dnd";

const CategoryContainer = ({ children, category }) => {
  return (
    <Droppable droppableId={category}>
      {(provided) => (
        <div
          className='flex flex-col h-full border-2 rounded-md p-2 overflow-auto'
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default CategoryContainer;
