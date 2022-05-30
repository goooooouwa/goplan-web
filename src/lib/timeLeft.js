import moment from "moment";

export default function elapsedTimeComponents(elapsedTimeInSeconds, startDate, endDate) {
    let milliseconds = 0;

    if (typeof elapsedTimeInSeconds === 'number') {
        milliseconds = Math.round(elapsedTimeInSeconds * 1000);
    } else if (moment(startDate || null).isValid() && moment(endDate || null).isValid()) {
        milliseconds = Math.abs(moment(endDate) - moment(startDate));
    }

    // get total seconds between the times
    let delta = milliseconds / 1000;

    // calculate (and subtract) whole months
    const months = Math.floor(delta / 2629800);
    delta -= months * 2629800;

    // calculate (and subtract) whole weeks
    const weeks = Math.floor(delta / 604800);
    delta -= weeks * 604800;

    // calculate (and subtract) whole days
    const days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    const minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    // what's left is seconds
    const seconds = delta % 60;  // in theory the modulus is not required            

    return [{
        key: 'month',
        label: 'months',
        value: months
    },
    {
        key: 'week',
        label: 'weeks',
        value: weeks
    },
    {
        key: 'day',
        label: 'days',
        value: days
    },
    {
        key: 'hour',
        label: 'hours',
        value: hours
    },
    {
        key: 'minute',
        label: 'minutes',
        value: minutes
    },
    {
        key: 'second',
        label: 'seconds',
        value: seconds
    }];
}
