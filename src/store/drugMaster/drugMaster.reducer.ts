import {
  createSlice,
  // createAsyncThunk,
} from '@reduxjs/toolkit';

const initialState = {
  addVariant: {
    isOpen: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
  },
  detailVariant: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  drugMasters: {
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
  drugMaster: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  formDrugMaster: {
    isOpen: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
    form: {
      information: {
        isSuccess: false,
        name: '',
        category: [],
        type: {},
        description: '',
      },
    },
  },
  formVariant: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    successMessage: '',
    form: {
      variants: [],
      variant: {},
      photo: {
        'photo-0': '',
        'photo-1': '',
        'photo-2': '',
        'photo-3': '',
        'photo-4': '',
      },
    },
  },
  params: {
    page: 1,
    limit: 10,
    search: '',
    status: '',
    smallItem: '',
  },
};

const drugMasterSlice = createSlice({
  name: 'drugMaster',
  initialState,
  extraReducers: (builder) => {},
  reducers: {
    setParams: (state, {payload}) => {
      state.params[payload.name] = payload.value;
    },
    setFormInformation: (state, {payload}) => {
      if (payload.name === 'category') {
        state.formDrugMaster.form.information.category = payload.value.map((item) => {
          return {
            title: item,
            value: item,
          };
        });
      } else {
        state.formDrugMaster.form.information[payload.name] = payload.value;
      }
    },
    setCategory: (state, {payload}) => {
      state.formDrugMaster.form.information.category = payload.value;
    },
    setVariant: (state, {payload}) => {
      state.addVariant[payload.name] = payload.value;
    },
    setFormVariantByName: (state, {payload}) => {
      if (payload.name === 'variants') {
        state.formVariant.form.variants.push(payload.value);
      } else {
        state.formVariant[payload.name] = payload.value;
      }
    },
    // TODO: Delete Soon if integration Edit
    setDetail: (state) => {
      state.formDrugMaster.form.information = {
        ...state.formDrugMaster.form.information,
        name: 'Paracetamol',
        type: {title: 'Obat Bebas', value: 'Obat Bebas'},
        description: 'Magasida merupakan obat maag persembahan magasida',
      };
    },
    // TODO: Delete soon if integration Edit
    setVariantEdit: (state, {payload}) => {
      state.formVariant.form.variant[payload.name] = payload.value;
    },
    setFormVariantPhoto: (state, {payload}) => {
      state.formVariant.form.photo[payload.label] = payload.value;
    },
    setDetailVariant: (state, {payload}) => {
      state.detailVariant.data[payload.label] = payload.value;
    },
    setFormVariants: (state, {payload}) => {
      state.formVariant.form[payload.name] = payload.value;
    },
    setFormDetail: (state, {payload}) => {
      state.detailVariant[payload.name] = payload.value;
    },
    setChangeVariants: (state, {payload}) => {
      state.formVariant.form.variants.splice(payload.name, 1, payload.value);
    },
    deleteVariant: (state, {payload}) => {
      state.formVariant.form.variants = state.formVariant.form.variants.filter((item, index) => index !== payload);
    },
    resetDetailVariant: (state) => {
      state.detailVariant.data = initialState.detailVariant.data;
    },
    resetFormDrugMaster: (state) => {
      state.formDrugMaster = initialState.formDrugMaster;
    },
    resetStateDrugMaster: () => initialState,
  },
});
export const {
  setDetail,
  setParams,
  setVariant,
  setCategory,
  setFormDetail,
  deleteVariant,
  setVariantEdit,
  setFormVariants,
  setDetailVariant,
  setChangeVariants,
  setFormInformation,
  resetDetailVariant,
  setFormVariantPhoto,
  resetFormDrugMaster,
  setFormVariantByName,
  resetStateDrugMaster,
} = drugMasterSlice.actions;

export default drugMasterSlice.reducer;
