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
  const [items, updateItems] = useState(sampleData);

  const onEnd = result => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    // use draggableId (convert to int) to see what was moved.
    const draggedItem = items[source.index];
    // create copy of array of items (from state)
    const newOrderArr = [...items];
    // splice out moved item from its original location
    newOrderArr.splice(source.index, 1);
    // splice in item into new location
    newOrderArr.splice(destination.index, 0, draggedItem)
    // update the state with the updated array order
    updateItems([...newOrderArr])
    // push new array order to DB to be updated
  }

  return (
    <DragDropContext onDragEnd={onEnd}>
      <Droppable droppableId='droppable'>
        {provided => (
          <div
            css={container}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {items && items.map((item, index) => {
              return (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                  {provided => (
                    <div
                      css={itemStyle}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <span>{item.name}</span>
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
  {
    "_id": "5ed056e6c3f9d5ff885f42b1",
    "objectives": [
      "5ee14991964510a43fb50b75",
      "5ee53e13c1f2b01dabd64108",
      "5ee54219a106e52b61d5d711",
      "5ee5593a552e3037916833be",
      "5ee5594b552e3037916833bf",
      "5eeba5619e77ac7b34e95d57",
      "5eee8e1538256b2a82315ca5",
      "5eee8e4438256b2a82315ca7",
      "5ef264a208ac0b761ee6db95"
    ],
    "grade": 6,
    "order": 1,
    "name": "Ratios",
    "subject": "Mathematics",
    "description": "In this playlist you will learn what a ratio is, and how you can use ratios to describe quantities between multiple objects.  You will also learn about rates, unit rates, and how those relate to ratios.",
    "course": "5ed0135632111febcace5d1a",
    "type": "ESSENTIAL",
    "__v": 9
  }, {
    "_id": "5ed0572cc3f9d5ff885f42b2",
    "objectives": [],
    "grade": 6,
    "order": 2,
    "name": "Ratio Reasoning",
    "subject": "Mathematics",
    "description": "In this playlist you are going to learn ho to solve real-world problems using ratios and rates. You will use a variety of strategies, like diagrams and equations to solve problems.",
    "course": "5ed0135632111febcace5d1a",
    "type": "CORE",
    "__v": 0
  }, {
    "_id": "5ed057a7c3f9d5ff885f42b3",
    "objectives": [],
    "grade": 6,
    "order": 3,
    "name": "Fraction Division",
    "subject": "Mathematics",
    "description": "In this playlist you will learn to divide with fractions. This means you are going to learn hot to solve division problems with fractions and whole numbers, as well as solve division problems with only fractions.",
    "course": "5ed0135632111febcace5d1a",
    "type": "ESSENTIAL",
    "__v": 0
  }, {
    "_id": "5ed0582ac3f9d5ff885f42b4",
    "objectives": [],
    "grade": 6,
    "order": 4,
    "name": "Multi-Digit Computation",
    "subject": "Mathematics",
    "description": "In this playlist you will review the skills of multiplying, dividing, adding and subtracting with multi-digit numbers.",
    "course": "5ed0135632111febcace5d1a",
    "type": "CORE",
    "__v": 0
  },
  {
    "_id": "5ed06a6ea826340adcbde3c1",
    "objectives": [],
    "grade": 6,
    "order": 5,
    "name": "asdfs",
    "subject": "Mathematics",
    "description": "sdfasdff",
    "course": "5ed0135632111febcace5d1a",
    "type": "CORE",
    "__v": 0
  },
  {
    "_id": "5ed06b0fe5a3050b5881a31e",
    "objectives": [],
    "grade": 6,
    "order": 6,
    "name": "Repeating Decimals",
    "subject": "Mathematics",
    "description": "In the playlist you will lean to convert repeating decimals to fractions!",
    "course": "5ed0135632111febcace5d1a",
    "type": "CHALLENGE",
    "__v": 0
  },
  {
    "_id": "5ed06ba8e5a3050b5881a31f",
    "objectives": [],
    "grade": 6,
    "order": 7,
    "name": "Surface Area",
    "subject": "Mathematics",
    "description": "In this playlist you will learn to compute the surface area of rectangular solids.",
    "course": "5ed0135632111febcace5d1a",
    "type": "ESSENTIAL",
    "__v": 0
  },
  {
    "_id": "5ed06c0ee5a3050b5881a320",
    "objectives": [],
    "grade": 6,
    "order": 8,
    "name": "Volume",
    "subject": "Mathematics",
    "description": "In this playlist you will learn to find the volume of rectangular solids.  Rectangular solids are three-dimensional objects, like a box, fish tank, or book.",
    "course": "5ed0135632111febcace5d1a",
    "type": "ESSENTIAL",
    "__v": 0
  },
]

export default dragTest;

