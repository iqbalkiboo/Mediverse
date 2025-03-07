import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import {
  clearStatePatchReservation,
  clearStateReservation,
  clearUpdateStatus,
  setDropdown,
  setFormType,
  setIdDoctor,
  setIsOpenModal,
  setParams,
  setPdfViewUrl,
  updateStatusConfirmation,
  resolveDetailReservation,
  resolveListDrug,
  resolveListReservation,
  resolvePatchReservationStatus,
  resolvePatchStatusReservation,
  resolveReservationDiagnostic,
  resolveReservationHospitalReferral,
  resolveReservationMedicalSupport,
  resolveReservationPrescriptions,
  resolveUserHealthProfile,
} from '@/store/medpointDoctor/medpointDoctor.reducer';
import {
  getDetailReservation,
  getListDrug,
  getListReservation,
  getReservationDiagnostic,
  getReservationHospitalReferral,
  getReservationMedicalSupport,
  getReservationPrescriptions,
  getUserHealthProfile,
} from '@/src/mappers/Doctors';
import cookieUtils from '@/src/utils/cookieUtils';

const detailUser = await cookieUtils.getUser();

const DATA_USAGE_DESCRIPTION = [
  { value: 'Sebelum Makan', label: 'Sebelum Makan' },
  { value: 'Setelah Makan', label: 'Setelah Makan' },
  {
    value: 'Sebelum atau Sesudah Makan',
    label: 'Sebelum atau Sesudah Makan',
  },
];

const DATA_DOSAGE = [
  { value: '1x1 Hari', label: '1x1 Hari' },
  { value: '2x1 Hari', label: '2x1 Hari' },
  { value: '3x1 Hari', label: '3x1 Hari' },
];

export const useDoctors = () => {
  const dispatch = useDispatch();
  const clinicId = new URLSearchParams(location?.search).get('clinicId');

  const {
    isReservationError,
    isReservationLoading,
    isReservationSuccess,
    isDetailReservationError,
    isDetailReservationLoading,
    isDetailReservationSuccess,
    isReservationDiagnosticError,
    isReservationDiagnosticLoading,
    isReservationDiagnosticSuccess,
    isReservationPrescriptionsError,
    isReservationPrescriptionsLoading,
    isReservationPrescriptionsSuccess,
    isReservationMedicalError,
    isReservationMedicalLoading,
    isReservationMedicalSuccess,
    isReservationHospitalReferralError,
    isReservationHospitalReferralLoading,
    isReservationHospitalReferralSuccess,
    isPatchReservationError,
    isPatchReservationLoading,
    isPatchReservationSuccess,
    isListDrugError,
    isListDrugLoading,
    isListDrugSuccess,
    errorMessage,
    successMessage,
    params,
    metadata,
    pdfViewUrl,
    listReservation,
    detailReservation,
    reservationDiagnostic,
    reservationPrescriptions,
    reservationMedicalSupport,
    reservationHospitalReferral,
    listDrug,
    userHealthProfile,
    dropdown,
    isOpenModal,
    idDoctor,
    updateStatus,
  } = useSelector((state: RootStateOrAny) => state.medpointDoctor);

  const handleGetListReservation = (id, status) => {
    dispatch(
      resolveListReservation({
        channelId: id,
        page: params.page,
        limit: params.limit,
        search: params.search,
        outletId: Number(clinicId),
        outletType: params.outletType,
        treatmentTypeId: params.treatmentTypeId,
        doctorId: params?.doctorId || detailUser?.doctor_id,
        reservationDate: params.reservationDate,
        reservationStatus: status,
      })
    );
  };

  const handleGetDetailReservation = (id, channelId) => {
    dispatch(
      resolveDetailReservation({
        id,
        channelId,
      })
    );
  };

  const handleGetReservationDiagnostic = (id, channelId) => {
    dispatch(
      resolveReservationDiagnostic({
        id,
        channelId,
      })
    );
  };

  const handleGetReservationPrescriptions = (id, channelId) => {
    dispatch(
      resolveReservationPrescriptions({
        id,
        channelId,
      })
    );
  };

  const handleGetReservationMedicalSupport = (id, channelId) => {
    dispatch(
      resolveReservationMedicalSupport({
        id,
        channelId,
      })
    );
  };

  const handleGetReservationHospitalReferral = (id, channelId) => {
    dispatch(
      resolveReservationHospitalReferral({
        id,
        channelId,
      })
    );
  };

  const handlePatchReservationStatus = (id, channelId, status) => {
    dispatch(
      resolvePatchReservationStatus({
        id,
        channelId,
        status,
      })
    );
  };

  const handleGetListDrug = (search: string) => {
    dispatch(resolveListDrug(search));
  };

  const handleGetUserHealthProfile = (idpSub) => {
    dispatch(resolveUserHealthProfile(idpSub));
  };

  const handleSetDropdown = (field, value) => {
    dispatch(setDropdown({ field, value }));
  };

  const handleSetIsOpenModal = (field, value) => {
    dispatch(setIsOpenModal({ field, value }));
  };

  const handleSetIdDoctor = (value) => {
    dispatch(setIdDoctor(value));
  };

  const handleSetParams = (field, value) => {
    dispatch(setParams({ field, value }));
  };

  const handleSetPdfViewUrl = (value) => {
    dispatch(setPdfViewUrl(value));
  };

  const handleSetFormType = (value) => {
    dispatch(setFormType(value));
  };

  const handleClearStateReservation = () => {
    dispatch(clearStateReservation());
  };

  const handleClearStatePatchReservation = () => {
    dispatch(clearStatePatchReservation());
  };

  const DATA_LIST_DOCTORS = getListReservation(listReservation);
  const DATA_DETAIL_DOCTORS = getDetailReservation(detailReservation);
  const DATA_RESERVATION_DIAGNOSTIC = getReservationDiagnostic(
    reservationDiagnostic
  );
  const DATA_RESERVATION_PRESCRIPTIONS = getReservationPrescriptions(
    reservationPrescriptions
  );
  const DATA_RESERVATION_MEDICAL_SUPPORT = getReservationMedicalSupport(
    reservationMedicalSupport
  );
  const DATA_RESERVATION_HOSPITAL_REFERRAL = getReservationHospitalReferral(
    reservationHospitalReferral
  );
  const DATA_USER_HEALTH_PROFILE = getUserHealthProfile(userHealthProfile);
  const DATA_DRUG = getListDrug(listDrug);

  const handleClearStateUpdateStatus = (name, value) => {
    dispatch(clearUpdateStatus({ name, value }));
  };

  const clearStateUpdateStatus = () => {
    handleClearStateUpdateStatus('status', '');
    handleClearStateUpdateStatus('transactionId', '');
    handleClearStateUpdateStatus('transactionIds', []);
  };

  const handleUpdateStatusMedpoint = (
    id: any,
    status: string,
    providerId?: string
  ) => {
    const data = {
      status: status,
      id: id,
      providerId: providerId,
    };

    dispatch(resolvePatchStatusReservation({ data }));
  };

  const handleConfirmationUpdateStatus = (
    id: any,
    status: string,
    providerId?: string[]
  ) => {
    const data = {
      status: status,
      id: id,
      providerId: providerId,
    };

    dispatch(updateStatusConfirmation({ data }));
  };

  return {
    idDoctor,
    detailUser,
    errorMessage,
    successMessage,
    handleSetIdDoctor,
    isReservationError,
    isReservationLoading,
    isReservationSuccess,
    isDetailReservationError,
    isDetailReservationLoading,
    isDetailReservationSuccess,
    isReservationDiagnosticError,
    isReservationDiagnosticLoading,
    isReservationDiagnosticSuccess,
    isReservationPrescriptionsError,
    isReservationPrescriptionsLoading,
    isReservationPrescriptionsSuccess,
    isReservationMedicalError,
    isReservationMedicalLoading,
    isReservationMedicalSuccess,
    isReservationHospitalReferralError,
    isReservationHospitalReferralLoading,
    isReservationHospitalReferralSuccess,
    isPatchReservationError,
    isPatchReservationLoading,
    isPatchReservationSuccess,
    isListDrugError,
    isListDrugLoading,
    isListDrugSuccess,
    dropdown,
    isOpenModal,
    params,
    metadata,
    pdfViewUrl,
    handleSetDropdown,
    handleSetIsOpenModal,
    handleSetParams,
    handleSetPdfViewUrl,
    handleSetFormType,
    handleClearStateReservation,
    handleClearStatePatchReservation,
    handleGetListReservation,
    handleGetDetailReservation,
    handleGetReservationDiagnostic,
    handleGetReservationPrescriptions,
    handleGetReservationMedicalSupport,
    handleGetReservationHospitalReferral,
    handlePatchReservationStatus,
    handleGetListDrug,
    handleGetUserHealthProfile,
    DATA_LIST_DOCTORS,
    DATA_DETAIL_DOCTORS,
    DATA_RESERVATION_DIAGNOSTIC,
    DATA_RESERVATION_PRESCRIPTIONS,
    DATA_RESERVATION_MEDICAL_SUPPORT,
    DATA_RESERVATION_HOSPITAL_REFERRAL,
    DATA_DRUG,
    DATA_USAGE_DESCRIPTION,
    DATA_DOSAGE,
    DATA_USER_HEALTH_PROFILE,
    updateStatus,
    handleConfirmationUpdateStatus,
    clearStateUpdateStatus,
    handleUpdateStatusMedpoint,
    handleClearStateUpdateStatus,
  };
};

export default useDoctors;
