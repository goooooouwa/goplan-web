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

export function marksForYear(selectedYear) {
  const marks = [
    {
      value: 0,
      headerLabel: 'Jan',
      label: selectedYear.clone().startOf("year").format("MMM, YYYY"),
    },
    {
      value: 1,
      headerLabel: 'Feb',
      label: selectedYear.clone().startOf("year").add(1, "months").format("MMM, YYYY"),
    },
    {
      value: 2,
      headerLabel: 'Mar',
      label: selectedYear.clone().startOf("year").add(2, "months").format("MMM, YYYY"),
    },
    {
      value: 3,
      headerLabel: 'Apr',
      label: selectedYear.clone().startOf("year").add(3, "months").format("MMM, YYYY"),
    },
    {
      value: 4,
      headerLabel: 'May',
      label: selectedYear.clone().startOf("year").add(4, "months").format("MMM, YYYY"),
    },
    {
      value: 5,
      headerLabel: 'Jun',
      label: selectedYear.clone().startOf("year").add(5, "months").format("MMM, YYYY"),
    },
    {
      value: 6,
      headerLabel: 'Jul',
      label: selectedYear.clone().startOf("year").add(6, "months").format("MMM, YYYY"),
    },
    {
      value: 7,
      headerLabel: 'Aug',
      label: selectedYear.clone().startOf("year").add(7, "months").format("MMM, YYYY"),
    },
    {
      value: 8,
      headerLabel: 'Sep',
      label: selectedYear.clone().startOf("year").add(8, "months").format("MMM, YYYY"),
    },
    {
      value: 9,
      headerLabel: 'Oct',
      label: selectedYear.clone().startOf("year").add(9, "months").format("MMM, YYYY"),
    },
    {
      value: 10,
      headerLabel: 'Nov',
      label: selectedYear.clone().startOf("year").add(10, "months").format("MMM, YYYY"),
    },
    {
      value: 11,
      headerLabel: 'Dec',
      label: selectedYear.clone().startOf("year").add(11, "months").format("MMM, YYYY"),
    },
  ];
  const rangeMin = 0;
  const rangeMax = marks.length - 1;
  return [marks, rangeMin, rangeMax];
}