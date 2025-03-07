import * as yup from 'yup';
import { MESSAGE } from '@/src/constants';

const validationDiagnose = yup.object({
  patientComplain: yup.string().required(MESSAGE.REQUIRED),
  initialDiagnose: yup.string().required(MESSAGE.REQUIRED),
  bodyTemperature: yup.string().required(MESSAGE.REQUIRED),
  bloodPressure: yup.string().required(MESSAGE.REQUIRED),
  patientWeight: yup.string().required(MESSAGE.REQUIRED),
  patientHeight: yup.string().required(MESSAGE.REQUIRED),
  subject: yup.string().required(MESSAGE.REQUIRED),
  object: yup.string().required(MESSAGE.REQUIRED),
});

const validationMedicalSupport = yup.object({
  description: yup.string().required(MESSAGE.REQUIRED),
  attachmentUrl: yup.string().required(MESSAGE.REQUIRED),
});

const validationHospitalReferral = yup.object({
  faskesName: yup.string().required(MESSAGE.REQUIRED),
  polyName: yup.string().required(MESSAGE.REQUIRED),
  doctorName: yup.string().required(MESSAGE.REQUIRED),
  attachmentUrl: yup.string().required(MESSAGE.REQUIRED),
});

const validationPrescriptionScheme = yup.object({
  itemName: yup.string().required(MESSAGE.REQUIRED),
  usageDescription: yup.string().required(MESSAGE.REQUIRED),
  dosage: yup.string(),
});

export {
  validationDiagnose,
  validationMedicalSupport,
  validationHospitalReferral,
  validationPrescriptionScheme,
};
