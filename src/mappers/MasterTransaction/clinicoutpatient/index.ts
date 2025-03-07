import { formatDateEng } from '@/utils/formatDate';

export const mapPayloadSoapClinic = (data, id, userType) => {
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
    nurse: userType === 'nurse' ? '15' : undefined,
    doctor: userType === 'doctor' ? '15' : undefined,
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
      data?.soap?.nurses_note || data?.planning?.doctors_note || '',
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
    assessment:
      userType === 'nurse'
        ? data?.soap?.assessment?.map((item) => {
            return {
              case_type: item?.case_type || '',
              case_category: item?.case_category || '',
              assessment_data: item?.name || '',
              user_type: userType,
            };
          })
        : data?.assessment?.map((item) => {
            return {
              case_type: item?.case_type || '',
              case_category: item?.case_category || '',
              assessment_data: item?.assessment?.name || '',
              user_type: userType,
            };
          }),
  };
};

export const mapPayloadProcedureClinic = (id, data) => {
  return data.map((item) => ({
    doctype: 'Outpatient Procedure',
    transaction: Number(id),
    code: item?.procedure_detail?.code_value || '',
    system: item?.procedure_detail?.system_uri || '',
    display: item?.procedure_name || '',
    procedure: item?.procedure || '',
    item: item?.item || '',
    name: item?.name || '',
  }));
};

export const mapPayloadDrugRecipe = (id, data) => {
  if (data?.length < 1) return [];
  return data?.map((item) => ({
    transaction: Number(id),
    doctype: 'Drug Recipe Items',
    item: item.isConcoction ? undefined : item.item ? item.item : item.name,
    name: item.name,
    concoction_name: item.isConcoction ? item.itemName : undefined,
    is_concoction: item.isConcoction ? 1 : 0,
    quantity: item.quantity,
    unit: item.isConcoction ? undefined : item.unit,
    instructions: item.instruction,
    concoction_items: item.isConcoction
      ? item.concoctionItems.map((concoctionItem) => ({
          item: concoctionItem.item ? concoctionItem.item : concoctionItem.name,
          name: concoctionItem.name ? concoctionItem.name : concoctionItem.item,
          quantity: concoctionItem.quantity,
          unit: concoctionItem.unit,
          instructions: concoctionItem.instruction,
        }))
      : undefined,
  }));
};

export const mapPayloadMedicalSupport = (id, data) => {
  return {
    transaction: Number(id),
    has_list: data.hasMedicalSupport === 'yes' ? 1 : 0,
    medical_support_items:
      data.hasMedicalSupport === 'yes'
        ? data.medicalSupport?.map((item) => ({
            laboratory_examination: item?.medicalSupport?.name,
            quantity: item?.qty,
            name: item?.medicalSupport?.id || undefined,
          }))
        : [],
  };
};

export const mapPayloadRecommendationLetter = (id, data) => {
  const hasDetailRefer = data?.detailRefer?.hasDetailRefer === 'yes';
  const hasDetailCertificate =
    data?.detailCertificate?.hasDetailCertificate === 'yes';
  const hasDetailDocument = data?.detailDocument?.hasDetailDocument === 'yes';

  return {
    transaction: Number(id),
    has_refer_out: hasDetailRefer ? 1 : 0,
    hospital: hasDetailRefer ? data?.detailRefer?.hospital?.name || '' : '',
    health_facilities: hasDetailRefer ? data?.detailRefer?.facility || '' : '',
    reference_type: hasDetailRefer ? data?.detailRefer?.reference || '' : '',
    has_medical_certificate: hasDetailCertificate ? 1 : 0,
    medical_certificate_start_date: hasDetailCertificate
      ? data?.detailCertificate?.startDate
        ? formatDateEng(data?.detailCertificate?.startDate)
        : ''
      : '',
    medical_certificate_end_date: hasDetailCertificate
      ? data?.detailCertificate?.endDate
        ? formatDateEng(data?.detailCertificate?.endDate)
        : ''
      : '',
    medical_certificate_period: hasDetailCertificate
      ? data?.detailCertificate?.period || ''
      : '',
    has_document: hasDetailDocument ? 1 : 0,
  };
};
