export const colorPercentage = (value) => {
  if (value > 0) {
    return '#26C536';
  } else if (value < 0) {
    return '#F32424';
  } else {
    return '#0A0A0A';
  }
};
