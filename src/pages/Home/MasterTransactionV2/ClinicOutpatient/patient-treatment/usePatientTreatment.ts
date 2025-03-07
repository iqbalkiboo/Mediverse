import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  resolveGetDetailTransaction,
  resolveGetDetailSoap,
  resolveGetDetailIntegratedNotes,
  resolvePostSoap,
  resolvePostProcedure,
  resolvePutSoap,
  resolvePostMedicalSupport,
  resolvePostRecommendationLetter,
  resolveUploadDocument,
  resolvePostDrugRecipe,
  resolveGetDetailTreatment,
  resolvePutProcedure,
  resolveGetDetailDrugRecipe,
  resolvePutDrugRecipe,
  resolveGetDetailMedicalSupport,
  resolvePutMedicalSupport,
  resolveGetDetailRecommendationLetter,
  resolvePutRecommendationLetter,
  clearStateClinicOutpatient,
  clearIntegratedNotes,
  setFormSoap,
  setFormProcedure,
  setFormMedicalSupport,
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
  setAddMedicalSupportForm,
  setMedicalSupportItem,
  setRemoveMedicalSupportForm,
  setModalMedicalSupport,
  setFormRecommendationLetter,
  setModalRecommendationLetter,
  setModalDrugRecipe,
  setProcedureService,
  resolveDeleteDrugRecipe,
  resolveDeleteProcedure,
} from '@/src/store/clinicOutpatient/clinicOutpatient.reducer';
import { resolveGetListDrug } from '@/store/drug/drug.reducer';
import { getAssessmentHistory } from '@/client/transaction';
import { getDataListDrug } from '@/client/drug';
import {
  mapPayloadDrugRecipe,
  mapPayloadMedicalSupport,
  mapPayloadProcedureClinic,
  mapPayloadRecommendationLetter,
  mapPayloadSoapClinic,
} from '@/src/mappers/MasterTransaction/clinicoutpatient';
import { mapOptionsIcd } from '@/src/mappers/Transaction';
import { calculateBmiResult } from '@/utils/transactions';
import {
  schemaTreatmentMedicalSupport,
  schemaTreatmentProcedure,
  schemaTreatmentSoap,
} from './validation';

const caseTypeOptions = [
  { label: 'Baru', value: 'Baru' },
  { label: 'Lama', value: 'Lama' },
];

const caseCategoryOptions = [
  { label: 'Primary', value: 'Primary' },
  { label: 'Secondary', value: 'Secondary' },
];

const usePatientTreatment = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const {
    clinicOutpatient,
    formAssessment,
    formSoap,
    formProcedure,
    formProcedureItem,
    formDrugRecipe,
    formMedicalSupport,
    formMedicalSupportItem,
    formRecommendationLetter,
    integratedNotes,
    integratedNotesParams,
  } = useSelector((state: RootStateOrAny) => state.clinicOutpatient);
  const { drugs } = useSelector((state: RootStateOrAny) => state.drug);

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

  const {
    control: controlMedicalSupport,
    register: registerMedicalSupport,
    reset: resetMedicalSupport,
    formState: { errors: errorsMedicalSupport, isValid: isValidMedicalSupport },
    setValue: setValueMedicalSupport,
    handleSubmit: handleSubmitMedicalSupport,
  } = useForm({
    resolver: yupResolver(schemaTreatmentMedicalSupport),
  });

  const {
    fields: fieldsMedicalSupport,
    append: appendMedicalSupport,
    remove: removeMedicalSupport,
  } = useFieldArray({
    control: controlMedicalSupport,
    name: 'medicalSupport',
  });

  const handleGetListDrug = () => {
    dispatch(resolveGetListDrug());
  };

  const handleSearchListDrug = async (search, callback) => {
    const response = await getDataListDrug({ search });
    if (response.status === 200) {
      const result = response?.data?.message || [];
      return callback(mapOptionsIcd(result, false));
    }
  };

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

  const handleGetDetailTreatment = (id: string | number) => {
    dispatch(resolveGetDetailTreatment({ id }));
  };

  const handleGetDetailDrugRecipe = (id: string | number) => {
    dispatch(resolveGetDetailDrugRecipe({ id }));
  };

  const handleGetDetailMedicalSupport = (id: string | number) => {
    dispatch(resolveGetDetailMedicalSupport({ id }));
  };

  const handleGetDetailRecommendationLetter = (id: string | number) => {
    dispatch(resolveGetDetailRecommendationLetter({ id }));
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

  const handleSetFormMedicalSupport = (section, label, value) => {
    dispatch(setFormMedicalSupport({ section, label, value }));
  };

  const handleSetFormRecommendationLetter = (section, label, value) => {
    dispatch(setFormRecommendationLetter({ section, label, value }));
  };

  const handleSetAddProcedureForm = () => {
    const idRandom = Math.floor(Math.random() * 1000);
    appendProcedure({ ...formProcedureItem, id: idRandom });
    dispatch(setAddProcedureForm({ ...formProcedureItem, id: idRandom }));
  };

  const handleSetProcedureItem = (index, label, value) => {
    dispatch(setProcedureItem({ index, label, value }));
  };

  const handleSetProcedureService = (index, value) => {
    dispatch(setProcedureService({ index, value }));
  };

  const handleSetRemoveProcedureForm = (payload) => {
    removeProcedure(payload);
    dispatch(setRemoveProcedureForm(payload));
  };

  const handleSetAddMedicalSupportForm = () => {
    appendMedicalSupport({ ...formMedicalSupportItem });
    dispatch(setAddMedicalSupportForm({ ...formMedicalSupportItem }));
  };

  const handleSetMedicalSupportItem = (index, label, value) => {
    dispatch(setMedicalSupportItem({ index, label, value }));
  };

  const handleSetRemoveMedicalSupportForm = (payload) => {
    removeMedicalSupport(payload);
    dispatch(setRemoveMedicalSupportForm(payload));
  };

  const handleClearTreatment = () => {
    dispatch(clearStateClinicOutpatient());
  };

  const handleClearIntegratedNotes = () => {
    dispatch(clearIntegratedNotes());
  };

  const handleSubmitFormSoap = () => {
    const dataPayload = mapPayloadSoapClinic(formSoap, id, 'doctor');
    if (formSoap?.isEditDoctor) {
      dispatch(
        resolvePutSoap({ transactionId: formSoap.soapId, data: dataPayload })
      );
    } else {
      dispatch(resolvePostSoap({ transactionId: id, data: dataPayload }));
    }
  };

  const handleSubmitFormProcedure = async () => {
    const formatData =
      formProcedure.procedureService.length > 0
        ? formProcedure.procedureService.flat().filter((data) => !!data.item)
        : [];
    const payloadEdit = mapPayloadProcedureClinic(
      id,
      formatData?.filter((item) => item.isEdit === true)
    );
    const payloadCreate = mapPayloadProcedureClinic(
      id,
      formatData?.filter((item) => !item.isEdit || item.isEdit === false)
    );
    const deleteData = formProcedure?.procedureServiceDelete?.filter(
      (item) => !formatData?.some((data) => data.name === item)
    );

    if (payloadEdit.length > 0) {
      await Promise.all(
        payloadEdit.map((data) =>
          dispatch(resolvePutProcedure({ transactionId: data.name, data }))
        )
      );
    }
    if (payloadCreate.length > 0) {
      await dispatch(resolvePostProcedure({ data: { docs: payloadCreate } }));
    }
    if (deleteData.length > 0) {
      await handleDeleteProcedure(deleteData);
    }
  };

  const handleDeleteProcedure = async (procedureData) => {
    if (!procedureData || procedureData.length < 1) return;
    await Promise.all(
      procedureData.map((id) =>
        dispatch(resolveDeleteProcedure({ transactionId: id }))
      )
    );
  };

  const handleSubmitFormDrugRecipe = async (drugData) => {
    const payloadEdit = mapPayloadDrugRecipe(
      id,
      drugData?.filter((item) => item.isEdit === true)
    );
    const payloadCreate = mapPayloadDrugRecipe(
      id,
      drugData?.filter((item) => !item.isEdit || item.isEdit === false)
    );

    if (payloadEdit.length > 0) {
      await Promise.all(
        payloadEdit.map((data) =>
          dispatch(resolvePutDrugRecipe({ transactionId: data.name, data }))
        )
      );
    }
    if (payloadCreate.length > 0) {
      await dispatch(resolvePostDrugRecipe({ data: { docs: payloadCreate } }));
    }
    if (payloadEdit.length < 1 && payloadCreate.length < 1) {
      dispatch(resolvePostDrugRecipe({ data: { docs: [] } }));
    }
  };

  const handleDeleteDrugRecipe = async (drugData) => {
    if (!drugData || drugData.length < 1) return;
    await Promise.all(
      drugData.map((id) =>
        dispatch(resolveDeleteDrugRecipe({ transactionId: id }))
      )
    );
  };

  const handleSubmitFormMedicalSupport = () => {
    const payload = mapPayloadMedicalSupport(id, formMedicalSupport);
    if (formMedicalSupport?.isEdit) {
      dispatch(
        resolvePutMedicalSupport({
          transactionId: formMedicalSupport?.id || id,
          data: payload,
        })
      );
    } else {
      dispatch(resolvePostMedicalSupport({ data: payload }));
    }
  };

  const handleSubmitRecommendationLetter = () => {
    const payload = mapPayloadRecommendationLetter(
      id,
      formRecommendationLetter
    );
    if (formRecommendationLetter?.isEdit) {
      dispatch(
        resolvePutRecommendationLetter({
          transactionId: formRecommendationLetter?.id || id,
          data: payload,
        })
      );
    } else {
      dispatch(resolvePostRecommendationLetter({ data: payload }));
    }
  };

  const handleUploadDocument = (fileInput) => {
    const formData = new FormData();
    formData.append('file', fileInput);
    formData.append('docname', formRecommendationLetter.docname);
    formData.append('doctype', 'Recommendation Letter');
    formData.append('is_private', '1');
    dispatch(resolveUploadDocument({ data: formData }));
  };

  const handleSetModal = (field: string, value: boolean) => {
    dispatch(setModal({ field, value }));
  };

  const handleSetModalProcedure = (field: string, value: boolean) => {
    dispatch(setModalProcedure({ field, value }));
  };

  const handleSetModalDrugRecipe = (field: string, value: any) => {
    dispatch(setModalDrugRecipe({ field, value }));
  };

  const handleSetModalMedicalSupport = (field: string, value: any) => {
    dispatch(setModalMedicalSupport({ field, value }));
  };

  const handleSetModalRecommendationLetter = (field: string, value: any) => {
    dispatch(setModalRecommendationLetter({ field, value }));
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

  const dataClinicOutpatient = clinicOutpatient.data;
  const listSelectDrug = mapOptionsIcd(drugs?.data, false);

  return {
    data: {
      id,
      drugs,
      listSelectDrug,
      clinicOutpatient,
      dataClinicOutpatient,
      caseTypeOptions,
      caseCategoryOptions,
      formSoap,
      formProcedure,
      formMedicalSupport,
      formDrugRecipe,
      formRecommendationLetter,
      integratedNotes,
      integratedNotesParams,
      fieldsProcedure,
      fieldsMedicalSupport,
      control,
      errors,
      isValid,
      controlProcedure,
      errorsProcedure,
      isValidProcedure,
      controlMedicalSupport,
      errorsMedicalSupport,
      isValidMedicalSupport,
      metadataIntegratedNotes: integratedNotes.metadata,
    },
    method: {
      handleGetListDrug,
      handleSearchListDrug,
      handleGetDetailTransaction,
      handleGetDetailIntegratedNotes,
      handleGetDetailSoap,
      handleGetDetailTreatment,
      handleGetDetailDrugRecipe,
      handleGetDetailMedicalSupport,
      handleGetDetailRecommendationLetter,
      handleGetAssessmentHistory,
      handleSetFormSoap,
      handleSetFormProcedure,
      handleSetFormMedicalSupport,
      handleSetFormRecommendationLetter,
      handleSetAddAssessmentForm,
      handleSetAssessmentItem,
      handleSetRemoveAssessmentForm,
      handleSetAddProcedureForm,
      handleSetProcedureItem,
      handleSetProcedureService,
      handleSetRemoveProcedureForm,
      handleSetAddMedicalSupportForm,
      handleSetMedicalSupportItem,
      handleSetRemoveMedicalSupportForm,
      handleClearTreatment,
      handleClearIntegratedNotes,
      handleSubmitFormSoap,
      handleSubmitFormProcedure,
      handleSubmitFormDrugRecipe,
      handleSubmitFormMedicalSupport,
      handleSubmitRecommendationLetter,
      handleUploadDocument,
      handleSetModal,
      handleSetModalProcedure,
      handleSetModalDrugRecipe,
      handleSetModalMedicalSupport,
      handleSetModalRecommendationLetter,
      handleSetModalIntegratedNotes,
      handleSetIntegratedNotesParams,
      handleDeleteDrugRecipe,
      calculateBmi,
      setValue,
      handleSubmit,
      register,
      reset,
      setValueProcedure,
      handleSubmitProcedure,
      registerProcedure,
      resetProcedure,
      setValueMedicalSupport,
      handleSubmitMedicalSupport,
      registerMedicalSupport,
      resetMedicalSupport,
    },
  };
};

export default usePatientTreatment;
