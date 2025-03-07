import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';

import { resolveGetListAssessment } from '@/src/store/transaction/transaction.reducer';
import {
  clearParams,
  clearStateVaccination,
  setFormCheckup,
  setModalCheckup,
  resolveGetDetailTransaction,
  resolvePostCheckup,
} from '@/src/store/vaccination/vaccination.reducer';
import { getDataListAssessment } from '@/client/transaction';
import { mapOptionsIcd } from '@/src/mappers/Transaction';
import { mapPayloadSoap } from '@/src/mappers/MasterTransaction/vaccination';
import { calculateBmiResult } from '@/utils/transactions';
import { schemaCheckupAssessment, schemaCheckupSoap } from './validation';

const useVaccinationCheckup = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { moduleAssessment } = useSelector(
    (state: RootStateOrAny) => state.transaction
  );
  const { vaccination, formCheckup } = useSelector(
    (state: RootStateOrAny) => state.vaccination
  );

  const {
    control,
    register,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schemaCheckupAssessment),
  });

  const {
    control: controlFormSoap,
    register: registerFormSoap,
    reset: resetFormSoap,
    formState: { errors: errorsFormSoap, isValid: isValidFormSoap },
    handleSubmit: handleSubmitFormSoap,
    setValue: setValueFormSoap,
  } = useForm({
    resolver: yupResolver(schemaCheckupSoap),
  });

  const handleGetDetailTransaction = (id: string) => {
    dispatch(resolveGetDetailTransaction({ id }));
  };

  const handleGetListAssessment = async () => {
    dispatch(resolveGetListAssessment());
  };

  const handleSearchListAssessment = async (search, callback) => {
    const response = await getDataListAssessment({ search });
    if (response.status === 200) {
      const result = response?.data?.data || [];
      return callback(mapOptionsIcd(result, false));
    }
  };

  const handleSetFormCheckup = (section, label, value) => {
    dispatch(setFormCheckup({ section, label, value }));
  };

  const handleClearTreatment = () => {
    dispatch(clearStateVaccination());
    dispatch(clearParams());
  };

  const handleSubmitFormCheckup = () => {
    const dataPayload = mapPayloadSoap(formCheckup, id, 'nurse');
    dispatch(resolvePostCheckup({ transactionId: id, data: dataPayload }));
  };

  const handleSetModal = (field: string, value: boolean) => {
    dispatch(setModalCheckup({ field, value }));
  };

  const calculateBmi = () => {
    if (!formCheckup.objective.height || !formCheckup.objective.weight) {
      handleSetFormCheckup('objective', 'bmi', '');
      handleSetFormCheckup('objective', 'bmi_result', '');
      return;
    }
    const { bmi, resultBmi } = calculateBmiResult(
      formCheckup.objective.height,
      formCheckup.objective.weight
    );
    handleSetFormCheckup('objective', 'bmi', bmi);
    handleSetFormCheckup('objective', 'bmi_result', resultBmi);
  };

  const dataVaccinationDetail = vaccination.data;
  const listSelectAssessment = mapOptionsIcd(moduleAssessment?.data, false);

  return {
    data: {
      id,
      vaccination,
      dataVaccinationDetail,
      listSelectAssessment,
      formCheckup,
      control,
      errors,
      isValid,
      controlFormSoap,
      errorsFormSoap,
      isValidFormSoap,
    },
    method: {
      handleGetDetailTransaction,
      handleGetListAssessment,
      handleSearchListAssessment,
      handleSetFormCheckup,
      handleClearTreatment,
      handleSetModal,
      handleSubmitFormCheckup,
      calculateBmi,
      reset,
      register,
      handleSubmit,
      resetFormSoap,
      registerFormSoap,
      setValueFormSoap,
      handleSubmitFormSoap,
    },
  };
};

export default useVaccinationCheckup;
