import AxiosFrappe from '@/client/servicesFrappe';

export const getListQueue = async (params) => {
  try {
    const typeRegistration = params.typeRegistration;
    const filterDate =
      params.fromDate && params.endDate
        ? `,["arrival","Between",["${params.fromDate}","${params.endDate}"]]`
        : '';
    const filterAppointmentStatus = params.appointment_status
      ? `,["appointment_status","=","${params.appointment_status}"]`
      : '';
    const path = `${pathFrappe}.get_appointment_queue`;
    return await AxiosFrappe.get(path, {
      params: {
        filters: `[["type_registration","=","${typeRegistration}"]${filterDate}${filterAppointmentStatus}]`,
      },
    });
  } catch (error: any) {
    return error.response;
  }
};

const pathFrappe =
  '/method/mediverse_rme.registration.doctype.appointment_queue.api';
