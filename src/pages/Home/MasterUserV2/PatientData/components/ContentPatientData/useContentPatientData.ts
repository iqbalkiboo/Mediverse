import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import { resolveGetListPatient } from '@/store/patient/patient.reducer';

const useContentPatientData = () => {
  const dispatch = useDispatch();

  const { listPatient } = useSelector((state: RootStateOrAny) => state.patient);

  const handleGetListPatient = async (noIdentifier) => {
    dispatch(resolveGetListPatient({ noIdentifier }));
  };

  return {
    data: {
      listPatient,
      listPatientData: listPatient.data,
    },
    method: {
      handleGetListPatient,
    },
  };
};

export default useContentPatientData;
