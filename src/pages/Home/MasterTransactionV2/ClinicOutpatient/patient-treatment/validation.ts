import * as yup from 'yup';

import { MESSAGE } from '@/src/constants';

const schemaTreatmentSoap = yup.object().shape({
  assessment: yup
    .array()
    .of(
      yup.object().shape({
        assessment: yup.object().nullable().required(MESSAGE.REQUIRED),
      })
    )
    .min(1, MESSAGE.REQUIRED)
    .required(MESSAGE.REQUIRED),
  planning: yup.object().shape({
    doctors_note: yup.string().required(MESSAGE.REQUIRED),
  }),
});

const schemaTreatmentProcedure = yup.object().shape({
  procedure: yup
    .array()
    .of(
      yup.object().shape({
        procedure: yup.object().nullable().required(MESSAGE.REQUIRED),
      })
    )
    .min(1, MESSAGE.REQUIRED)
    .required(MESSAGE.REQUIRED),
});

const schemaTreatmentMedicalSupport = yup.object().shape({
  hasMedicalSupport: yup.string().required(MESSAGE.REQUIRED),
  medicalSupport: yup.array().when('hasMedicalSupport', {
    is: 'yes',
    then: yup
      .array()
      .of(
        yup.object().shape({
          medicalSupport: yup.object().nullable().required(MESSAGE.REQUIRED),
          qty: yup.number().required(MESSAGE.REQUIRED),
        })
      )
      .min(1, MESSAGE.REQUIRED)
      .required(MESSAGE.REQUIRED),
    otherwise: yup.array().notRequired(),
  }),
});

export {
  schemaTreatmentSoap,
  schemaTreatmentProcedure,
  schemaTreatmentMedicalSupport,
};
