export type IRefundState = {
  rejectReason: {
    reason: string,
  },
  cardMedpharmDrug: {
    showAll: boolean,
  },
  refunds: {
    isLoading: boolean,
    isFetching: boolean,
    isError: boolean,
    errorMessage: string,
    data: any[],
    metadata: {
      page: number,
      size: number,
      totalPage: number,
      totalData: number,
    },
  },
  refund: {
    isLoading: boolean,
    isError: boolean,
    errorMessage: string,
    data: {},
  },
  refundRecapitulation: {
    isLoading: boolean,
    isError: boolean,
    errorMessage: string,
    data: {},
  },
  modalUpdateStatusRefund: {
    flag: string,
    isLoading: boolean,
    isSuccess: boolean,
    isError: boolean,
    errorMessage: string,
    successMessage: string,
    isOpenApproved: boolean,
    isOpenRejected: boolean,
  },
  params: {
    search: string,
    startDate: string,
    endDate: string,
    status: any,
    limit: number,
    page: number,
    transaction_type: string,
    paymentGateway: string,
  },
  paramsRecapitulation: {
    startDate: string,
    endDate: string,
  },
}


export type RefundData = {
  id: number,
  transaction_detail_id: number,
  no_transaction: string,
  created_at: string,
  pasien_name: string,
  transaction_type: string,
  status: string,
  refund_no: string,
  transaction_id: string,
};

export type RefundRecapListData = {
  id: number,
  title: string,
  value: number,
};

export type RefundTableItemData = {
  id: number,
  refund_no: string,
  transaction_no: string,
  refund_date: string,
  patient_name: string,
  transaction_type: string,
  status: string,
}

export type RefundRecapData = {
  total_refund: number,
  waiting: number,
  approved: number,
  rejected: number,
};
