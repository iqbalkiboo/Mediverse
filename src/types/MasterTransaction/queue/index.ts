export interface QueueItemData {
  name: number;
  arrival: string;
  service_transaction: string;
  type_registration: string;
  queue_type: string;
  company: string;
  type_code: string;
  queue_number: string;
  queue_code: string;
}

export interface IQueueState {
  params: {
    search: string;
    limit: number;
    page: number;
    totalData: number;
    totalPage: number;
    status: string;
    startDate: string;
    endDate: string;
    serviceType: string;
  };
  metadata: {
    page: number;
    limit: number;
    totalPage: number;
    totalData: number;
  };
  queues: {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    message: string;
    data: QueueItemData[];
    detail: any;
  };
  transactions: {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    message: string;
    data: any[];
  };
}
