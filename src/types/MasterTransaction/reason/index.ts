export interface CancelReasonType {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMessage: string;
  data: any[];
  params: {
    limit: number;
    page: number;
    search: string;
    totalPage: number;
    totalData: number;
  };
}
