import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import {getListClinicByDoctor} from '@/src/client/user';

const initialState = {
  placement: {
    data: [],
    status: {
      isLoading: false,
      isSuccess: false,
      isError: false,
      message: '',
    },
  },
};

export const resolveListClinicByDoctor = createAsyncThunk(
    'resolve/userDocotor/palcement',
    async (payload: {
    id: string,
    channelId: string,
  }, {rejectWithValue}) => {
      const response = await getListClinicByDoctor(payload.id, payload.channelId);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response);
    },
);

export const userDoctorSlice = createSlice({
  name: 'userDoctor',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(resolveListClinicByDoctor.pending, (state) => {
      state.placement.status.isLoading = true;
      state.placement.status.isSuccess = false;
      state.placement.status.isError = false;
    });
    builder.addCase(resolveListClinicByDoctor.fulfilled, (state, {payload}) => {
      state.placement.status.isLoading = false;
      state.placement.status.isSuccess = true;
      state.placement.data = payload.data || [];
    });
    builder.addCase(resolveListClinicByDoctor.rejected, (state) => {
      state.placement.status.isLoading = false;
      state.placement.status.isError = true;
      state.placement.status.message = 'Something wrong!';
    });
  },
  reducers: {},
});

export const {} = userDoctorSlice.actions;

export default userDoctorSlice.reducer;
