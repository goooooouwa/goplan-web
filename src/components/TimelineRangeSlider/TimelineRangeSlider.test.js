import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, screen, render } from '@testing-library/react';
import TimelineRangeSlider from './TimelineRangeSlider';

const marks = [{
  value: 0,
  label: "Mark 1"
}, {
  value: 1,
  label: "Mark 2"
}, {
  value: 2,
  label: "Mark 3"
}, {
  value: 3,
  label: "Mark 4"
}, {
  value: 4,
  label: "Mark 5"
}];

it('should show a timeline slider', () => {
  const component = renderer.create(
     <TimelineRangeSlider
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

it('should update slider value if props.rangeStart or props.rangeEnd changed', () => {
  const { rerender } = render(
     <TimelineRangeSlider
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
  expect(screen.getAllByRole('slider')[0]).toHaveValue('1');
  expect(screen.getAllByRole('slider')[1]).toHaveValue('3');

  rerender(
     <TimelineRangeSlider
       marks={marks}
       rangeMin={0}
       rangeMax={4}
       rangeStart={0}
       rangeEnd={2}
       disableRangeStart={false}
       disableRangeEnd={false}
       handleChangeCommited={() => {}}
     />
  );
  expect(screen.getAllByRole('slider')[0]).toHaveValue('0');
  expect(screen.getAllByRole('slider')[1]).toHaveValue('2');
});

it('should change rangeStart or rangeEnd when new value selected', async () => {
  const handleChangeCommited = jest.fn();
  render(
     <TimelineRangeSlider
       marks={marks}
       rangeMin={0}
       rangeMax={4}
       rangeStart={1}
       rangeEnd={3}
       disableRangeStart={false}
       disableRangeEnd={false}
       handleChangeCommited={handleChangeCommited}
     />
  );
  fireEvent.change(screen.getAllByRole('slider')[0], {target: {value: '2'}});
  expect(screen.getAllByRole('slider')[0]).toHaveValue('2');

  fireEvent.change(screen.getAllByRole('slider')[1], {target: {value: '4'}});
  expect(screen.getAllByRole('slider')[1]).toHaveValue('4');
});

it('should call #handleChangeCommited with new rangeStart or rangeEnd when new value selected', async () => {
  const handleChangeCommited = jest.fn();
  render(
     <TimelineRangeSlider
       marks={marks}
       rangeMin={0}
       rangeMax={4}
       rangeStart={1}
       rangeEnd={3}
       disableRangeStart={false}
       disableRangeEnd={false}
       handleChangeCommited={handleChangeCommited}
     />
  );
  fireEvent.change(screen.getAllByRole('slider')[0], {target: {value: '2'}});
  expect(handleChangeCommited).toHaveBeenCalledTimes(1);
  expect(handleChangeCommited).toHaveBeenCalledWith([2,3]);

  fireEvent.change(screen.getAllByRole('slider')[1], {target: {value: '4'}});
  expect(handleChangeCommited).toHaveBeenCalledTimes(2);
  expect(handleChangeCommited).toHaveBeenCalledWith([2,4]);
});

it('should not change rangeStart or rangeEnd if both are disabled', () => {
  const handleChangeCommited = jest.fn();
  render(
     <TimelineRangeSlider
       marks={marks}
       rangeMin={0}
       rangeMax={4}
       rangeStart={1}
       rangeEnd={3}
       disableRangeStart={true}
       disableRangeEnd={true}
       handleChangeCommited={handleChangeCommited}
     />
  );

  fireEvent.change(screen.getAllByRole('slider')[0], {target: {value: '2'}});
  expect(screen.getAllByRole('slider')[0]).toHaveValue('1');
  expect(screen.getAllByRole('slider')[1]).toHaveValue('3');
  expect(handleChangeCommited).toHaveBeenCalledTimes(1);
  expect(handleChangeCommited).toHaveBeenCalledWith([1,3]);
});

it('should only change rangeEnd if rangeStart is disabled', () => {
  const handleChangeCommited = jest.fn();
  render(
     <TimelineRangeSlider
       marks={marks}
       rangeMin={0}
       rangeMax={4}
       rangeStart={1}
       rangeEnd={3}
       disableRangeStart={true}
       disableRangeEnd={false}
       handleChangeCommited={handleChangeCommited}
     />
  );

  fireEvent.change(screen.getAllByRole('slider')[0], {target: {value: '2'}});
  expect(screen.getAllByRole('slider')[0]).toHaveValue('1');
  expect(screen.getAllByRole('slider')[1]).toHaveValue('3');
  expect(handleChangeCommited).toHaveBeenCalledTimes(1);
  expect(handleChangeCommited).toHaveBeenCalledWith([1,3]);

  fireEvent.change(screen.getAllByRole('slider')[1], {target: {value: '2'}});
  expect(screen.getAllByRole('slider')[0]).toHaveValue('1');
  expect(screen.getAllByRole('slider')[1]).toHaveValue('2');
  expect(handleChangeCommited).toHaveBeenCalledTimes(2);
  expect(handleChangeCommited).toHaveBeenCalledWith([1,2]);
});

it('should only change rangeStart if rangeEnd is disabled', () => {
  const handleChangeCommited = jest.fn();
  render(
     <TimelineRangeSlider
       marks={marks}
       rangeMin={0}
       rangeMax={4}
       rangeStart={1}
       rangeEnd={3}
       disableRangeStart={false}
       disableRangeEnd={true}
       handleChangeCommited={handleChangeCommited}
     />
  );

  fireEvent.change(screen.getAllByRole('slider')[1], {target: {value: '2'}});
  expect(screen.getAllByRole('slider')[0]).toHaveValue('1');
  expect(screen.getAllByRole('slider')[1]).toHaveValue('3');
  expect(handleChangeCommited).toHaveBeenCalledTimes(1);
  expect(handleChangeCommited).toHaveBeenCalledWith([1,3]);

  fireEvent.change(screen.getAllByRole('slider')[0], {target: {value: '2'}});
  expect(screen.getAllByRole('slider')[0]).toHaveValue('2');
  expect(screen.getAllByRole('slider')[1]).toHaveValue('3');
  expect(handleChangeCommited).toHaveBeenCalledTimes(2);
  expect(handleChangeCommited).toHaveBeenCalledWith([2,3]);
});
