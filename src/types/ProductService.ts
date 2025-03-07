export type IProductServiceState = {
  treatments: {
    isLoading: boolean,
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
  providers: {
    isLoading: boolean,
    isError: boolean,
    errorMessage: string,
    data: any[],
  },
  provider: {
    isLoading: boolean,
    isError: boolean,
    errorMessage: string,
    data: any,
  },
  params: {
    page: number,
    limit: number,
    status: string,
    search: string,
  },
  isLoading: boolean,
  isError: boolean,
  isErrorDetail: boolean,
  isModalErrorOpen: boolean,
  isModalSuccessOpen: boolean,
  isModalErrorPostToClinicOpen: boolean,
  isModalSuccessPostToClinicOpen: boolean,
  errMsg: string,
  successMsg: string,
  listProductService: any[],
  listHealthFacility: any[],
  listServiceGroup: any[],
  listPoli: any[],
  detail: any,
  countPage: number,
  currentPage: number,
  limit: string,
  formProductService: {
    code: string,
    information: {
      isSuccess: boolean,
      type: string,
      provider: any,
      healthFacility: any,
      name: string,
      serviceGroup: any,
      poli: any,
      price: string,
    },
    detail: {
      isSuccess: boolean,
      detail: string,
      preparation: string,
    },
    criteria: {
      isSuccess: boolean,
      maxAge: string,
      minAge: string,
      durationPerService: string,
      maxParticipant: string,
      preOrderSetting: string,
      participantPerVial: string,
    },
    informationHealthFacility: {
      isSuccess: boolean,
      provider: any,
      healthFacility: any,
      treatmentIDs: any[],
    },
  },
  pagination: {
    page: number,
    limit: number,
    totalPage: number,
    masterData: any[],
    currentData: any[],
  },
}
export type ProductService = {
  id: string;
  indexed_at: number;
  is_available: boolean;
  is_banned: boolean;
  is_location: boolean;
  is_payable: boolean;
  item: ItemProductService;
  item_id: number;
  item_type: string;
  location: {
    lat: number;
    lon: number;
  };
  parent_id: string;
  price: number;
  provider_id: number;
  provider_type: string;
  related: [];
  updated_at: number;
};

export type ItemProductService = {
  item: any;
  provider_type: any;
  address: {
    city: string;
    distance: string;
    district: string;
    latitude: number;
    longitude: number;
    phoneNumber: string;
    postCode: number;
    province: string;
    street: string;
    village: string;
  };
  email: string;
  id: number;
  image: string;
  name: string;
  outletId: number;
  phone: string;
  treatmentType: {
    benefit: string;
    code: string;
    codeConfig: string;
    config: {};
    description: string;
    id: number;
    imageUrl: string;
    name: string;
    preparation: string;
    price: number;
    procedure: string;
  };
};
