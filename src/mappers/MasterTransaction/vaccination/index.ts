export const mapPayloadSoap = (data, id, userType) => {
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

export const mapPayloadProcedure = (id, data) => {
  return data.map((item) => ({
    doctype: 'Immunization Procedure',
    transaction: Number(id),
    procedure: item.procedure.name,
    vaccine_item: item.vaccine.code,
    immunization_category: item.vaccine_category.name,
    batch_number: item.lot_number,
    expired_date: item.expiration_date,
    route: item.vaccine.route,
    sequence_of_immunization_doses: item.dosage_sequence,
    booster: item.is_booster ? 1 : 0,
    titer_test_results: item.titer_result,
    protective: item.is_protektif ? 1 : 0,
    explanation: item.description,
  }));
};
