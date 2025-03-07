const csvToArray = (str, delimiter = ',') => {
  // slice from start of text to the first \r index
  // use split to create an array from string by delimiter
  return str.split(delimiter) || [];
};

export { csvToArray };
