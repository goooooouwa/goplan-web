import React from 'react';
import renderer from 'react-test-renderer';
import TimelineSlider from './TimelineSlider';

const marks = [{
  value: 1,
  label: "Week 1"
}, {
  value: 2,
  label: "Week 2"
}];

it('should show a timeline slider', () => {
  const component = renderer.create(
    <TimelineSlider
      marks={marks}
      rangeMin={0}
      rangeMax={4}
      rangeStart={1}
      rangeEnd={3}
      disableRangeStart={true}
      disableRangeEnd={false}
      handleChangeCommited={() => { }}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});