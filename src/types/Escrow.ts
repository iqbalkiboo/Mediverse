export type EscrowCard = {
  balance: string,
}

export type EscrowItemData = {
  id: string,
  created_at: string,
  account_name: string,
  transaction_category: string,
  transaction_amount: number,
  payment_type: string,
  refund_no: string,
}

export type EscrowDetailData = {
  category: string,
  name: string,
  bank_name: string,
  account_number: number,
  account_name: string,
  balance: number,
  platform_fee: number,
  business_schema: string,
  remaining_balance: number,
  month_period: string,
  created_at: string,
  pic: string,
  payment_type: string,
  platform_fee_type: string,
  transaction_ids: string[],
  total_amount: string,
  refund_amount: string,
  income: number,
  paid: string,
  beneficiary_email: string,
  reference_no: string,
  transaction_no: string,
}

export type EscrowDetailListData = {
  category: EscrowDetailListCategoryData,
  categories: EscrowDetailListCategoryData[],
}

export type EscrowDetailListCategoryData = {
  name: string,
  business_schema: boolean,
  amount_income: number,
  amount_paid: number,
  balance: number,
  remaining_balance: boolean,
  payment_provider: string,
  provider_id: string,
  transaction_type: string,
  refund_no: string,
  created_at: string,
}
