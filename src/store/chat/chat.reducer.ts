import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getUserAgoraToken } from '@/src/client/chat';

const initialState = {
  chat: {
    data: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
  },
  params: {
    search: '',
    page: 1,
    limit: 10,
    status: '',
    startDate: '',
    endDate: '',
  },
};

export const resolveGetUserAgoraToken = createAsyncThunk(
  'resolve/user/token',
  async (payload: { username: string }, { rejectWithValue }) => {
    try {
      const response = await getUserAgoraToken(payload.username);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  extraReducers: (builder) => {
    // Get Detail Mediverse Users
    builder.addCase(resolveGetUserAgoraToken.pending, (state) => {
      state.chat.isError = false;
      state.chat.isLoading = true;
      state.chat.isSuccess = false;
    });
    builder.addCase(
      resolveGetUserAgoraToken.fulfilled,
      (state, { payload }) => {
        state.chat.isError = false;
        state.chat.isLoading = false;
        state.chat.isSuccess = true;
        state.chat.data = payload.data;
      }
    );
    builder.addCase(resolveGetUserAgoraToken.rejected, (state) => {
      state.chat.isError = true;
      state.chat.isLoading = false;
      state.chat.isSuccess = false;
      state.chat.errorMessage = 'Something wrong!';
    });
  },
  reducers: {
    setParams: (state, { payload }) => {
      state.params[payload.field] = payload.value;
    },
    clearParamsValue: (state) => {
      state.params = {
        search: '',
        page: 1,
        limit: 10,
        status: '',
        startDate: '',
        endDate: '',
      };
    },
  },
});

export const { setParams, clearParamsValue } = chatSlice.actions;

export default chatSlice.reducer;
