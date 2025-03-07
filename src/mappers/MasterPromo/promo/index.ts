export const mapDataPromoRecapitulation = (data: any) => {
  return [
    {
      id: 1,
      title: 'Diskon Layanan Produk Aktif',
      value: data?.product || 0,
    },
    {
      id: 2,
      title: 'Voucher Kupon Produk Aktif',
      value: data?.product || 0,
    },
    {
      id: 3,
      title: 'Diskon Potongan Produk Aktif',
      value: data?.product || 0,
    },
    {
      id: 4,
      title: 'Voucher Paket Bundling Aktif',
      value: data?.bundling || 0,
    },
    {
      id: 5,
      title: 'Voucher Bebas Ongkos Kirim Aktif',
      value: data?.['free-delivery'] || 0,
    },
    {
      id: 6,
      title: 'Voucher Cashback Aktif',
      value: data?.cashback || 0,
    },
    {
      id: 7,
      title: 'Diskon Voucher Produk Aktif',
      value: data?.discount || 0,
    },
    // {
    //   id: 6,
    //   title: 'Voucher Flash Sale Aktif',
    //   value: 0,
    // },
  ];
};

export const mapDataAmountBalanceMarketing = (data) => {
  return {
    amount: data?.amount || 0,
  };
};
