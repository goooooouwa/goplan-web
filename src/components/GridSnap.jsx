import interact from "interactjs";
import React from "react";

export default function GridSnap() {
  interact(".grid-snap")
    .draggable({
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
          endOnly: true
        })
      ],
      autoScroll: true,
      listeners: {
        move(event) {
          let target = event.target;
          let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
          target.style.transform = 'translateX(' + x + 'px)';
          target.setAttribute('data-x', x);
        }
      }
    });

  return (
    <>
      <div className="grid-line">
        <div className="grid-snap">
          Drag
        </div>
      </div>
      <div className="grid-line">
        <div className="grid-snap">
          Drag
        </div>
      </div>
      <div className="grid-line">
        <div className="grid-snap">
          Drag
        </div>
      </div>
      <div className="grid-line">
        <div className="grid-snap">
          Drag
        </div>
      </div>
      <div className="grid-line">
        <div className="grid-snap">
          Drag
        </div>
      </div>
      <div className="grid-line">
        <div className="grid-snap">
          Drag
        </div>
      </div>
    </>
  );
}
