import {
  ReservationDiagnosticData,
  ReservationHospitalReferralData,
  ReservationItemData,
  ReservationMedicalSupportData,
  ReservationPrescriptionsData,
  UserHealthProfileData,
} from '@/src/types/Doctors';
import {unixTimeStampToDate} from '@/src/utils/dates';
import {capitalizeFirstLetter} from '@/src/utils/formatText';
import {formatRupiah} from '@/src/utils/fromatCurrency';
import {isArray} from 'lodash';

const renderTreatmentType = (type) => {
  switch (type) {
    case 'vaccination':
      return 'Vaksinasi';
    case 'reservation-consultation':
      return 'Reservase Konsultasi';
    case 'test-lab':
      return 'Test Lab';
    case 'medical-action':
      return 'Tindakan Medis';
    default:
      return '';
  }
};

export const getListReservation = (data: ReservationItemData[]) => {
  const result = data.map((item: ReservationItemData) => {
    return {
      id: item?.id ?? '-',
      status: item?.status ?? '-',
      createdAt: item?.createdAt ?? '-',
      ticketNo: '-',
      patientName: item?.participants.length > 0 ? item?.participants?.[0].fullName : '-',
      serviceType: renderTreatmentType(item?.treatment?.type) ?? '-',
      reservationType: item?.treatment?.type ?? '-',
      serviceName: item?.treatment?.name ?? '-',
      poli: item?.poly?.name ?? '-',
      reservationDate: item.reservationDate ?? '-',
      reservationTime: item.reservationTime ?? '-',
      doctorId: item?.doctorID,
    };
  });

  return result;
};

export const getDetailReservation = (data: ReservationItemData) => {
  return {
    id: data.id ?? '-',
    createdAt: data.createdAt ?? 0,
    updatedAt: data.updatedAt ?? '-',
    deletedAt: data.deletedAt ?? '-',
    reservationDate: data.reservationDate ?? '-',
    reservationTime: data.reservationTime ?? '-',
    treatmentTypeID: data.treatmentTypeID ?? 0,
    outletId: data.outletId ?? 0,
    source: data.source ?? '-',
    outletType: data.outletType ?? '-',
    treatmentMode: data?.treatment?.name ?? '-',
    doctorID: data.doctorID ?? 0,
    participants: data.participants ?? [],
    prescriptions: data.prescriptions ?? [],
    status: data.status ?? '-',
    serviceType: renderTreatmentType(data?.treatment?.type) ?? '-',
    reservationType: data?.treatment?.type ?? '-',
    poly: data?.poly?.name ?? '-',
  };
};

export const getReservationDiagnostic = (data: ReservationDiagnosticData) => {
  return {
    id: data.id,
    reservationId: data.reservationId,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    deletedAt: data.deletedAt,
    patientComplain: data.patientComplain,
    patientHeight: data.patientHeight,
    patientWeight: data.patientWeight,
    initialDiagnose: data.initialDiagnose,
    bodyTemperature: data.bodyTemperature,
    bloodPressure: data.bloodPressure,
    subject: data.subject,
    object: data.object,
  };
};

export const getReservationPrescriptions = (data: ReservationPrescriptionsData[]) => {
  const result = data.map((item) => {
    return {
      id: item.id,
      reservationId: item.reservationId,
      reservation: item.reservation,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      deletedAt: item.deletedAt,
      itemPrimaryTag: item.itemPrimaryTag,
      itemName: item.itemName,
      usageDescription: item.usageDescription,
      dosage: item.dosage,
    };
  });
  return result;
};

export const getReservationMedicalSupport = (data: ReservationMedicalSupportData) => {
  return {
    id: data.id,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    deletedAt: data.deletedAt,
    attachmentUrl: data.attachmentUrl,
    description: data.description,
  };
};

export const getReservationHospitalReferral = (data: ReservationHospitalReferralData) => {
  return {
    id: data.id,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    deletedAt: data.deletedAt,
    attachmentUrl: data.attachmentUrl,
    doctorID: data.doctorID,
    doctorName: data.doctorName,
    faskesID: data.faskesID,
    faskesName: data.faskesName,
    polyID: data.polyID,
    polyName: data.polyName,
  };
};

export const getListDrug = (data) => {
  const result = data.map((item) => {
    return {
      label: item.item.name,
      value: item.item.name,
    };
  });

  return result;
};

export const getListSchedules = (data) => {
  const result = data.map((item) => {
    return {
      faskes: item?.clinic?.name || '-',
      provider: '-',
      noSip: '-',
      service: item?.clinic?.treatments || '-',
      serviceType: '-',
      servicePrice: '-',
      id: item?.id || '-',
      clinicId: item?.clinic?.id || '-',
    };
  });

  return result;
};

export const mapHealthFacilities = (data: any) => {
  return data.map((item: any) => ({
    id: item?.id || '-',
    // providerId: item?.provider_id || '-',
    name: item?.name || item?.item.nama_provider || item?.item.nama || '-',
    type: item?.item_type || '-',
    providerType: capitalizeFirstLetter(item.provider_type) || '-',
    date: unixTimeStampToDate(item.indexed_at) || '-',
    status: !item.is_banned,
  }));
};

export const getListPoliOptions = (data: any) => {
  const result = data.map((item: any) => {
    return {
      label: item?.name,
      value: item?.id,
    };
  });

  return result;
};

export const getAllSlots = (data: any) => {
  const result = data.map((item: any) => {
    return {
      doctorId: item?.doctor?.id || '-',
      doctorName: item?.doctor?.nama || '-',
      specialist: item?.doctor?.spesialis || '-',
      faskes: item?.clinic?.name || '-',
      provider: item?.providerName,
      noSip: '-',
      service: item?.treatment?.name || '-',
      serviceType: item?.treatment?.configs['service-group']?.name || '-',
      servicePrice: formatRupiah(item?.treatment?.price),
      poly: item?.poly?.name,
      id: item?.id || '-',
    };
  });

  return result;
};

export const familyHistoryToShow = (data) => {
  const histories = isArray(data) ? data.map((item: any) => `${item.family} (${item.disease})`) : '';
  return histories;
};

export const getUserHealthProfile = (data: UserHealthProfileData): UserHealthProfileData => {
  return {
    full_name: data.full_name,
    phone_number: data.phone_number,
    email: data.email,
    user_id: data.user_id,
    idp_sub: data.idp_sub,
    profile_photo: data.profile_photo,
    birth_date: data.birth_date,
    gender: data.gender,
    ktp_no: data.ktp_no,
    study: data.study,
    no_emergency: data.no_emergency,
    ktp_photo: data.ktp_photo,
    religion: data.religion,
    health_profile_users_id: data.health_profile_users_id,
    height: data.height,
    waist_size: data.waist_size,
    bmi: data.bmi,
    weight: data.height,
    blood_type: data.blood_type,
    allergy: data.allergy,
    medicine_allergy: data.medicine_allergy,
    diagnosis_treatment: data.diagnosis_treatment,
    comorbid: data.comorbid,
    surgery_history: data.surgery_history,
    personal_medical_history: data.personal_medical_history,
    family_medical_history: data.family_medical_history,
    smoking_option: data.smoking_option,
    smoking_amount: data.smoking_amount,
    last_smoking: data.last_smoking,
    alcohol_consume: data.alcohol_consume,
    alcohol_amount: data.alcohol_amount,
    is_deleted: data.is_deleted,
  };
};

export const getOptionService = (data) => {
  const result = data.map((item) => {
    return {
      label: item.service_name || '-',
      value: item.id || 0,
    };
  });

  return result;
};
