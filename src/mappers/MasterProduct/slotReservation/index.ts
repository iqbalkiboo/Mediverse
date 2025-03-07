import { isArray, isEmpty } from 'lodash';

import { formatDate, isoStringToTime } from '@/src/utils/formatDate';

export const mapListSlot = (data: any[], search: string) => {
  // temporarily handle search locally
  const filteredData = isArray(data)
    ? data?.filter((item) => {
        return (
          item?.doctor?.nama?.toLowerCase().includes(search.toLowerCase()) ||
          item?.treatment?.name?.toLowerCase().includes(search.toLowerCase())
        );
      })
    : [];

  return isArray(filteredData)
    ? filteredData.map((item: any) => {
        return {
          id: item?.id || '-',
          doctorName: item?.doctor?.nama || '-',
          healthFacilityName: item?.clinic?.name || '-',
          polyName: item?.poly?.name || '-',
          date: formatDate(item?.startTime && item.endTime.slice(0, -1)) || '-',
          startTime: isoStringToTime(item?.startTime) || '-',
          endTime: isoStringToTime(item?.endTime) || '-',
          status: item?.status || false,
          maxCount: item?.maxCount || 0,
          sessionCount: (item?.sessionCount ? item?.sessionCount : 0) || 0,
        };
      })
    : [];
};

export const mapDetailSlot = (data: any) => {
  return {
    additionalData: data?.additionalData || [],
    id: data?.id || '-',
    doctorName: data?.doctor?.nama || '-',
    treatmentName: data?.treatment?.name || '-',
    treatmentType: data?.treatment?.type || '-',
    healthFacilityName: data?.clinic?.name || '-',
    polyName: data?.poly?.name || '-',
    maximum: data?.maxCount || '-',
    endDate: formatDate(data?.endTime && data.endTime.slice(0, -1)) || '-',
    startTime: isoStringToTime(data?.startTime) || '-',
    endTime: isoStringToTime(data?.endTime) || '-',
    status: data?.status || false,
    batchNumber: data?.lotNumber || '-',
    expirationDate:
      formatDate(data?.expirationDate && data.expirationDate) || '-',
  };
};

export const mapListSelectHealthFacility = (data) => {
  return data.map((item: any) => {
    return {
      title: item?.name || '',
      value: {
        name: item?.name || '-',
        id: item?.id || null,
      },
    };
  });
};

export const mapListSelectPoly = (data) => {
  return data.map((item: any) => {
    return {
      label: item?.name || '',
      value: {
        name: item?.name || '-',
        id: item?.id || null,
      },
    };
  });
};

export const mapListSelectDoctor = (data, treatmentId: number) => {
  if (!treatmentId) {
    return [];
  }

  const doctors: {
    label: string;
    value: {
      name: string;
      id: number;
    };
  }[] = [];

  data.map((item: any) => {
    const treatments = !isEmpty(item.treatments)
      ? item.treatments.find((tr) => tr.id === treatmentId)
      : null;
    if (!isEmpty(treatments)) {
      doctors.push({
        label: item?.nama || '-',
        value: {
          name: item?.nama || '-',
          id: item?.id || null,
        },
      });
    }
  });

  return doctors;
};

export const mapListSelectTreatment = (data) => {
  return data.map((item: any) => {
    return {
      label: item?.name || '-',
      value: {
        name: item?.name || '-',
        id: item?.id || null,
        type: item?.type || '-',
        additionalData: item?.additionalData?.vaccine || [],
      },
    };
  });
};

export const mapListSelectProvider = (data) => {
  return data.map((item: any) => {
    return {
      title: item?.name || '',
      value: item?.id || null,
    };
  });
};
