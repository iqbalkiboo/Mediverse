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
        dosage_sequence: yup.string().required(MESSAGE.REQUIRED),
        is_booster: yup.boolean().required(MESSAGE.REQUIRED),
        is_protektif: yup.boolean().required(MESSAGE.REQUIRED),
        procedure: yup.object().nullable().required(MESSAGE.REQUIRED),
        vaccine_category: yup.object().nullable().required(MESSAGE.REQUIRED),
        description: yup.string().when('is_protektif', {
          is: false,
          then: yup.string().required(MESSAGE.REQUIRED),
        }),
      })
    )
    .min(1, MESSAGE.REQUIRED)
    .required(MESSAGE.REQUIRED),
});

export { schemaTreatmentSoap, schemaTreatmentProcedure };
