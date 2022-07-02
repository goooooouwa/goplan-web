export default function isInYearRange(date, selectedYear) {
  return date.isValid() && date.isSame(selectedYear, 'year');
}

export function isInQuarterRange(date, selectedQuarter) {
  return date.isValid() && date.isSame(selectedQuarter, 'quarter');
}

export function isInMonthRange(date, selectedMonth) {
  return date.isValid() && date.isSame(selectedMonth, 'month');
}

export function isInWeekRange(date, selectedWeek) {
  return date.isValid() && date.isSame(selectedWeek, 'week');
}

export function nthWeekOfMonth(date, selectedMonth) {
  return Math.ceil(((7 - selectedMonth.clone().endOf("week").date()) + date.date()) / 7);
}
