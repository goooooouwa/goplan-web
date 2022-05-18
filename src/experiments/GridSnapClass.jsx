import interact from "interactjs";
import React, { useEffect, useState } from "react";

export default class GridSnap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elemX: ""
    };
    this.gridSnapRef = React.createRef();
    this.handleDrag = this.handleDrag.bind(this);
  }

  handleDrag(event) {
    let target = event.target;
    let x = (parseFloat(this.state.elemX) || 0) + event.dx;
    target.style.transform = 'translateX(' + x + 'px)';
    this.setState({
      elemX: x.toString()
    });
  }

  componentDidMount() {
    const gridElem = this.gridSnapRef.current;
    const x = gridElem.offsetWidth * this.props.initialColumn;
    gridElem.style.transform = 'translateX(' + x + 'px)';
    this.setState({
      elemX: x.toString()
    });

    this.gridSnap = interact(gridElem);
    this.gridSnap
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
        ]
      }).on('dragmove', this.handleDrag);
  }


  componentWillUnmount() {
    this.gridSnap.unset();
  }

  render() {
    return (
      <>
        <div className="grid-line">
          <div ref={this.gridSnapRef} className="grid-snap">
            {this.state.elemX}
          </div>
        </div>
      </>
    );
  }
}
