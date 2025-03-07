import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import {
  resolveAddAppointment,
  resolveGetListDepartment,
  resolveGetListService,
  setModalRegister,
} from '@/store/service/service.reducer';
import { resolveGetListDoctor } from '@/store/doctor/doctor.reducer';
import { mappingPayloadSalesOrderAppointment } from '@/src/mappers/service';

const useRegister = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { listService, listDepartment, formRegister } = useSelector(
    (state: RootStateOrAny) => state.service
  );
  const { listDoctor } = useSelector((state: RootStateOrAny) => state.doctor);

  const handleGetListService = async (type: string) => {
    dispatch(resolveGetListService({ type }));
  };

  const handleGetListDepartment = async () => {
    dispatch(resolveGetListDepartment());
  };

  const handleGetListDoctor = async (department: string) => {
    dispatch(resolveGetListDoctor({ department }));
  };

  const handleAddAppointment = async (data) => {
    const body = mappingPayloadSalesOrderAppointment(id, data);
    const payload = {
      data: body,
    };
    dispatch(resolveAddAppointment(payload));
  };

  const handleSetModalRegister = (label, value) => {
    dispatch(setModalRegister({ label, value }));
  };

  return {
    data: {
      listService,
      listServiceData: listService.data,
      listDepartment,
      listDepartmentData: listDepartment.data,
      listDoctor,
      listDoctorData: listDoctor.data,
      formRegister,
    },
    method: {
      handleGetListService,
      handleGetListDepartment,
      handleGetListDoctor,
      handleAddAppointment,
      handleSetModalRegister,
    },
  };
};

export default useRegister;
