export type IVoucherCashbackState = {
  formVoucherCashback:{
    isOpen: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
    form: {
      name: '',
      code: '',
      type: '',
      quota: '',
      target: '',
      nominal: '',
      percentage: '',
      endPeriod: '',
      startPeriod: '',
      maxDiscount: '',
      minPurchase: '',
      maxEstimateExpenses: 0,
    },
  }
}
