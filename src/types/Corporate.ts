import {MetaDataHealthCareStore} from './MetaData';
export type Corporates = {
  code: number;
  data: ListCorporate[];
  metadata: MetaDataHealthCareStore;
};
export type ListCorporate = {
  id_corporate: string;
  name_corporate: string;
  employee_count: number;
  create_date: string;
  status: boolean;
};
