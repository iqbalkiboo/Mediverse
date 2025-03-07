import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  addFormPrescriptions,
  clearDeletePrescription,
  clearFormDiagnose,
  clearFormHospitalReferral,
  clearFormMedicalSupport,
  clearFormPrescriptions,
  clearStatePostReservation,
  setFormDiagnose,
  setFormHospitalReferral,
  setFormMedicalSupport,
  setFormPrescriptions,
  setFormType,
  setModalConfirmDeletePrescription,
  resolveDeleteReservationPrescriptions,
  resolvePostReservationDiagnostic,
  resolvePostReservationHospitalReferral,
  resolvePostReservationMedicalSupport,
  resolvePostReservationPrescriptions,
} from '@/store/medpointDoctor/medpointDoctor.reducer';
import {
  validationDiagnose,
  validationHospitalReferral,
  validationMedicalSupport,
  validationPrescriptionScheme,
} from './validation';

const useFormDoctors = () => {
  const dispatch = useDispatch();

  const {
    isPostReservationDiagnosticError,
    isPostReservationDiagnosticLoading,
    isPostReservationDiagnosticSuccess,
    isPostReservationMedicalSupportError,
    isPostReservationMedicalSupportLoading,
    isPostReservationMedicalSupportSuccess,
    isPostReservationHospitalReferralError,
    isPostReservationHospitalReferralLoading,
    isPostReservationHospitalReferralSuccess,
    isPostReservationPrescriptionsError,
    isPostReservationPrescriptionsLoading,
    isPostReservationPrescriptionsSuccess,
    listDrug,
    formDiagnose,
    formSupport,
    formReferral,
    formPrescription,
    formType,
    drugSearch,
    deletePrescription,
  } = useSelector((state: RootStateOrAny) => state.medpointDoctor);

  const formValidation = () => {
    if (formType === 'diagnostic') {
      return validationDiagnose;
    } else if (formType === 'support') {
      return validationMedicalSupport;
    } else if (formType === 'referral') {
      return validationHospitalReferral;
    } else {
      return validationPrescriptionScheme;
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formValidation()),
  });

  const handlePostReservationDiagnostic = (
    id: number,
    channelId: string,
    data
  ) => {
    const payload = {
      patientComplain: data.patientComplain,
      initialDiagnose: data.initialDiagnose,
      bodyTemperature: data.bodyTemperature,
      bloodPressure: data.bloodPressure,
      patientWeight: data.patientWeight,
      patientHeight: data.patientHeight,
      subject: data.subject,
      object: data.object,
    };
    dispatch(
      resolvePostReservationDiagnostic({ id, channelId, data: payload })
    );
  };

  const handlePostReservationMedicalSupport = (id, channelId, data) => {
    const payload = {
      description: data.description,
      attachmentUrl: formSupport.attachmentUrl,
    };
    dispatch(
      resolvePostReservationMedicalSupport({ id, channelId, data: payload })
    );
  };

  const handlePostReservationHospitalReferral = (id, channelId, data) => {
    const payload = {
      faskesName: data.faskesName,
      polyName: data.polyName,
      doctorName: data.doctorName,
      attachmentUrl: formReferral.attachmentUrl,
    };
    dispatch(
      resolvePostReservationHospitalReferral({ id, channelId, data: payload })
    );
  };

  const handlePostReservationPrescriptions = (id, channelId) => {
    const filtered = listDrug.filter(
      (item) => item.item.name === formPrescription.itemName
    );
    let payload: {
      id?: number;
      itemName: string;
      itemPrimaryTag: string;
      usageDescription: string;
      dosage: string;
    } = {
      itemName: formPrescription.itemName,
      itemPrimaryTag: filtered.length === 0 ? '' : formPrescription.itemName,
      usageDescription: formPrescription.usageDescription,
      dosage: formPrescription.dosage,
    };

    if (formPrescription.id) {
      payload = {
        ...payload,
        id: formPrescription.id,
      };
    }

    dispatch(
      resolvePostReservationPrescriptions({ id, channelId, data: payload })
    );
  };

  const handleSetFormDiagnose = (field: string, value: string) => {
    dispatch(setFormDiagnose({ field, value }));
  };

  const handleSetFormMedicalSupport = (field: string, value: string) => {
    dispatch(setFormMedicalSupport({ field, value }));
  };

  const handleSetFormHospitalReferral = (field: string, value: string) => {
    dispatch(setFormHospitalReferral({ field, value }));
  };

  const handleSetFormPrescriptions = (field: string, value: string) => {
    dispatch(setFormPrescriptions({ field, value }));
  };

  const handleEditFormPrescriptions = (data: {
    itemName: string;
    itemPrimaryTag: string;
    usageDescription: string;
    id: number;
  }) => {
    dispatch(addFormPrescriptions(data));
  };

  const handleDeleteFormPrescriptions = (data: {
    itemName: string;
    itemPrimaryTag: string;
    usageDescription: string;
    id: number;
  }) => {
    dispatch(
      setModalConfirmDeletePrescription({
        field: 'id',
        value: data.id,
      })
    );
    dispatch(
      setModalConfirmDeletePrescription({
        field: 'confirmation',
        value: true,
      })
    );
  };

  const onDeletePrescription = (channelId: number, reservationId: number) => {
    dispatch(
      resolveDeleteReservationPrescriptions({
        id: reservationId,
        channelId: channelId,
        prescriptionId: deletePrescription.id,
      })
    );
  };

  const handleSetFormType = (value) => {
    dispatch(setFormType(value));
  };

  const handleClearFormDiagnose = () => {
    dispatch(clearFormDiagnose());
  };

  const handleClearFormMedicalSupport = () => {
    dispatch(clearFormMedicalSupport());
  };

  const handleClearFormHospitalReferral = () => {
    dispatch(clearFormHospitalReferral());
  };

  const handleClearFormPrescriptions = () => {
    dispatch(clearFormPrescriptions());
  };

  const handleClearPostReservation = () => {
    dispatch(clearStatePostReservation());
  };

  const handleClearStateDeletePrescription = () => {
    dispatch(clearDeletePrescription());
  };

  return {
    register,
    handleSubmit,
    control,
    errors,
    reset,
    isPostReservationDiagnosticError,
    isPostReservationDiagnosticLoading,
    isPostReservationDiagnosticSuccess,
    isPostReservationMedicalSupportError,
    isPostReservationMedicalSupportLoading,
    isPostReservationMedicalSupportSuccess,
    isPostReservationHospitalReferralError,
    isPostReservationHospitalReferralLoading,
    isPostReservationHospitalReferralSuccess,
    isPostReservationPrescriptionsError,
    isPostReservationPrescriptionsLoading,
    isPostReservationPrescriptionsSuccess,
    drugSearch,
    formDiagnose,
    formSupport,
    formReferral,
    formPrescription,
    handleClearPostReservation,
    handleSetFormType,
    handleSetFormDiagnose,
    handleSetFormMedicalSupport,
    handleSetFormHospitalReferral,
    handleSetFormPrescriptions,
    handleEditFormPrescriptions,
    handleDeleteFormPrescriptions,
    handleClearFormDiagnose,
    handleClearFormMedicalSupport,
    handleClearFormHospitalReferral,
    handleClearFormPrescriptions,
    handlePostReservationDiagnostic,
    handlePostReservationMedicalSupport,
    handlePostReservationHospitalReferral,
    handlePostReservationPrescriptions,
    deletePrescription,
    onDeletePrescription,
    handleClearStateDeletePrescription,
  };
};

export default useFormDoctors;
