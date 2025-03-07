import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';

import {
  clearStatePatient,
  setFormPatient,
  setModalPatient,
  resolvePostPatient,
  resolvePostPatientPayor,
} from '@/store/patient/patient.reducer';
import {
  clearStateLocation,
  setParamsLocation,
  resolveListLocation,
} from '@/store/location/location.reducer';
import {
  getSearchListDistrict,
  getSearchListProvince,
  getSearchListRegency,
} from '@/client/location';
import { mapListSelect } from '@/src/mappers/mapData';
import { schemaAddress, schemaIdentity } from './validation';

const maritalOptions = [
  { label: 'Belum Menikah', value: 'Belum Menikah' },
  { label: 'Menikah', value: 'Menikah' },
];

const useAddPatient = () => {
  const dispatch = useDispatch();

  const { formPatient } = useSelector((state: RootStateOrAny) => state.patient);

  const { listLocation, paramsLocation } = useSelector(
    (state: RootStateOrAny) => state.location
  );

  const {
    control: controlIdentity,
    register: registerIdentity,
    reset: resetIdentity,
    formState: { errors: errorsIdentity, isValid: isValidIdentity },
    handleSubmit: handleSubmitIdentity,
    setError: setErrorIdentity,
    clearErrors: clearErrorsIdentity,
  } = useForm({
    resolver: yupResolver(schemaIdentity),
    mode: 'onChange',
  });

  const {
    control: controlAddress,
    register: registerAddress,
    reset: resetAddress,
    formState: { errors: errorsAddress, isValid: isValidAddress },
    handleSubmit: handleSubmitAddress,
    setValue: setValueAddress,
  } = useForm({
    resolver: yupResolver(schemaAddress),
  });

  const handleClearPatient = () => {
    dispatch(clearStatePatient());
  };

  const handleSetFormPatient = (label, value) => {
    dispatch(setFormPatient({ label, value }));
  };

  const handleSetModal = (label, value) => {
    dispatch(setModalPatient({ label, value }));
  };

  const handleGetLocation = () => {
    dispatch(resolveListLocation(paramsLocation));
  };

  const handleSubmitPatient = () => {
    const data = {
      ...formPatient.data,
      no_nikes:
        formPatient.patient_type === 'Karyawan' ? formPatient.no_nikes : '',
      dob: dayjs(formPatient.data.dob).format('YYYY-MM-DD'),
    };
    dispatch(resolvePostPatient({ data }));
  };

  const handleSubmitPatientPayor = (insuranceData) => {
    const filterInsuranceData = insuranceData.filter(
      (item) => item.payor && item.no_identifier
    );
    if (filterInsuranceData.length < 1) return;

    const payload = filterInsuranceData.map((item) => ({
      doctype: 'Patient Payor',
      payor: item.payor,
      no_identifier: item.no_identifier,
      patient: formPatient?.data?.name,
    }));
    dispatch(resolvePostPatientPayor({ data: { docs: payload } }));
  };

  const handleSearchListProvince = async (search, callback) => {
    const response = await getSearchListProvince(search);
    if (response.status === 200) {
      const result = response?.data?.data?.province;
      return callback(mapListSelect(result || []));
    }
  };

  const handleSearchListRegency = async (search, callback) => {
    const response = await getSearchListRegency(search, paramsLocation);
    if (response.status === 200) {
      const result = response?.data?.data?.regency;
      return callback(mapListSelect(result || []));
    }
  };

  const handleSearchListDistrict = async (search, callback) => {
    const response = await getSearchListDistrict(search, paramsLocation);
    if (response.status === 200) {
      const result = response?.data?.data?.district;
      return callback(mapListSelect(result || []));
    }
  };

  const handleSetParamsLocation = (name, value) => {
    dispatch(setParamsLocation({ name, value }));
  };

  const handleClearLocation = () => {
    dispatch(clearStateLocation());
  };

  const listSelectProvince = mapListSelect(listLocation?.data?.province);
  const listSelectRegency = mapListSelect(listLocation?.data?.regency);
  const listSelectDistrict = mapListSelect(listLocation?.data?.district);

  return {
    data: {
      maritalOptions,
      formPatient,
      formPatientData: formPatient.data,
      listLocation,
      listLocationData: listLocation.data,
      listSelectProvince,
      listSelectRegency,
      listSelectDistrict,
      paramsLocation,
      controlIdentity,
      errorsIdentity,
      isValidIdentity,
      controlAddress,
      errorsAddress,
      isValidAddress,
    },
    method: {
      handleClearPatient,
      handleGetLocation,
      handleSetFormPatient,
      handleSetModal,
      handleSubmitPatient,
      handleSubmitPatientPayor,
      handleSearchListProvince,
      handleSearchListRegency,
      handleSearchListDistrict,
      handleSetParamsLocation,
      handleClearLocation,
      handleSubmitIdentity,
      handleSubmitAddress,
      registerIdentity,
      resetIdentity,
      setErrorIdentity,
      clearErrorsIdentity,
      registerAddress,
      resetAddress,
      setValueAddress,
    },
  };
};

export default useAddPatient;
