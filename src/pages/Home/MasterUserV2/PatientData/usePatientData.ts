import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import {
  clearStatePatient,
  resolveGetListDetailPatient,
  resolveGetListIntegratedNote,
  resolveGetListMedicalRecord,
  resolveGetListPatient,
  resolveGetListPayorByPatient,
} from '@/store/patient/patient.reducer';

const usePatientData = () => {
  const dispatch = useDispatch();

  const {
    listPatient,
    listPatientPayor,
    detailPatient,
    medicalRecords,
    integratedNotes,
  } = useSelector((state: RootStateOrAny) => state.patient);

  const handleGetListPatient = (noIdentifier) => {
    dispatch(resolveGetListPatient({ noIdentifier }));
  };

  const handleGetListPayorPatient = (noIdentifier) => {
    dispatch(resolveGetListPayorByPatient({ noIdentifier }));
  };

  const handleGetDetailPatient = (id: string) => {
    dispatch(resolveGetListDetailPatient({ id }));
  };

  const handleGetMedicalRecord = (id: string) => {
    dispatch(resolveGetListMedicalRecord({ id }));
  };

  const handleGetIntegratedNotes = (id: string) => {
    dispatch(resolveGetListIntegratedNote({ id }));
  };

  const handleClearPatient = () => {
    dispatch(clearStatePatient());
  };

  return {
    data: {
      listPatient,
      listPatientData: listPatient?.data,
      listPatientPayor,
      listPatientPayorData: listPatientPayor?.data,
      detailPatient,
      detailPatientData: detailPatient?.data,
      medicalRecords,
      integratedNotes,
    },
    method: {
      handleGetListPatient,
      handleGetListPayorPatient,
      handleGetDetailPatient,
      handleGetIntegratedNotes,
      handleGetMedicalRecord,
      handleClearPatient,
    },
  };
};

export default usePatientData;
