export type IDoctorState = {
  doctors: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    data: any[];
    metadata: {
      page: number;
      size: number;
      totalPage: number;
      totalData: number;
    };
  };
  doctor: {
    isError: boolean;
    isLoading: boolean;
    errorMessage: string;
    data: {};
  };
  providers: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: any;
    data: [];
  };
  specialists: {
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    errorMessage: any;
    data: [];
  };
  tabFormDoctor: {
    information: boolean;
    documents: boolean;
    schedule: boolean;
  };
  formDoctor: {
    isLoading: boolean;
    isPutLoading: boolean;
    isError: boolean;
    isModalSuccessOpen: boolean;
    isModalErrorOpen: boolean;
    errorMessage: any;
    tabInformation: {
      provider: string;
      fullName: string;
      noStr: string;
      experience: number;
      experienceUnit: string;
      strRegistrationDate: any;
      birthPlace: string;
      birthDay: any;
      gender: string;
      phoneNumber: string;
      email: string;
      specialist: string;
      languages: any[];
      biografi: string;
      practitionerType: string;
    };
    tabDocument: {
      photo: string;
      photoStr: string;
      photoSip: string;
      photoSignature: string;
    };
  };
  modalUpdateStatusDoctor: {
    flag: string;
    isConfirmation: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
    successMessage: string;
  };
  modalDownloadFileDoctor: {
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
    data: string;
  };
  modalUploadFileDoctor: {
    isOpen: boolean;
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    provider: any;
    message: string;
  };
  params: {
    page: number;
    type: string;
    limit: number;
    status: boolean;
    search: string;
    offset: number;
  };
};

export type IGetListDoctorParams = {
  page: number;
  limit: number;
  status: boolean;
  search: string;
  channelId: any;
};

export type IGetListDoctorElasticParams = {
  type: string;
  limit: number;
  offset: number;
  search: string;
  status: boolean;
};

export type IPostDoctorData = {
  nama: string;
  tempatLahir: string;
  tanggalLahir: string;
  telepon: string;
  email: string;
  spesialis: string;
  foto: string;
  noStrDokter: string;
  fotoStr: string;
  fotoSip: string;
  sex: string;
  biografi: string;
};
