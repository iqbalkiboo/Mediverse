export type IGetDataHealthFacilityParams = {
  page?: number,
  limit?: number,
  offset?: number,
  keyword?: string,
  type: 'medevo' | 'medpharm' | 'medpoint-clinic' | 'medpoint-poli',
  status?: string;
};

export type IGetDataDetailHealthFacilityParams = {
  type?: string,
  id?: string | number,
};
