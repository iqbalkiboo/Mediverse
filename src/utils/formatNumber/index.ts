const roundPrice = (value) => {
  if (value === 0) return;

  let twoDigitLast = 0;
  let priceString = String(value);
  let result = 0;

  if (value > 100) {
    twoDigitLast = parseInt(priceString.slice(-2)) || 0;

    if (twoDigitLast >= 50) {
      priceString = priceString.slice(0, -2) + '00';
      result = (parseInt(priceString) || 0) + 100;
    } else {
      priceString = priceString.slice(0, -2) + '00';
      result = parseInt(priceString) || 0;
    }

    return result;
  }

  return value;
};

const formatCustomerPrice = (value: number, sellingFactor: number, ppn: number) => {
  const number = (value / (1 - ((sellingFactor/100) / (1 - (ppn/100)))));
  return roundUpDown(number, 100);
};

const roundUpDown = (number: number, roundTo: number) => {
  return Math.round(number / roundTo) * roundTo;
};

export {
  roundPrice,
  formatCustomerPrice,
};
