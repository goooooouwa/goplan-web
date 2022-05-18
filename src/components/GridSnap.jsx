import interact from "interactjs";
import React, { useEffect, useState } from "react";

export default function GridSnap(props) {
  const gridSnapRef = React.createRef();
  const [elemX, setElemX] = useState("");

  useEffect(() => {
    const gridElem = gridSnapRef.current;
    const x = gridElem.offsetWidth * props.initialColumn;
    gridElem.style.transform = 'translateX(' + x + 'px)';
    setElemX(x.toString());
  }, [gridSnapRef, props.initialColumn]);

  useEffect(() => {
    const gridElem = gridSnapRef.current;
    const gridSnap = interact(gridElem);
    gridSnap
      .draggable({
        origin: "parent",
        lockAxis: 'x',
        autoScroll: true,
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
          move: (event) => {
            let target = event.target;
            let x = (parseFloat(elemX) || 0) + event.dx;
            target.style.transform = 'translateX(' + x + 'px)';
            setElemX(x.toString());
          }
        }
      });

    return () => {
      gridSnap.unset();
    };
  }, [gridSnapRef]);

  return (
    <>
      <div className="grid-line">
        <div ref={gridSnapRef} className="grid-snap">
          {props.title}
        </div>
      </div>
    </>
  );
}
