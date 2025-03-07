export type IProductCouponState = {
  productCoupons: {
    data: any;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    errorMessage: string;
    metadata: {
      page: number;
      totalData: number;
      totalPage: number;
    };
  };
  productCoupon: {
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    errorMessage: string;
    data: {};
  };
  modalUpdateListAction: {
    flag: string;
    isConfirmation: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
    successMessage: string;
    id: number;
  };
  params: {
    page: number;
    limit: number;
    search: string;
    status: string;
    type: string;
    target: string;
    size: number;
    totalPage: number;
    totalData: number;
    couponType: string;
  };
  formAddCoupon: {
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    errorMessage: string;
    target: string;
    name: string;
    startPeriod: string;
    endPeriod: string;
    couponType: string;
    discountType: string;
    couponCode: string;
    discountAmount: number;
    cashbackPercentage: number;
    maxDiscount: number;
    minimumPurchase: number;
    couponQuota: number;
    estimateMaxSpend: number;
    freeDeliveryAmount: number;
  };
  tabProductSetting: {
    data: any[];
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    errorMessage: string;
  };
  drugs: {
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    errorMessage: string;
    successMessage: string;
    isModalOpen: boolean;
    data: any[];
  };
  listAddedDrug: {
    data: any[];
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    errorMessage: string;
  };
  drugParams: {
    type: string;
    limit: number;
    search: string;
    drugType: string;
    sortByStock: string;
    drugCategory: string;
    providerId: string;
    parentId: string;
  };
  quota: {
    total: number;
    couponId: number;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isModalOpen: boolean;
    maxEstimation: number;
    minimalTransactionAmount: number;
  };
  modalDownloadProduct: {
    isOpen: boolean;
    isLoading: boolean;
    data: {};
  };
  modalCouponProduct: {
    isOpen: boolean;
  };
};

export type IListDrugParams = {
  type: string;
  limit: number;
  item_name: string;
  isBanned: boolean;
  providerId: number;
  sortByStock: string;
  parentId: string;
  outletName: string;
};

export type IGetListProductCouponParams = {
  page: number;
  limit: number;
  search: string;
  status: string;
  startDate: any;
  endDate: any;
  type: string;
  target: string;
  providerType: string;
  couponType: string;
};
