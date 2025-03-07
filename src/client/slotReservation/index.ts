import {paths} from '@/src/configs';
import Axios from '@/src/client/services';
import {buildParams} from '@/src/utils/buildParams';

const pathOnlineReservation = paths.onlineReservation;
const pathMediverseCmsPrivate = paths.mediverseCmsPrivate;
const pathOnlineReservationClinic = paths.onlineReservationClinic;
const pathOnlintReservationSlotPrivate = paths.onlineReservationSlotPrivate;
const pathOnlineReservationUpload = paths.onlineReservationUpload;

export const getListSlot = async (providerId, params) => {
  try {
    const queryParams = buildParams({
      'page': params.page,
      'size': params.size,
      'keyword': params.search,
      'is_raw': true,
    });

    const path = `${pathOnlintReservationSlotPrivate}/channel/${providerId}/slot${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailSlot = async (providerId, slotId) => {
  const queryParams = buildParams({
    'with_poly': true,
    'with_doctor': true,
    'with_clinic': true,
    'with_treatment': true,
  });

  try {
    const path = `${pathOnlintReservationSlotPrivate}/channel/${providerId}/slot/${slotId}${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getListHealthFacility = async (providerId, search = '') => {
  try {
    const path = `${pathOnlineReservationClinic}/channel/${providerId}/clinic?keyword=${search}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailHealthFacility = async (providerId, clinicId) => {
  const queryParams = buildParams({
    'with-poly': true,
    'with-doctor': true,
    'with-treatment': true,
  });

  try {
    const path = `${pathOnlineReservationClinic}/channel/${providerId}/clinic/${clinicId}${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getListProvider = async (search?: string) => {
  const queryParams = buildParams({
    'name': search,
    'is-active': true,
    'provider-type': 'medpoint',
  });

  try {
    const path = `${pathOnlineReservation}/channel${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const postUploadFileSlot = async (providerId, payload) => {
  const path = `${pathOnlineReservationUpload}/channel/${providerId}/slot/upload`;
  const formDataFile = new FormData();
  formDataFile.append('upload-file', payload);
  try {
    return await Axios.post(path, formDataFile, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error: any) {
    return error.response;
  }
};

export const getDownloadFileSlot = async () => {
  try {
    const path = `${pathMediverseCmsPrivate}/template/download/slot`;
    return await Axios.get(path, {responseType: 'blob'});
  } catch (error: any) {
    return error.response;
  };
};


export const postDataSlot = async (providerId, payload) => {
  try {
    const path = `${pathOnlintReservationSlotPrivate}/channel/${providerId}/slot`;
    return await Axios.post(path, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const patchDataSlot = async (providerId, slotId, payload) => {
  try {
    const path = `${pathOnlintReservationSlotPrivate}/channel/${providerId}/slot/${slotId}`;
    return await Axios.patch(path, payload);
  } catch (error: any) {
    return error.response;
  }
};
