import {
  createSlice,
  // createAsyncThunk,
} from '@reduxjs/toolkit';

const initialState = {
  idDoctor: 0,
  treatments: {
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
  treatment: {
    isOpen: false,
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  doctors: {
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
  doctor: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  formDoctor: {
    isOpen: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
    form: {
      doctor: {},
      sipNumber: '',
      sipPhoto: '',
      treatments: [
        {treatment: {}, price: ''},
      ],
    },
  },
  params: {
    page: 1,
    limit: 10,
    search: '',
    status: '',
    endDate: '',
    startDate: '',
  },
};

const treatmentV2Slice = createSlice({
  name: 'treatmentV2',
  initialState,
  extraReducers: (builder) => {},
  reducers: {
    setParams: (state, {payload}) => {
      state.params[payload.name] = payload.value;
    },
    setModal: (state, {payload}) => {
      state[payload.state][payload.field] = payload.value;
    },
    setIdDoctor: (state, {payload}) => {
      state.idDoctor = payload;

      // TODO: Delete Soon If Integration Edit
      state.formDoctor.form = {
        doctor: {
          name: 'Muhammad Gata',
          id: 1,
        },
        sipNumber: '123123123',
        sipPhoto: 'https://storage.googleapis.com/bf-attachment/dokter.jpg',
        treatments: [
          {
            treatment: {
              name: 'Treatment 1',
              id: 1,
            },
            price: '10000',
          },
        ],
      };
    },
    setFormDoctor: (state, {payload}) => {
      state.formDoctor.form[payload.name] = payload.value;
    },
    setFormTreatmentInDoctor: (state, {payload}) => {
      state.formDoctor.form.treatments[payload.index][payload.name] = payload.value;
    },
    addTreatmentInDoctor: (state, {payload}) => {
      state.formDoctor.form.treatments = payload.value;
    },
    resetFormDoctor: (state) => {
      state.formDoctor = initialState.formDoctor;
      state.idDoctor = 0;
    },
    resetStateTreatment: () => initialState,
  },
});

export const {
  setModal,
  setParams,
  setIdDoctor,
  setFormDoctor,
  resetFormDoctor,
  resetStateTreatment,
  addTreatmentInDoctor,
  setFormTreatmentInDoctor,
} = treatmentV2Slice.actions;

export default treatmentV2Slice.reducer;
