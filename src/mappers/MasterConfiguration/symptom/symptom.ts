import {
  ItemDetailSymptom,
  ItemSymptom,
  ItemSymptomChecker,
} from '@/src/types/MasterConfiguration/symptom/Symptom';
import {formatDateWithDay} from '@/src/utils/formatDate';

export const mapListSymptom = (data: ItemSymptom[]) => {
  const result = data?.map((item: ItemSymptom) => {
    const date = new Date(item.created_at * 1000);
    return {
      created_at: formatDateWithDay(date),
      updated_at: item.updated_at,
      id: item.id,
      symptom_id: item.symptom_id,
      symptom_name: item.symptom_name,
      specialist_id: item.specialist_id,
      symptom_icon: item.symptom_icon ?? '',
      is_deleted: item.is_deleted,
      is_active: item.is_active,
      medevo_symptom_id: item.medevo_symptom_id,
    };
  });

  return result;
};

export const mapListSymptomChecker = (data: ItemSymptomChecker[]) => {
  const result = data?.map((item: ItemSymptomChecker) => {
    return {
      value: item.value,
      label: item.label,
    };
  });

  return result;
};

export const mapDetailSymptom = (data: ItemDetailSymptom): ItemDetailSymptom => {
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
