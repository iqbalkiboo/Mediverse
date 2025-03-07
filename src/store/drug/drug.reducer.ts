import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getDataListDrug } from '@/src/client/drug';

const initialState: any = {
  drugs: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
};

export const resolveGetListDrug = createAsyncThunk(
  'resolve/assessment/list',
  async (_, { rejectWithValue }) => {
    const response = await getDataListDrug({});
    if (response.status === 200) return response.data;
    return rejectWithValue(response.data);
  }
);

const drugSlice = createSlice({
  name: 'drug',
  initialState,
  extraReducers: (builder) => {
    // Get List Assessment
    builder.addCase(resolveGetListDrug.pending, (state) => {
      state.drugs.isLoading = true;
      state.drugs.isError = false;
    });
    builder.addCase(resolveGetListDrug.fulfilled, (state, { payload }) => {
      state.drugs.isLoading = false;
      state.drugs.isError = false;
      state.drugs.data = payload?.message || [];
    });
    builder.addCase(resolveGetListDrug.rejected, (state, { payload }: any) => {
      state.drugs.isLoading = false;
      state.drugs.isError = true;
      state.drugs.errorMessage =
        payload?.message || 'Gagal Mendapatkan Data Obat!';
    });
  },
  reducers: {
    clearStateTransaction: () => initialState,
  },
});

export const { clearStateTransaction } = drugSlice.actions;

export default drugSlice.reducer;
