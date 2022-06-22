import moment from 'moment';
import isInYearRange, { isInMonthRange, isInWeekRange } from './rangeCheck';

moment.locale('zh-cn');

it('isInYearRange', () => {
  const date = moment('2022-01-01');
  const selectedYear = moment('2022-07-03');
  expect(isInYearRange(date, selectedYear)).toBe(true);
});

it('isInMonthRange', () => {
  const date = moment('2022-07-14');
  const selectedMonth = moment('2022-07-03');
  expect(isInMonthRange(date, selectedMonth)).toBe(true);
});

it('isInWeekRange', () => {
  const date = moment('2022-01-01');
  const selectedWeek = moment('2022-01-02');
  expect(isInWeekRange(date, selectedWeek)).toBe(true);
});
