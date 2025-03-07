import {MetaDataHealthCareStore} from './MetaData';

export type Provider = {
  code: number,
  data: ProviderData[];
  metadata: MetaDataHealthCareStore,
};

export type ProviderData = {
  address: string,
  description: string,
  email: string,
  id: number,
  isActive: boolean,
  name: string,
  phoneNumber: string,
  pic: string,
  providerType: string,
  type: string,
  createdAt: string,
  isOfficial: boolean,
};
