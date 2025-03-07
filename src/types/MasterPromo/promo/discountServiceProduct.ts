export type IDiscountServiceProduct = {
  discountServiceProducts: {
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
  },
  healthFacilities: {
    data: any[],
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    errorMessage: string,
  },
  treatments: {
    isError: boolean,
    isLoading: boolean,
    isSuccess: boolean,
    errorMessage: '',
  },
  params: {
    page: number;
    limit: number;
    search: string;
    status: string;
    target: string;
    treatmentSearch: string,
  },
  modalUpdateListAction: {
    id: number;
    flag: string;
    isConfirmation: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
    successMessage: string;
  },
  quota: {
    total: number;
    couponId: number;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    maxEstimation: number;
    isModalOpen: boolean;
    minimalTransactionAmount: number;
  },
  modalDownloadVoucher: {
    isOpen: boolean;
    isLoading: boolean;
    data: any;
  },
  formDiscountTreatment: {
    isOpen: boolean,
    isLoading: boolean,
    isSuccess: boolean,
    isError: boolean,
    errorMessage: string,
    successMessage: string,
    form: {
      target: string,
      name: string,
      photo: string,
      endPeriod: string,
      couponCode: string,
      couponQuota: string,
      startPeriod: string,
      healthFacility: string,
      discountType: string,
      discountAmount: string,
      percentage: string,
      maxDiscount: string,
      minimumPurchase: string,
      estimateMaxSpend: string,
      freeDeliveryAmount: string,
      treatmentItems: any[],
    },
  },
  modalAddDiscountTreatment: {
    isOpen: boolean,
    treatments: any[],
    selectedTreatments: any[],
  },
  discountServiceProduct: {
    data: any;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    errorMessage: string;
  },
  modalCouponProduct: {
    isOpen: boolean,
  },
};
