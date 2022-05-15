import interact from "interactjs";
import React from "react";

export default function GridSnap() {
    var x = 0; var y = 0;

    interact("#grid-snap")
        .draggable({
            modifiers: [
                interact.modifiers.snap({
                    targets: [
                        interact.snappers.grid({ x: 30, y: 30 })
                    ],
                    range: Infinity,
                    relativePoints: [{ x: 0, y: 0 }]
                }),
                interact.modifiers.restrict({
                    elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
                    endOnly: true
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
            <div id="grid-snap">
                Dragging is constrained to the corners of a grid
            </div>
        </>
    );
}
