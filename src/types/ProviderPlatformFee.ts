export type IProviderPlatformFeeItem = {
    id: number,
    channelID: number,
    startDuration: string,
    endDuration: string,
    cost: number,
    holding: number,
    merchan: number,
    user: number,
    percentage: number,
    createdAt: any,
    updatedAt: any,
    channel: {
      id: number,
      name: string,
      description: string,
      image: string,
      type: string,
      providerType: string,
      address: string,
      phoneNumber: string,
      email: string,
      pic: string,
      isActive: boolean,
      createdAt: any
    }
};

export type IProviderPlatformFeeDetail = {
  id: number | string,
  channelID: number | string,
  startDuration: string,
  endDuration: string,
  cost: number,
  holding: number,
  merchan: number,
  user: number,
  percentage: number,
  createdAt: number | string,
  updatedAt: number | string,
  plans: IPlanItem[]
}

export type IPlanItem = {
  id: number | string,
  PlatformFeeID: number,
  periode: number,
  holding: number,
  merchan: number,
  user: number,
  percentage: number,
  createdAt: number | string,
  updatedAt: number | string,
}
