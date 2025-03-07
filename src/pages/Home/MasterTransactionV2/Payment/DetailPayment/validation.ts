import * as yup from 'yup';

import { MESSAGE } from '@/src/constants';

const schemaCustomer = yup.object().shape({
  customer_name: yup.string().required(MESSAGE.REQUIRED),
  gender: yup.string().required(MESSAGE.REQUIRED),
  mobile_no: yup.string().required(MESSAGE.REQUIRED),
});

export { schemaCustomer };
