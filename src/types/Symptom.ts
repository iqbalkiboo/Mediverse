import {MetaDataHealthCareStore} from './MetaData';

export type Symptom = {
  code: number,
  data: SymptomData[],
  metadata: MetaDataHealthCareStore,
};

export type SymptomData = {
  created_at: number,
  updated_at: number,
  id: number,
  symptom_id: string,
  symptom_name: string,
  specialist_id: number,
  symptom_icon: string,
  is_deleted: boolean,
  is_active: boolean,
  medevo_symptom_id: any[],
};

export type SymptomCheckerData = {
  id: string,
  label: string,
};
