export type IvoucherPackageBundling = {
    medicineList:{
        dataMedicine: any,
        isLoading: boolean,
        isError: boolean,
        errMsg: string,
    },
    voucherPackageBundlings: {
      data: any,
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
    voucherPackageBundling: {
      data: any,
      isError: boolean,
      isLoading: boolean,
      isSuccess: boolean,
      errorMessage: string,
    },
    modalUpdateListAction: {
      flag: '',
      isConfirmation: false,
      isLoading: false,
      isSuccess: false,
      isError: false,
      errorMessage: '',
      successMessage: '',
    },
    modalPackageBundling: {
      flag: '',
      isConfirmation: boolean,
      isLoading: boolean,
      isSuccess: boolean,
      isError: boolean,
      errorMessage: '',
      successMessage: '',
    },
    modalAddProductPackageBundling: {
        isOpen: boolean,
    },
    addProductPackageBundling: {
        data: any,
        choiceData: any,
        isFull: boolean,
    },
    paramsPackageBundling: {
      product: any,
      imgPackageBundling:any,
      namePackageBundling: string,
      startDate: string,
      endDate: string,
    },
    params: {
      page: number,
      limit: number,
      search: string,
      status: string,
    },
  };

export type IListPackageBundling = {
  page: number,
  limit: number,
  search: string,
  target: string,
  status: string,
  type: string,
}


export type IDetailPackageBundling = {
  id: any
}

