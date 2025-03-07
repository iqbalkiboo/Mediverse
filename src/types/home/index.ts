export type HomeReducer = {
  isLoading: boolean;
  isError: boolean;
  errMsg: null;
  data: [];
};

export type TransactionSaleType = {
  product: number;
  service: number;
  transaction_complaint: number;
  transaction_complete: number;
  transaction_refund: {
    count: number;
    total_amount: number;
  },
  transaction_type: TransactionType,
}

export type TransactionType = {
  medevo: number;
  medpharm: number;
  medpoint: number;
  percentage_medevo: number | string;
  percentage_medpharm: number | string;
  percentage_medpoint: number | string;
  grand_total: number;
}

export type TransactionFunnelType = {
  transaction_created: number;
  transaction_ongoing: number;
  transaction_complete: number;
};

export type PurchaseCurrentMonthType = {
  gmv: {
    current_month: number;
    previous_month: number;
    comparison_percentage: number;
  },
  nmv: {
    current_month: number;
    previous_month: number;
    comparison_percentage: number;
  },
};

export type StatisticCurrentMonthType = {
  month: number;
  amount: number;
};

export type StatisticCurrentMonthResultType = {
  x: string;
  y: number;
};

export type CurrentMonthIncomeProviderType = {
  discount: CurrentMonthProviderType;
  service_fee: CurrentMonthProviderType;
  income: CurrentMonthProviderType;
};

export type CurrentMonthProviderType = {
  comparison_percentage: number;
  current_month: number;
  last_month?: number;
  previous_month?: number;
}

export type CurrentMonthActivityProviderType = {
  count: CurrentMonthProviderType;
  potential: CurrentMonthProviderType;
};

export type EstimationExpenseProviderType = {
  bundling: EstimationSpendingProviderType;
  cashback: EstimationSpendingProviderType;
  discount: EstimationSpendingProviderType;
  free_delivery: EstimationSpendingProviderType;
  product: EstimationSpendingProviderType;
  referral: EstimationSpendingProviderType;
  total_spending: number;
  total_spending_estimation: number;
}

export type EstimationSpendingProviderType = {
  spending: number;
  spending_estimation: number;
}

export type VoucherInformationType = {
  count_total: number;
  amount_total: number;
  count_used: number;
  amount_used: number;
};

export type ChartCurrentMonthType = {
  month: number;
  amount: number;
};

export type ChartCurrentMonthResultType = {
  x: string;
  y: number;
};
