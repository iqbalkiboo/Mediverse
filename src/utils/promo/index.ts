const getNearestMinutePromo = (minutes: number, date = new Date()) => {
  if (minutes) {
    return Math.ceil(date.getMinutes() / minutes) * minutes;
  } else {
    return 0;
  }
};

export const getMinTimePromo = (startPeriod?: string) => {
  const nowDate = startPeriod ? new Date(startPeriod) : new Date();

  if (startPeriod) {
    nowDate.setHours(nowDate.getHours(), getNearestMinutePromo(30, nowDate));
  } else {
    nowDate.setHours(nowDate.getHours() + 1, getNearestMinutePromo(30));
  }

  return nowDate;
};
