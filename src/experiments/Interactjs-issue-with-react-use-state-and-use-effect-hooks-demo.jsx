import interact from "interactjs";
import React, { useEffect, useState } from "react";

export default function Draggable() {
  const [positionX, setPositionX] = useState(0);

  // This issue has to do with the following combination:
  // - add interactjs event listeners inside useEffect
  // - set react useEffect dependency list as []
  // - call react setState method inside event listeners
  // Result:
  // interactjs actions not working properly

  useEffect(() => {
    interact('.draggable').draggable({
      listeners: {
        start(event) {
          console.log(event.type, event.target)
        },
        move(event) {
          let positionx = positionX + event.dx

          event.target.style.transform =
            `translate(${positionx}px)`

          setPositionX(positionx)
        },
      }
    })
  },[]);
  return (
    <>
      <div className="draggable">Drag me</div>
    </>
  );
}
