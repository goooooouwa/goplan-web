import interact from "interactjs";
import React from "react";

export default function Draggable() {
  const position = { x: 0, y: 0 }

  interact('.draggable').draggable({
    listeners: {
      start(event) {
        console.log(event.type, event.target)
      },
      move(event) {
        position.x += event.dx
        position.y += event.dy

        event.target.style.transform =
          `translate(${position.x}px, ${position.y}px)`
      },
    }
  })
  return (
    <>
      <div className="draggable"></div>
    </>
  );
}
