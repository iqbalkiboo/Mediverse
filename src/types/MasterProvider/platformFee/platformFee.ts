export type IPlatformFeeState = {
  platformFees: {
    isLoading: boolean,
    isError: boolean,
    errorMessage: string,
    data: any,
    metadata: {
      page: number,
      size: number,
      totalPage: number,
      totalData: number,
    },
  },
  platformFee: {
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
    endDate: string,
    startDate: string,
    providerType: string,
  },
}

export type IPlatformFeeItem = {
  id: number
  channelID: number
  channelId: number
  channelName: string
  channelProviderType: string
  endDuration: number
  startDuration: number
}

export type IPlatformFeeDetail = {
  id: number,
  createdAt: number,
  deletedAt: number,
  updatedAt: number,
  endDuration: number,
  startDuration: number,
  channel: any,
  channelID: number,
  plans: any,
  services: any
}
