export const getPercentage = (numerator, denominator) => {
  if (numerator == 0 && denominator == 0) {
    return 0;
  }

  return (parseInt(numerator)/parseInt(denominator)) * 100;
};
