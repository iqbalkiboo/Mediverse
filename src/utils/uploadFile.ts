import {attachmentApi} from '@/src/client/attachment';

export const uploadFiles = async (file: File) => {
  const {data} = await attachmentApi(file);
  return Promise.resolve(data.url);
};
