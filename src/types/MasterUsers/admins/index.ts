export type IAdminState = {
  admins: {
    data: any;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    errorMessage: string;
    metadata: {
      page: number;
      limit: number;
      totalData: number;
      totalPage: number;
    };
  };
  admin: {
    data: any;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    errorMessage: string;
    providers: [
      {
        type: string;
        provider: string;
      }
    ];
  };
  patient: {
    data: any;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    errorMessage: string;
    providers: [
      {
        type: string;
        provider: string;
      }
    ];
  };
  providers: {
    data: any;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    errorMessage: string;
  };
  outlets: {
    data: any;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  roles: {
    data: any;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
  };
  adminForm: {
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    errorMessage: string;
    successMessage: string;
    isModalOpen: boolean;
    data: {
      type: string;
      email: string;
      category: number;
      provider: number;
      full_name: string;
      phone_number: string;
      role: any;
      doctor: number;
      providers: [
        {
          provider: number;
          type: string;
        }
      ];
    };
  };
  suspend: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    errorMessage: string;
    successMessage: string;
    isModalOpen: boolean;
  };
  params: {
    page: number;
    limit: number;
    search: string;
    status: string;
    endDate: string;
    startDate: string;
  };
  form: {
    type: string;
    email: string;
    category: number;
    provider: number;
    full_name: string;
    phone_number: string;
  };
  resetPassword: {
    status: {
      isLoading: boolean;
      isError: boolean;
      isSuccess: boolean;
      message: string;
    };
    isModalConfirmOpen: boolean;
  };
  secondaryProvider: {
    status: {
      isLoading: boolean;
      isError: boolean;
      isSuccess: boolean;
      message: string;
    };
    form: {
      type: string;
      provider: number;
    };
    isModalAddOpen: boolean;
  };
};

export type IDataAdmin = {
  email: string,
  study: string,
  gender: string,
  ktp_no: string,
  outlet_name: string,
  user_id: number,
  service: string,
  idp_sub: string,
  full_name: string,
  role_name: string,
  ktp_photo: string,
  created_at: string,
  is_active: boolean,
  birth_date: string,
  provider_id: string,
  no_emergency: string,
  phone_number: string,
  profile_photo: string,
  provider_name: string,
  provider_type: string,
  secondary_provider_type: string,
};

export type IParamsGetListAdmin = {
  status: any,
  page: number,
  limit: number,
  search: string,
  roleId: number,
};

export type IParamsGetListProvider = {
  page: number,
  type: string,
  endDate: any,
  limit: number,
  query: string,
  startDate: any,
  providerType: string,
  isActive: boolean | string,
};

export type IHandleInputValue = {
  formValue: string,
  condition: boolean,
  detailValue: string,
};
