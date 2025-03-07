import AxiosFrappe from '@/client/servicesFrappe';

const pathPractitionerDoctor =
  'method/mediverse_rme.mediverse_rme.doctype.clinic_practitioner.clinic_practitioner.get_doctors_active_practice_hours';

export const getListDoctor = async (department: string) => {
  try {
    const path = `${pathPractitionerDoctor}?department=${department}`;
    return await AxiosFrappe.get(path);
  } catch (error: any) {
    return error.response;
  }
};
