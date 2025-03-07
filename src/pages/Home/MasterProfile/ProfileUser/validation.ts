import * as yup from 'yup';
import {MESSAGE, REGEX} from '@/src/constants';

const schemaFormMe = yup.object({
  name: yup.string().required(MESSAGE.REQUIRED),
  email: yup.string().required(MESSAGE.REQUIRED),
});

const schemaChangePassword = yup.object({
  oldPassword: yup.string()
      .matches(REGEX.PASSWORD, 'kata sandi yang anda masukkan belum sesuai')
      .required(MESSAGE.REQUIRED),
  newPassword: yup.string()
      .matches(REGEX.PASSWORD, 'kata sandi yang anda masukkan belum sesuai')
      .required(MESSAGE.REQUIRED),
  confirmPassword: yup.string()
      .matches(REGEX.PASSWORD, 'kata sandi yang anda masukkan belum sesuai')
      .required(MESSAGE.REQUIRED),
});

export {
  schemaFormMe,
  schemaChangePassword,
};
