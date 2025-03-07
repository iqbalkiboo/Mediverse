export type ITreatmentState = {
  treatments: {
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
  treatment: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    data: any;
  };
  providers: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    data: any[];
  };
  provider: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    data: any;
  };
  healthFacilities: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    data: any[];
  };
  healthFacility: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    data: {
      polis: any[];
    };
  };
  treatmentGroups: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    data: any[];
  };
  modalUpdateStatusTreatment: {
    flag: string;
    isConfirmation: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
    successMessage: string;
  };
  formTreatment: {
    isOpen: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
    successMessage: string;
    form: {
      information: {
        isSuccess: boolean;
        code: string;
        type: string;
        name: string;
        poli: any;
        price: number;
        provider: any;
        serviceGroup: any;
        healthFacility: any;
        customerPrice: number;
      };
      description: {
        isSuccess: boolean;
        detail: string;
        preparation: string;
      };
      criteria: {
        isSuccess: boolean;
        maxAge: string;
        minAge: string;
        maxParticipant: string;
        preOrderSetting: string;
        durationPerService: string;
        participantPerVial: string;
      };
      vaccine?: any[];
    };
  };
  formTreatmentToClinic: {
    isOpen: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
    successMessage: string;
    form: {
      informationHealthFacility: {
        isSuccess: boolean;
        provider: any;
        healthFacility: any;
        treatmentIDs: any[];
      };
    };
  };
  modalUploadFileTreatment: {
    isOpen: boolean;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    provider: {};
    message: string;
  };
  modalDownloadFileTreatment: {
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
    data: string;
  };
  vaccines: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    data: any[];
  };
  params: {
    page: number;
    offset: number;
    limit: number;
    search: string;
    status: true;
    type: string;
  };
};
