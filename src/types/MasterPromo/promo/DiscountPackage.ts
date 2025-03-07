export type IDiscountPackageState = {
  discountPackages: {
    data: any,
    detail: {},
    isError: boolean,
    isLoading: boolean,
    isSuccess: boolean,
    errorMessage: string,
    metadata: {
      page: number,
      limit: number,
      totalData: number,
      totalPage: number,
    },
  },
  modalUpdateListAction: {
    flag: string,
    isConfirmation: boolean,
    isLoading: boolean,
    isSuccess: boolean,
    isError: boolean,
    errorMessage: string,
    successMessage: string,
    id: number,
  },
  modalDownloadDiscountPackage: {
    isOpen: boolean,
    isLoading: boolean,
    data: any,
  },
  params: {
    page: number,
    limit: number,
    search: string,
    status: string,
    type: string,
    target: string,
    size: number,
    totalPage: number,
    totalData: number,
  },
  formDiscountPackage: {
    status: {
      isLoading: boolean,
      isSuccess: boolean,
      isError: boolean,
      errorMessage: string,
      successMessage: string,
    },
    data: any,
    discountPackage: any,
    name: string,
    startDate: string,
    endDate: string,
  },
  modalFormDiscountPackage: {
    isError: boolean,
    isLoading: boolean,
    isSuccess: boolean,
    errorMessage: string,
    successMessage: string,
    isModalOpen: boolean,
    data: any,
    selectedDrug: any,
  },
  drugParams: {
    type: string,
    limit: number,
    search: string,
  },
  addDiscountPackage: any[],
  itemVariants: {
    data: [],
    status: {
      isLoading: boolean,
      isError: boolean,
      isSuccess: boolean,
      message: string,
    },
  },
};

export type IListDrugParams = {
  type: string,
  limit: number,
  keyword: string,
  isBanned: boolean,
  channelId: number,
  sortByStock: string,
};

export type IGetListCouponDiscountParams = {
  page: number,
  limit: number,
  search: string,
  status: string,
  startDate: any,
  endDate: any,
  type: string,
  providerType: string
}
