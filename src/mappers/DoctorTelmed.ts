import {
  IDoctorTelmedItem, IMapSchedulesDoctorTelmed, ISchedulesDoctorTelmed,
} from '@/src/types/DoctorTelmed';
import {dateTimeToTimes, translateToDay} from '@/src/utils/formatDate';
import {isArray, isNumber} from 'lodash';

export const getListDoctorTelmed = ((data: IDoctorTelmedItem[]) => {
  const result = data.map((item: IDoctorTelmedItem) => {
    return {
      id: item.id,
      doctor_name: item?.item?.nama_dokter || '-',
      phone_number: '-',
      specialization: item?.item?.nama_spesialisasi || '-',
      registration_date: '-',
      medevo_status: item?.item?.status_dokter || '-',
      status: !item.is_banned,
    };
  });

  return result;
});

export const getDetailDoctorTelmed = ((data: any) => {
  const scheduleDataDay = data?.schedule?.timeWorks?.map((item: any) => {
    return {
      day: '-',
      time: '-',
    };
  });

  const scheduleData = data?.schedule?.map((item: any) => {
    return {
      id: '-',
      sip_number: '-',
      faskes_name: '-',
      items: scheduleDataDay,
    };
  });

  const ratingAndReviewData = data?.ratingAndReview?.map((item: any) => {
    return {
      id: '-',
      reviewer_name: '-',
      reviewer_profile: '-',
      reviewer_star_rating: '-',
      review_message: '-',
      review_date: '-',
    };
  });

  return {
    doctor_name: data?.item?.nama_dokter ?? '-',
    doctor_profile: data?.item?.url_foto_dokter,
    status: !data.is_banned,
    item_id: data?.item_id,
    information: {
      biography: '-',
      medevo_status: data?.item?.status_dokter ?? '-',
      str_number: '-',
      phone_number: '-',
      email: '-',
      specialization: data?.item?.nama_spesialisasi ?? '-',
      gender: '-',
      languages: [],
      consultation_total: '-',
    },
    schedule: {
      data: scheduleData || [],
    },
    ratingAndReview: {
      star_rating_avg: 0,
      review_total: 0,
      data: ratingAndReviewData || [],
    },
  };
});

export const mapSchedulesDoctorTelmed = (data: ISchedulesDoctorTelmed[]): IMapSchedulesDoctorTelmed[] => {
  return isArray(data) ? data.map((item: ISchedulesDoctorTelmed) => ({
    doctorId: item.id_dokter || '',
    doctorName: item.nama_dokter || '',
    providerName: item.nama_provider || '',
    scheduleId: item.id_jadwal_konsul || '',
    scheduleNumber: item.hari_jadwal_konsul,
    scheduleDay: isNumber(Number(item.hari_jadwal_konsul)) ? translateToDay(Number(item.hari_jadwal_konsul) - 1) : '',
    scheduleStart: item.start_jadwal_konsul ? dateTimeToTimes(item.start_jadwal_konsul) : '',
    scheduleEnd: item.end_jadwal_konsul ? dateTimeToTimes(item.end_jadwal_konsul) : '',
  })) : [];
};

export const groupSchedulesDoctorTelmed = (data: IMapSchedulesDoctorTelmed[]) => {
  return data.reduce((group, item) => {
    const {providerName} = item;
    group[providerName] = group[providerName] ?? [];
    group[providerName].push(item);
    return group;
  }, {});
};

export const mapGroupSchedulesDoctorTelmed = (data: any) => {
  return Object.keys(data).map((item: any) => ({
    providerName: item,
    noSip: data[item][0].noSip || '-',
    items: data[item],
  }));
};

export const mapListSelectMasterSymptom = (data: any[]) => {
  const listSelectMasterSymptom = data?.map((item: any) => {
    return {
      label: item?.symptom_name,
      value: item?.symptom_name,
    };
  });

  return listSelectMasterSymptom;
};
