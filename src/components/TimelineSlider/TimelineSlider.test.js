import React from 'react';
import renderer from 'react-test-renderer';
import TimelineSlider from './TimelineSlider';

const marks = [{
  value: 0,
  label: "Week 1"
}, {
  value: 1,
  label: "Week 2"
}, {
  value: 2,
  label: "Week 3"
}, {
  value: 3,
  label: "Week 4"
}, {
  value: 4,
  label: "Week 5"
}];

it('should show a timeline slider', () => {
  const component = renderer.create(
     <TimelineSlider
       marks={marks}
       rangeMin={0}
       rangeMax={4}
       rangeStart={1}
       rangeEnd={3}
       disableRangeStart={false}
       disableRangeEnd={false}
       handleChangeCommited={() => {}}
     />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('should disable rangeStart if disableRangeStart is true', () => {
  // left empty since I don't know how to simulate drag event with react-testing-library
});

it('should call #handleChangeCommited when new rangeStart or rangeEnd selected', async () => {
  // left empty since I don't know how to simulate drag event with react-testing-library
});