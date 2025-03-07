import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Service as fetchDetailArticle} from '@/client/public/getDetailArticle';

const initialState = {
  articleData: null,
  isLoading: false,
  isError: false,
};

export const resolvePublicService = createAsyncThunk(
    'resolve/vendor',
    async (payload: {
    slug: string,
  }, {rejectWithValue}) => {
      const response =
        await fetchDetailArticle(payload.slug);
      if (response.error !== null) {
        return {
          data: response.data,
        };
      }
      return rejectWithValue(response.error);
    },
);


const publicSlice = createSlice({
  name: 'public',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(resolvePublicService.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(resolvePublicService.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.isError = false;
      state.articleData = payload.data;
    });
    builder.addCase(resolvePublicService.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
  reducers: {},
});

export const { } = publicSlice.actions;

export default publicSlice.reducer;
