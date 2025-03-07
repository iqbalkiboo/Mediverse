const getErrorMessage = (error: string) => {
  if (error.includes('record not found')) {
    return 'Tidak ada data yang tersedia';
  }

  return error;
};

export default getErrorMessage;
