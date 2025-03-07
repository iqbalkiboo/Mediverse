import {
  IRecapReferralCode,
  IVoucherItem,
  IVoucherUsageItem,
} from '@/src/types/MasterPromo/referralCode/ReferralCode';

export const mapRecapReferralCode = (data: IRecapReferralCode) => {
  return [
    {
      id: 1,
      title: 'Jumlah Pengguna Kode Referral',
      value: data?.total_referral || 0,
    },
    {
      id: 2,
      title: 'Jumlah Kode Referral Pengguna Aktif',
      value: data?.active || 0,
    },
    {
      id: 3,
      title: 'Jumlah Total Kode Diredeem',
      value: data?.redeem || 0,
    },
    {
      id: 4,
      title: 'Jumlah Total Kode Referral Expired',
      value: data?.expired || 0,
    },
  ];
};

export const mapListVoucher = (data: IVoucherItem[]) => {
  return data?.map((item: IVoucherItem) => ({
    id: item.id,
    code: item.code || '-',
    claimedAt: item.claimed_at || '-',
    userId: item.user_id || '-',
    name: item.name || '-',
    phoneNumber: item.phone_number || '-',
    status: item.status || '',
  }));
};

export const mapListVoucherUsage = (data: IVoucherUsageItem[]) => {
  return data?.map((item: IVoucherUsageItem) => ({
    userId: item.user_id || '-',
    userName: item.user_name || '-',
    phoneNumber: item.phone_number || '-',
    code: item.code || '-',
    countUsage: item.count_usage || 0,
    countActiveUsage: item.count_active_usage || 0,
  }));
};
