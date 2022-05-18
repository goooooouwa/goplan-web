import interact from "interactjs";
import React, { useEffect, useState } from "react";

export default function Draggable(props) {
  const [elemX, setElemX] = useState("");

  useEffect(() => {
    interact('.grid-snap').draggable({
      origin: "parent",
      modifiers: [
        interact.modifiers.snap({
          targets: [
            interact.snappers.grid({
              x: 100,
              y: 50
            })
          ],
          range: Infinity,
          relativePoints: [{ x: 0, y: 0 }]
        }),
        interact.modifiers.restrict({
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
          restriction: 'parent',
        })
      ],
      listeners: {
        move(event) {
          let target = event.target;
          let x = (parseFloat(elemX) || 0) + event.dx;
          target.style.transform = 'translateX(' + x + 'px)';
          setElemX(x.toString());
        }
      }
    });
  });

  return (
    <>
      <div className="grid-line">
        <div className="grid-snap">Interactjs-issue-with-react-hooks-demo</div>
      </div>
    </>
  );
}
