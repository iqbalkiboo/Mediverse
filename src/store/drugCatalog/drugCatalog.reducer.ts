import {
  createSlice,
} from '@reduxjs/toolkit';

const initialState = {
  drugCatalogs: {
    isLoading: false,
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
  drugCatalog: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  formDrugCatalog: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    drugName: '',
    drugDetail: [],
  },
  params: {
    page: 1,
    limit: 10,
    search: '',
    status: '',
    drugCategory: '',
  },
  modalUpdatePrice: {
    isOpen: false,
  },
};

const drugCatalogSlice = createSlice({
  name: 'drugCatalog',
  initialState,
  extraReducers: (builder) => {},
  reducers: {
    setParams: (state, {payload}) => {
      state.params[payload.name] = payload.value;
    },
    resetStateDrugCatalog: () => initialState,
    setFormDrugName: (state, {payload}) => {
      state.formDrugCatalog[payload.field] = payload.value;
    },
    setModalUpdatePrice: (state, {payload}) => {
      state.modalUpdatePrice.isOpen = payload;
    },
  },
});

export const {
  setParams,
  setFormDrugName,
  setModalUpdatePrice,
  resetStateDrugCatalog,
} = drugCatalogSlice.actions;

export default drugCatalogSlice.reducer;
