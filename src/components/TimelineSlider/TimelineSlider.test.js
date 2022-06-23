import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, screen, render } from '@testing-library/react';
import TimelineSlider from './TimelineSlider';

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
     <TimelineSlider
       marks={marks}
       rangeMin={0}
       rangeMax={4}
       rangeStart={1}
       disableRangeStart={false}
       handleChangeCommited={() => {}}
     />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('should update slider value if props.rangeStart changed', () => {
  const { rerender } = render(
     <TimelineSlider
       marks={marks}
       rangeMin={0}
       rangeMax={4}
       rangeStart={1}
       disableRangeStart={false}
       handleChangeCommited={() => {}}
     />
  );
  expect(screen.getByRole('slider')).toHaveValue('1');

  rerender(
     <TimelineSlider
       marks={marks}
       rangeMin={0}
       rangeMax={4}
       rangeStart={0}
       disableRangeStart={false}
       handleChangeCommited={() => {}}
     />
  );
  expect(screen.getByRole('slider')).toHaveValue('0');
});

it('should change rangeStart when new value selected', async () => {
  const handleChangeCommited = jest.fn();
  render(
     <TimelineSlider
       marks={marks}
       rangeMin={0}
       rangeMax={4}
       rangeStart={1}
       disableRangeStart={false}
       handleChangeCommited={handleChangeCommited}
     />
  );
  fireEvent.change(screen.getByRole('slider'), {target: {value: '2'}});
  expect(screen.getByRole('slider')).toHaveValue('2');
});

it('should call #handleChangeCommited with new rangeStart when new value selected', async () => {
  const handleChangeCommited = jest.fn();
  render(
     <TimelineSlider
       marks={marks}
       rangeMin={0}
       rangeMax={4}
       rangeStart={1}
       disableRangeStart={false}
       handleChangeCommited={handleChangeCommited}
     />
  );
  fireEvent.change(screen.getByRole('slider'), {target: {value: '2'}});
  expect(handleChangeCommited).toHaveBeenCalledTimes(1);
  expect(handleChangeCommited).toHaveBeenCalledWith([2,2]);
});

it('should not change rangeStart if disabled', () => {
  const handleChangeCommited = jest.fn();
  render(
     <TimelineSlider
       marks={marks}
       rangeMin={0}
       rangeMax={4}
       rangeStart={1}
       disableRangeStart={true}
       handleChangeCommited={handleChangeCommited}
     />
  );

  fireEvent.change(screen.getByRole('slider'), {target: {value: '2'}});
  expect(screen.getByRole('slider')).toHaveValue('1');
  expect(handleChangeCommited).toHaveBeenCalledTimes(1);
  expect(handleChangeCommited).toHaveBeenCalledWith([1,1]);
});
