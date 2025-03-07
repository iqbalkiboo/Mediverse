export type IDiscountMedpoint = {
  discountMedpoints: any;
  params: {
    page: number;
    limit: number;
    search: string;
    status: string;
    target: string;
    providerType: string;
  };
  modalUpdateListAction: {
    flag: string;
    discountMedpointId: any;
    isConfirmation: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
    successMessage: string;
  };
  quota: {
    total: number;
    couponId: number;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    maxEstimateExpenses: number;
    isModalOpen: boolean;
    amount: number;
  };
  modalDownloadDiscountMedpoint: {
    isOpen: boolean;
    isLoading: boolean;
    data: {};
  };
  formDiscountMedpoint: {
    isOpen: boolean;
    isOpenShowCoupon: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
    successMessage: string;
    form: {
      name: string;
      code: string;
      type: string;
      quota: string;
      photo: string;
      target: string;
      nominal: string;
      percentage: string;
      endPeriod: string;
      startPeriod: string;
      maxDiscount: string;
      minPurchase: string;
      titlePromo: string;
      descriptionPromo: string;
      maxEstimateExpenses: number;
      providerType: string;
    };
  };
  discountMedpoint: {
    data: any;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    errorMessage: string;
  };
  discountMedpointById: {
    data: any;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    errorMessage: string;
  };
};
