import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getDataListAssessment,
  getDataListIcd9,
  getDataListIcd10,
  getDataListImmunizationCategory,
  getDataListCancelReason,
  getDataListObservationReason,
  getDataListLaboratory,
  getDataListReferralHospital,
  getDataListProcedure,
  getDataListItemOther,
  getDataListPayor,
  getDataListProcedureItem,
  getDetailTransaction,
} from '@/src/client/transaction';

import type { ITransactionState } from '@/types/Transaction';

const initialState: ITransactionState = {
  transactionDetail: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    data: null,
  },
  moduleAssessment: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  moduleCancelReason: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  moduleIcd10: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  moduleIcd9: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  moduleImmunizationCategory: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  moduleObservationReason: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  moduleLaboratory: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  moduleReferralHospital: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  moduleProcedure: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  moduleProcedureItem: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  moduleOtherItem: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  modulePayor: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
};

export const resolveGetDetailTransaction = createAsyncThunk(
  'resolve/transaction/detail',
  async (
    payload: {
      id: string;
    },
    { rejectWithValue }
  ) => {
    const response = await getDetailTransaction(payload);
    if (response.status === 200) return response;
    return rejectWithValue(response.data);
  }
);

export const resolveGetListAssessment = createAsyncThunk(
  'resolve/assessment/list',
  async (_, { rejectWithValue }) => {
    const response = await getDataListAssessment({});
    if (response.status === 200) return response.data;
    return rejectWithValue(response.data);
  }
);

export const resolveListCancelReason = createAsyncThunk(
  'resolve/cancel-reason/list',
  async (_, { rejectWithValue }) => {
    const response = await getDataListCancelReason({});
    if (response.status === 200) return response.data;
    return rejectWithValue(response.error);
  }
);

export const resolveGetListIcd10 = createAsyncThunk(
  'resolve/icd10/list',
  async (_, { rejectWithValue }) => {
    const response = await getDataListIcd10({});
    if (response.status === 200) return response;
    return rejectWithValue(response.data);
  }
);

export const resolveGetListIcd9 = createAsyncThunk(
  'resolve/icd9/list',
  async (_, { rejectWithValue }) => {
    const response = await getDataListIcd9({});
    if (response.status === 200) return response;
    return rejectWithValue(response.data);
  }
);

export const resolveGetListImmunizationCategory = createAsyncThunk(
  'resolve/immunization_category/list',
  async (_, { rejectWithValue }) => {
    const response = await getDataListImmunizationCategory({});
    if (response.status === 200) return response;
    return rejectWithValue(response.data);
  }
);

export const resolveGetListObservationReason = createAsyncThunk(
  'resolve/observation-reason/list',
  async (_, { rejectWithValue }) => {
    const response = await getDataListObservationReason({});
    if (response.status === 200) return response.data;
    return rejectWithValue(response.error);
  }
);

export const resolveGetListLaboratory = createAsyncThunk(
  'resolve/laboratory/list',
  async (_, { rejectWithValue }) => {
    const response = await getDataListLaboratory({});
    if (response.status === 200) return response.data;
    return rejectWithValue(response.error);
  }
);

export const resolveGetListReferralHospital = createAsyncThunk(
  'resolve/referral-hospital/list',
  async (payload: { type: string }, { rejectWithValue }) => {
    const response = await getDataListReferralHospital(payload);
    if (response.status === 200) return response.data;
    return rejectWithValue(response.error);
  }
);

export const resolveGetListProcedure = createAsyncThunk(
  'resolve/procedure/list',
  async (_, { rejectWithValue }) => {
    const response = await getDataListProcedure({});
    if (response.status === 200) return response.data;
    return rejectWithValue(response.error);
  }
);

export const resolveGetListProcedureItem = createAsyncThunk(
  'resolve/procedure-item/list',
  async (payload: { procedure: string }, { rejectWithValue }) => {
    const response = await getDataListProcedureItem(payload);
    if (response.status === 200) return response.data;
    return rejectWithValue(response.error);
  }
);

export const resolveGetListItemOther = createAsyncThunk(
  'resolve/item-other/list',
  async (
    payload: { search: string; onlyOther: boolean },
    { rejectWithValue }
  ) => {
    const response = await getDataListItemOther(payload);
    if (response.status === 200) return response.data;
    return rejectWithValue(response.error);
  }
);

export const resolveGetListPayor = createAsyncThunk(
  'resolve/payor/list',
  async (_, { rejectWithValue }) => {
    const response = await getDataListPayor();
    if (response.status === 200) return response.data;
    return rejectWithValue(response.error);
  }
);

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  extraReducers: (builder) => {
    // Get Detail Transaction
    builder.addCase(resolveGetDetailTransaction.pending, (state) => {
      state.transactionDetail.isLoading = true;
      state.transactionDetail.isSuccess = false;
      state.transactionDetail.isError = false;
      state.transactionDetail.data = null;
    });
    builder.addCase(
      resolveGetDetailTransaction.fulfilled,
      (state, { payload }) => {
        state.transactionDetail.isLoading = false;
        state.transactionDetail.isSuccess = true;
        state.transactionDetail.isError = false;
        state.transactionDetail.data = payload?.data?.message || {};
      }
    );
    builder.addCase(
      resolveGetDetailTransaction.rejected,
      (state, { payload }: any) => {
        state.transactionDetail.isLoading = false;
        state.transactionDetail.isSuccess = false;
        state.transactionDetail.isError = true;
        state.transactionDetail.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Transaksi!';
      }
    );

    // Get List ICD 9
    builder.addCase(resolveGetListIcd9.pending, (state) => {
      state.moduleIcd9.isLoading = true;
      state.moduleIcd9.isError = false;
    });
    builder.addCase(resolveGetListIcd9.fulfilled, (state, { payload }) => {
      state.moduleIcd9.isLoading = false;
      state.moduleIcd9.isError = false;
      state.moduleIcd9.data = payload?.data?.data || [];
    });
    builder.addCase(resolveGetListIcd9.rejected, (state, { payload }: any) => {
      state.moduleIcd9.isLoading = false;
      state.moduleIcd9.isError = true;
      state.moduleIcd9.errorMessage =
        payload?.message || 'Gagal Mendapatkan Data ICD9!';
    });

    // Get List ICD 10
    builder.addCase(resolveGetListIcd10.pending, (state) => {
      state.moduleIcd10.isLoading = true;
      state.moduleIcd10.isError = false;
    });
    builder.addCase(resolveGetListIcd10.fulfilled, (state, { payload }) => {
      state.moduleIcd10.isLoading = false;
      state.moduleIcd10.isError = false;
      state.moduleIcd10.data = payload?.data?.data || [];
    });
    builder.addCase(resolveGetListIcd10.rejected, (state, { payload }: any) => {
      state.moduleIcd10.isLoading = false;
      state.moduleIcd10.isError = true;
      state.moduleIcd10.errorMessage =
        payload?.message || 'Gagal Mendapatkan Data ICD10!';
    });

    // Get List Immunization Category
    builder.addCase(resolveGetListImmunizationCategory.pending, (state) => {
      state.moduleImmunizationCategory.isLoading = true;
      state.moduleImmunizationCategory.isError = false;
    });
    builder.addCase(
      resolveGetListImmunizationCategory.fulfilled,
      (state, { payload }) => {
        state.moduleImmunizationCategory.isLoading = false;
        state.moduleImmunizationCategory.isError = false;
        state.moduleImmunizationCategory.data = payload?.data?.data || [];
      }
    );
    builder.addCase(
      resolveGetListImmunizationCategory.rejected,
      (state, { payload }: any) => {
        state.moduleImmunizationCategory.isLoading = false;
        state.moduleImmunizationCategory.isError = true;
        state.moduleImmunizationCategory.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Kategori Imunisasi!';
      }
    );

    // Get List Assessment
    builder.addCase(resolveGetListAssessment.pending, (state) => {
      state.moduleAssessment.isLoading = true;
      state.moduleAssessment.isError = false;
    });
    builder.addCase(
      resolveGetListAssessment.fulfilled,
      (state, { payload }) => {
        state.moduleAssessment.isLoading = false;
        state.moduleAssessment.isError = false;
        state.moduleAssessment.data = payload?.data || [];
      }
    );
    builder.addCase(
      resolveGetListAssessment.rejected,
      (state, { payload }: any) => {
        state.moduleAssessment.isLoading = false;
        state.moduleAssessment.isError = true;
        state.moduleAssessment.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Assessment!';
      }
    );

    // Get List Cancel Reason
    builder.addCase(resolveListCancelReason.pending, (state) => {
      state.moduleCancelReason.isLoading = true;
      state.moduleCancelReason.isError = false;
    });
    builder.addCase(resolveListCancelReason.fulfilled, (state, { payload }) => {
      state.moduleCancelReason.isLoading = false;
      state.moduleCancelReason.isError = false;
      state.moduleCancelReason.data = payload?.data || [];
    });
    builder.addCase(
      resolveListCancelReason.rejected,
      (state, { payload }: any) => {
        state.moduleCancelReason.isLoading = false;
        state.moduleCancelReason.isError = true;
        state.moduleCancelReason.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Pembatalan!';
      }
    );

    // Get List Observation Reason
    builder.addCase(resolveGetListObservationReason.pending, (state) => {
      state.moduleObservationReason.isLoading = true;
      state.moduleObservationReason.isError = false;
    });
    builder.addCase(
      resolveGetListObservationReason.fulfilled,
      (state, { payload }) => {
        state.moduleObservationReason.isLoading = false;
        state.moduleObservationReason.isError = false;
        state.moduleObservationReason.data = payload?.data || [];
      }
    );
    builder.addCase(
      resolveGetListObservationReason.rejected,
      (state, { payload }: any) => {
        state.moduleObservationReason.isLoading = false;
        state.moduleObservationReason.isError = true;
        state.moduleObservationReason.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Observasi!';
      }
    );

    // Get List Laboratory
    builder.addCase(resolveGetListLaboratory.pending, (state) => {
      state.moduleLaboratory.isLoading = true;
      state.moduleLaboratory.isError = false;
    });
    builder.addCase(
      resolveGetListLaboratory.fulfilled,
      (state, { payload }) => {
        state.moduleLaboratory.isLoading = false;
        state.moduleLaboratory.isError = false;
        state.moduleLaboratory.data = payload?.data || [];
      }
    );
    builder.addCase(
      resolveGetListLaboratory.rejected,
      (state, { payload }: any) => {
        state.moduleLaboratory.isLoading = false;
        state.moduleLaboratory.isError = true;
        state.moduleLaboratory.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Laboratorium!';
      }
    );

    // Get List Referral Hospital
    builder.addCase(resolveGetListReferralHospital.pending, (state) => {
      state.moduleReferralHospital.isLoading = true;
      state.moduleReferralHospital.isError = false;
    });
    builder.addCase(
      resolveGetListReferralHospital.fulfilled,
      (state, { payload }) => {
        state.moduleReferralHospital.isLoading = false;
        state.moduleReferralHospital.isError = false;
        state.moduleReferralHospital.data = payload?.data || [];
      }
    );
    builder.addCase(
      resolveGetListReferralHospital.rejected,
      (state, { payload }: any) => {
        state.moduleReferralHospital.isLoading = false;
        state.moduleReferralHospital.isError = true;
        state.moduleReferralHospital.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Rumah Sakit!';
      }
    );

    // Get List Procedure
    builder.addCase(resolveGetListProcedure.pending, (state) => {
      state.moduleProcedure.isLoading = true;
      state.moduleProcedure.isError = false;
    });
    builder.addCase(resolveGetListProcedure.fulfilled, (state, { payload }) => {
      state.moduleProcedure.isLoading = false;
      state.moduleProcedure.isError = false;
      state.moduleProcedure.data = payload?.message || [];
    });
    builder.addCase(
      resolveGetListProcedure.rejected,
      (state, { payload }: any) => {
        state.moduleProcedure.isLoading = false;
        state.moduleProcedure.isError = true;
        state.moduleProcedure.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Prosedur!';
      }
    );

    // Get List Procedure Item
    builder.addCase(resolveGetListProcedureItem.pending, (state) => {
      state.moduleProcedureItem.isLoading = true;
      state.moduleProcedureItem.isError = false;
    });
    builder.addCase(
      resolveGetListProcedureItem.fulfilled,
      (state, { payload }) => {
        state.moduleProcedureItem.isLoading = false;
        state.moduleProcedureItem.isError = false;
        state.moduleProcedureItem.data = payload?.message || [];
      }
    );
    builder.addCase(
      resolveGetListProcedureItem.rejected,
      (state, { payload }: any) => {
        state.moduleProcedureItem.isLoading = false;
        state.moduleProcedureItem.isError = true;
        state.moduleProcedureItem.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Prosedur!';
      }
    );

    // Get List Drug Item Other
    builder.addCase(resolveGetListItemOther.pending, (state) => {
      state.moduleOtherItem.isLoading = true;
      state.moduleOtherItem.isError = false;
    });
    builder.addCase(resolveGetListItemOther.fulfilled, (state, { payload }) => {
      state.moduleOtherItem.isLoading = false;
      state.moduleOtherItem.isError = false;
      state.moduleOtherItem.data = payload?.data || [];
    });
    builder.addCase(
      resolveGetListItemOther.rejected,
      (state, { payload }: any) => {
        state.moduleOtherItem.isLoading = false;
        state.moduleOtherItem.isError = true;
        state.moduleOtherItem.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data!';
      }
    );

    // Get List Drug Item Other
    builder.addCase(resolveGetListPayor.pending, (state) => {
      state.modulePayor.isLoading = true;
      state.modulePayor.isError = false;
    });
    builder.addCase(resolveGetListPayor.fulfilled, (state, { payload }) => {
      state.modulePayor.isLoading = false;
      state.modulePayor.isError = false;
      state.modulePayor.data = payload?.data || [];
    });
    builder.addCase(resolveGetListPayor.rejected, (state, { payload }: any) => {
      state.modulePayor.isLoading = false;
      state.modulePayor.isError = true;
      state.modulePayor.errorMessage =
        payload?.message || 'Gagal Mendapatkan Data!';
    });
  },
  reducers: {
    clearStateTransaction: () => initialState,
  },
});

export const { clearStateTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
