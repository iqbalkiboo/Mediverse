export type ISpecialistData = {
  id: number,
  created_at: number,
  updated_at: number,
  parameters: string,
  is_active: boolean,
  is_deleted: boolean,
  description: string,
  specialist_id: string,
  specialist_name: string,
  specialist_icon: string,
};

export type IParamsGetSpecialists = {
  page: number,
  limit: number,
  search: string,
  isActive: boolean | string,
};

export type IPayloadPostSpecialist = {
  parameters: string,
  description: string,
  specialist_id: string,
  specialist_name: string,
  specialist_icon: string,
}

export type IPayloadPutSpecialist = {
  id: string,
  is_active: boolean,
  description: string,
  specialist_name: string,
  specialist_icon: string,
}
