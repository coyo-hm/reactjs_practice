import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card } from "../style";

interface IDraggableCardProps {
  toDo: string;
  idx: number;
}

function DraggableCard({ toDo, idx }: IDraggableCardProps) {
  return (
    <Draggable draggableId={toDo} index={idx}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
