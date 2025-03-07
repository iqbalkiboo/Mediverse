import {isEmpty} from 'lodash';

export const mapListNotification = (data) => {
  return !isEmpty(data) ? data.filter((e: any) => e.topic != 'user').map((item : any) => {
    switch (item?.type) {
      case 'medpharm':
        switch (item?.notification_template?.status) {
          case 'create_outlet':
            return {
              id: item?.id || 0,
              title: item?.notification_template?.title || '-',
              subTitle: item?.notification_template?.sub_title || '-',
              type: 'outlet',
              isRead: item?.is_read || false,
              category: item?.category || '',
              createdAt: item.created_epoch || 0,
              updatedAt: item.updated_epoch || 0,
              providerId: !isEmpty(item?.custom_data) && item?.custom_data?.[0]?.type_id || 0,
              outletId: (!isEmpty(item?.custom_data) && !isEmpty(item?.custom_data[0].metadata)) ?
                JSON.parse(item?.custom_data[0].metadata)?.outlet_id : 0,
              status: item?.notification_template?.title || '-',
            };
          default:
            return {
              id: item.id || 0,
              title: item?.notification_template?.title || '-',
              subTitle: item?.notification_template?.sub_title || '-',
              type: item.type || '',
              isRead: item.is_read || false,
              category: item.category || '',
              createdAt: item.created_epoch || 0,
              updatedAt: item.updated_epoch || 0,
              transactionTypeId: (!isEmpty(item?.custom_data) && !isEmpty(item?.custom_data[0].metadata)) ?
                JSON.parse(item?.custom_data[0].metadata)?.transaction_type_id : '-',
              status: item.notification_template?.status || '',
              parentId: !isEmpty(item?.custom_data) ? item?.custom_data[0]?.type_id : '-',
            };
        }
      case 'e-prescription':
        return {
          id: item.id || 0,
          title: item?.notification_template?.title || '-',
          subTitle: item?.notification_template?.sub_title || '-',
          type: item.type || '',
          isRead: item.is_read || false,
          category: item.category || '',
          createdAt: item.created_epoch || 0,
          updatedAt: item.updated_epoch || 0,
          transactionTypeId: (!isEmpty(item?.custom_data) && !isEmpty(item?.custom_data[0].metadata)) ?
          JSON.parse(item?.custom_data[0].metadata)?.transaction_prescription_id : '-',
          status: item.notification_template?.status || '',
          parentId: !isEmpty(item?.custom_data) ? item?.custom_data[0]?.type_id : '-',
        };
      case 'medpoint':
        switch (item?.notification_template?.status) {
          case 'create_doctor':
            return {
              id: item?.id || 0,
              title: item?.notification_template?.title || '-',
              subTitle: item?.notification_template?.sub_title || '-',
              type: 'doctor',
              isRead: item?.is_read || false,
              category: item?.category || '',
              createdAt: item.created_epoch || 0,
              updatedAt: item.updated_epoch || 0,
              providerId: !isEmpty(item?.custom_data) && item?.custom_data?.[0]?.type_id || 0,
              doctorId: (!isEmpty(item?.custom_data) && !isEmpty(item?.custom_data[0].metadata)) ?
                JSON.parse(item?.custom_data[0].metadata)?.doctor_id : '-',
              status: item?.notification_template?.title || '-',
            };
          case 'create_clinic':
            return {
              id: item?.id || 0,
              title: item?.notification_template?.title || '-',
              subTitle: item?.notification_template?.sub_title || '-',
              type: 'clinic',
              isRead: item?.is_read || false,
              category: item?.category || '',
              createdAt: item.created_epoch || 0,
              updatedAt: item.updated_epoch || 0,
              providerId: !isEmpty(item?.custom_data) && item?.custom_data?.[0]?.type_id || 0,
              clinicId: (!isEmpty(item?.custom_data) && !isEmpty(item?.custom_data[0].metadata)) ?
                JSON.parse(item?.custom_data[0].metadata)?.clinic_id : '-',
              status: item?.notification_template?.title || '-',
            };
          default:
            return {
              id: item?.id || 0,
              title: item?.notification_template?.title || '-',
              subTitle: item?.notification_template?.sub_title || '-',
              type: item?.type || '',
              isRead: item?.is_read || false,
              category: item?.category || '',
              createdAt: item.created_epoch || 0,
              updatedAt: item.updated_epoch || 0,
              providerId: !isEmpty(item?.custom_data) && item?.custom_data?.[0]?.type_id || 0,
              transactionId: (!isEmpty(item?.custom_data) && !isEmpty(item?.custom_data[0].metadata)) ?
                JSON.parse(item?.custom_data[0].metadata)?.transaction_type_id : '-',
              status: item?.notification_template?.title || '-',
            };
        }
      default:
        return [];
    }
  }).sort((a: any, b:any) => b.id - a.id) : [];
};
