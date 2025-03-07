export type UserData = {
  pin: string,
  study: string,
  email: string,
  gender: string,
  ktp_no: string,
  selfie: string,
  user_id: string,
  idp_sub: string,
  position: string,
  religion: string,
  full_name: string,
  ktp_photo: string,
  outlet_id: string,
  role_name: string,
  birth_date: string,
  is_active: boolean,
  created_at: string,
  updated_at: string,
  no_employee: string,
  provider_id: string,
  phone_number: string,
  no_emergency: string,
  suspend_date: string,
  suspend_note: string,
  completeness: string,
  profile_photo: string,
  ehr_patient_id: string,
  payment_id: number | string,
  all_address: UserAddressData[],
};

export type UserAddressData = {
  city: string,
  label: string,
  notes: string,
  detail: string,
  user_id: string,
  province: string,
  district: string,
  is_main: boolean,
  latitude: string,
  receiver: string,
  longitude: string,
  address_id: string,
  postal_code: string,
  phone_number: string,
  same_as_ktp: boolean,
  district_code: string,
}

export type IUserParams = {
  page: number,
  limit: number,
  search: string,
  endDate: string,
  startDate: string,
  status: boolean | string,
}

export type IUserMetadata = {
  page: number,
  limit: number,
  totalData: number,
  totalPage: number,
}

export type IUserState = {
  users: {
    data: any;
    roles: any;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    errorMessage: string;
    metadata: IUserMetadata;
  };
  user: {
    data: any;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    errorMessage: string;
  };
  patient: {
    data: any;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    errorMessage: string;
  };
  userBanned: {
    text: string;
    status: string;
    reason: string;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isModalOpen: boolean;
    errorMessage: string;
    successMessage: string;
  };
  params: IUserParams;
};

export type IUserBannedPayload = {
  id: string,
  status: boolean,
  bannedReason: string,
};
