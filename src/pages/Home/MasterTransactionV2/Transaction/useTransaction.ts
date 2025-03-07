import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import {
  resolveGetDetailTransaction,
  resolveGetListAssessment,
  resolveListCancelReason,
  resolveGetListIcd10,
  resolveGetListIcd9,
  resolveGetListImmunizationCategory,
  resolveGetListObservationReason,
  resolveGetListLaboratory,
  resolveGetListReferralHospital,
  resolveGetListProcedure,
  resolveGetListItemOther,
  resolveGetListPayor,
  resolveGetListProcedureItem,
  clearStateTransaction,
} from '@/store/transaction/transaction.reducer';
import {
  getDataListAssessment,
  getDataListCancelReason,
  getDataListIcd10,
  getDataListIcd9,
  getDataListImmunizationCategory,
  getDataListObservationReason,
  getDataListLaboratory,
  getDataListProcedure,
  getDataListReferralHospital,
  getDataListItemOther,
} from '@/client/transaction';
import { mapOptionsIcd } from '@/src/mappers/Transaction';

const useTransaction = () => {
  const dispatch = useDispatch();

  const {
    transactionDetail,
    moduleAssessment,
    moduleCancelReason,
    moduleIcd10,
    moduleIcd9,
    moduleImmunizationCategory,
    moduleObservationReason,
    moduleLaboratory,
    moduleReferralHospital,
    moduleProcedure,
    moduleProcedureItem,
    moduleOtherItem,
    modulePayor,
  } = useSelector((state: RootStateOrAny) => state.transaction);

  const handleGetDetailTransaction = (id: string) => {
    dispatch(resolveGetDetailTransaction({ id }));
  };
  const handleGetListAssessment = async () => {
    dispatch(resolveGetListAssessment());
  };
  const handleGetListCancelReason = async () => {
    dispatch(resolveListCancelReason());
  };
  const handleGetListIcd10 = async () => {
    dispatch(resolveGetListIcd10());
  };
  const handleGetListIcd9 = async () => {
    dispatch(resolveGetListIcd9());
  };
  const handleGetListImmunizationCategory = async () => {
    dispatch(resolveGetListImmunizationCategory());
  };
  const handleGetListObservationReason = async () => {
    dispatch(resolveGetListObservationReason());
  };
  const handleGetListLaboratory = async () => {
    dispatch(resolveGetListLaboratory());
  };
  const handleGetListReferralHospital = async (type: string) => {
    dispatch(resolveGetListReferralHospital({ type }));
  };
  const handleGetListProcedure = async () => {
    dispatch(resolveGetListProcedure());
  };
  const handleGetListProcedureItem = async (procedure: string) => {
    dispatch(resolveGetListProcedureItem({ procedure }));
  };
  const handleGetListItemOther = async (search: string, onlyOther: boolean) => {
    dispatch(resolveGetListItemOther({ search, onlyOther }));
  };
  const handleGetListPayor = async () => {
    dispatch(resolveGetListPayor());
  };

  const handleSearchListAssessment = async (search, callback) => {
    const response = await getDataListAssessment({ search });
    if (response.status === 200) {
      const result = response?.data?.data || [];
      return callback(mapOptionsIcd(result));
    }
  };
  const handleSearchListCancelReason = async (search, callback) => {
    const response = await getDataListCancelReason({ search });
    if (response.status === 200) {
      const result = response?.data?.data || [];
      return callback(mapOptionsIcd(result));
    }
  };
  const handleSearchListIcd10 = async (search, callback) => {
    const response = await getDataListIcd10({ search });
    if (response.status === 200) {
      const result = response?.data?.data || [];
      return callback(mapOptionsIcd(result));
    }
  };
  const handleSearchListIcd9 = async (search, callback) => {
    const response = await getDataListIcd9({ search });
    if (response.status === 200) {
      const result = response?.data?.data || [];
      return callback(mapOptionsIcd(result));
    }
  };
  const handleSearchListImmunizationCategory = async (search, callback) => {
    const response = await getDataListImmunizationCategory({ search });
    if (response.status === 200) {
      const result = response?.data?.data || [];
      return callback(mapOptionsIcd(result));
    }
  };
  const handleSearchListObservationReason = async (search, callback) => {
    const response = await getDataListObservationReason({ search });
    if (response.status === 200) {
      const result = response?.data?.data || [];
      return callback(mapOptionsIcd(result));
    }
  };
  const handleSearchListLaboratory = async (search, callback) => {
    const response = await getDataListLaboratory({ search });
    if (response.status === 200) {
      const result = response?.data?.data || [];
      return callback(mapOptionsIcd(result, false));
    }
  };
  const handleSearchListReferralHospital = async (
    search,
    callback,
    { facilityType }
  ) => {
    const response = await getDataListReferralHospital({
      search,
      type: facilityType,
    });
    if (response.status === 200) {
      const result = response?.data?.data || [];
      return callback(mapOptionsIcd(result, false, 'health_facility_name'));
    }
  };
  const handleSearchListProcedure = async (
    search,
    callback,
    { procedureList }
  ) => {
    const response = await getDataListProcedure({ search });
    if (response.status === 200) {
      const result = response?.data?.message || [];
      const filterResult =
        result?.filter(
          (item) =>
            !procedureList
              ?.map((procedure) => procedure?.procedure?.item)
              ?.includes(item?.item)
        ) || [];
      return callback(mapOptionsIcd(filterResult, false, 'procedure_name'));
    }
  };
  const handleSearchListItemOther = async (search, callback) => {
    const response = await getDataListItemOther({ search, onlyOther: true });
    if (response.status === 200) {
      const result = response?.data?.message || [];
      return callback(mapOptionsIcd(result, false));
    }
  };

  const handleClearStateTransaction = async () => {
    dispatch(clearStateTransaction());
  };

  const listSelectAssessment = mapOptionsIcd(moduleAssessment?.data);
  const listSelectCancelReason = mapOptionsIcd(moduleCancelReason?.data);
  const listSelectIcd10 = mapOptionsIcd(moduleIcd10?.data);
  const listSelectIcd9 = mapOptionsIcd(moduleIcd9?.data);
  const listSelectImmunizationCategory = mapOptionsIcd(
    moduleImmunizationCategory?.data
  );
  const listSelectObservationReason = mapOptionsIcd(
    moduleObservationReason?.data
  );
  const listSelectLaboratory = mapOptionsIcd(moduleLaboratory?.data, false);
  const listSelectReferralHospital = mapOptionsIcd(
    moduleReferralHospital?.data,
    false,
    'health_facility_name'
  );
  const listSelectProcedure = mapOptionsIcd(
    moduleProcedure?.data,
    false,
    'procedure_name'
  );
  const listSelectProcedureItem = mapOptionsIcd(
    moduleProcedureItem?.data,
    false,
    'procedure_name'
  );
  const listSelectItemOther = mapOptionsIcd(moduleOtherItem?.data, false);
  const listSelectPayor = mapOptionsIcd(modulePayor?.data, false);

  return {
    data: {
      transactionDetail,
      moduleAssessment,
      moduleCancelReason,
      moduleIcd10,
      moduleIcd9,
      moduleImmunizationCategory,
      moduleObservationReason,
      moduleLaboratory,
      moduleReferralHospital,
      moduleProcedure,
      moduleProcedureItem,
      moduleOtherItem,
      modulePayor,
      listSelectAssessment,
      listSelectCancelReason,
      listSelectIcd10,
      listSelectIcd9,
      listSelectImmunizationCategory,
      listSelectObservationReason,
      listSelectLaboratory,
      listSelectReferralHospital,
      listSelectProcedure,
      listSelectProcedureItem,
      listSelectItemOther,
      listSelectPayor,
    },
    method: {
      handleGetDetailTransaction,
      handleGetListAssessment,
      handleGetListCancelReason,
      handleGetListIcd10,
      handleGetListIcd9,
      handleGetListImmunizationCategory,
      handleGetListObservationReason,
      handleGetListLaboratory,
      handleGetListReferralHospital,
      handleGetListProcedure,
      handleGetListProcedureItem,
      handleGetListItemOther,
      handleGetListPayor,
      handleSearchListAssessment,
      handleSearchListCancelReason,
      handleSearchListIcd10,
      handleSearchListIcd9,
      handleSearchListImmunizationCategory,
      handleSearchListObservationReason,
      handleSearchListLaboratory,
      handleSearchListReferralHospital,
      handleSearchListProcedure,
      handleSearchListItemOther,
      handleClearStateTransaction,
    },
  };
};

export default useTransaction;
