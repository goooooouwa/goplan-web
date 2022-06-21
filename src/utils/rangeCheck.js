export default function isInYearRange(date, selectedYear) {
    return date.isValid() && (date.isAfter(selectedYear.clone().startOf("year")) && date.isBefore(selectedYear.clone().endOf("year")));
};

export function isInMonthRange(date, selectedMonth) {
    return date.isValid() && (date.isAfter(selectedMonth.clone().startOf("month")) && date.isBefore(selectedMonth.clone().endOf("month")));
};

export function isInWeekRange(date, selectedWeek) {
    return date.isValid() && (date.isAfter(selectedWeek.clone().startOf("week")) && date.isBefore(selectedWeek.clone().endOf("week")));
};