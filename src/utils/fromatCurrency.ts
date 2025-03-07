export const formatRupiah = (value, firstLetter = 'Rp. ') => {
  if (value || value === 0) {
    const values = parseInt(value);
    const number = values.toLocaleString('id-ID');
    return firstLetter ? `${firstLetter}${number}` : `Rp. ${number}`;
  } else {
    return '-';
  }
};
