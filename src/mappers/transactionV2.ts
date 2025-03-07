import {isArray} from 'lodash';
import {formatDateWithTime} from '@/src/utils/formatDate';

export const mapCardTransaction = (data: any) => {
  return [
    {
      id: 1,
      section: [
        {
          id: 1,
          title: 'Transaksi Berhasil',
          value: data.transaction_completed || 0,
          total_transaction: data.transaction_completed_count || 0,
        },
        {
          id: 2,
          title: 'Transaksi Batal',
          value: data.transaction_cancelled || 0,
          total_transaction: data.transaction_cancelled_count || 0,
        },
        {
          id: 3,
          title: 'Pengembalian Dana',
          value: data.transaction_refund || 0,
          total_transaction: data.transaction_refund_count || 0,
        },
        {
          id: 4,
          title: 'Pendapatan Bruto Provider',
          value: data.transaction_provider || 0,
        },
      ],
    },
    {
      id: 2,
      section: [
        {
          id: 5,
          title: 'Biaya Pengiriman & Ekspedisi',
          value: data.transaction_delivery || 0,
        },
        {
          id: 6,
          title: 'Promo Fee',
          value: data.transaction_promo_fee || 0,
          total_transaction: data.transaction_promo_fee_count || 0,
        },
        {
          id: 7,
          title: 'Potensi Pendapatan Mediverse',
          value: data.transaction_saldo || 0,
        },
      ],
    },
  ];
};

export const mapListTransaction = (data: any[]) => {
  const result = isArray(data) ? data?.map((item) => {
    return {
      id: item?.id || null,
      status: item?.status || false,
      transactionDate: formatDateWithTime(new Date(item?.transaction_date)) || '-',
      buyerName: item?.account_name || '-',
      transactionCode: item?.transaction_code || '-',
      transactionType: item?.transaction_type || '-',
      transactionTotal: item?.amount || 0,
      paymentType: item?.payment_type || '-',
      providerType: item?.provider_type || '',
      note: item?.description || '-',
    };
  }) : [];

  return result;
};
