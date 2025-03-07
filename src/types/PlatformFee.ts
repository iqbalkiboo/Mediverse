import {MetaDataHealthCareStore} from './MetaData';

export type PlatformFee = {
  code: number,
  data: PlatformFeeData[];
  metadata: MetaDataHealthCareStore,
};

export type PlatformFeeData = {
  id: number,
  service_type: string,
  platform_fee_cost: number,
  created_date: string,
  effective_date: string,
  status: boolean,
};
