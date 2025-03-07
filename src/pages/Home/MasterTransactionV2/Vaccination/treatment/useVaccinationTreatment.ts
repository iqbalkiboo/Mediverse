import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  clearStateVaccination,
  clearIntegratedNotes,
  setFormSoap,
  setFormProcedure,
  setAddAssessmentForm,
  setAssessmentItem,
  setRemoveAssessmentForm,
  setAddProcedureForm,
  setRemoveProcedureForm,
  setProcedureItem,
  setModalProcedure,
  setModal,
  setModalIntegratedNotes,
  setFormIntegratedNotesParams,
  resolveGetDetailTransaction,
  resolveGetDetailSoap,
  resolveGetDetailIntegratedNotes,
  resolvePostSoap,
  resolvePostProcedure,
  resolvePutSoap,
} from '@/src/store/vaccination/vaccination.reducer';
import { getAssessmentHistory } from '@/client/transaction';
import {
  mapPayloadProcedure,
  mapPayloadSoap,
} from '@/src/mappers/MasterTransaction/vaccination';
import { calculateBmiResult } from '@/utils/transactions';
import { schemaTreatmentProcedure, schemaTreatmentSoap } from './validation';

const caseTypeOptions = [
  { label: 'Baru', value: 'Baru' },
  { label: 'Lama', value: 'Lama' },
];

const caseCategoryOptions = [
  { label: 'Primary', value: 'Primary' },
  { label: 'Secondary', value: 'Secondary' },
];

const useVaccinationTreatment = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const {
    vaccination,
    formAssessment,
    formSoap,
    formProcedure,
    formProcedureItem,
    integratedNotes,
    integratedNotesParams,
  } = useSelector((state: RootStateOrAny) => state.vaccination);

  const {
    control,
    register,
    reset,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schemaTreatmentSoap),
  });

  const { remove } = useFieldArray({
    control,
    name: 'assessment',
  });

  const {
    control: controlProcedure,
    register: registerProcedure,
    reset: resetProcedure,
    formState: { errors: errorsProcedure, isValid: isValidProcedure },
    setValue: setValueProcedure,
    handleSubmit: handleSubmitProcedure,
  } = useForm({
    resolver: yupResolver(schemaTreatmentProcedure),
  });

  const {
    fields: fieldsProcedure,
    append: appendProcedure,
    remove: removeProcedure,
  } = useFieldArray({
    control: controlProcedure,
    name: 'procedure',
  });

  const handleGetDetailTransaction = (id: string) => {
    dispatch(resolveGetDetailTransaction({ id }));
  };

  const handleGetDetailIntegratedNotes = (id: string) => {
    dispatch(
      resolveGetDetailIntegratedNotes({
        id,
      })
    );
  };

  const handleGetDetailSoap = (id: string | number) => {
    dispatch(resolveGetDetailSoap({ id }));
  };

  const handleGetAssessmentHistory = async (
    index: number,
    id: string,
    code: string
  ) => {
    const response = await getAssessmentHistory(id, code);
    if (response.status === 200) {
      const result = response?.data?.message || false;
      handleSetAssessmentItem(index, 'case_type', result ? 'Lama' : 'Baru');
    }
  };

  const handleSetFormSoap = (section, label, value) => {
    dispatch(setFormSoap({ section, label, value }));
  };

  const handleSetAddAssessmentForm = () => {
    dispatch(setAddAssessmentForm({ ...formAssessment }));
  };

  const handleSetAssessmentItem = (index, label, value) => {
    dispatch(setAssessmentItem({ index, label, value }));
  };

  const handleSetRemoveAssessmentForm = (payload) => {
    remove(payload);
    dispatch(setRemoveAssessmentForm(payload));
  };

  const handleSetFormProcedure = (section, label, value) => {
    dispatch(setFormProcedure({ section, label, value }));
  };

  const handleSetAddProcedureForm = () => {
    appendProcedure({ ...formProcedureItem });
    dispatch(setAddProcedureForm({ ...formProcedureItem }));
  };

  const handleSetProcedureItem = (index, label, value) => {
    dispatch(setProcedureItem({ index, label, value }));
  };

  const handleSetRemoveProcedureForm = (payload) => {
    removeProcedure(payload);
    dispatch(setRemoveProcedureForm(payload));
  };

  const handleClearTreatment = () => {
    dispatch(clearStateVaccination());
  };

  const handleClearIntegratedNotes = () => {
    dispatch(clearIntegratedNotes());
  };

  const handleSubmitFormSoap = () => {
    const dataPayload = mapPayloadSoap(formSoap, id, 'doctor');
    if (formSoap?.isEditDoctor) {
      dispatch(
        resolvePutSoap({ transactionId: formSoap.soapId, data: dataPayload })
      );
    } else {
      dispatch(resolvePostSoap({ transactionId: id, data: dataPayload }));
    }
  };

  const handleSubmitFormProcedure = () => {
    const dataPayload = mapPayloadProcedure(id, formProcedure.procedure);
    const payload = { docs: dataPayload };
    dispatch(resolvePostProcedure({ data: payload }));
  };

  const handleSetModal = (field: string, value: boolean) => {
    dispatch(setModal({ field, value }));
  };

  const handleSetModalProcedure = (field: string, value: boolean) => {
    dispatch(setModalProcedure({ field, value }));
  };

  const handleSetModalIntegratedNotes = (field: string, value: boolean) => {
    dispatch(setModalIntegratedNotes({ field, value }));
  };

  const handleSetIntegratedNotesParams = (label, value) => {
    dispatch(setFormIntegratedNotesParams({ label, value }));
  };

  const calculateBmi = () => {
    if (!formSoap.objective.height || !formSoap.objective.weight) {
      handleSetFormSoap('objective', 'bmi', '');
      handleSetFormSoap('objective', 'bmi_result', '');
      return;
    }
    const { bmi, resultBmi } = calculateBmiResult(
      formSoap.objective.height,
      formSoap.objective.weight
    );
    handleSetFormSoap('objective', 'bmi', bmi);
    handleSetFormSoap('objective', 'bmi_result', resultBmi);
  };

  const dataVaccinationDetail = vaccination.data;

  return {
    data: {
      id,
      vaccination,
      dataVaccinationDetail,
      caseTypeOptions,
      caseCategoryOptions,
      formSoap,
      formProcedure,
      integratedNotes,
      integratedNotesParams,
      fieldsProcedure,
      control,
      errors,
      isValid,
      controlProcedure,
      errorsProcedure,
      isValidProcedure,
      metadataIntegratedNotes: integratedNotes.metadata,
    },
    method: {
      handleGetDetailTransaction,
      handleGetDetailIntegratedNotes,
      handleGetDetailSoap,
      handleGetAssessmentHistory,
      handleSetFormSoap,
      handleSetFormProcedure,
      handleSetAddAssessmentForm,
      handleSetAssessmentItem,
      handleSetRemoveAssessmentForm,
      handleSetAddProcedureForm,
      handleSetProcedureItem,
      handleSetRemoveProcedureForm,
      handleClearTreatment,
      handleClearIntegratedNotes,
      handleSubmitFormSoap,
      handleSubmitFormProcedure,
      handleSetModal,
      handleSetModalProcedure,
      handleSetModalIntegratedNotes,
      handleSetIntegratedNotesParams,
      calculateBmi,
      setValue,
      handleSubmit,
      register,
      reset,
      setValueProcedure,
      handleSubmitProcedure,
      registerProcedure,
      resetProcedure,
    },
  };
};

export default useVaccinationTreatment;
