import { formatDateEng } from '@/utils/formatDate';
import { modifyServiceTypeMedpoint } from '@/utils/transactions';

import type {
  consultation,
  doctors,
  MedpointDetail,
  medPointItem,
  MedpointOrderItemData,
} from '@/src/types/MedpointOrder';

export const mapListTransactionMedpointOrder = (
  data: MedpointOrderItemData[]
) => {
  return data.map((item: MedpointOrderItemData) => {
    return {
      item: {
        amount: item.amount,
        bill: item.bill,
        created_date: item.created_at,
        doctor_name: item.doctor_name,
        id: item.id,
        insurance_type: item.insurance_type,
        item_id: item.item_id,
        item_image: item.item_image,
        item_total: item.item_total,
        item_type: item.item_type,
        payment_provider: item.payment_provider,
        provider_id: item.provider_id,
        provider_type: item.provider_type,
        type: item.service_type,
        service_type: modifyServiceTypeMedpoint(item.service_type),
        spesiality: item.spesiality,
        payment_status: item.status,
        user_id: item.user_id,
        name_patient: item.user_name,
        phone_number_patient: item.user_phone,
        payment_limit: item.expired_at || null,
        transaction_detail_ids: item?.transaction_detail_ids,
        reservation_id: item?.reservation_id,
        have_complaint: item?.have_complaint || false,
        updated_date: item.updated_at,
        recipient: {
          id: item?.recipient_metadata?.user_id,
          full_name: item?.recipient_metadata?.full_name,
          birth_date: item?.recipient_metadata?.birth_date,
          gender: item?.recipient_metadata?.gender,
          ktp_no: item?.recipient_metadata?.ktp_no,
          address: item?.recipient_metadata?.address,
          phone_number: item?.recipient_metadata?.phone_number,
        },
      },
    };
  });
};

export const mapDetail = (data: MedpointDetail, checkupResult: string[]) => {
  const item = data?.item?.[0];
  const appointments = (item: string) => {
    const appt = data.consultations.find(
      (consultation: consultation) => consultation.item_id === item
    );
    return (
      appt || {
        schedule_date: '',
        schedule_time: '',
        consultation_duration: '',
      }
    );
  };
  const services = (outlet: string) => {
    const services = data.doctors.find(
      (doctor: doctors) => doctor.clinic_name === outlet
    );
    return services
      ? {
          ...services,
          doctor_name: data?.doctor?.doctor_name,
          speciality: data?.doctor?.speciality,
        }
      : {
          service_type: '',
          doctor_name: '',
          speciality: '',
        };
  };
  const consultations = data?.item.map((item: medPointItem) => {
    return {
      item: item,
      appointments: appointments(item.item_id),
      service: services(item.outlet_name),
    };
  });
  const transactionDetailIds =
    data?.item?.map((item: any) => item.transaction_detail_id) || [];

  return {
    title: 'E-',
    transaction: {
      id: data?.transaction?.id,
      status: data?.transaction?.status,
      reservationId: data?.transaction?.reservation_id ?? null,
      slot_id: data?.transaction?.slot_id ?? null,
      created_at: data?.transaction?.created_at,
      expired_at: data?.transaction?.expired_at,
    },
    consultation: {
      schedule_date: data?.consultation?.schedule_date,
      schedule_time: data?.consultation?.schedule_time,
      consultationDuration: data?.consultation?.consultation_duration,
      result: checkupResult ?? '-',
    },
    consultations: consultations,
    doctor: {
      doctor_id: data?.doctor?.doctor_id,
      doctor_name: data?.doctor?.doctor_name,
      speciality: data?.doctor?.speciality,
      clinic_name: data?.doctor?.clinic_name ?? '-',
      service_type: data?.doctor?.service_type ?? '-',
    },
    payment: {
      payment_id: data?.payment?.payment_id,
      payment_type: data?.payment?.payment_type,
      total_amount: data?.payment?.total_amount,
      total_promo: data?.payment?.total_promo ?? 0,
      total_delivery_amount: data?.payment?.total_delivery_amount ?? 0,
      insurance_type: data?.payment?.insurance_type,
      total_price: data?.payment?.total_price,
    },
    user: {
      id: data?.recipient_metadata?.user_id,
      user_name: data?.recipient_metadata?.full_name,
      born_date: data?.recipient_metadata?.birth_date,
      sex: data?.recipient_metadata?.gender,
      nik: data?.recipient_metadata?.ktp_no,
      address: data?.recipient_metadata?.address,
      allergy: data?.user?.allergy ?? [],
      user_id: data?.user?.id,
      phone_number: data?.user?.phone_number,
      emergency_phone_number: data?.user?.emergency_phone_number,
    },
    item: {
      provider_name: item?.provider_name,
      provider_type: item?.provider_type,
      service_type: item?.service_type,
      providerId: item?.provider_id?.split('clinic')?.[0] ?? null,
      item_name: item?.item_name,
    },
    transactionIds: transactionDetailIds,
  };
};

export const mapPayloadCheckup = (data, id, userType) => {
  return {
    transaction: id,
    //objective
    temperature: data?.objective?.temperature || '',
    height: data?.objective?.height || '',
    weight: data?.objective?.weight || '',
    bmi: data?.objective?.bmi || '',
    bmi_result: data?.objective?.bmi_result || '',
    systolic: data?.objective?.systolic || '',
    diastolic: data?.objective?.diastolic || '',
    respiration_rate: data?.objective?.respiration_rate || '',
    pulse_rate: data?.objective?.pulse_rate || '',
    heart_rate: data?.objective?.heart_rate || '',
    allergy_history: data?.objective?.allergy_history || '',
    user_type: userType,
    nurse: '15',
    doctor: '',
    disease_explanation:
      data?.education?.disease_explanation ||
      data?.soap?.disease_explanation ||
      '',
    examination_results:
      data?.education?.examination_results ||
      data?.soap?.examination_results ||
      '',
    medical_action:
      data?.education?.medical_action || data?.soap?.medical_action || '',
    complications:
      data?.education?.complications || data?.soap?.complications || '',
    side_effects_risks:
      data?.education?.side_effects_risks ||
      data?.soap?.side_effects_risks ||
      '',
    other_education:
      data?.education?.other_details || data?.soap?.other_details || '',
    description: '',
    //planning
    planning_description:
      data?.planning?.nurses_note || data?.soap?.nurses_note || '',
    //subjective
    patient_complaint:
      data?.subjective?.description || data?.soap?.description || '',
    psychosocial_spiritual:
      data?.subjective?.psychosocial_spiritual ||
      data?.soap?.psychosocial_spiritual ||
      '',
    patient_health_history:
      data?.subjective?.patient_health_history ||
      data?.soap?.patient_health_history ||
      '',
    family_health_history:
      data?.subjective?.family_health_history ||
      data?.soap?.family_health_history ||
      '',
    medication_history:
      data?.subjective?.medication_history ||
      data?.soap?.medication_history ||
      '',
    //assessment
    assessment: data.soap.assessment.map((item) => {
      return {
        case_type: item?.case_type || '',
        case_category: item?.case_category || '',
        assessment: item?.name || '',
        user_type: userType,
      };
    }),
  };
};

export const mapPayloadCheckups = (data) => {
  return {
    assessment: data.soap.assessment.map((item) => {
      return {
        assessment: {
          code: item.code,
          system: item.system,
          display: item.display,
        },
        case_category: '',
        case_type: '',
        description: '',
        user_type: 'nurse',
      };
    }),
    objective: {
      allergy_history: data.objective.allergy_history,
      bmi: data.objective.bmi,
      bmi_result: data.objective.bmi_result,
      diastolic: data.objective.diastolic,
      heart_rate: data.objective.heart_rate,
      height: data.objective.height,
      pulse_rate: data.objective.pulse_rate,
      respiration_rate: data.objective.respiration_rate,
      systolic: data.objective.systolic,
      temperature: data.objective.temperature,
      weight: data.objective.weight,
    },
    planning: {
      nurses_note: data.soap.nurses_note,
    },
    subjective: {
      description: data.soap.description,
      family_health_history: data.soap.family_health_history,
      medication_history: data.soap.medication_history,
      patient_health_history: data.soap.patient_health_history,
      psychosocial_spiritual: data.soap.psychosocial_spiritual,
    },
  };
};

export const mapPayloadSoap = (data, transactionId, detailId) => {
  return {
    assessment: [
      ...data.assessmentNurse,
      ...data.assessment.map((item) => {
        return {
          ...item,
          assessment: {
            code: item.assessment.code,
            system: item.assessment.system,
            display: item.assessment.display,
          },
        };
      }),
    ],
    subjective: {
      ...data.subjective,
      transaction_detail_id: Number(detailId[0]),
      transaction_id: transactionId,
    },
    objective: {
      ...data.objective,
      transaction_detail_id: Number(detailId[0]),
      transaction_id: transactionId,
    },
    planning: {
      ...data.planning,
      transaction_detail_id: Number(detailId[0]),
      transaction_id: transactionId,
    },
    education: {
      ...data.education,
      transaction_detail_id: Number(detailId[0]),
      transaction_id: transactionId,
    },
  };
};

export const mapPayloadProcedure = (data: any[]) => {
  return data.map((item) => ({
    ...item,
    dosage_sequence_number: 0,
    description: item.is_protektif === false ? item.description : '',
    expiration_date: formatDateEng(item.expiration_date),
    procedure: {
      code: item.procedure.code,
      display: item.procedure.display,
      system: item.procedure.system,
    },
    vaccine_category: {
      code: item.vaccine_category.code,
      display: item.vaccine_category.display,
      system: item.vaccine_category.system,
    },
    vaccine: {
      route: item.vaccine.route,
      kfa: item.vaccine.kfa,
      cvx_name: item.vaccine.cvx_name,
      cvx_group: item.vaccine.cvx_group,
    },
  }));
};

export const mapPayloadProcedureOutpatient = (data: any[], id) => {
  return data.map((item) => ({
    doctype: 'Outpatient Procedure',
    transaction: Number(id),
    code: item.procedure.code,
    display: item.procedure.display,
    system: item.procedure.system,
  }));
};

export const mapOptionsCancelReason = (data) => {
  return data?.map((item) => {
    return {
      label: item?.description,
      value: item,
    };
  });
};

export const mapOptionsIcd = (data, withCode = true) => {
  return data?.map((item) => {
    return {
      title: withCode
        ? `${item?.code_value} - ${item?.display}`
        : item?.display,
      value: item,
    };
  });
};
