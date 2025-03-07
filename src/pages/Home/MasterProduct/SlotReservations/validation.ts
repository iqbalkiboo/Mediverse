import * as yup from 'yup';
import { MESSAGE } from '@/src/constants';

const schema = yup.object({
  providerId: yup.string(),
  healthFacility: yup
    .object()
    .shape({
      title: yup.string(),
      value: yup.string(),
    })
    .nullable()
    .required(MESSAGE.REQUIRED),
  poly: yup
    .object()
    .shape({
      label: yup.string(),
      value: yup.string(),
    })
    .nullable()
    .required(MESSAGE.REQUIRED),
  treatment: yup
    .object()
    .shape({
      label: yup.string(),
      value: yup.string(),
    })
    .nullable()
    .required(MESSAGE.REQUIRED),
  date: yup.string().required(MESSAGE.REQUIRED),
  startTime: yup.string().required(MESSAGE.REQUIRED),
  endTime: yup.string().required(MESSAGE.REQUIRED),
  maxReservation: yup.string().required(MESSAGE.REQUIRED),
  additionalData: yup
    .array()
    .of(
      yup.object().shape({
        vaccine: yup.object().nullable().required(MESSAGE.REQUIRED),
        batch: yup
          .array()
          .of(
            yup.object().shape({
              lotNumber: yup.string().required(MESSAGE.REQUIRED),
              expirationDate: yup.string().required(MESSAGE.REQUIRED),
            })
          )
          .min(1, MESSAGE.REQUIRED)
          .required(MESSAGE.REQUIRED),
      })
    )
    .when('treatment', (treatment, schema) => {
      const isVaccine = treatment?.type === 'vaccination';
      return isVaccine
        ? schema.min(1, MESSAGE.REQUIRED).required(MESSAGE.REQUIRED)
        : schema.notRequired();
    }),
});

export default schema;
