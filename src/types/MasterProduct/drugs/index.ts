export type IDrug = {
  detailDrug: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    data: any;
  };
  listDrug: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    data: any[];
  };
  pagination: {
    currentPage: number;
    page: number;
    limit: number;
    totalPage: number;
    masterData: any[];
    currentData: any[];
  };
  variants: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    data: any[];
    variantId: number;
    successMessage: string;
    errorMessage: string;
  };
  paramsNonAdmin: {
    page: number;
    limit: number;
    keyword: string;
  };
  filter: {
    limit: number;
    offset: number;
    search: string;
    isBanned: string;
    type: string;
  };
  modalDrug: {
    modalAdd: boolean;
    modalFailed: boolean;
    modalSucces: boolean;
    modalUploadFile: boolean;
  };
  modalUpdateStatusDrug: {
    flag: string;
    isConfirmation: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
    successMessage: string;
  };
  modalVariant: {
    isLoading: boolean;
    isSuccess: boolean;
    isConfirmation: boolean;
    isError: boolean;
    errorMessage: string;
    successMessage: string;
    modalFormVariant: boolean;
    modalAddStockVariant: boolean;
  };
  formDrug: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    errorMessage: string;
    successMessage: string;
    providerId: string;
    provider: string;
    apotek: string;
    id: string;
    name: string;
    category: string;
    type: string;
    unit: string;
    produceBy: string;
    licenseNumber: string;
    description: string;
    dosage: string;
    sideEffect: string;
    indication: string;
    howToUse: string;
    contradiction: string;
    storage: string;
    specialAttention: string;
    expiredDate: string;
    variants: any[];
    composition: string;
    dosageForm: string;
    photo: {
      'photo-0': string;
      'photo-1': string;
      'photo-2': string;
      'photo-3': string;
      'photo-4': string;
    };
  };
  detailVariant: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    data: {};
  };
  formVariant: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    activeVariant: string;
  };
  listOutlet: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    data: any[];
  };
  stockVariant: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    value: number;
    currentValue: number;
  };
  uploadFile: {
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
  };
  downloadFile: {
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
    data: string;
  };
};
