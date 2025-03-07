import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  listObat: [],
  isLoading: false,
  data: {},
};

const prescriptionSlice = createSlice({
  name: 'prescription',
  initialState,
  extraReducers: () => {},
  reducers: {
    setClearState: () => initialState,
    setIsLoading: (state, {payload}) => {
      state.isLoading = payload;
    },
  },
});

export const {setClearState, setIsLoading} = prescriptionSlice.actions;

export default prescriptionSlice.reducer;
