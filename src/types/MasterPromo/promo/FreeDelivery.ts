export type IFreeDeliveryState = {
  freeDeliveries: {
    data: any;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    errorMessage: string;
    metadata: {
      page: number;
      limit: number;
      totalData: number;
      totalPage: number;
    };
  };
  freeDelivery: {
    data: any;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    errorMessage: string;
  };
  modalUpdateListAction: {
    id: number;
    flag: string;
    isConfirmation: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
    successMessage: string;
  };
  formFreeDelivery: {
    isOpen: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
    isModalSuccessOpen: boolean;
    isModalErrorOpen: boolean;
    successMessage: string;
    showPerviewCoupon: boolean;
    form: {
      name: string;
      type: string;
      code: string;
      target: string;
      endPeriod: string;
      startPeriod: string;
      quota: string | number;
      nominal: string | number;
      percentage: string | number;
      minPurchase: string | number;
      maxDiscount: string | number;
      BannerCashback: string;
      image: string;
      maxEstimateExpenses: string | number;
    };
  };
  params: {
    page: number;
    limit: number;
    search: string;
    status: string;
    target: string;
  };
  quota: {
    total: number;
    couponId: number;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    maxEstimation: number;
    isModalOpen: boolean;
    minimalTransactionAmount: number;
  };
  modalDownloadVoucher: {
    isOpen: boolean;
    isLoading: boolean;
    data: {
      name: string;
      nominal: number;
      endPeriod: string;
      startPeriod: string;
      code: string;
      target: string;
    };
  };
};

export type IGetListFreeDelivery = {
  page: number;
  limit: number;
  search: string;
  target: string;
  status: string;
  type: string;
};

export type IGetDetailFreeDelivery = {
  id: any;
};
