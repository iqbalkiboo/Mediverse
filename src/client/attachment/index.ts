import Axios from '../services';
import {paths} from '@/src/configs';

export const attachmentApi = async (payload) => {
  const pathAttachment = paths.attachment;
  const path = pathAttachment ? `${pathAttachment}/upload` : '';
  const formDataFile = new FormData();
  formDataFile.append('file_input', payload);
  try {
    return await Axios.post(path, formDataFile, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error: any) {
    return error.response;
  }
};

export default {
  attachmentApi,
};
