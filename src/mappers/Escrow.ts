import {
  EscrowCard,
  EscrowDetailData,
  EscrowDetailListData,
  EscrowItemData,
} from '@/src/types/Escrow';

export const mapCardEscrow = (data: EscrowCard) => {
  return {
    balance: data.balance,
  };
};

export const mapListEscrow = (data: EscrowItemData[]) => {
  const result = data.map((item: EscrowItemData) => {
    return {
      id: item.id,
      created_at: item.created_at,
      account_name: item.account_name,
      transaction_category: item.transaction_category,
      transaction_amount: item.transaction_amount,
      payment_type: item.payment_type,
      refund_no: item.refund_no,
    };
  });

  return result;
};

export const mapDetailEscrow = (data: EscrowDetailData): EscrowDetailData => {
  return {
    category: data.category ?? '-',
    name: data.name ?? '-',
    bank_name: data.bank_name ?? '-',
    account_number: data.account_number ?? 0,
    account_name: data.account_name ?? '-',
    balance: data.balance ?? 0,
    platform_fee: data.platform_fee ?? '-',
    business_schema: data.business_schema ?? '-',
    remaining_balance: data.remaining_balance ?? 0,
    month_period: data.month_period ?? '-',
    created_at: data.created_at ?? '-',
    pic: data.pic ?? '-',
    payment_type: data.payment_type ?? '-',
    platform_fee_type: data.platform_fee_type ?? '-',
    transaction_ids: data.transaction_ids ?? [],
    total_amount: data.total_amount ?? '-',
    refund_amount: data.refund_amount ?? '-',
    income: data.income ?? 0,
    paid: data.paid ?? '-',
    beneficiary_email: data.beneficiary_email ?? '-',
    reference_no: data.reference_no ?? '-',
    transaction_no: data.transaction_no ?? '-',
  };
};

export const mapDetailListEscrow = (data: EscrowDetailListData[]) => {
  const result = data.map((item) => {
    return {
      name: item.category.name ?? '-',
      business_schema: item.category.business_schema ?? '-',
      amount_income: item.category.amount_income ?? 0,
      amount_paid: item.category.amount_paid ?? 0,
      balance: item.category.balance ?? 0,
      remaining_balance: item.category.remaining_balance ?? 0,
      payment_provider: item.category.payment_provider ?? '-',
      provider_id: item.category.provider_id ?? '-',
      refund_no: item.category.refund_no ?? '-',
      transaction_type: item.category.transaction_type ?? '-',
      created_at: item.category.created_at ?? '-',
      items: item.categories ?? [],
    };
  });

  return result;
};
