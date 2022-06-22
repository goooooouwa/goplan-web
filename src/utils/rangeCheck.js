export default function isInYearRange(date, selectedYear) {
  return date.isValid() && date.isSame(selectedYear, 'year');
};

export function isInMonthRange(date, selectedMonth) {
  return date.isValid() && date.isSame(selectedMonth, 'month');
};

export function isInWeekRange(date, selectedWeek) {
  return date.isValid() && date.isSame(selectedWeek, 'week');
};