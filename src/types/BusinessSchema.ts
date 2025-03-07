// type IChannelType = {
//   id: number,
//   pic: string,
//   name: string,
//   type: string,
//   image: string,
//   email: string,
//   isActive: true,
//   address: string,
//   createdAt: number,
//   description: string,
//   phoneNumber: string,
//   providerType: string,
// };

export type IGetDataBusinessSchemaParams = {
  page?: number,
  type?: string,
  limit?: number,
  status?: boolean,
  keyword?: string,
  endDate?: string,
  startDate?: string,
};

export type IGetDetailBusinessSchemaParams = {
  channelId: string,
  businessSchemaId: string,
  providerType?: string,
};

export type IBusinessSchemaType = {
  id: number,
  unit: string,
  type: string,
  status: boolean,
  channelId: number,
  isActive: boolean,
  channelName: string,
  endDuration: number,
  startDuration: number,
  periode: string | number,
  channelProviderType: string,
};

export type IBusinessSchemaDetailType = {
  id: number,
  type: string,
  channel: any,
  periode: string,
  applyTo: string,
  sharingFlat: any,
  updatedAt: number
  sharingShare: any,
  channelID: number,
  createdAt: number,
  endDuration: string,
  startDuration: string,
  remainingCooperation: number,
};

export type IBusinessSchemaState = {
  params: {
    page: number,
    type: string,
    limit: number,
    status: string,
    keyword: string,
    endDate: string,
    startDate: string,
  },
  metadata: {
    page: number,
    size: number,
    totalData: number,
    totalPage: number,
  },
  businessSchema: {
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    errorMessage: string,
    data: [],
    detail: {},
  }
};

// TODO : Deleted before push
export type BusinessSchemaItemData = {
  id: string,
  status: boolean,
  applies_to: string,
  provider_type: string,
  cooperation_periode: string,
  rest_of_cooperation: string,
};
