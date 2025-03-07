import * as yup from 'yup';

import { MESSAGE } from '@/src/constants';

const schemaCheckupAssessment = yup.object().shape({
  diastolic: yup.string().required(MESSAGE.REQUIRED),
  heart_rate: yup.string().required(MESSAGE.REQUIRED),
  height: yup.string().required(MESSAGE.REQUIRED),
  pulse_rate: yup.string().required(MESSAGE.REQUIRED),
  respiration_rate: yup.string().required(MESSAGE.REQUIRED),
  systolic: yup.string().required(MESSAGE.REQUIRED),
  temperature: yup.string().required(MESSAGE.REQUIRED),
  weight: yup.string().required(MESSAGE.REQUIRED),
});

const schemaCheckupSoap = yup.object().shape({
  assessment: yup.array().min(1, MESSAGE.REQUIRED).required(MESSAGE.REQUIRED),
  nurses_note: yup.string().required(MESSAGE.REQUIRED),
});

export { schemaCheckupAssessment, schemaCheckupSoap };
