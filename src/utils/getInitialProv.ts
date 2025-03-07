const getInitialProv = (provName: string) => {
  return provName ? provName.substring(0, 3).toUpperCase() : 'MDV';
};

export default getInitialProv;
