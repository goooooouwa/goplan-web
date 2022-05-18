import interact from "interactjs";
import React, { useEffect, useState } from "react";

export default function Draggable() {
  useEffect(() => {
    interact('.draggable').draggable({
      listeners: {
        start(event) {
          console.log(event.type, event.target)
        },
        move(event) {
          let x = (parseFloat(event.target.getAttribute('data-x')) || 0) + event.dx

          event.target.style.transform =
            `translate(${x}px)`

          event.target.setAttribute('data-x', x);
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
