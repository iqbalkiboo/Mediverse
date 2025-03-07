import * as yup from 'yup';

import { MESSAGE } from '@/src/constants';

const schemaIdentity = yup.object().shape({
  patient_type: yup.string().required(MESSAGE.REQUIRED),
  marital_status: yup.string().required(MESSAGE.REQUIRED),
  first_name: yup.string().required(MESSAGE.REQUIRED),
  sex: yup.string().required(MESSAGE.REQUIRED),
  dob: yup.string().required(MESSAGE.REQUIRED),
  pob: yup.string().required(MESSAGE.REQUIRED),
  mobile: yup.string().required(MESSAGE.REQUIRED),
  no_nikes: yup.string().when('patient_type', {
    is: 'Karyawan',
    then: yup.string().required(MESSAGE.REQUIRED),
    otherwise: yup.string().notRequired(),
  }),
  no_identifier: yup
    .string()
    .typeError('Hanya diisi angka ')
    .min(16, 'Minimal 16 karakter')
    .required(MESSAGE.REQUIRED),
});

const schemaAddress = yup.object().shape({
  village: yup.string().required(MESSAGE.REQUIRED),
  subdistrict: yup.string().required(MESSAGE.REQUIRED),
  city: yup.string().required(MESSAGE.REQUIRED),
  province: yup.string().required(MESSAGE.REQUIRED),
  address: yup.string().required(MESSAGE.REQUIRED),
});

export { schemaIdentity, schemaAddress };
