import secure from '@/utils/secure';
import {isEmpty} from 'lodash';

const appKey = import.meta.env.VITE_APP_API_KEY;
const appId = import.meta.env.VITE_APP_APP_ID;

export const config = {
  apiKey: !isEmpty(appKey) ? secure.decrypt(appKey) : '',
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_SENDER_ID,
  appId: !isEmpty(appId) ? secure.decrypt(appId) : '',
  measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID,
};

