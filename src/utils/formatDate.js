import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isBetween from 'dayjs/plugin/isBetween';
import timezone from 'dayjs/plugin/timezone';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

import { unixTimeStampToDate } from './dates';
import { capitalizeFirstLetter } from './formatText';

import 'dayjs/locale/id';

// browser agent is safari
const safariAgent = navigator.vendor.match(/apple/i);

export const createLocalDate = (date) => {
  return dayjs(date).locale('id');
};

const dateDeviation = (start, end) => {
  dayjs.extend(relativeTime);
  const date1 = new Date(start);
  const date2 = new Date(end);
  const a = dayjs(date2);
  const deviation = dayjs(date1).locale('id').to(a);
  return deviation ? capitalizeFirstLetter(deviation) : '';
};

const timeToDate = (time) => {
  const date = new Date(time);
  return formatDate(date);
};

const parseUTCDate = (date) => {
  const partsDate = date.split(' ');

  return new Date(`${partsDate[0]}T${partsDate[1]}Z`);
};

const formatDate = (date, separator = '-', month = 'MM', useUtc = true) => {
  dayjs.extend(utc);
  return isDate(date)
    ? useUtc
      ? dayjs(date).utc().format(`DD${separator}${month}${separator}YYYY`)
      : dayjs(date)
          .locale('id')
          .format(`DD${separator}${month}${separator}YYYY`)
    : '-';
};

const formatDateEng = (date, separator = '-') => {
  return isDate(date)
    ? dayjs(date).format(`YYYY${separator}MM${separator}DD`)
    : '-';
};

const formatDateWithTime = (date, isUnix = false, fullDate) => {
  let dDate = date;

  // is safari agent from browser
  if (safariAgent && !isUnix) {
    // format to ISO 8601 in safari e.g 2023-01-01T01:01:00
    dDate = new Date(dDate.slice(0, 19).replace(/\s/, 'T'));
  }

  const newDate = isUnix ? dayjs.unix(dDate) : dayjs(dDate);
  return isDate(dDate)
    ? newDate
        .locale('id')
        .format(fullDate ? 'DD MMMM YYYY, HH:mm:ss' : 'DD MMMM YYYY, HH:mm')
    : '-';
};

const formatDateEngWithTime = (date, separator = '-', format = 'full') => {
  let formatTime = '';

  switch (format) {
    case 'full':
      formatTime = `YYYY${separator}MM${separator}DD HH:mm:ss`;
      break;
    case 'withoutMinute':
      formatTime = `YYYY${separator}MM${separator}DD HH`;
      break;
    case 'withoutSecond':
      formatTime = `YYYY${separator}MM${separator}DD HH:mm`;
      break;
    default:
      formatTime = `YYYY${separator}MM${separator}DD HH:mm:ss`;
  }

  return isDate(date) ? dayjs(date).format(formatTime) : '';
};

const formatDateEngUtcWithTime = (date, separator = '-') => {
  dayjs.extend(utc);
  return isDate(date)
    ? dayjs(date).utc().format(`YYYY${separator}MM${separator}DD HH:mm:ss`)
    : '';
};

const formatDateWithDay = (date, format = 'dddd, DD MMMM YYYY') => {
  return isDate(date) ? dayjs(date).locale('id').format(format) : '-';
};

export const isDate = (dateStr) => {
  return !isNaN(new Date(dateStr).getDate());
};

export const timeDeviation = (time, sparator = '-') => {
  dayjs.extend(relativeTime);
  let times;
  if (time) {
    times = time.split(sparator);
  } else {
    times = '00:00 - 00:00'.split(sparator);
  }

  if (!dayjs(times[0]).isValid() || !dayjs(times[1]).isValid()) {
    return '-';
  }
  const start = times[0].split(':');
  const end = times[1].split(':');

  const h = dayjs().hour(end[0]);
  const hour = dayjs().locale('id').hour(start[0]).to(h, true);

  const m2 = dayjs().minute(end[1]);
  const minute = dayjs().locale('id').minute(start[1]).to(m2, true);
  return `${hour} ${minute}`;
};

const formatIndonesianTimezone = (date) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const userTimezone = dayjs.tz.guess();
  return isDate(date) && userTimezone
    ? dayjs(date).tz(userTimezone).format('HH:mm')
    : '-';
};

const countDiffDate = (startDate, endDate) => {
  const d1 = new Date(unixTimeStampToDate(startDate));
  const d2 = new Date(unixTimeStampToDate(endDate));
  let months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
};

const translateToDay = (day) => {
  if (day === 0) return 'Minggu';
  if (day === 1) return 'Senin';
  if (day === 2) return 'Selasa';
  if (day === 3) return 'Rabu';
  if (day === 4) return 'Kamis';
  if (day === 5) return 'Jumat';
  if (day === 6) return 'Sabtu';
};

const getDay = (date) => {
  const curentDate = new Date(date);
  return translateToDay(dayjs(curentDate).get('day'));
};

const dateTimeToTimes = (date) => {
  if (date) {
    const convertedDate = new Date(date);
    const hours =
      convertedDate.getHours() <= 9
        ? `0${convertedDate.getHours()}`
        : convertedDate.getHours();
    const minutes =
      convertedDate.getMinutes() <= 9
        ? `0${convertedDate.getMinutes()}`
        : convertedDate.getMinutes();
    return `${hours}:${minutes}`;
  } else {
    return '';
  }
};

const getUtcHour = (time) => {
  return new Date(time).getUTCHours();
};

const getUtcMinute = (time) => {
  return new Date(time).getUTCMinutes();
};

const isoStringToTime = (date, useUtc = true) => {
  dayjs.extend(utc);
  return isDate(date)
    ? useUtc
      ? dayjs(date).utc().format('HH:mm')
      : dayjs(date).locale('id').format('HH:mm')
    : '-';
};

const dateDifference = (start, end) => {
  const date1 = new Date(start);
  const date2 = new Date(end);

  if (date2.getFullYear() - date1.getFullYear() > 0) {
    return `${date2.getFullYear() - date1.getFullYear()} Tahun`;
  } else if (
    Math.floor((date2.getTime() - date1.getTime()) / (24 * 3600 * 1000)) > 30
  ) {
    return `${date2.getMonth() - date1.getMonth()} Bulan`;
  } else {
    return `${Math.floor(
      (date2.getTime() - date1.getTime()) / (24 * 3600 * 1000)
    )} Hari`;
  }
};

const generateArrayOfYears = (length) => {
  const max = new Date().getFullYear();
  const min = max - length;
  const years = [];

  for (let i = max; i > min; i--) {
    years.push(i);
  }
  return years;
};

const timeExtendFromNow = (date, extend) => {
  return dayjs(date)
    .add(Number(extend), 'minute')
    .format('YYYY-MM-DD HH:mm:ss');
};

const isDateBetween = (date, minDate, maxDate) => {
  dayjs.extend(isBetween);
  const betweenDate = dayjs(date).isBetween(minDate, maxDate, 'day', '[)');
  return maxDate && minDate ? betweenDate : true;
};

const calculateBirthDate = (date) => {
  dayjs.extend(duration);
  dayjs.extend(relativeTime);

  const birthDate = createLocalDate(date);
  const today = createLocalDate();

  const years = today.diff(birthDate, 'year');
  const months = today.diff(birthDate.add(years, 'year'), 'month');
  const days = today.diff(
    birthDate.add(years, 'year').add(months, 'month'),
    'day'
  );
  return { years, months, days };
};

export {
  formatDate,
  parseUTCDate,
  formatDateEng,
  dateDeviation,
  isoStringToTime,
  formatDateWithTime,
  formatDateWithDay,
  timeToDate,
  formatIndonesianTimezone,
  countDiffDate,
  getDay,
  dateTimeToTimes,
  translateToDay,
  getUtcHour,
  getUtcMinute,
  dateDifference,
  formatDateEngWithTime,
  generateArrayOfYears,
  timeExtendFromNow,
  isDateBetween,
  formatDateEngUtcWithTime,
  calculateBirthDate,
};
