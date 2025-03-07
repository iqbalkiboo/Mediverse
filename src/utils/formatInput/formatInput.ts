const formatInputException = (event) => {
  const exceptThisSymbols = ['e', 'E', '+', '-', '.'];
  return exceptThisSymbols.includes(event?.key) && event.preventDefault();
};

const formatUnmaskInput = (value) => {
  return value.replace(/[^\d]/g, '');
};

export {
  formatUnmaskInput,
  formatInputException,
};
