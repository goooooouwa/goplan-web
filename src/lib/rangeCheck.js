export default function isInYearRange(date, selectedYear) {
    return date.isValid() && (date.isAfter(selectedYear.startOf("year")) && date.isBefore(selectedYear.endOf("year")));
};

export function isInMonthRange(date, selectedMonth) {
    return date.isValid() && (date.isAfter(selectedMonth.startOf("month")) && date.isBefore(selectedMonth.endOf("month")));
};

export function isInWeekRange(date, selectedWeek) {
    return date.isValid() && (date.isAfter(selectedWeek.startOf("week")) && date.isBefore(selectedWeek.endOf("week")));
};