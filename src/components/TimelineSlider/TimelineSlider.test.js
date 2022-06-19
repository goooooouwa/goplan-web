import React from 'react';
import renderer from 'react-test-renderer';
import TimelineSlider from './TimelineSlider';

it('changes the class when hovered', () => {
    const marks = [{
        value: 1,
        label: "Week 1"
    },{
        value: 2,
        label: "Week 2"
    }];
    const component = renderer.create(
        <TimelineSlider
            marks={marks}
            rangeMin={0}
            rangeMax={4}
            rangeStart={1}
            rangeEnd={3}
            disableRangeStart={true}
            disableRangeEnd={false}
            handleChangeCommited={() => {}}
        />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // // manually trigger the callback
    // renderer.act(() => {
    //     tree.props.onMouseEnter();
    // });
    // // re-rendering
    // tree = component.toJSON();
    // expect(tree).toMatchSnapshot();

    // // manually trigger the callback
    // renderer.act(() => {
    //     tree.props.onMouseLeave();
    // });
    // // re-rendering
    // tree = component.toJSON();
    // expect(tree).toMatchSnapshot();
});