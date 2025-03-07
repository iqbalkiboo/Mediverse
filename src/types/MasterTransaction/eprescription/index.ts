export type IEPrescriptionState = {
  cardOrder: {
    showAll: string,
    showInformation: string,
  },
  ePrescriptions: {
    isLoading: boolean,
    isError: boolean,
    errorMessage: string,
    data: any,
    metadata: {
      page: number,
      perPage: number,
      totalPage: number,
      totalRow: number,
    },
  },
  ePrescription: {
    isLoading: boolean,
    isError: boolean,
    errorMessage: string,
    data: any,
    searchDrug: string,
    expandSeeMore: boolean,
    showAllDrug: boolean,
    expandFoto: boolean,
    expandInfo: boolean,
    disabled: boolean,
    autocompleteDrugs: IDrugs[],
    prescriptions: IEPrescriptions[],
    isOpenModal: {
      add: boolean,
      create: boolean,
    },
  },
  params: {
    page: number,
    limit: number,
    search: string,
    status: string,
    endDate: string,
    startDate: string,
  },
  drugs: IDrugs[],
  onModalCreate: {
    search: string,
    totalOfDrug: number,
    recipeOfDrug: IDrugs[],
    isLoading: boolean,
    autocompleteDrugs: IDrugs[],
    totalPrice: number,
    name: string,
    totalPack: number,
  },
  informationShipper: {
    orderId: string,
    date: string,
    status: string,
    pasienName: string,
    phoneNumber: string,
    oldPasien: string,
    shipper: string,
    address: string
  },
};

export type IDrugs = {
  drugName: string,
  stock: number,
  priceItem: number,
  sku: string,
  typeDrug: string,
}

export type IEPrescriptions = {
  drugName: string,
  stock: number,
  priceItem: number,
  typeDrug: string,
  totalPackMix: number,
  Drugs: IDrugs[],
}

export type IEPrescriptionItem = {
  id: string,
  status: string,
  amount: number,
  prescription_id: string,
  user_id: string,
  item_name: string,
  item_type: string,
  user_name: string,
  item_total: number,
  user_phone: string,
  created_at: string,
  prescription_attactment: string,
  expired_at: string,
  delivery_provider_id: string,
  item_variant: string,
  provider_name: string,
  provider_type: string,
  delivery_type: string,
  payment_provider_id: string,
  user_address_id: string,
  provider_id: string | number,
};

export type IGetListEPrescriptionParams = {
  status: any,
  search: any,
  page: number,
  endDate: any,
  limit: number,
  startDate: any,
  transactionStatus?: string[]
};
