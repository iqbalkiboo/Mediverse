import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import {
  getListQuestion,
  patchStatusQuestion,
} from '@/src/client/question';

const initialState = {
  idQuestion: 0,
  questions: {
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
  modalUpdateStatusQuestion: {
    isConfirmation: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
  },
  params: {
    page: 1,
    limit: 10,
    endDate: '',
    startDate: '',
    isConfirmed: false,
  },
};

export const resolveListQuestion = createAsyncThunk(
    'resolve/question/list',
    async (payload: {
page: number,
limit: number,
endDate: number,
startDate: number,
isConfirmed: boolean,
}, {rejectWithValue}) => {
      try {
        const response = await getListQuestion(payload);
        if (response.status === 200) {
          return response.data;
        }
        return rejectWithValue(response.error);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolvePatchStatusQuestion = createAsyncThunk(
    'resolve/question/patchStatus',
    async (payload: {
id: string | number,
data: {is_confirm: boolean},
}, {rejectWithValue}) => {
      try {
        const response = await patchStatusQuestion(payload.id, payload.data);
        if (!response.error) {
          return response.data;
        }
        return rejectWithValue(response.data.message);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

const questionSlice = createSlice({
  name: 'question',
  initialState,
  extraReducers: (builder) => {
    // Get list question
    builder.addCase(resolveListQuestion.pending, (state) => {
      state.questions.isLoading = true;
      state.questions.isError = false;
    });
    builder.addCase(resolveListQuestion.fulfilled, (state, {payload}) => {
      state.questions.isLoading = false;
      state.questions.isError = false;
      state.questions.data = payload?.data || [];

      // Metadata list question
      state.questions.metadata.page = payload?.metadata?.page || 1;
      state.questions.metadata.size = payload?.metadata?.size || 10;
      state.questions.metadata.totalPage = payload?.metadata?.total_page || 1;
      state.questions.metadata.totalData = payload?.metadata?.total_data || 0;
    });
    builder.addCase(resolveListQuestion.rejected, (state, {payload}) => {
      state.questions.isLoading = false;
      state.questions.isError = true;
      state.questions.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Patch update status question
    builder.addCase(resolvePatchStatusQuestion.pending, (state) => {
      state.modalUpdateStatusQuestion.isError = false;
      state.modalUpdateStatusQuestion.isLoading = true;
      state.modalUpdateStatusQuestion.isSuccess = false;
    });
    builder.addCase(resolvePatchStatusQuestion.fulfilled, (state, {payload}) => {
      state.modalUpdateStatusQuestion.isLoading = false;
      state.modalUpdateStatusQuestion.isError = false;
      state.modalUpdateStatusQuestion.isSuccess = true;
      state.modalUpdateStatusQuestion.successMessage = 'Berhasil mengupdate status pertanyaan';
    });
    builder.addCase(resolvePatchStatusQuestion.rejected, (state, {payload}) => {
      state.modalUpdateStatusQuestion.isError = true;
      state.modalUpdateStatusQuestion.isLoading = false;
      state.modalUpdateStatusQuestion.isSuccess = false;
      state.modalUpdateStatusQuestion.errorMessage = String(payload) || 'Something Wrong !';
    });
  },
  reducers: {
    setModal: (state, {payload}) => {
      state[payload.state][payload.field] = payload.value;
    },
    setParams: (state, {payload}) => {
      state.params[payload.name] = payload.value;
    },
    setIdQuestion: (state, {payload}) => {
      state.idQuestion = payload;
    },
    resetStateQuestion: () => initialState,
  },
});

export const {
  setModal,
  setParams,
  setIdQuestion,
  resetStateQuestion,
} = questionSlice.actions;

export default questionSlice.reducer;
