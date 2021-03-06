import { Rnd } from "react-rnd";
import React, { useEffect, useState } from 'react'

const gridSnapStyle = {
  width: "100px",
  height: "50px",
  backgroundColor: "#29e",
  color: "#fff",
}

const gridLineStyle = {
  width: "1200px",
  height: "50px",
}

export default function GridSnap(props) {
  const [width, setWidth] = useState(100);
  const height = 50;
  const [x, setX] = useState(0);
  const y = 0;

  function handleDragStop(event, data) {
    const columnDelta = Math.floor((data.x - x) / width);
    setX(data.x);
    props.handleColumnChange(columnDelta);
  }

  useEffect(() => {
    setX(props.initColumn * width);
  }, []);

  return (
    <>
      <div style={gridLineStyle}>
        <Rnd
          style={gridSnapStyle}
          size={{ width: width, height: height }}
          position={{ x: x, y: y }}
          onResize={(e, direction, ref, delta, position) => {
            setWidth(ref.offsetWidth);
            setX(position.x);
          }}
          resizeGrid={[100, 30]}
          dragGrid={[100, 30]}
          dragAxis={'x'}
          bounds={'parent'}
          onDragStop={handleDragStop}
        >
          {props.title}
        </Rnd>
      </div>
    </>
  );
}