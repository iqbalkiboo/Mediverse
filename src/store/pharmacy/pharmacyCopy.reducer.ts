import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  deleteDataPharmacy,
  getDetailPharmacy,
  getDetailPharmacyElastic,
  getDetailProvider,
  getDownloadFilePharmacy,
  getListLocation,
  getListPharmacy,
  getListPharmacyElastic,
  getListProvider,
  patchDataStatusPharmacyElastic,
  postDataPharmacy,
  postUploadFilePharmacy,
  putDataPharmacy,
} from '@/src/client/pharmacy';
import { DAYS } from '@/src/constants';

const schedulesState = DAYS.map((_, index) => {
  return {
    is24Hour: false,
    isNotSchedule: false,
    closeTime: '',
    day: index,
    openTime: '',
  };
});

const initialState = {
  pharmacies: {
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
  pharmacy: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  providers: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  provider: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  locations: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  modalOperationalHourSchedules: {
    isOpen: false,
  },
  modalPracticeHourSchedules: {
    isOpen: false,
  },
  modalUpdateStatusPharmacy: {
    flag: '',
    isConfirmation: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
  },
  modalDownloadFilePharmacy: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    data: '',
  },
  modalUploadFilePharmacy: {
    isOpen: false,
    isError: false,
    isSuccess: false,
    isLoading: false,
    provider: {},
    message: '',
  },
  formPharmacy: {
    isOpen: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
    form: {
      information: {
        isSuccess: false,
        provider: null,
        isHub: false,
        name: '',
        pic: '',
        sipa: '',
        apa: '',
        sia: '',
        phoneNumber: '',
        email: '',
        isDeliveryInstant: false,
        isDeliveryReguler: false,
        isDeliverySelfPickup: false,
        photo: '',
        photoSignaturePic: '',
      },
      address: {
        isSuccess: false,
        province: {},
        regency: {},
        district: {},
        village: '',
        postCode: '',
        street: '',
        latitude: '',
        longitude: '',
      },
      operationalHour: {
        isSuccess: false,
        schedules: schedulesState,
      },
      practiceHour: {
        isSuccess: false,
        schedules: schedulesState,
      },
    },
  },
  params: {
    page: 1,
    offset: 0,
    limit: 300,
    search: '',
    regency: '',
    province: '',
    district: '',
    status: true,
    type: 'outlet',
  },
};

export const resolveListPharmacyElastic = createAsyncThunk(
  'resolve/pharmacyElastic/list',
  async (
    payload: {
      type: string;
      limit: string;
      offset: string;
      search: string;
      status: boolean;
      providerId: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await getListPharmacyElastic(payload);
      if (response.status === 200) {
        return response?.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveDetailPharmacyElastic = createAsyncThunk(
  'resolve/pharmacyElastic/detail',
  async (payload: { id: any }, { rejectWithValue }) => {
    try {
      const response = await getDetailPharmacyElastic(payload?.id);
      if (response.status === 200) {
        return response?.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveListPharmacy = createAsyncThunk(
  'resolve/treatment/list',
  async (
    payload: {
      providerId: any;
      page: number;
      limit: number;
      search: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await getListPharmacy(payload);
      if (response.status === 200) {
        return response?.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveDetailPharmacy = createAsyncThunk(
  'resolve/pharmacy/detail',
  async (
    payload: {
      providerId: string;
      id: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await getDetailPharmacy(payload.providerId, payload.id);
      if (response.status === 200) {
        return response?.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const resolveListProvider = createAsyncThunk(
  'resolve/provider/list',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getListProvider();

      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveDetailProvider = createAsyncThunk(
  'resolve/provider/detail',
  async (payload: { id: any }, { rejectWithValue }) => {
    try {
      const response = await getDetailProvider(payload.id);
      if (response.status === 200) {
        return response?.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const resolveListLocation = createAsyncThunk(
  'resolve/location/list',
  async (payload: any, { rejectWithValue }) => {
    const response = await getListLocation(
      payload.province,
      payload.regency,
      payload.district,
      payload.limit
    );

    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.data);
  }
);

export const resolveDownloadFilePharmacy = createAsyncThunk(
  'reosolve/pharmacy/download',
  async (_, { rejectWithValue }) => {
    const response = await getDownloadFilePharmacy();
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveUploadFilePharmacy = createAsyncThunk(
  'resolve/pharmacy/upload',
  async (
    payload: {
      providerId: string;
      payload: any;
    },
    { rejectWithValue }
  ) => {
    const response = await postUploadFilePharmacy(
      payload.providerId,
      payload.payload
    );
    if (response.status === 201) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolvePostDataPharmacy = createAsyncThunk(
  'resolve/pharmacy/create',
  async (
    payload: {
      providerId: string;
      data: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await postDataPharmacy(payload.providerId, payload.data);
      if (response.status === 201) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolvePutDataPharmacy = createAsyncThunk(
  'resolve/pharmacy/update',
  async (
    payload: {
      providerId: any;
      id: any;
      data: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await putDataPharmacy(
        payload.providerId,
        payload.id,
        payload.data
      );
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolvePatchStatusPharmacyElastic = createAsyncThunk(
  'resolve/pharmacyElastic/patch',
  async (
    payload: {
      id: string | number;
      data: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await patchDataStatusPharmacyElastic(
        payload.id,
        payload.data
      );
      if (response.status === 200) {
        return response;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveDeletePharmacy = createAsyncThunk(
  'resolve/pharmacy/delete',
  async (
    payload: {
      providerId: any;
      itemId: any;
    },
    { rejectWithValue }
  ) => {
    const response = await deleteDataPharmacy(
      payload.providerId,
      payload.itemId
    );
    if (response.status === 200) {
      return response?.data;
    }
    return rejectWithValue(response.data);
  }
);

const pharmacySlice = createSlice({
  name: 'pharmacy',
  initialState,
  extraReducers: (builder) => {
    // Get List Pharmacy Elastic
    builder.addCase(resolveListPharmacyElastic.pending, (state) => {
      state.pharmacies.isLoading = true;
      state.pharmacies.isError = false;
    });
    builder.addCase(
      resolveListPharmacyElastic.fulfilled,
      (state, { payload }) => {
        state.pharmacies.isLoading = false;
        state.pharmacies.isError = false;
        state.pharmacies.data = payload || [];
      }
    );
    builder.addCase(
      resolveListPharmacyElastic.rejected,
      (state, { payload }: any) => {
        state.pharmacies.isLoading = false;
        state.pharmacies.isError = true;
        state.pharmacies.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Apotek!';
      }
    );

    // Get Detail Pharmacy Elastic
    builder.addCase(resolveDetailPharmacyElastic.pending, (state) => {
      state.pharmacy.isLoading = true;
      state.pharmacy.isError = false;
    });
    builder.addCase(
      resolveDetailPharmacyElastic.fulfilled,
      (state, { payload }) => {
        state.pharmacy.isLoading = false;
        state.pharmacy.isError = false;
        state.pharmacy.data = payload;
      }
    );
    builder.addCase(
      resolveDetailPharmacyElastic.rejected,
      (state, { payload }: any) => {
        state.pharmacy.isLoading = false;
        state.pharmacy.isError = true;
        state.pharmacy.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Apotek!';
      }
    );

    // Get List Pharmacy
    builder.addCase(resolveListPharmacy.pending, (state) => {
      state.pharmacies.isLoading = true;
      state.pharmacies.isError = false;
    });
    builder.addCase(resolveListPharmacy.fulfilled, (state, { payload }) => {
      state.pharmacies.isLoading = false;
      state.pharmacies.isError = false;
      state.pharmacies.data = payload?.data || [];

      // Metadata List Pharmacy
      state.pharmacies.metadata.page = payload?.metadata?.page || 1;
      state.pharmacies.metadata.size = payload?.metadata?.size || 10;
      state.pharmacies.metadata.totalPage =
        Math.ceil(payload?.metadata?.totalData / state.params.limit) || 1;
      state.pharmacies.metadata.totalData = payload?.metadata?.totalData || 10;
    });
    builder.addCase(resolveListPharmacy.rejected, (state, { payload }: any) => {
      state.pharmacies.data = [];
      state.pharmacies.isLoading = false;
      state.pharmacies.isError = true;
      state.pharmacies.errorMessage =
        payload?.message || 'Gagal Mendapatkan Data Apotek!';
    });

    // Get Detail Pharmacy
    builder.addCase(resolveDetailPharmacy.pending, (state) => {
      state.pharmacy.isLoading = true;
      state.pharmacy.isError = false;
    });
    builder.addCase(resolveDetailPharmacy.fulfilled, (state, { payload }) => {
      state.pharmacy.isLoading = false;
      state.pharmacy.isError = false;
      state.pharmacy.data = payload?.data;

      // Fill Data Form Treatment
      state.formPharmacy.form = {
        ...state.formPharmacy.form,
        information: {
          isSuccess: true,
          provider: null,
          isHub: payload?.data?.isHub,
          name: payload?.data?.name,
          pic: payload?.data?.pc,
          sipa: payload?.data?.sipa,
          apa: payload?.data?.apa,
          sia: payload?.data?.sia,
          phoneNumber: payload?.data?.phone,
          email: payload?.data?.email,
          isDeliveryInstant: payload?.data?.acceptsInstantDelivery,
          isDeliveryReguler: payload?.data?.deliveryServiceAvailable,
          isDeliverySelfPickup: payload?.data?.isPickupOutletAvailable,
          photo: payload?.data?.outletPicture,
          photoSignaturePic: payload?.data?.signaturePic,
        },
        address: {
          isSuccess: true,
          province: {
            id: payload?.data?.address?.provinceId,
            name: payload?.data?.address?.province,
          },
          regency: {
            id: payload?.data?.address?.cityId,
            name: payload?.data?.address?.city,
          },
          district: {
            id: payload?.data?.address?.districtId,
            name: payload?.data?.address?.district,
          },
          village: payload?.data?.address?.village,
          postCode: payload?.data?.address?.postcode,
          street: payload?.data?.address?.street,
          latitude: payload?.data?.address?.latitude,
          longitude: payload?.data?.address?.longitude,
        },
        operationalHour: {
          isSuccess: true,
          schedules:
            payload?.data?.openHours && payload?.data?.openHours.length
              ? payload?.data?.openHours?.map((schedule) => {
                  let openTimeHour;
                  let openTimeMinute;
                  let closeTimeHour;
                  let closeTimeMinute;
                  if (schedule?.openTime || schedule?.closeTime) {
                    openTimeHour = schedule.openTime.split(':')[0] || 0;
                    openTimeMinute = schedule.openTime.split(':')[1] || 0;
                    closeTimeHour = schedule.closeTime.split(':')[0] || 0;
                    closeTimeMinute = schedule.closeTime.split(':')[1] || 0;
                  }

                  return {
                    is24Hour: schedule?.['24HrsOpen'],
                    isNotSchedule:
                      !schedule?.['24HrsOpen'] &&
                      !schedule?.closeTime &&
                      !schedule?.openTime,
                    closeTime: new Date().setHours(
                      closeTimeHour,
                      closeTimeMinute
                    ),
                    day: schedule?.day,
                    openTime: new Date().setHours(openTimeHour, openTimeMinute),
                  };
                })
              : schedulesState,
        },
        practiceHour: {
          isSuccess: true,
          schedules:
            payload?.data?.practiceHours && payload?.data?.practiceHours.length
              ? payload?.data?.practiceHours.map((schedule) => {
                  let openTimeHour;
                  let openTimeMinute;
                  let closeTimeHour;
                  let closeTimeMinute;
                  if (schedule?.openTime || schedule?.closeTime) {
                    openTimeHour = schedule.openTime.split(':')[0] || 0;
                    openTimeMinute = schedule.openTime.split(':')[1] || 0;
                    closeTimeHour = schedule.closeTime.split(':')[0] || 0;
                    closeTimeMinute = schedule.closeTime.split(':')[1] || 0;
                  }

                  return {
                    is24Hour: schedule?.['24HrsOpen'],
                    isNotSchedule:
                      !schedule?.['24HrsOpen'] &&
                      !schedule?.closeTime &&
                      !schedule?.openTime,
                    closeTime: new Date().setHours(
                      closeTimeHour,
                      closeTimeMinute
                    ),
                    day: schedule?.day,
                    openTime: new Date().setHours(openTimeHour, openTimeMinute),
                  };
                })
              : schedulesState,
        },
      };
    });
    builder.addCase(
      resolveDetailPharmacy.rejected,
      (state, { payload }: any) => {
        state.pharmacy.isLoading = false;
        state.pharmacy.isError = true;
        state.pharmacy.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Apotek!';
      }
    );

    // Get List Provider For Select
    builder.addCase(resolveListProvider.pending, (state) => {
      state.providers.isLoading = true;
      state.providers.isError = false;
    });
    builder.addCase(resolveListProvider.fulfilled, (state, { payload }) => {
      state.providers.isLoading = false;
      state.providers.isError = false;
      state.providers.data = payload?.data || [];
    });
    builder.addCase(resolveListProvider.rejected, (state, { payload }: any) => {
      state.providers.isLoading = false;
      state.providers.isError = true;
      state.providers.errorMessage =
        payload?.message || 'Gagal Mendapatkan Data Provider!';
    });

    // Get Detail Provider
    builder.addCase(resolveDetailProvider.pending, (state) => {
      state.provider.isLoading = true;
      state.provider.isError = false;
    });
    builder.addCase(resolveDetailProvider.fulfilled, (state, { payload }) => {
      state.provider.isLoading = false;
      state.provider.isError = false;
      state.provider.data = payload?.data;
    });
    builder.addCase(
      resolveDetailProvider.rejected,
      (state, { payload }: any) => {
        state.provider.isLoading = false;
        state.provider.isError = true;
        state.provider.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Provider!';
      }
    );

    // Get List Location for Select
    builder.addCase(resolveListLocation.pending, (state) => {
      state.locations.isLoading = true;
      state.locations.isError = false;
    });
    builder.addCase(resolveListLocation.fulfilled, (state, { payload }) => {
      state.locations.isLoading = false;
      state.locations.isError = false;
      state.locations.data = payload?.data || [];
    });
    builder.addCase(resolveListLocation.rejected, (state, { payload }: any) => {
      state.locations.isLoading = false;
      state.locations.isError = true;
      state.locations.errorMessage =
        payload?.message || 'Gagal Mendapatkan Data Lokasi!';
    });

    // Get Download File Pharmacy
    builder.addCase(resolveDownloadFilePharmacy.pending, (state) => {
      state.modalDownloadFilePharmacy.isLoading = true;
      state.modalDownloadFilePharmacy.isError = false;
      state.modalDownloadFilePharmacy.isSuccess = false;
    });
    builder.addCase(
      resolveDownloadFilePharmacy.fulfilled,
      (state, { payload }) => {
        state.modalDownloadFilePharmacy.isLoading = false;
        state.modalDownloadFilePharmacy.isError = false;
        state.modalDownloadFilePharmacy.isSuccess = true;
        state.modalDownloadFilePharmacy.message = payload.message;
        state.modalDownloadFilePharmacy.data = payload;
      }
    );
    builder.addCase(resolveDownloadFilePharmacy.rejected, (state) => {
      state.modalDownloadFilePharmacy.isLoading = false;
      state.modalDownloadFilePharmacy.isError = true;
      state.modalDownloadFilePharmacy.isSuccess = false;
    });

    // Post Upload File Pharmacy
    builder.addCase(resolveUploadFilePharmacy.pending, (state) => {
      state.modalUploadFilePharmacy.isLoading = true;
      state.modalUploadFilePharmacy.isError = false;
      state.modalUploadFilePharmacy.isSuccess = false;
    });
    builder.addCase(
      resolveUploadFilePharmacy.fulfilled,
      (state, { payload }) => {
        state.modalUploadFilePharmacy.isLoading = false;
        state.modalUploadFilePharmacy.isError = false;
        state.modalUploadFilePharmacy.isSuccess = true;
        state.modalUploadFilePharmacy.message = JSON.stringify(payload);
      }
    );
    builder.addCase(resolveUploadFilePharmacy.rejected, (state) => {
      state.modalUploadFilePharmacy.isLoading = false;
      state.modalUploadFilePharmacy.isError = true;
      state.modalUploadFilePharmacy.isSuccess = false;
      state.modalUploadFilePharmacy.message = 'Unggah file gagal';
    });

    // Post Data Pharmacy
    builder.addCase(resolvePostDataPharmacy.pending, (state) => {
      state.formPharmacy.isLoading = true;
      state.formPharmacy.isError = false;
    });
    builder.addCase(resolvePostDataPharmacy.fulfilled, (state, { payload }) => {
      if (payload.data) {
        state.formPharmacy.isLoading = false;
        state.formPharmacy.isError = false;
        state.formPharmacy.isSuccess = true;
      } else {
        state.formPharmacy.isLoading = false;
        state.formPharmacy.isError = true;
        state.formPharmacy.errorMessage =
          payload?.message || 'Gagal Menambahkan Apotek!';
      }
    });
    builder.addCase(
      resolvePostDataPharmacy.rejected,
      (state, { payload }: any) => {
        state.formPharmacy.isLoading = false;
        state.formPharmacy.isError = true;
        state.formPharmacy.isSuccess = false;
        state.formPharmacy.errorMessage =
          payload?.message || 'Gagal Menambahkan Apotek!';
      }
    );

    // Put Data Treatment
    builder.addCase(resolvePutDataPharmacy.pending, (state) => {
      state.formPharmacy.isLoading = true;
      state.formPharmacy.isError = false;
    });
    builder.addCase(resolvePutDataPharmacy.fulfilled, (state, { payload }) => {
      if (payload.data) {
        state.formPharmacy.isLoading = false;
        state.formPharmacy.isError = false;
        state.formPharmacy.isSuccess = true;
      } else {
        state.formPharmacy.isLoading = false;
        state.formPharmacy.isError = true;
        state.formPharmacy.errorMessage =
          payload?.message || 'Gagal Mengupdate Data Apotek!';
      }
    });
    builder.addCase(
      resolvePutDataPharmacy.rejected,
      (state, { payload }: any) => {
        state.formPharmacy.isLoading = false;
        state.formPharmacy.isError = true;
        state.formPharmacy.isSuccess = false;
        state.formPharmacy.errorMessage =
          payload?.message || 'Gagal Mengupdate Data Apotek!';
      }
    );

    // Patch Update Status Pharmacy Elastic
    builder.addCase(resolvePatchStatusPharmacyElastic.pending, (state) => {
      state.modalUpdateStatusPharmacy.isError = false;
      state.modalUpdateStatusPharmacy.isLoading = true;
      state.modalUpdateStatusPharmacy.isSuccess = false;
    });
    builder.addCase(
      resolvePatchStatusPharmacyElastic.fulfilled,
      (state, { payload }) => {
        state.modalUpdateStatusPharmacy.isLoading = false;
        state.modalUpdateStatusPharmacy.isError = false;
        state.modalUpdateStatusPharmacy.isSuccess = true;
        state.modalUpdateStatusPharmacy.successMessage =
          payload?.message || 'Berhasil mengupdate status apotek !';
      }
    );
    builder.addCase(
      resolvePatchStatusPharmacyElastic.rejected,
      (state, { payload }: any) => {
        state.modalUpdateStatusPharmacy.isError = true;
        state.modalUpdateStatusPharmacy.isLoading = false;
        state.modalUpdateStatusPharmacy.isSuccess = false;
        state.modalUpdateStatusPharmacy.errorMessage =
          payload?.message || 'Gagal mengupdate status apotek !';
      }
    );

    // Delete Data Pharmacy
    builder.addCase(resolveDeletePharmacy.pending, (state) => {
      state.modalUpdateStatusPharmacy.isLoading = true;
      state.modalUpdateStatusPharmacy.isError = false;
    });
    builder.addCase(
      resolveDeletePharmacy.fulfilled,
      (state, { payload }: any) => {
        if (payload.message) {
          state.modalUpdateStatusPharmacy.isLoading = false;
          state.modalUpdateStatusPharmacy.isError = false;
          state.modalUpdateStatusPharmacy.isSuccess = true;
          state.modalUpdateStatusPharmacy.successMessage =
            payload?.message || 'Berhasil menghapus apotek';
        } else {
          state.modalUpdateStatusPharmacy.isLoading = false;
          state.modalUpdateStatusPharmacy.isError = true;
          state.modalUpdateStatusPharmacy.errorMessage =
            'Gagal menghapus apotek';
        }
      }
    );
    builder.addCase(
      resolveDeletePharmacy.rejected,
      (state, { payload }: any) => {
        state.modalUpdateStatusPharmacy.isLoading = false;
        state.modalUpdateStatusPharmacy.isError = true;
        state.modalUpdateStatusPharmacy.errorMessage =
          payload?.message || 'Gagal menghapus apotek';
      }
    );
  },
  reducers: {
    setParams: (state, { payload }) => {
      state.params[payload.name] = payload.value;
    },
    setModal: (state, { payload }) => {
      state[payload.state][payload.field] = payload.value;
    },
    setFormInformation: (state, { payload }) => {
      state.formPharmacy.form.information[payload.name] = payload.value;
    },
    setFormAddress: (state, { payload }) => {
      state.formPharmacy.form.address[payload.name] = payload.value;
    },
    setFormOperationalHour: (state, { payload }) => {
      state.formPharmacy.form.operationalHour[payload.name] = payload.value;
    },
    setFormOperationalHourSchedule: (state, { payload }) => {
      state.formPharmacy.form.operationalHour.schedules[payload.index][
        payload.name
      ] = payload.value;
    },
    setFormPracticeHour: (state, { payload }) => {
      state.formPharmacy.form.practiceHour[payload.name] = payload.value;
    },
    setFormPracticeHourSchedule: (state, { payload }) => {
      state.formPharmacy.form.practiceHour.schedules[payload.index][
        payload.name
      ] = payload.value;
    },
    setFlagModalUpdateStatusPharmacy: (state, { payload }) => {
      state.modalUpdateStatusPharmacy.flag = payload;
    },
    setModalUploadFilePharmacy: (state, { payload }) => {
      state.modalUploadFilePharmacy[payload.name] = payload.value;
    },
    resetFormPharmacy: (state) => {
      state.formPharmacy = initialState.formPharmacy;
    },
    resetModalDownloadFilePharmacy: (state) => {
      state.modalDownloadFilePharmacy = initialState.modalDownloadFilePharmacy;
    },
    resetModalUploadFilePharmacy: (state) => {
      state.modalUploadFilePharmacy = initialState.modalUploadFilePharmacy;
    },
    resetStatePharmacy: () => initialState,
  },
});

export const {
  setModal,
  setParams,
  setFormAddress,
  resetFormPharmacy,
  setFormInformation,
  resetStatePharmacy,
  setFormOperationalHour,
  setFormPracticeHour,
  setModalUploadFilePharmacy,
  resetModalUploadFilePharmacy,
  resetModalDownloadFilePharmacy,
  setFormOperationalHourSchedule,
  setFormPracticeHourSchedule,
  setFlagModalUpdateStatusPharmacy,
} = pharmacySlice.actions;

export default pharmacySlice.reducer;
