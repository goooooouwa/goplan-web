import interact from "interactjs";
import React, { useEffect } from "react";

export default function GridSnap(props) {
  const gridSnapRef = React.createRef();

  useEffect(() => {
    const gridElem = gridSnapRef.current;
    const x = gridElem.offsetWidth * props.initialColumn;
    gridElem.style.transform = 'translateX(' + x + 'px)';
    gridElem.setAttribute('data-x', x);
  }, []);

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
            let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            target.style.transform = 'translateX(' + x + 'px)';
            target.setAttribute('data-x', x);

            let column = Number((event.target.getAttribute('data-x') / event.target.offsetWidth).toFixed());
            props.handleColumnChange(column);
          }
        }
      });

    return () => {
      gridSnap.unset();
    };
  }, [gridSnapRef, props]);

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
