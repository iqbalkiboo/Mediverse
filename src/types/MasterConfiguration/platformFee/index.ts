export type IPlatformFeeData = {
  id: number,
  type: string,
  value: number,
  is_active: boolean
  created_at: number,
  updated_at: number,
  start_date: number,
  is_deleted: boolean,
  service_type: string,
  platform_fee_id: string,
  platform_fee_vat: string,
  platform_fee_amount: string,
  value_with_ppn: number,
}

export type IParamsPlatformFee = {
  page: number,
  limit: number,
  search: string,
  is_active: boolean | string,
}
