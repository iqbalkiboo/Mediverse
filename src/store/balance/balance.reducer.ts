import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import {
  deleteDataBankAccount,
  getAmountBalanceSubmission,
  getDownloadAdminTransaction,
  getDownloadBalanceEdge,
  getDownloadFileBalanceMarketing,
  getDownloadTransactionFee,
  getListBalanceProviderOrDelivery,
  getListBank,
  getListBankProvider,
  getListHistoryBalance,
  getListHistoryBalanceProvider,
  getListSubmissionHistory,
  getMediverseIncome,
  getProviderBalances,
  getProviderSales,
  getTotalBalanceMarketing,
  patchDataBankAccount,
  payoutProvider,
  postDataBalanceSubmission,
  postDataBankAccount,
  putDataStatusSubmission,
} from '@/src/client/balance';
import dayjs from 'dayjs';

const initialState = {
  idSubmission: 0,
  totalBalanceMarketing: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  amountBalanceSubmission: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  balanceMarketings: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    data: [],
    metadata: {
      page: 1,
      size: 10,
      totalPage: 1,
      totalData: 0,
    },
  },
  formModalBalanceSubmission: {
    isOpen: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
    form: {
      type: '',
      submissionType: '',
      submissionNominal: '',
    },
  },
  modalUpdateStatusSubmission: {
    flag: '',
    isConfirmation: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
  },
  downloadFileBalanceMarketing: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    data: '',
  },
  params: {
    page: 1,
    limit: 10,
    tab: null,
    endDate: '',
    startDate: '',
    promoType: '',
    treatment: '',
    submissionType: '',
    submissionStatus: '',
  },
  banksProvider: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  banks: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  formModalBankAccount: {
    isOpen: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
    form: {
      bankName: '',
      accountNumber: '',
      bankAccount: '',
      aliasName: '',
    },
  },
  modalSetAccount: {
    isOpen: false,
  },
  modalDeleteBankAccount: {
    id: '',
    flag: '',
    isConfirmation: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
  },
  modalConfirmationWithdrawal: {
    isOpen: false,
  },
  selectedDataBankAccount: {
    data: {},
  },
  payoutProvider: {
    total: 0,
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  expeditionBalance: {
    modalDownloadHistory: {
      isOpen: false,
      dates: [null, null],
      timeSpanType: '',
      date: null,
      isError: false,
      isLoading: false,
      errorMessage: '',
      isSuccess: false,
    },
  },
  providerBalance: {
    modalDownloadHistory: {
      isOpen: false,
      dates: [null, null],
      timeSpanType: '',
      date: null,
      isError: false,
      isLoading: false,
      errorMessage: '',
      isSuccess: false,
    },
  },
  transactionService: {
    modalDownloadHistory: {
      isOpen: false,
      dates: [null, null],
      timeSpanType: '',
      date: null,
      isError: false,
      isLoading: false,
      errorMessage: '',
      isSuccess: false,
    },
  },
  historyBalance: {
    modalDownloadHistory: {
      isOpen: false,
      dates: [null, null],
      timeSpanType: '',
      date: null,
      isError: false,
      isLoading: false,
      errorMessage: '',
      isSuccess: false,
    },
  },
  detailIncome: {
    id: '',
    isOpen: false,
  },
  metadata: {
    page: 1,
    perPage: 10,
    totalRow: 0,
    totalPage: 1,
  },
  listBalance: {
    data: [],
    isError: false,
    isLoading: false,
    errorMessage: '',
    params: {
      page: 1,
      limit: 10,
      search: '',
      startDate: dayjs().startOf('month'),
      endDate: dayjs().endOf('month'),
      payment_type: 'midtrans',
    },
  },
  recapitulation: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  balanceDetailCard: {
    data: [],
    params: {
      page: 1,
      limit: 10,
      search: '',
      startDate: '',
      endDate: '',
      transactionCategory: '',
      order: '',
      sort: '',
    },
    status: {
      isLoading: false,
      isError: false,
      isSuccess: false,
    },
  },
  downloadTransaction: {
    data: '',
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  modalDownload: {
    isShow: false,
  },
  incomeMediverse: {
    data: [],
    isError: false,
    isLoading: false,
    errorMessage: '',
    params: {
      page: 1,
      limit: 10,
      search: '',
      startDate: dayjs().startOf('month'),
      endDate: dayjs().endOf('month'),
      payment_type: '',
    },
  },
  balanceProviderDelivery: {
    data: [],
    isError: false,
    isLoading: false,
    errorMessage: '',
    params: {
      page: 1,
      limit: 10,
      search: '',
      startDate: dayjs().startOf('month'),
      endDate: dayjs().endOf('month'),
    },
  },
  providerSales: {
    data: [],
    isError: false,
    isLoading: false,
    errorMessage: '',
    params: {
      page: 1,
      limit: 10,
      search: '',
      startDate: dayjs().startOf('year'),
      endDate: dayjs().endOf('year'),
    },
  },
};

export const resolveGetListHistoryBalance = createAsyncThunk(
    'resolve/balance/list',
    async (payload: {
  page: number,
  limit: number,
  search: string,
  startDate: any,
  endDate: any,
  transactionCategory: string,
}, {rejectWithValue}) => {
      const response = await getListHistoryBalance(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    },
);

export const resolveGetListHistoryBalanceProvider = createAsyncThunk(
    'resolve/balanceProvider/list',
    async (payload: {
    page: number,
    limit: number,
    search: string,
    startDate: any,
    endDate: any,
  }, {rejectWithValue}) => {
      const response = await getListHistoryBalanceProvider(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    },
);

export const resolveGetProviderBalances = createAsyncThunk(
    'resolve/transaction/provider/saldo',
    async (params, {rejectWithValue}) => {
      const response = await getProviderBalances();
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveGetListBalanceProviderDelivery = createAsyncThunk(
    'resolve/balance/provider-delivery',
    async (payload: {
  page: number,
  limit: number,
  search: string,
  startDate?: any,
  endDate?: any,
  transactionCategory: string,
  }, {rejectWithValue}) => {
      const response = await getListBalanceProviderOrDelivery(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    },
);

export const resolveListBankProvider = createAsyncThunk(
    'resolve/bankProvider/list',
    async (payload: {channelId}, {rejectWithValue}) => {
      const response = await getListBankProvider(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    },
);

export const resolveListBank = createAsyncThunk(
    'resolve/bank/list',
    async (payload, {rejectWithValue}) => {
      const response = await getListBank();
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    },
);

export const resolvePostDataBankAccount = createAsyncThunk(
    'resolve/bank/post',
    async (payload: {payload: any}, {rejectWithValue}) => {
      const response = await postDataBankAccount(payload.payload);
      if (!response.error) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolvePatchDataBankAccount = createAsyncThunk(
    'resolve/bank/patch',
    async (payload: {payload: any}, {rejectWithValue}) => {
      const response = await patchDataBankAccount(payload.payload);
      if (!response.error) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveDeleteDataBankAccount = createAsyncThunk(
    'resolve/bank/delete',
    async (payload: {id: any}, {rejectWithValue}) => {
      const response = await deleteDataBankAccount(payload.id);
      if (!response.error) {
        return response.data;
      }
      return rejectWithValue(response.data.message);
    },
);

export const resolveDownloadAllTransaction = createAsyncThunk(
    'resolve/transaction/download',
    async (payload: {
      startDate: any,
      endDate: any,
      edge: any,
    }, {rejectWithValue}) => {
      const response = await getDownloadAdminTransaction(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveMediverseIncome = createAsyncThunk(
    'resolve/saldo/mediverse/income',
    async (payload: {
    startDate: any,
    endDate: any,
    search: string,
    paymentType: string,
  }, {rejectWithValue}) => {
      const response = await getMediverseIncome(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveDownloadBalanceEdge = createAsyncThunk(
    'resolve/transaction/download/edge',
    async (payload: {
    startDate: any,
    endDate: any,
    search: string,
    edge: string,
  }, {rejectWithValue}) => {
      const response = await getDownloadBalanceEdge(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveProviderSales = createAsyncThunk(
    'resolve/saldo/provider/sales',
    async (payload: {
  startDate: any,
  endDate: any,
  search: string,
}, {rejectWithValue}) => {
      const response = await getProviderSales(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolvePayoutProvider = createAsyncThunk(
    'resolve/transaction/payout/provider',
    async (payload: {
      account_number: number,
      amount: number,
      bank_name:string,
      name: string,
    }, {rejectWithValue}) => {
      const response = await payoutProvider(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveDownloadTransactionFee = createAsyncThunk(
    'resolve/transaction/downloadTransactionFee',
    async (payload: {
  startDate: any,
  endDate: any,
  edge: string,
}, {rejectWithValue}) => {
      const response = await getDownloadTransactionFee(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveGetTotalBalanceMarketing = createAsyncThunk(
    'resolve/balanceMarketing/total',
    async (payload: {types: {type: string}[]}, {rejectWithValue}) => {
      try {
        const response = await getTotalBalanceMarketing(payload.types);
        if (response.status === 200) {
          return response.data;
        }
        return rejectWithValue(response.error);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveGetAmountBalanceSubmission = createAsyncThunk(
    'resolve/balanceSubmission/total',
    async (payload: {types: {type: string}[]}, {rejectWithValue}) => {
      try {
        const response = await getAmountBalanceSubmission(payload.types);
        if (response.status === 200) {
          return response.data;
        }
        return rejectWithValue(response.error);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveGetListSubmissionHistory = createAsyncThunk(
    'resolve/submissionHistory/list',
    async (payload: any, {rejectWithValue}) => {
      try {
        const response = await getListSubmissionHistory(payload);
        if (response.status === 200) {
          return response?.data;
        }
        return rejectWithValue(response.data);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolvePostDataBalanceSubmission = createAsyncThunk(
    'resolve/balanceSubmission/post',
    async (payload: {data: any}, {rejectWithValue}) => {
      try {
        const response = await postDataBalanceSubmission(payload.data);
        if (!response.error) {
          return response.data;
        }
        return rejectWithValue(response.data.message);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolvePutDataStatusSubmission = createAsyncThunk(
    'resolve/submission/putStatus',
    async (payload: {
  id: string | number,
  data: {status: 'approved' | 'rejected'},
}, {rejectWithValue}) => {
      try {
        const response = await putDataStatusSubmission(payload);
        if (response.status === 200) {
          return response;
        }
        return rejectWithValue(response.data);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveDownloadFileBalanceMarketing = createAsyncThunk(
    'resolve/balanceMarketing/download',
    async (payload: any, {rejectWithValue}) => {
      const response = await getDownloadFileBalanceMarketing(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);


const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(resolveGetListHistoryBalance.pending, (state) => {
      state.listBalance.isLoading = true;
      state.listBalance.isError = false;
      state.listBalance.errorMessage = '';
    });
    builder.addCase(resolveGetListHistoryBalance.fulfilled, (state, {payload}) => {
      state.listBalance.isLoading = false;
      state.listBalance.isError = false;
      state.listBalance.data = payload?.data || [];
      state.metadata.page = payload?.metadata?.page ?? 1;
      state.metadata.perPage = payload?.metadata?.size ?? 10;
      state.metadata.totalPage = payload?.metadata?.total_page ?? 1;
      state.metadata.totalRow = payload?.metadata?.total_row ?? 1;
      state.listBalance.errorMessage = '';
    });
    builder.addCase(resolveGetListHistoryBalance.rejected, (state, {payload}: any) => {
      state.listBalance.isLoading = false;
      state.listBalance.isError = true;
      state.listBalance.errorMessage = payload?.message || 'Gagal Mendapatkan Data Saldo!';
    });

    builder.addCase(resolveGetListHistoryBalanceProvider.pending, (state) => {
      state.listBalance.isLoading = true;
      state.listBalance.isError = false;
      state.listBalance.errorMessage = '';
    });
    builder.addCase(resolveGetListHistoryBalanceProvider.fulfilled, (state, {payload}) => {
      state.listBalance.isLoading = false;
      state.listBalance.isError = false;
      state.listBalance.data = payload?.data || [];
      state.metadata.page = payload?.metadata?.page ?? 1;
      state.metadata.perPage = payload?.metadata?.size ?? 10;
      state.metadata.totalPage = payload?.metadata?.total_page ?? 1;
      state.metadata.totalRow = payload?.metadata?.total_row ?? 1;
      state.listBalance.errorMessage = '';
    });
    builder.addCase(resolveGetListHistoryBalanceProvider.rejected, (state, {payload}: any) => {
      state.listBalance.isLoading = false;
      state.listBalance.isError = true;
      state.listBalance.errorMessage = payload?.message || 'Gagal Mendapatkan Data Saldo!';
    });

    // provider saldo
    builder.addCase(resolveGetProviderBalances.pending, (state) => {
      state.recapitulation.isLoading = true;
      state.recapitulation.isError = false;
    });
    builder.addCase(resolveGetProviderBalances.fulfilled, (state, {payload}) => {
      state.recapitulation.isLoading = false;
      state.recapitulation.isError = false;
      state.recapitulation.data = payload.data;
    });
    builder.addCase(resolveGetProviderBalances.rejected, (state, {payload}) => {
      state.recapitulation.isLoading = false;
      state.recapitulation.isError = true;
      state.recapitulation.errorMessage = payload as string;
    });

    builder.addCase(resolveMediverseIncome.pending, (state) => {
      state.incomeMediverse.isLoading = true;
      state.incomeMediverse.isError = false;
      state.incomeMediverse.errorMessage = '';
    });
    builder.addCase(resolveMediverseIncome.fulfilled, (state, {payload}) => {
      state.incomeMediverse.isLoading = false;
      state.incomeMediverse.isError = false;
      state.incomeMediverse.data = payload?.data || [];
      state.metadata.page = payload?.metadata?.page ?? 1;
      state.metadata.perPage = payload?.metadata?.size ?? 10;
      state.metadata.totalPage = payload?.metadata?.total_page ?? 1;
      state.metadata.totalRow = payload?.metadata?.total_row ?? 1;
      state.incomeMediverse.errorMessage = '';
    });
    builder.addCase(resolveMediverseIncome.rejected, (state, {payload}: any) => {
      state.incomeMediverse.isLoading = false;
      state.incomeMediverse.isError = true;
      state.incomeMediverse.errorMessage = payload?.message || 'Gagal Mendapatkan Data Saldo!';
    });

    builder.addCase(resolveProviderSales.pending, (state) => {
      state.providerSales.isLoading = true;
      state.providerSales.isError = false;
      state.providerSales.errorMessage = '';
    });
    builder.addCase(resolveProviderSales.fulfilled, (state, {payload}) => {
      state.providerSales.isLoading = false;
      state.providerSales.isError = false;
      state.providerSales.data = payload?.data || [];
      state.metadata.page = payload?.metadata?.page ?? 1;
      state.metadata.perPage = payload?.metadata?.size ?? 10;
      state.metadata.totalPage = payload?.metadata?.total_page ?? 1;
      state.metadata.totalRow = payload?.metadata?.total_row ?? 1;
      state.providerSales.errorMessage = '';
    });
    builder.addCase(resolveProviderSales.rejected, (state, {payload}: any) => {
      state.providerSales.isLoading = false;
      state.providerSales.isError = true;
      state.providerSales.errorMessage = payload?.message || 'Gagal Mendapatkan Data Saldo!';
    });

    builder.addCase(resolveGetListBalanceProviderDelivery.pending, (state) => {
      state.balanceProviderDelivery.isLoading = true;
      state.balanceProviderDelivery.isError = false;
      state.balanceProviderDelivery.errorMessage = '';
    });
    builder.addCase(resolveGetListBalanceProviderDelivery.fulfilled, (state, {payload}) => {
      state.balanceProviderDelivery.isLoading = false;
      state.balanceProviderDelivery.isError = false;
      state.balanceProviderDelivery.data = payload?.data || [];
      state.metadata.page = payload?.metadata?.page ?? 1;
      state.metadata.perPage = payload?.metadata?.size ?? 10;
      state.metadata.totalPage = payload?.metadata?.total_page ?? 1;
      state.metadata.totalRow = payload?.metadata?.total_row ?? 1;
      state.balanceProviderDelivery.errorMessage = '';
    });
    builder.addCase(resolveGetListBalanceProviderDelivery.rejected, (state, {payload}: any) => {
      state.balanceProviderDelivery.isLoading = false;
      state.balanceProviderDelivery.isError = true;
      state.balanceProviderDelivery.errorMessage = payload?.message || 'Gagal Mendapatkan Data Saldo!';
    });

    // Get List Bank Provider
    builder.addCase(resolveListBankProvider.pending, (state) => {
      state.banksProvider.isLoading = true;
      state.banksProvider.isError = false;
    });
    builder.addCase(resolveListBankProvider.fulfilled, (state, {payload}) => {
      state.banksProvider.isLoading = false;
      state.banksProvider.isError = false;
      state.banksProvider.data = payload?.data || [];
    });
    builder.addCase(resolveListBankProvider.rejected, (state, {payload}: any) => {
      state.banksProvider.isLoading = false;
      state.banksProvider.isError = true;
      state.banksProvider.data = [];
      state.banksProvider.errorMessage = payload?.message || 'Gagal Mendapatkan Data Bank!';
    });

    // Get List Bank
    builder.addCase(resolveListBank.pending, (state) => {
      state.banks.isLoading = true;
      state.banks.isError = false;
    });
    builder.addCase(resolveListBank.fulfilled, (state, {payload}) => {
      state.banks.isLoading = false;
      state.banks.isError = false;
      state.banks.data = payload?.data || [];
    });
    builder.addCase(resolveListBank.rejected, (state, {payload}: any) => {
      state.banks.isLoading = false;
      state.banks.isError = true;
      state.banks.data = [];
      state.banks.errorMessage = payload?.message || 'Gagal Mendapatkan Data Bank!';
    });

    // Post Data Bank Account
    builder.addCase(resolvePostDataBankAccount.pending, (state) => {
      state.formModalBankAccount.isLoading = true;
      state.formModalBankAccount.isError = false;
    });
    builder.addCase(resolvePostDataBankAccount.fulfilled, (state, {payload}) => {
      state.formModalBankAccount.isLoading = false;
      state.formModalBankAccount.isSuccess = true;
      state.formModalBankAccount.successMessage = 'Berhasil menambahkan rekening';
    });
    builder.addCase(resolvePostDataBankAccount.rejected, (state, {payload}: any) => {
      state.formModalBankAccount.isLoading = false;
      state.formModalBankAccount.isError = true;
      state.formModalBankAccount.errorMessage = payload?.message || 'Gagal menambahkan akun bank';
    });

    // Patch Data Bank Account
    builder.addCase(resolvePatchDataBankAccount.pending, (state) => {
      state.formModalBankAccount.isLoading = true;
      state.formModalBankAccount.isError = false;
    });
    builder.addCase(resolvePatchDataBankAccount.fulfilled, (state, {payload}) => {
      state.formModalBankAccount.isLoading = false;
      state.formModalBankAccount.isSuccess = true;
      state.formModalBankAccount.successMessage = 'Berhasil memperbarui rekening';
    });
    builder.addCase(resolvePatchDataBankAccount.rejected, (state, {payload}: any) => {
      state.formModalBankAccount.isLoading = false;
      state.formModalBankAccount.isError = true;
      state.formModalBankAccount.errorMessage = payload?.message || 'Gagal mengupdate akun bank';
    });

    // Delete Data Bank Account
    builder.addCase(resolveDeleteDataBankAccount.pending, (state) => {
      state.modalDeleteBankAccount.isLoading = true;
      state.modalDeleteBankAccount.isError = false;
    });
    builder.addCase(resolveDeleteDataBankAccount.fulfilled, (state, {payload}: any) => {
      if (payload.message) {
        state.modalDeleteBankAccount.isLoading = false;
        state.modalDeleteBankAccount.isError = false;
        state.modalDeleteBankAccount.isSuccess = true;
        state.modalDeleteBankAccount.successMessage = payload?.message || 'Berhasil menghapus akun bank';
      } else {
        state.modalDeleteBankAccount.isLoading = false;
        state.modalDeleteBankAccount.isError = true;
        state.modalDeleteBankAccount.errorMessage = 'Gagal menghapus akun bank';
      }
    });
    builder.addCase(resolveDeleteDataBankAccount.rejected, (state, {payload}: any) => {
      state.modalDeleteBankAccount.isLoading = false;
      state.modalDeleteBankAccount.isError = true;
      state.modalDeleteBankAccount.errorMessage = payload?.message || 'Gagal menghapus akun bank';
    });

    // download feature
    builder.addCase(resolveDownloadAllTransaction.pending, (state) => {
      state.downloadTransaction.isLoading = true;
      state.downloadTransaction.isError = false;
    });
    builder.addCase(resolveDownloadAllTransaction.fulfilled, (state, {payload}) => {
      state.downloadTransaction.isLoading = false;
      state.downloadTransaction.isError = false;
      state.downloadTransaction.data = payload;
      state.downloadTransaction.isSuccess = true;
    });
    builder.addCase(resolveDownloadAllTransaction.rejected, (state) => {
      state.downloadTransaction.isLoading = false;
      state.downloadTransaction.isError = true;
      state.downloadTransaction.isSuccess = false;
    });
    builder.addCase(resolveDownloadBalanceEdge.pending, (state) => {
      state.downloadTransaction.isLoading = true;
      state.downloadTransaction.isError = false;
    });
    builder.addCase(resolveDownloadBalanceEdge.fulfilled, (state, {payload}) => {
      state.downloadTransaction.isLoading = false;
      state.downloadTransaction.isError = false;
      state.downloadTransaction.data = payload;
      state.downloadTransaction.isSuccess = true;
    });
    builder.addCase(resolveDownloadBalanceEdge.rejected, (state) => {
      state.downloadTransaction.isLoading = false;
      state.downloadTransaction.isError = true;
      state.downloadTransaction.isSuccess = false;
    });
    builder.addCase(resolvePayoutProvider.pending, (state) => {
      state.payoutProvider.isLoading = true;
      state.payoutProvider.isError = false;
      state.payoutProvider.isSuccess = false;
    });
    builder.addCase(resolvePayoutProvider.fulfilled, (state, {payload}) => {
      state.payoutProvider.isLoading = false;
      state.payoutProvider.isError = false;
      state.payoutProvider.isSuccess = true;
    });
    builder.addCase(resolvePayoutProvider.rejected, (state) => {
      state.payoutProvider.isLoading = false;
      state.payoutProvider.isError = true;
      state.payoutProvider.isSuccess = false;
    });
    // download transaction fee
    builder.addCase(resolveDownloadTransactionFee.pending, (state) => {
      state.downloadTransaction.isLoading = true;
      state.downloadTransaction.isError = false;
    });
    builder.addCase(resolveDownloadTransactionFee.fulfilled, (state, {payload}) => {
      state.downloadTransaction.isLoading = false;
      state.downloadTransaction.isError = false;
      state.downloadTransaction.data = payload;
      state.downloadTransaction.isSuccess = true;
    });
    builder.addCase(resolveDownloadTransactionFee.rejected, (state) => {
      state.downloadTransaction.isLoading = false;
      state.downloadTransaction.isError = true;
      state.downloadTransaction.isSuccess = false;
    });

    // Get total balance marketing
    builder.addCase(resolveGetTotalBalanceMarketing.pending, (state) => {
      state.totalBalanceMarketing.isLoading = true;
      state.totalBalanceMarketing.isError = false;
    });
    builder.addCase(resolveGetTotalBalanceMarketing.fulfilled, (state, {payload}) => {
      state.totalBalanceMarketing.isLoading = false;
      state.totalBalanceMarketing.isError = false;
      state.totalBalanceMarketing.data = payload || {};
    });
    builder.addCase(resolveGetTotalBalanceMarketing.rejected, (state, {payload}: any) => {
      state.totalBalanceMarketing.isLoading = false;
      state.totalBalanceMarketing.isError = true;
      state.totalBalanceMarketing.errorMessage = payload?.message || 'Gagal mendapatkan data saldo!';
    });

    // Get amount balance submission
    builder.addCase(resolveGetAmountBalanceSubmission.pending, (state) => {
      state.amountBalanceSubmission.isLoading = true;
      state.amountBalanceSubmission.isError = false;
    });
    builder.addCase(resolveGetAmountBalanceSubmission.fulfilled, (state, {payload}) => {
      state.amountBalanceSubmission.isLoading = false;
      state.amountBalanceSubmission.isError = false;
      state.amountBalanceSubmission.data = payload || {};
    });
    builder.addCase(resolveGetAmountBalanceSubmission.rejected, (state, {payload}: any) => {
      state.amountBalanceSubmission.isLoading = false;
      state.amountBalanceSubmission.isError = true;
      state.amountBalanceSubmission.errorMessage = payload?.message || 'Gagal mendapatkan data saldo!';
    });

    // Get list submission history
    builder.addCase(resolveGetListSubmissionHistory.pending, (state) => {
      state.balanceMarketings.isLoading = true;
      state.balanceMarketings.isError = false;
      state.balanceMarketings.isSuccess = false;
    });
    builder.addCase(resolveGetListSubmissionHistory.fulfilled, (state, {payload}) => {
      state.balanceMarketings.isLoading = false;
      state.balanceMarketings.isError = false;
      state.balanceMarketings.isSuccess = true;
      state.balanceMarketings.data = payload?.data || payload || [];

      // Metadata list submission history
      state.balanceMarketings.metadata.page = payload?.metadata?.page || 1;
      state.balanceMarketings.metadata.size = payload?.metadata?.per_page || 10;
      state.balanceMarketings.metadata.totalPage = payload?.metadata?.total_page || 1;
      state.balanceMarketings.metadata.totalData = payload?.metadata?.total_row || 0;
    });
    builder.addCase(resolveGetListSubmissionHistory.rejected, (state, {payload}: any) => {
      state.balanceMarketings.isLoading = false;
      state.balanceMarketings.isError = true;
      state.balanceMarketings.isSuccess = false;
      state.balanceMarketings.data = [];
      state.balanceMarketings.errorMessage = payload?.message || 'Gagal mendapatkan data riwayat pengajuan';
    });

    // Post data balance submission
    builder.addCase(resolvePostDataBalanceSubmission.pending, (state) => {
      state.formModalBalanceSubmission.isLoading = true;
      state.formModalBalanceSubmission.isError = false;
    });
    builder.addCase(resolvePostDataBalanceSubmission.fulfilled, (state, {payload}) => {
      state.formModalBalanceSubmission.isLoading = false;
      state.formModalBalanceSubmission.isSuccess = true;
      state.formModalBalanceSubmission.successMessage = 'Berhasil mengajukan saldo marketing';
    });
    builder.addCase(resolvePostDataBalanceSubmission.rejected, (state, {payload}) => {
      state.formModalBalanceSubmission.isLoading = false;
      state.formModalBalanceSubmission.isError = true;
      state.formModalBalanceSubmission.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Put data status submission
    builder.addCase(resolvePutDataStatusSubmission.pending, (state) => {
      state.modalUpdateStatusSubmission.isError = false;
      state.modalUpdateStatusSubmission.isLoading = true;
      state.modalUpdateStatusSubmission.isSuccess = false;
    });
    builder.addCase(resolvePutDataStatusSubmission.fulfilled, (state) => {
      state.modalUpdateStatusSubmission.isLoading = false;
      state.modalUpdateStatusSubmission.isError = false;
      state.modalUpdateStatusSubmission.isSuccess = true;
      state.modalUpdateStatusSubmission.successMessage = 'Berhasil menyetujui pengajuan biaya promosi';
    });
    builder.addCase(resolvePutDataStatusSubmission.rejected, (state) => {
      state.modalUpdateStatusSubmission.isError = true;
      state.modalUpdateStatusSubmission.isLoading = false;
      state.modalUpdateStatusSubmission.isSuccess = false;
      state.modalUpdateStatusSubmission.errorMessage = 'Gagal menyetujui pengajuan biaya promosi';
    });

    // Get download file balance marketing
    builder.addCase(resolveDownloadFileBalanceMarketing.pending, (state) => {
      state.downloadFileBalanceMarketing.isLoading = true;
      state.downloadFileBalanceMarketing.isError = false;
      state.downloadFileBalanceMarketing.isSuccess = false;
    });
    builder.addCase(resolveDownloadFileBalanceMarketing.fulfilled, (state, {payload}) => {
      state.downloadFileBalanceMarketing.isLoading = false;
      state.downloadFileBalanceMarketing.isError = false;
      state.downloadFileBalanceMarketing.isSuccess = true;
      state.downloadFileBalanceMarketing.message = payload.message;
      state.downloadFileBalanceMarketing.data = payload;
    });
    builder.addCase(resolveDownloadFileBalanceMarketing.rejected, (state, {payload}) => {
      state.downloadFileBalanceMarketing.isLoading = false;
      state.downloadFileBalanceMarketing.isError = true;
      state.downloadFileBalanceMarketing.isSuccess = false;
    });
  },
  reducers: {
    setParamsGlobal: (state, {payload}) => {
      state.params[payload.name] = payload.value;
    },
    setIdSubmission: (state, {payload}) => {
      state.idSubmission = payload;
    },
    setFlagModalUpdateStatusSubmission: (state, {payload}) => {
      state.modalUpdateStatusSubmission.flag = payload;
    },
    resetModalUpdateStatusSubmission: (state) => {
      state.modalUpdateStatusSubmission.isSuccess = false;
      state.modalUpdateStatusSubmission.isError = false;
    },
    setFormModalBalanceSubmission: (state, {payload}) => {
      state.formModalBalanceSubmission.form[payload.name] = payload.value;
    },
    resetFormModalBalanceSubmission: (state) => {
      state.formModalBalanceSubmission = initialState.formModalBalanceSubmission;
    },
    setModal: (state, {payload}) => {
      state[payload.state][payload.field] = payload.value;
    },
    setFormBankAccount: (state, {payload}) => {
      state.formModalBankAccount.form[payload.name] = payload.value;
    },
    setDataEditBankAccount: (state, {payload}) => {
      state.formModalBankAccount.form = {
        bankName: payload?.bankName,
        accountNumber: payload?.accountNumber,
        bankAccount: payload?.accountName,
        aliasName: payload?.aliasName,
      };
    },
    setSelectedDataBankAccount: (state, {payload}) => {
      state.selectedDataBankAccount.data = payload;
    },
    resetFormBankAccount: (state) => {
      state.formModalBankAccount = initialState.formModalBankAccount;
    },
    setModalExpeditionHistory: (state, {payload}) => {
      state[payload.type].modalDownloadHistory.isOpen = payload.value;
    },
    setDateDownloadHistory: (state, {payload}) => {
      state[payload.type].modalDownloadHistory.dates = payload.value;
    },
    setTimeSpan: (state, {payload}) => {
      const now = new Date();
      if (payload.value === state[payload.type].modalDownloadHistory.timeSpanType) {
        state[payload.type].modalDownloadHistory.timeSpanType = '';
        state[payload.type].modalDownloadHistory.dates = [null, null];
        state[payload.type].modalDownloadHistory.date = '';
      } else {
        state[payload.type].modalDownloadHistory.timeSpanType = payload.value;
        switch (payload.value) {
          case 'today':
            state[payload.type].modalDownloadHistory.dates[0] = new Date();
            state[payload.type].modalDownloadHistory.dates[1] = new Date();
            break;
          case 'week':
            const prevWeek = new Date(new Date().setDate(new Date().getDate() - 6));
            state[payload.type].modalDownloadHistory.dates[0] = prevWeek;
            state[payload.type].modalDownloadHistory.dates[1] = new Date();
            break;
          case 'month':
            state[payload.type].modalDownloadHistory.dates[0] = new Date(now.getFullYear(), now.getMonth(), 1);
            state[payload.type].modalDownloadHistory.dates[1] = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            break;
          case 'a week':
            const prev = new Date(new Date().setDate(new Date().getDate() - 6));
            state[payload.type].modalDownloadHistory.dates[0] = prev;
            state[payload.type].modalDownloadHistory.dates[1] = new Date();
            break;
          case 'a month':
            state[payload.type].modalDownloadHistory.dates[0] = new Date(now.getFullYear(), now.getMonth(), 1);
            state[payload.type].modalDownloadHistory.dates[1] = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            break;
        }
      }
    },
    resetModalDownloadHistory: (state, {payload}) => {
      state[payload.type].modalDownloadHistory = initialState[payload.type].modalDownloadHistory;
    },
    setDetailIncome: (state, {payload}) => {
      state.detailIncome[payload.name] = payload.value;
    },
    setListBalanceParams: (state, {payload}) => {
      state.listBalance.params[payload.name] = payload.value;
    },
    setListIncomeParams: (state, {payload}) => {
      state.incomeMediverse.params[payload.field] = payload.value;
    },
    setListSalesParams: (state, {payload}) => {
      state.providerSales.params[payload.field] = payload.value;
    },
    setListBalanceLoading: (state, {payload}) => {
      state.listBalance.isLoading = payload;
    },
    setParams: (state, {payload}) => {
      state.balanceDetailCard.params[payload?.field] = payload?.value;
    },
    clearBalanceParams: (state) => {
      state.balanceDetailCard.params = initialState.balanceDetailCard.params;
    },
    setModalDownloadTransaction: (state, {payload}) => {
      state.downloadTransaction[payload.name] = payload.value;
    },
    setModaDownloadShowHide: (state, {payload}) => {
      state.modalDownload.isShow = payload;
    },
    setListBalanceProviderDeliverParams: (state, {payload}) => {
      state.balanceProviderDelivery.params[payload.field] = payload.value;
    },
    setPullBalanceProvider: (state, {payload}) => {
      state.payoutProvider[payload.field] = payload.value;
    },
    resetDownloadFileBalanceMarketing: (state) => {
      state.downloadFileBalanceMarketing = initialState.downloadFileBalanceMarketing;
    },
    resetStateContentBalanceMarketing: (state) => {
      state.params = initialState.params;
      state.idSubmission = initialState.idSubmission;
      state.balanceMarketings = initialState.balanceMarketings;
      state.formModalBalanceSubmission = initialState.formModalBalanceSubmission;
      state.modalUpdateStatusSubmission = initialState.modalUpdateStatusSubmission;
    },
    resetStateBalance: () => initialState,
  },
});

export const {
  setParamsGlobal,
  setIdSubmission,
  resetStateBalance,
  setFormModalBalanceSubmission,
  resetFormModalBalanceSubmission,
  resetModalUpdateStatusSubmission,
  resetStateContentBalanceMarketing,
  setFlagModalUpdateStatusSubmission,
  setModal,
  setParams,
  setDetailIncome,
  setFormBankAccount,
  clearBalanceParams,
  resetFormBankAccount,
  setListBalanceParams,
  setDataEditBankAccount,
  setSelectedDataBankAccount,
  setTimeSpan,
  setDateDownloadHistory,
  resetModalDownloadHistory,
  setModalExpeditionHistory,
  setModalDownloadTransaction,
  setModaDownloadShowHide,
  setListBalanceLoading,
  setListIncomeParams,
  resetDownloadFileBalanceMarketing,
  setListBalanceProviderDeliverParams,
  setListSalesParams,
  setPullBalanceProvider,
} = balanceSlice.actions;

export default balanceSlice.reducer;
