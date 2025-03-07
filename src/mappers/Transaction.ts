export const mapListTransaction = (data) => {
  return data
    .map((item) => ({
      item: {
        created_date: item?.service_transaction?.creation,
        updated_date: item?.service_transaction?.modified,
        service_type:
          item?.appointment_queue.type_registration === 'Pembelian Langsung'
            ? 'Lain-Lain'
            : item?.appointment_queue?.queue_type,
        appointment_status: item?.appointment_queue?.appointment_status,
        queue_number: item?.appointment_queue?.queue_number,
        queue_code: item?.appointment_queue?.queue_code,
        queue_type: item?.appointment_queue?.queue_type,
        queue_name: item?.appointment_queue?.queue_name,
        patient: item?.service_transaction?.patient,
        patient_name: item?.patient?.patient_name,
        payor: item?.service_transaction?.payor || '',
        status: item?.service_transaction?.sales_order?.status,
        statusTransaction:
          item?.service_transaction?.service_transaction_status,
        services: item?.service_transaction?.sales_order?.items.join(', '),
        id: item?.service_transaction?.name,
        has_kipi: item?.service_transaction?.is_kipi === 1,
        type_registration: item?.appointment_queue.type_registration || '',
      },
    }))
    .sort((a, b) => a.item?.queue_name - b.item?.queue_name);
};

export const mapOptionsCancelReason = (data) => {
  return data?.map((item) => {
    return {
      label: item?.description,
      value: item,
    };
  });
};

export const mapOptionsIcd = (data, withCode = true, displayField?) => {
  return data?.map((item) => {
    return {
      title: withCode
        ? `${item?.code_value} - ${item?.display || item?.item_name}`
        : displayField
        ? item[displayField]
        : item?.display || item?.item_name,
      value: item,
    };
  });
};
