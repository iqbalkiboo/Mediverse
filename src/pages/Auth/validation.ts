import * as yup from 'yup';
import {MESSAGE, REGEX} from '@/src/constants';

const schema = yup.object({
  username: yup.string().email().required(MESSAGE.REQUIRED),
  password: yup.string()
      .matches(REGEX.PASSWORD, 'kata sandi yang anda masukkan belum sesuai')
      .required(MESSAGE.REQUIRED),
});

export default schema;
