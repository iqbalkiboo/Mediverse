export type ItemSymptom = {
  created_at: number,
  updated_at: number,
  id: number,
  symptom_id: string,
  symptom_name: string,
  specialist_id: number,
  symptom_icon: string,
  is_deleted: boolean,
  is_active: boolean,
  medevo_symptom_id: MedevoSymptomId[],
};

export type ItemSymptomChecker = {
  value: string,
  label: string,
};

export type ItemDetailSymptom = {
  created_at: number,
  updated_at: number,
  id: number,
  symptom_id: string,
  symptom_name: string,
  specialist_id: number,
  symptom_icon: string,
  is_deleted: boolean,
  is_active: boolean,
  medevo_symptom_id: MedevoSymptomId[],
};

export type MedevoSymptomId = {
  label: string,
  value: string,
}
