import {formatDate} from '@/src/utils/formatDate';
import dayjs from 'dayjs';
import {isDate, isNumber, isString} from 'lodash';

export const dateToString = (date: Date) => {
  const newDate = date.toISOString().replace(/T|Z|\.\d{3}/g, ' ').trim();
  return newDate;
};

export const stringToDate = (date: string) => {
  const newDate = new Date(date).toDateString();
  const dayNumber = newDate.slice(8, 10);
  const month = newDate.slice(4, 7);
  const year = newDate.slice(11, 15);
  return `${dayNumber} ${month} ${year}`;
};

// format date for body params 'yyyy-mm-dd'
export const dateParams = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth()+1;
  const newDate = date.getDate();
  const thedates =
    `${year}-${month.toString().padStart(2, '0')}-${newDate.toString().padStart(2, '0')}`;
  return thedates;
};

// unix timestamp to date
export const unixTimeStampToDate = (date: number) => {
  if (!date) return '-';
  let newDate;
  if (date.toString()?.length === 10) {
    newDate = new Date(date * 1000);
  } else {
    newDate = new Date(date);
  }
  return stringToDate(newDate.toDateString());
};

export const dateToUnixTimeStamp = (date: any, isStartDate: boolean = false, isSecond: boolean = true) => {
  if (!date) return;
  let newDate: any = new Date(date);
  if (isStartDate) {
    newDate = new Date(date).setHours(0, 0, 0, 0);
  } else {
    newDate = new Date(date).setHours(23, 59, 59, 999);
  }

  if (isSecond) {
    return Math.floor(newDate / 1000).toFixed(0);
  } else {
    return newDate;
  }
};

export const formatDatePeriode = (startDuration: string, endDuration: string, validation = true) => {
  if (!isDate(startDuration) && !isDate(endDuration) && validation) {
    return '-';
  }

  const formatStartDuration = formatDate(startDuration, '/', 'MMM');
  const formatEndDuration = formatDate(endDuration, '/', 'MMM');
  return `${formatStartDuration} - ${formatEndDuration}`;
};

/*
  * calcDate() : Calculates the difference between two dates
  * @startDate : First Date in the format MM-DD-YYYY or timestamp
  * @endDate : Second Date in the format MM-DD-YYYY or timestamp
  * return : total days and result in text
  */
export const calcDate = (startDate: string | number, endDate: string | number) => {
  const todayTimestamp = new Date().getTime();

  const startDateInstance = new Date(startDate);
  const endDateInstance = new Date(endDate);

  const startDateTimestamp = startDateInstance.getTime() + (Math.abs(todayTimestamp - startDateInstance.getTime()));
  const endDateTimestamp = endDateInstance.getTime();

  let calc: any;

  if (startDateTimestamp > endDateTimestamp) {
    calc = new Date(startDateTimestamp - endDateTimestamp);
  } else {
    calc = new Date(endDateTimestamp - startDateTimestamp);
  }

  const calcFormatTmp = calc.getDate() + '-' + (calc.getMonth() + 1) + '-' + calc.getFullYear();
  const calcFormat = calcFormatTmp.split('-').map((item) => Number(item));

  const daysPassed = Number(Math.abs(calcFormat[0]));
  const monthsPassed = Number(Math.abs(calcFormat[1]) - 1);
  const yearsPassed = Number(Math.abs(calcFormat[2]) - 1970);

  const totalDays = (yearsPassed * 365) + (monthsPassed * 30.417) + daysPassed;

  const yearText = yearsPassed ? `${yearsPassed} tahun` : '';
  const monthText = monthsPassed ? `${monthsPassed} bulan` : '';
  const dayText = daysPassed ? `${daysPassed} hari` : '';

  const result = `${yearText} ${monthText} ${dayText}`;

  return {
    totalDays: Math.round(totalDays),
    result: result.trim(),
  };
};

export const getDay = (date: string) => {
  const weekday = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const d = new Date(date);
  const day = weekday[d.getDay()];
  return day;
};

export const checkPeriodeStatus = (startDuration: any, endDuration: any) => {
  const today = new Date().getTime();

  const getUnixTimestamp = (date: any) => {
    if (isString(date)) {
      return dateToUnixTimeStamp(date);
    } else if (isNumber(date)) {
      return date;
    } else {
      return today;
    }
  };

  const isActive = today > getUnixTimestamp(startDuration) &&
    today < getUnixTimestamp(endDuration);

  return isActive;
};

export const getCountDate = (date: string) => {
  return dayjs(date).daysInMonth();
};

