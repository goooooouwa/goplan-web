import interact from "interactjs";
import React from "react";

export default class Draggable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      x: 0,
      y: 0
    };

    this.handleDrag = this.handleDrag.bind(this);
  }

  handleDrag(event) {
    let positionx = this.state.x + event.dx
    let positiony = this.state.y + event.dy

    event.target.style.transform =
      `translate(${positionx}px, ${positiony}px)`

    this.setState((prevState) => ({
      x: prevState.x + event.dx,
      y: prevState.y + event.dy
    }));
  }

  componentDidMount() {
    interact('.grid-snap').draggable({
      listeners: {
        start(event) {
          console.log(event.type, event.target)
        },
        move: this.handleDrag
      }
    })
  }

  render() {
    return (
      <>
        <div className="grid-line">
          <div className="grid-snap">Interactjs-normal-class-component-demo</div>
        </div>
      </>
    );
  }
}
