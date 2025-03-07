export const formatRupiah = (value) => {
  if (value || value === 0) {
    const values = parseInt(value);
    const rupiah = values.toLocaleString('id-ID');
    return `Rp${rupiah}`;
  } else {
    return '-';
  };
};
