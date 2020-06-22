import React, { useEffect, useState } from 'react';
import { css } from '@emotion/core';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const container = css`
  background-color: var(--pink);
  height: 80%;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`
const itemStyle = css`
  width: 90%;
  background-color: white;
  margin: 2px 0;
`;


const dragTest = () => {
  const [dataIds, updateDataIds] = useState([]);

  const onEnd = result => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    const dataArray = [...data];
    // remove what was moved
    dataArray.splice(source.index, 1);
    // insert into new location
    dataArray.splice(destination.index, 0, draggableId);
    updateDataIds(dataArray);
  }

  useEffect(() => {
    // create and array to hold order of ID's of the items
    //take data, create array of incoming data ID's
    const itemIds = sampleData.map(item => item.id);
    updateDataIds([...itemIds])
  }, []);

  return (
    <DragDropContext onDragEnd={onEnd}>
      <Droppable droppableId='droppable'>
        {provided => (
          <div
            css={container}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {dataIds && dataIds.map((item, index) => {
              // if (!item.id) return null;
              return (
                <Draggable key={'hi'} draggableId={'hi'} index={index}>
                  {provided => (
                    <div
                      css={itemStyle}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <span>{sampleData.id[item]}</span>
                    </div>
                  )}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

    </DragDropContext>
  );
};

const sampleData = [
  { id: 1, text: 'sample text 1', },
  { id: 2, text: 'sample text 2', },
  { id: 3, text: 'sample text 3', },
  { id: 4, text: 'sample text 4', },
  { id: 5, text: 'sample text 5', },
  { id: 6, text: 'sample text 6', },
  { id: 7, text: 'sample text 7', },
  { id: 8, text: 'sample text 8', },
  { id: 9, text: 'sample text 9', },
  { id: 10, text: 'sample text 10', },
  { id: 11, text: 'sample text 11', },
  { id: 12, text: 'sample text 12', },
]

export default dragTest;

