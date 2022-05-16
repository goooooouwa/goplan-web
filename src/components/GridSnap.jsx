import interact from "interactjs";
import React from "react";

export default function GridSnap() {
    var x = 0; var y = 0;

    interact("#grid-snap1")
        .draggable({
            modifiers: [
                interact.modifiers.snap({
                    targets: [
                        interact.snappers.grid({
                            x: 360,
                            y: 48,
                            limits: {
                                top: 0,
                                left: 0,
                                bottom: 48,
                                right: 360*3
                            }
                        })
                    ],
                    range: Infinity,
                    relativePoints: [{ x: 0, y: 0 }]
                }),
                interact.modifiers.restrict({
                    elementRect: { top: 0, left: 0, bottom: 0, right: 0 },
                    restriction: 'parent',
                })
            ],
            inertia: true
        })
        .on('dragmove', function (event) {
            x += event.dx
            y += event.dy

            event.target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
        });
    interact("#grid-snap2")
        .draggable({
            modifiers: [
                interact.modifiers.snap({
                    targets: [
                        interact.snappers.grid({
                            x: 360,
                            y: 48,
                            limits: {
                                top: 0,
                                left: 0,
                                bottom: 48,
                                right: 360*3
                            }
                        })
                    ],
                    range: Infinity,
                    relativePoints: [{ x: 0, y: 0 }]
                }),
                interact.modifiers.restrict({
                    elementRect: { top: 0, left: 0, bottom: 0, right: 0 },
                    restriction: 'parent',
                })
            ],
            inertia: true
        })
        .on('dragmove', function (event) {
            x += event.dx
            y += event.dy

            event.target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
        });
    interact("#grid-snap3")
        .draggable({
            modifiers: [
                interact.modifiers.snap({
                    targets: [
                        interact.snappers.grid({
                            x: 360,
                            y: 48,
                            limits: {
                                top: 0,
                                left: 0,
                                bottom: 48,
                                right: 360*3
                            }
                        })
                    ],
                    range: Infinity,
                    relativePoints: [{ x: 0, y: 0 }]
                }),
                interact.modifiers.restrict({
                    elementRect: { top: 0, left: 0, bottom: 0, right: 0 },
                    restriction: 'parent',
                })
            ],
            inertia: true
        })
        .on('dragmove', function (event) {
            x += event.dx
            y += event.dy

            event.target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
        });

    return (
        <>
            <div id="grid-snap1">
                Dragging is constrained to the corners of a grid
            </div>
            <div id="grid-snap2">
                Dragging is constrained to the corners of a grid
            </div>
            <div id="grid-snap3">
                Dragging is constrained to the corners of a grid
            </div>
        </>
    );
}
