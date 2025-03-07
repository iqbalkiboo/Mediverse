import { paths } from '@/src/configs';
import { buildParams } from '@/src/utils/buildParams';
import Axios from '../services';

const pathSearch = paths.search;
const pathCmsPrivate = paths.mediverseCmsPrivate;
const pathOnlineReservation = paths.onlineReservation;
const pathMediverseCmsPrivate = paths.mediverseCmsPrivate;
const pathOnlineReservationDoctor = paths.onlineReservationDoctor;
const pathOnlineReservationClinicPrivate = paths.onlineReservationClinic;
const pathOnlineReservationUpload = paths.onlineReservationUpload;

export const getListTreatmentElastic = async (params: any) => {
  const queryParams = buildParams({
    type: params.type,
    limit: params.limit,
    offset: params.offset,
    keyword: params.search,
    show_banned: !params.status,
  });

  try {
    const path = `${pathSearch}/medpoint${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailTreatmentElastic = async (id: any) => {
  try {
    const path = `${pathSearch}/medpoint/${id}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getListTreatment = async (params: any) => {
  const queryParams = buildParams({
    page: params.page,
    size: params.limit,
    keyword: params.search,
  });

  try {
    const path = `${pathOnlineReservationDoctor}/channel/${params.providerId}/treatment${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getListTreatmentByOutletId = async (params: any) => {
  const { providerId, outletId } = params;

  try {
    const path = `${pathOnlineReservationClinicPrivate}/channel/${providerId}/clinic/${outletId}/treatment`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailTreatment = async (providerId, id) => {
  try {
    const path = `${pathOnlineReservationDoctor}/channel/${providerId}/treatment/${id}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getListProvider = async (search?: string) => {
  const queryParams = buildParams({
    name: search,
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

export const getDetailProvider = async (id: any) => {
  try {
    const results: any[] = await Promise.allSettled([
      Axios.get(`${pathOnlineReservation}/channel/${id}`),
      Axios.get(`${pathMediverseCmsPrivate}/general-setting`),
    ]);

    const mappingData = results?.map((result) => {
      if (result?.status === 'fulfilled') {
        return result?.value?.data?.data;
      }
    });

    const mappingStatus = results?.map((result) => {
      return result?.status;
    });

    return {
      status: mappingStatus.includes('rejected') ? 'rejected' : 'fulfilled',
      data: Object.assign({}, ...mappingData),
    };
  } catch (error: any) {
    return error.response;
  }
};

export const getListHealthFacility = async (
  providerId: any,
  search?: string,
  page?: string
) => {
  try {
    const queryParams = buildParams({
      page: page || '1',
      size: 25,
      keyword: search,
    });

    const path = `${pathOnlineReservationClinicPrivate}/channel/${providerId}/clinic${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailHealthFacility = async (providerId, id) => {
  const queryParams = buildParams({
    'with-poly': true,
    'with-treatment': true,
  });

  try {
    const path = `${pathOnlineReservationClinicPrivate}/channel/${providerId}/clinic/${id}${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getListTreatmentGroup = async (payload) => {
  const queryParams = buildParams({
    search: payload.search,
    service_type: payload.serviceType,
  });

  try {
    const path = `${pathCmsPrivate}/service/${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDownloadFileTreatment = async () => {
  try {
    const path = `${pathMediverseCmsPrivate}/template/download/treatment`;
    return await Axios.get(path, { responseType: 'blob' });
  } catch (error: any) {
    return error.response;
  }
};

export const postUploadFileTreatment = async (providerId, payload) => {
  const path = `${pathOnlineReservationUpload}/channel/${providerId}/treatment/upload`;
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

export const postDataTreatment = async (providerId, data) => {
  try {
    const path = `${pathOnlineReservationDoctor}/channel/${providerId}/treatment`;
    return await Axios.post(path, data);
  } catch (error: any) {
    return error.response;
  }
};

export const postDataTreatmentToClinic = async (providerId, id, data) => {
  try {
    const path = `${pathOnlineReservationClinicPrivate}/channel/${providerId}/clinic/${id}/treatment`;
    return await Axios.post(path, data);
  } catch (error: any) {
    return error.response;
  }
};

export const putDataTreatment = async (providerId, id, data) => {
  try {
    const path = `${pathOnlineReservationDoctor}/channel/${providerId}/treatment/${id}`;
    return await Axios.put(path, data);
  } catch (error: any) {
    return error.response;
  }
};

export const patchDataStatusTreatmentElastic = async (id: any, data?: any) => {
  try {
    const path = `${pathSearch}/medpoint/${id}/banned`;
    return await Axios.patch(path, data);
  } catch (error: any) {
    return error.response;
  }
};

export const deleteDataTreatment = async (providerId: any, id: any) => {
  try {
    const path = `${pathOnlineReservationDoctor}/channel/${providerId}/treatment/${id}`;
    return await Axios.delete(path);
  } catch (error: any) {
    return error.response;
  }
};
