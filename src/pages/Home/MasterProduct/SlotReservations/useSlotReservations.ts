import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  resetFormModalSlot,
  resetModalDownloadFileSlot,
  resetModalUploadFileSlot,
  resetStateSlotReservation,
  setForm,
  setModal,
  setParams,
  setProviderUploadSlot,
  setAddAdditionalDataForm,
  setAdditionalDataItem,
  setRemoveAdditionalDataForm,
  setAddAdditionalDataBatchForm,
  setAdditionalDataBatchItem,
  setRemoveAdditionalDataBatchForm,
  resolveDetailHealthFacility,
  resolveDetailSlot,
  resolveDownloadFileSlot,
  resolveListHealthFacility,
  resolveListProvider,
  resolveListSlot,
  resolvePatchSlot,
  resolvePostSlot,
  resolveUploadFileSlot,
} from '@/src/store/slotReservation/slotReservation.reducer';
import {
  mapDetailSlot,
  mapListSelectDoctor,
  mapListSelectHealthFacility,
  mapListSelectPoly,
  mapListSelectProvider,
  mapListSelectTreatment,
  mapListSlot,
} from '@/src/mappers/MasterProduct/slotReservation';
import {
  getListHealthFacility,
  getListProvider,
} from '@/src/client/slotReservation';
import { formatDateEng } from '@/src/utils/formatDate';
import { dateTimeToTimes } from '@/src/utils/formatDate';
import { ROLES } from '@/src/constants';
import validation from './validation';
import cookieUtils from '@/src/utils/cookieUtils';
import useDebounce from '@/src/utils/debounce';

const detailUser = await cookieUtils.getUser();
const { role } = (await cookieUtils.getPermission()) || {
  role: {},
};

const useSlotReservations = () => {
  const dispatch = useDispatch();

  const isSuperAdmin = [
    ROLES.SUPER_ADMIN,
    ROLES.SUPER_ADMIN_VIEW_ONLY,
    ROLES.ADMINISTRATOR_MEDIVERSE,
    ROLES.ADMINISTRATOR_MEDIVERSE_VIEW_ONLY,
  ].includes(role?.id);

  const isProviderMedpoint = [
    ROLES.ADMINISTRATOR_PROVIDER_MEDPOINT,
    ROLES.ADMINISTRATOR_PROVIDER,
  ].includes(role?.id);

  const isAdminFasyankes = [
    ROLES.ADMINISTRATOR_FASYANKES,
    ROLES.OPERATOR_FASKES,
  ].includes(role?.id);

  const {
    slot,
    slots,
    params,
    providers,
    formModalSlot,
    formAdditionalData,
    formAdditionalDataBatch,
    healthFacility,
    healthFacilities,
    modalUploadFileSlot,
    modalDownloadFileSlot,
  } = useSelector((state: RootStateOrAny) => state.slotReservation);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    control,
    resetField,
  } = useForm({
    resolver: yupResolver(validation),
  });

  const { remove } = useFieldArray({
    control,
    name: 'additionalData',
  });

  const debouncedSearchTerm = useDebounce(params.search, 500);

  const handleGetListSlot = (providerId) => {
    dispatch(
      resolveListSlot({
        providerId: providerId,
        params: {
          search: params.search,
          page: params.page,
          size: params.size,
        },
      })
    );
  };

  const handleGetDetailSlot = (providerId, slotId) => {
    dispatch(resolveDetailSlot({ providerId, slotId }));
  };

  const handleGetListHealthFacility = (providerId) => {
    dispatch(resolveListHealthFacility({ providerId }));
  };

  const handleGetDetailHealthFacility = (providerId, clinicId) => {
    dispatch(resolveDetailHealthFacility({ providerId, clinicId }));
  };

  const handleGetListProvider = () => {
    dispatch(resolveListProvider());
  };

  const handleSearchListProvider = async (search, callback) => {
    const response = await getListProvider(search);

    if (response.status === 200) {
      const result = response?.data?.data || [];
      return callback(mapListSelectProvider(result));
    }
  };

  const handleSearchListHealthFacility = async (search, callback) => {
    const providerId = await formModalSlot?.form?.providerId;

    const response = await getListHealthFacility(providerId, search);

    if (response.status === 200) {
      const result = response?.data?.data || [];
      return callback(mapListSelectHealthFacility(result));
    }
  };

  const handleGetDownloadFileSlot = () => {
    dispatch(resolveDownloadFileSlot({}));
  };

  const handlePostUploadFileSlot = (id, file) => {
    dispatch(
      resolveUploadFileSlot({
        providerId: id,
        payload: file,
      })
    );
  };

  const onSubmitSlotReservation = (providerId, id) => {
    let additionalData = null;
    if (formModalSlot?.form?.treatment.type === 'vaccination') {
      additionalData = formModalSlot?.form?.additionalData
        .map((item) =>
          item.batch.map((itemBatch) => ({
            vaccine: {
              ...item.vaccine,
              dosage_sequence: Number(item.vaccine.dosage_sequence),
            },
            lotNumber: itemBatch.lotNumber,
            expirationDate: itemBatch.expirationDate,
          }))
        )
        .flat();
    }

    if (id) {
      dispatch(
        resolvePatchSlot({
          providerId: detailUser?.provider_id || providerId || null,
          slotId: id,
          payload: {
            additionalData: additionalData,
            startTime: `${formatDateEng(
              formModalSlot?.form?.date
            )} ${dateTimeToTimes(formModalSlot?.form?.startTime)}:00`,
            endTime: `${formatDateEng(
              formModalSlot?.form?.date
            )} ${dateTimeToTimes(formModalSlot?.form?.endTime)}:00`,
            isUsed: true,
            maxCount: Number(formModalSlot?.form?.maxReservation),
          },
        })
      );
    } else {
      dispatch(
        resolvePostSlot({
          providerId:
            detailUser?.provider_id || formModalSlot?.form?.providerId || null,
          payload: {
            additionalData: additionalData,
            doctorID: formModalSlot?.form?.doctor?.id,
            outletID:
              Number(detailUser?.outlet_id) ||
              formModalSlot?.form?.healthFacility?.id,
            startTime: `${formatDateEng(
              formModalSlot?.form?.date
            )} ${dateTimeToTimes(formModalSlot?.form?.startTime)}:00`,
            endTime: `${formatDateEng(
              formModalSlot?.form?.date
            )} ${dateTimeToTimes(formModalSlot?.form?.endTime)}:00`,
            maxCount: Number(formModalSlot?.form?.maxReservation),
            treatmentMode: 'ALL_TREATMENT',
            outletType: 'clinic',
            polyID: formModalSlot?.form?.poly?.id,
            treatmentTypeID: formModalSlot?.form?.treatment?.id,
          },
        })
      );
    }
  };

  const handleSetParams = (name, value) => {
    dispatch(setParams({ name, value }));
  };

  const handleSetModal = (state: string, field: string, value: boolean) => {
    dispatch(setModal({ state, field, value }));
  };

  const handleSetForm = (name: string, value: any) => {
    dispatch(setForm({ name, value }));
  };

  const handleSetProviderUploadSlot = (value) => {
    dispatch(setProviderUploadSlot({ value }));
  };

  const handleSetAddAdditionalDataForm = () => {
    dispatch(setAddAdditionalDataForm({ ...formAdditionalData }));
  };

  const handleSetAdditionalDataItem = (index, label, value) => {
    dispatch(setAdditionalDataItem({ index, label, value }));
  };

  const handleSetRemoveAdditionalDataForm = (payload) => {
    remove(payload);
    dispatch(setRemoveAdditionalDataForm(payload));
  };

  const handleSetAddAdditionalDataBatchForm = (indexData) => {
    dispatch(
      setAddAdditionalDataBatchForm({
        indexData,
        data: { ...formAdditionalDataBatch },
      })
    );
  };

  const handleSetAdditionalDataBatchItem = (
    indexData,
    indexBatch,
    label,
    value
  ) => {
    dispatch(
      setAdditionalDataBatchItem({ indexData, indexBatch, label, value })
    );
  };

  const handleSetRemoveAdditionalDataBatchForm = (indexData, indexBatch) => {
    // remove(payload);
    dispatch(setRemoveAdditionalDataBatchForm({ indexData, indexBatch }));
  };

  const handleResetModalDownloadFileSlot = () => {
    dispatch(resetModalDownloadFileSlot());
  };

  const handleResetModalUploadFileSlot = () => {
    dispatch(resetModalUploadFileSlot());
  };

  const handleResetFormModalSlot = () => {
    dispatch(resetFormModalSlot());
  };

  const handleResetStateSlotReservation = () => {
    dispatch(resetStateSlotReservation());
  };

  const listSlot = mapListSlot(slots.data, '');
  const detailSlot = mapDetailSlot(slot.data);
  const listSelectProvider = mapListSelectProvider(providers.data);
  const listSelectPoly = mapListSelectPoly(healthFacility.listPoly);
  const listSelectTreatment = mapListSelectTreatment(
    healthFacility.listTreatment
  );
  const listSelectHealthFacility = mapListSelectHealthFacility(
    healthFacilities.data
  );
  const listSelectDoctor = mapListSelectDoctor(
    healthFacility.listDoctor,
    formModalSlot?.form?.treatment?.id
  );

  return {
    data: {
      role,
      slot,
      slots,
      errors,
      params,
      control,
      listSlot,
      providers,
      detailSlot,
      detailUser,
      formModalSlot,
      listSelectPoly,
      listSelectDoctor,
      listSelectProvider,
      listSelectTreatment,
      debouncedSearchTerm,
      modalUploadFileSlot,
      modalDownloadFileSlot,
      listSelectHealthFacility,
      isSuperAdmin,
      isProviderMedpoint,
      isAdminFasyankes,
      healthFacilities,
    },
    method: {
      reset,
      setValue,
      register,
      handleSubmit,
      resetField,
      handleSetForm,
      handleSetModal,
      handleSetParams,
      handleGetListSlot,
      handleGetDetailSlot,
      handleGetListProvider,
      onSubmitSlotReservation,
      handlePostUploadFileSlot,
      handleResetFormModalSlot,
      handleSearchListProvider,
      handleGetDownloadFileSlot,
      handleGetListHealthFacility,
      handleSetProviderUploadSlot,
      handleGetDetailHealthFacility,
      handleResetModalUploadFileSlot,
      handleResetStateSlotReservation,
      handleResetModalDownloadFileSlot,
      handleSearchListHealthFacility,
      handleSetAddAdditionalDataForm,
      handleSetAdditionalDataItem,
      handleSetRemoveAdditionalDataForm,
      handleSetAddAdditionalDataBatchForm,
      handleSetAdditionalDataBatchItem,
      handleSetRemoveAdditionalDataBatchForm,
    },
  };
};

export default useSlotReservations;
