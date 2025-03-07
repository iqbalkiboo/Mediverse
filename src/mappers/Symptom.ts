import {
  Symptom,
  SymptomData,
} from '@/src/types/Symptom';
import {MetaDataHealthCareStore} from '@/src/types/MetaData';

export const getSymptom = (data: Symptom): Symptom => ({
  code: data.code,
  data: getSymptomData(data.data),
  metadata: getMetaData(data.metadata),
});

export const getSymptomData = (data: SymptomData[]): SymptomData[] => {
  return data.map((item) => ({
    created_at: item.created_at,
    updated_at: item.updated_at,
    id: item.id,
    symptom_id: item.symptom_id,
    symptom_name: item.symptom_name,
    specialist_id: item.specialist_id,
    symptom_icon: item.symptom_icon ?? '',
    is_deleted: item.is_deleted,
    is_active: item.is_active,
    medevo_symptom_id: item.medevo_symptom_id,
  }));
};

export const getSymptomCheckerData = (data) => {
  return data.map((item) => ({
    value: item.value,
    label: item.label,
  }));
};

export const getSymptomDetailData = (data: SymptomData): SymptomData => {
  return {
    created_at: data.created_at,
    updated_at: data.updated_at,
    id: data.id,
    symptom_id: data.symptom_id,
    symptom_name: data.symptom_name,
    specialist_id: data.specialist_id,
    symptom_icon: data.symptom_icon ?? '',
    is_deleted: data.is_deleted,
    is_active: data.is_active,
    medevo_symptom_id: data.medevo_symptom_id,
  };
};

export const getMetaData = (
    data: MetaDataHealthCareStore,
): MetaDataHealthCareStore => ({
  page: data.page,
  size: data.size,
  totalData: data.totalData,
  totalPage: data.totalPage,
});
