import type { QueueItemData } from '@/types/MasterTransaction/queue';

export const mapListQueue = (data: QueueItemData[]) => {
  return data
    .map((item: QueueItemData) => {
      return {
        item: {
          name: item.name,
          arrival: item.arrival,
          service_transaction: item.service_transaction,
          type_registration: item.type_registration,
          queue_type: item.queue_type,
          company: item.company,
          type_code: item.type_code,
          queue_number: item.queue_number,
          queue_code: item.queue_code,
        },
      };
    })
    .sort((a, b) => a.item.name - b.item.name);
};
