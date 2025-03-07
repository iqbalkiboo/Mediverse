export type IReferralCodeState = {
  recapReferralCodes: {
    isLoading: boolean,
    isError: boolean,
    errorMessage: string,
    data: any,
  },
  voucherReferralCodes: {
    isLoading: boolean,
    isError: boolean,
    errorMessage: string,
    data: any,
    metadata: {
      page: number,
      size: number,
      totalPage: number,
      totalData: number,
    },
  },
  voucherUsageReferralCodes: {
    isLoading: boolean,
    isError: boolean,
    errorMessage: string,
    data: any,
    metadata: {
      page: number,
      size: number,
      totalPage: number,
      totalData: number,
    },
  },
  params: {
    page: number,
    limit: number,
    search: string,
    status: string,
    endDate: string,
    startDate: string,
  },
}

export type IRecapReferralCode = {
  active: number,
  redeem: number,
  expired: number,
  total_referral: number,
};

export type IVoucherItem = {
  id: number,
  code: string,
  expired_at: number,
  is_expired: boolean,
  claimed_at: number,
  redeem_at: number,
  user_id: string,
  name: string,
  phone_number: string,
  amount: number,
  type: string,
  status: string,
  voucher_term_condition_id: number,
  voucher_term_condition: object,
  minimal_transaction_amount: number,
};

export type IVoucherUsageItem = {
  user_id: string,
  user_name: string,
  phone_number: string,
  code: string,
  count_usage: number,
  count_active_usage: number,
};

export type IGetListVoucherParams = {
  page: number,
  limit: number,
  search: string,
  status: string,
  startDate: any,
  endDate: any,
}

export type IGetListVoucherUsageParams = {
  page: number,
  limit: number,
  search: string,
}
